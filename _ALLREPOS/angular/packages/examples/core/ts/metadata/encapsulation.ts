/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, ViewEncapsulation} from '@angular/core';

// #docregion longform
@Component({
  selector: 'my-app',
  template: `
    <h1>Hello World!</h1>
    <span class="red">Shadow DOM Rocks!</span>
  `,
  styles: [`
    :host {
      display: block;
      border: 1px solid black;
    }
    h1 {
      color: blue;
    }
    .red {
      background-color: red;
    }

  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
class MyApp {
}
// #enddocregion
