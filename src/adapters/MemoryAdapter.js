class MemoryAdapter {
  constructor() {
    this.store = {};
  }

  findByUrl(opts = {}) {
    const data = Object.keys(this.store).filter((key) => this.store[key] === opts.url)[0];

    if (data) return Promise.resolve({ hash: data, url: opts.url });

    return Promise.reject(new Error('Not found.'));
  }

  findByHash(opts = {}) {
    const data = this.store[opts.hash];

    if (data) return Promise.resolve({ hash: opts.hash, url: data });

    return Promise.reject(new Error('Not found.'));
  }

  find(opts = {}) {
    if (opts.hash) return this.findByHash(opts);
    if (opts.url) return this.findByUrl(opts);

    return Promise.reject(new Error('No hash or url set.'));
  }

  save(opts = {}) {
    this.store[opts.hash] = opts.url;
    return Promise.resolve({ hash: opts.hash, url: opts.url });
  }
}

module.exports = MemoryAdapter;
