/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// THIS CODE IS GENERATED - DO NOT MODIFY
// See angular/tools/gulp-tasks/cldr/extract.js

const u = undefined;

function plural(n: number): number {
  if (n === 1) return 1;
  return 5;
}

export default [
  'kk', [['AM', 'PM'], u, u], u,
  [
    ['Ж', 'Д', 'С', 'С', 'Б', 'Ж', 'С'],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
    [
      'жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі',
      'бейсенбі', 'жұма', 'сенбі'
    ],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
  ],
  [
    ['Ж', 'Д', 'С', 'С', 'Б', 'Ж', 'С'],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб'],
    [
      'Жексенбі', 'Дүйсенбі', 'Сейсенбі', 'Сәрсенбі',
      'Бейсенбі', 'Жұма', 'Сенбі'
    ],
    ['Жс', 'Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб']
  ],
  [
    ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
    [
      'қаң.', 'ақп.', 'нау.', 'сәу.', 'мам.', 'мау.', 'шіл.', 'там.',
      'қыр.', 'қаз.', 'қар.', 'жел.'
    ],
    [
      'қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым',
      'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша',
      'желтоқсан'
    ]
  ],
  [
    ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
    [
      'Қаң.', 'Ақп.', 'Нау.', 'Сәу.', 'Мам.', 'Мау.', 'Шіл.', 'Там.',
      'Қыр.', 'Қаз.', 'Қар.', 'Жел.'
    ],
    [
      'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
      'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша',
      'Желтоқсан'
    ]
  ],
  [
    ['б.з.д.', 'б.з.'], u,
    ['Біздің заманымызға дейін', 'біздің заманымыз']
  ],
  1, [6, 0], ['dd.MM.yy', 'y \'ж\'. dd MMM', 'y \'ж\'. d MMMM', 'y \'ж\'. d MMMM, EEEE'],
  ['HH:mm', 'HH:mm:ss', 'HH:mm:ss z', 'HH:mm:ss zzzz'], ['{1}, {0}', u, u, u],
  [',', ' ', ';', '%', '+', '-', 'E', '×', '‰', '∞', 'сан емес', ':'],
  ['#,##0.###', '#,##0%', '#,##0.00 ¤', '#E0'], '₸', 'Қазақстан теңгесі',
  {'JPY': ['JP¥', '¥'], 'KZT': ['₸'], 'RUB': ['₽'], 'THB': ['฿'], 'TWD': ['NT$']}, plural
];
