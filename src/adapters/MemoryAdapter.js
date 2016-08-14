const BaseAdapter = require('./BaseAdapter');

class MemoryAdapter extends BaseAdapter {
  constructor() {
    super();
    this.store = {};
  }

  findByUrl(opts = {}) {
    super.findByUrl(opts);

    const data = Object.keys(this.store).filter((key) => this.store[key] === opts.url)[0];

    if (data) {
      this.log.debug({ data: data }, `Found found in store ${this.adapterName}`);
      return Promise.resolve(data);
    }

    this.log.debug({ options: opts }, `Not found in store ${this.adapterName}`);
    return Promise.resolve();
  }

  findByHash(opts = {}) {
    super.findByHash(opts);

    const data = this.store[opts.hash];

    if (data) return Promise.resolve({ hash: opts.hash, url: data });

    return Promise.resolve();
  }

  find(opts = {}) {
    super.find(opts);

    if (opts.hash) return this.findByHash(opts);
    if (opts.url) return this.findByUrl(opts);

    return Promise.reject(new Error('No hash or url set.'));
  }

  save(opts = {}) {
    super.save(opts);

    this.store[opts.hash] = opts.url;
    return Promise.resolve({ hash: opts.hash, url: opts.url });
  }
}

module.exports = MemoryAdapter;
