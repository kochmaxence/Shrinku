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

  it('should still shrink an url when no adapter is set', function(done) {
    let shrinku = new Shrinku();
    shrinku.shrink(defaultOpts)
      .then((data) => {
        assert(data.url === defaultOpts.url);
        assert(data.hash !== undefined);

        return done();
      });
  });

  it('should register a first adapter and set it as default if there\'s none', function() {
    let shrinku = new Shrinku();
    let memoryAdapter = new Shrinku.Adapters.MemoryAdapter();

    shrinku.addAdapter('memory', memoryAdapter);
    assert.equal(shrinku.adapters.memory, memoryAdapter);
    assert.equal(shrinku.adapters.default, memoryAdapter);
  });

  it('should add an additional adapter and set it as default', function() {
    let shrinku = new Shrinku();
    let memoryAdapter = new Shrinku.Adapters.MemoryAdapter();
    let dumbAdapter = new Shrinku.Adapters.DumbAdapter();

    shrinku.addAdapter('memory', memoryAdapter);
    shrinku.addAdapter('dumb', dumbAdapter, { default: true });

    assert.equal(shrinku.adapters.default, dumbAdapter);
  });
});
