'use strict';

const shortid = require('shortid');

class Shrinku {
  constructor(opts) {
    this.opts = opts || {};
    this.adapters = {};
  }

  static get Adapters() {
    return {
      MemoryAdapter: require('./adapters/MemoryAdapter')
    };
  }

  addAdapter(name, adapter, opts) {
    if(name === 'default')
      return Promise.reject(new Error('Name \'default\' is reserved.'));

    let adaptersLength = Object.keys(this.adapters).length;

    this.adapters[name] = adapter;

    if(!adaptersLength || opts.default) {
      this.adapters['default'] = this.adapters[name];
    }

    return Promise.resolve(this.adapters[name]);
  }

  shrink(opts = {}) {
    opts = Object.assign({}, {
      save: true,
    }, opts);
    return new Promise((resolve, reject) => {
      if(!opts.url) return reject(new Error('No opts.url specified.'));

      let hash = shortid.generate();

      if(opts.save && Object.keys(this.adapters).length) {
        return this.adapters['default'].save({
          url: opts.url,
          hash: hash
        }).then(resolve);
      }

      return resolve({ hash: hash, url: opts.url });
    });
  }

  unshrink(opts = {}) {
    return new Promise((resolve, reject) => {
      if(!opts.hash) return reject(new Error('No opts.hash specified.'));

      return this.adapters['default'].find({ hash: opts.hash }).then(resolve);

    });
  }
}

module.exports = Shrinku;
