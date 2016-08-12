'use strict';

class DumbAdapter {
  findByUrl(opts = {}) {
    return Promise.resolve({ url: opts.url, hash: undefined });
  }
  findByHash(opts = {}) {
    return Promise.resolve({ url: undefined, hash: opts.hash });
  }

  find(opts = {}) {
    if(opts.hash) return this.findByHash(opts);
    if(opts.url) return this.findByUrl(opts);

    return Promise.resolve({ url: opts.url, hash: opts.hash });
  }

  save(opts = {}) {
    return Promise.resolve({ hash: opts.hash, url: opts.url });
  }
}

module.exports = DumbAdapter;
