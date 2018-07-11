const expect = require('chai').expect;
const matchcase = require('../');

describe('matchcase', () => {
  it('should not return result without a default', () => {
    const result = matchcase('foo')
      .case('foo', 'bar');

    expect(result).to.not.equal('bar');
    expect(result.case).to.exist;
    expect(result.default).to.exist;
  });

  it('should match result with literals', () => {
    const result = matchcase('foo')
      .case('foo', 'bar')
      .default('should not happen');

    expect(result).to.equal('bar');
  });

  it('should match result with predicate', () => {
    const result = matchcase('foo')
      .case(x => x.endsWith('oo'), true)
      .default('should not happen');

    expect(result).to.be.true;
  });

  it('should match with calculated result', () => {
    const result = matchcase(10)
      .case(10, x => x * 2)
      .default('should not happen');

    expect(result).to.equal(20);
  });

  it('should match with predicate and calculated result', () => {
    const result = matchcase(5)
      .case(x => x < 10, x => x * x)
      .default('should not happen');

    expect(result).to.equal(25);
  });

  it('should fall to default', () => {
    const result = matchcase('foobar')
      .case('barfoo')
      .default('DEFAULT');

    expect(result).to.equal('DEFAULT');
  });

  it('should fall to calculated default', () => {
    const result = matchcase('foobar')
      .case('barfoo')
      .default(x => x.toUpperCase());

    expect(result).to.equal('FOOBAR');
  });

  it('should not allow default before end', () => {
    let exception = null;
    try {
      matchcase('foobar')
        .default('DEFAULT')
        .case('barfoo');
    } catch (ex) {
      exception = ex;
    }

    expect(exception).to.not.equal(null);
    expect(exception.message).to.equal('matchcase(...).default(...).case is not a function');
  });
});
