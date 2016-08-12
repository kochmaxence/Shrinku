const chai = require('chai');
const assert = chai.assert;

const Shrinku = require('../src/shrinku');

let defaultOpts = { url: 'http://google.com' };

context('Shrinku', function() {
  it('should have no adapters after initialization', function() {
    let shrinku = new Shrinku();
    let adaptersCount = Object.keys(shrinku.adapters).length;

    assert(adaptersCount === 0);
  });

  it('when no adapters set, it should still shrink an url', function(done) {
    let shrinku = new Shrinku();
    shrinku.shrink(defaultOpts)
      .then((data) => {
        assert(data.url === defaultOpts.url);
        assert(data.hash !== undefined);

        return done();
      });
  });
});
