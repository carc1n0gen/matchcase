/*

README
======

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

*/

const match = x => ({
  case: () => match(x),
  default: () => x
});

const matchcase = x => ({
  case: (test, result) => {
    if (test instanceof Function && result instanceof Function) {
      return test(x) ? match(result(x)) : matchcase(x);
    }
    if (test instanceof Function && !(result instanceof Function)) {
      return test(x) ? match(result) : matchcase(x);
    }
    if (!(test instanceof Function) && result instanceof Function) {
      return test === x ? match(result(x)) : matchcase(x);
    }
    return test === x ? match(result) : matchcase(x);
  },
  default: result => (result instanceof Function ? result(x) : result)
});

module.exports = matchcase;
