/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PrefetchAssetGroup} from '../src/assets';
import {CacheDatabase} from '../src/db-cache';
import {IdleScheduler} from '../src/idle';
import {MockFileSystemBuilder, MockServerStateBuilder, tmpHashTable, tmpManifestSingleAssetGroup} from '../testing/mock';
import {SwTestHarness, SwTestHarnessBuilder} from '../testing/scope';

import {async_fit, async_it} from './async';

(function() {
  // Skip environments that don't support the minimum APIs needed to run the SW tests.
  if (!SwTestHarness.envIsSupported()) {
    return;
  }

  const dist = new MockFileSystemBuilder()
                   .addFile('/foo.txt', 'this is foo')
                   .addFile('/bar.txt', 'this is bar')
                   .build();

  const manifest = tmpManifestSingleAssetGroup(dist);

  const server = new MockServerStateBuilder().withStaticFiles(dist).withManifest(manifest).build();

  const scope = new SwTestHarnessBuilder().withServerState(server).build();

  const db = new CacheDatabase(scope, scope);


  describe('prefetch assets', () => {
    let group: PrefetchAssetGroup;
    let idle: IdleScheduler;
    beforeEach(() => {
      idle = new IdleScheduler(null !, 3000, {
        log: (v, ctx = '') => console.error(v, ctx),
      });
      group = new PrefetchAssetGroup(
          scope, scope, idle, manifest.assetGroups ![0], tmpHashTable(manifest), db, 'test');
    });
    async_it('initializes without crashing', async() => { await group.initializeFully(); });
    async_it('fully caches the two files', async() => {
      await group.initializeFully();
      scope.updateServerState();
      const res1 = await group.handleFetch(scope.newRequest('/foo.txt'), scope);
      const res2 = await group.handleFetch(scope.newRequest('/bar.txt'), scope);
      expect(await res1 !.text()).toEqual('this is foo');
      expect(await res2 !.text()).toEqual('this is bar');
    });
    async_it('persists the cache across restarts', async() => {
      await group.initializeFully();
      const freshScope =
          new SwTestHarnessBuilder().withCacheState(scope.caches.dehydrate()).build();
      group = new PrefetchAssetGroup(
          freshScope, freshScope, idle, manifest.assetGroups ![0], tmpHashTable(manifest),
          new CacheDatabase(freshScope, freshScope), 'test');
      await group.initializeFully();
      const res1 = await group.handleFetch(scope.newRequest('/foo.txt'), scope);
      const res2 = await group.handleFetch(scope.newRequest('/bar.txt'), scope);
      expect(await res1 !.text()).toEqual('this is foo');
      expect(await res2 !.text()).toEqual('this is bar');
    });
    async_it('caches properly if resources are requested before initialization', async() => {
      const res1 = await group.handleFetch(scope.newRequest('/foo.txt'), scope);
      const res2 = await group.handleFetch(scope.newRequest('/bar.txt'), scope);
      expect(await res1 !.text()).toEqual('this is foo');
      expect(await res2 !.text()).toEqual('this is bar');
      scope.updateServerState();
      await group.initializeFully();
    });
    async_it('throws if the server-side content does not match the manifest hash', async() => {
      const badHashFs = dist.extend().addFile('/foo.txt', 'corrupted file').build();
      const badServer =
          new MockServerStateBuilder().withManifest(manifest).withStaticFiles(badHashFs).build();
      const badScope = new SwTestHarnessBuilder().withServerState(badServer).build();
      group = new PrefetchAssetGroup(
          badScope, badScope, idle, manifest.assetGroups ![0], tmpHashTable(manifest),
          new CacheDatabase(badScope, badScope), 'test');
      const err = await errorFrom(group.initializeFully());
      expect(err.message).toContain('Hash mismatch');
    });
  });
})();

function errorFrom(promise: Promise<any>): Promise<any> {
  return promise.catch(err => err);
}
