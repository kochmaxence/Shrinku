const AbstractAdapter = require('./AbstractAdapter');

class DumbAdapter extends AbstractAdapter {
  findByUrl(opts = {}) {
    super.findByUrl(opts);

    return Promise.resolve({ url: opts.url, hash: undefined });
  }
  findByHash(opts = {}) {
    super.findByHash(opts);

    return Promise.resolve({ url: undefined, hash: opts.hash });
  }

  find(opts = {}) {
    super.find(opts, true);

    return Promise.resolve({ url: opts.url, hash: opts.hash });
  }

  save(opts = {}) {
    super.save(opts);

    return Promise.resolve({ hash: opts.hash, url: opts.url });
  }
}

module.exports = DumbAdapter;
