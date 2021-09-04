/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as ts from 'typescript';

import {getDeclaration, makeProgram} from '../../testing/in_memory_typescript';
import {DefaultImportTracker} from '../src/default';

describe('DefaultImportTracker', () => {
  it('should prevent a default import from being elided if used', () => {
    const {program, host} = makeProgram(
        [
          {name: 'dep.ts', contents: `export default class Foo {}`},
          {name: 'test.ts', contents: `import Foo from './dep'; export function test(f: Foo) {}`},

          // This control file is identical to the test file, but will not have its import marked
          // for preservation. It exists to verify that it is in fact the action of
          // DefaultImportTracker and not some other artifact of the test setup which causes the
          // import to be preserved. It will also verify that DefaultImportTracker does not preserve
          // imports which are not marked for preservation.
          {name: 'ctrl.ts', contents: `import Foo from './dep'; export function test(f: Foo) {}`},
        ],
        {
          module: ts.ModuleKind.ES2015,
        });
    const fooClause = getDeclaration(program, 'test.ts', 'Foo', ts.isImportClause);
    const fooId = fooClause.name !;
    const fooDecl = fooClause.parent;

    const tracker = new DefaultImportTracker();
    tracker.recordImportedIdentifier(fooId, fooDecl);
    tracker.recordUsedIdentifier(fooId);
    program.emit(undefined, undefined, undefined, undefined, {
      before: [tracker.importPreservingTransformer()],
    });
    const testContents = host.readFile('/test.js') !;
    expect(testContents).toContain(`import Foo from './dep';`);

    // The control should have the import elided.
    const ctrlContents = host.readFile('/ctrl.js');
    expect(ctrlContents).not.toContain(`import Foo from './dep';`);
  });

  it('should transpile imports correctly into commonjs', () => {
    const {program, host} = makeProgram(
        [
          {name: 'dep.ts', contents: `export default class Foo {}`},
          {name: 'test.ts', contents: `import Foo from './dep'; export function test(f: Foo) {}`},
        ],
        {
          module: ts.ModuleKind.CommonJS,
        });
    const fooClause = getDeclaration(program, 'test.ts', 'Foo', ts.isImportClause);
    const fooId = ts.updateIdentifier(fooClause.name !);
    const fooDecl = fooClause.parent;

    const tracker = new DefaultImportTracker();
    tracker.recordImportedIdentifier(fooId, fooDecl);
    tracker.recordUsedIdentifier(fooId);
    program.emit(undefined, undefined, undefined, undefined, {
      before: [
        addReferenceTransformer(fooId),
        tracker.importPreservingTransformer(),
      ],
    });
    const testContents = host.readFile('/test.js') !;
    expect(testContents).toContain(`var dep_1 = require("./dep");`);
    expect(testContents).toContain(`var ref = dep_1["default"];`);
  });
});

function addReferenceTransformer(id: ts.Identifier): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    return (sf: ts.SourceFile) => {
      if (id.getSourceFile().fileName === sf.fileName) {
        return ts.updateSourceFileNode(sf, [
          ...sf.statements, ts.createVariableStatement(undefined, ts.createVariableDeclarationList([
            ts.createVariableDeclaration('ref', undefined, id),
          ]))
        ]);
      }
      return sf;
    };
  };
}
