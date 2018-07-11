matchcase
======

`npm install @carc1n0gen/matchcase`

```js
const matchcase = require('matchcase');

const result = matchcase(someVariable)
  // You can use literal values for matching and result
  .case('foo', 'bar')
  // You canse use a predicate function for matching
  .case(x => x.endsWith('thing'), 'It ends with "thing"')
  // You can pass a function that accepts the matched value to calculate a result
  .case(5, x => x * x)
  .default('Default result');
  // Again, you can pass a function that accepts the original value to calculate a default result
  // .default(x => x * 2)
```