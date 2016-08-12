const shortid = require('shortid');

const DumbAdapter = require('./adapters/DumbAdapter');
const MemoryAdapter = require('./adapters/MemoryAdapter');

class Shrinku {
  constructor(opts) {
    this.opts = opts || {};
    this.adapters = {};
  }

  static get Adapters() {
    return {
      MemoryAdapter,
      DumbAdapter,
    };
  }

  addAdapter(name, adapter, opts) {
    if (name === 'default') {
      return Promise.reject(new Error('Name \'default\' is reserved.'));
    }

    const adaptersLength = Object.keys(this.adapters).length;

    this.adapters[name] = adapter;

    if (!adaptersLength || opts.default) {
      this.adapters.default = this.adapters[name];
    }

    return Promise.resolve(this.adapters[name]);
  }

  shrink(opts = {}) {
    const options = Object.assign({}, {
      save: true,
    }, opts);

    return new Promise((resolve, reject) => {
      if (!options.url) return reject(new Error('No opts.url specified.'));

      const hash = shortid.generate();

      if (options.save && Object.keys(this.adapters).length) {
        return this.adapters.default.save({
          url: options.url,
          hash,
        }).then(resolve);
      }

      return resolve({ hash, url: options.url });
    });
  }

  unshrink(opts = {}) {
    return new Promise((resolve, reject) => {
      if (!opts.hash) return reject(new Error('No opts.hash specified.'));

      return this.adapters.default.find({ hash: opts.hash }).then(resolve);
    });
  }
}

module.exports = Shrinku;
