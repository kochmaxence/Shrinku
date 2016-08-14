const BaseStrategy = require('./BaseStrategy');

class SimpleStrategy extends BaseStrategy {
  constructor() {
    super('SimpleStrategy');
  }

  isUnique(adapters, opts) {
    if (!opts.unique) return Promise.resolve();

    this.log.debug({opts}, 'Checking for uniqueness.');

    return adapters.default.findByUrl(opts).then((result) => {
      if (result && result.url && result.hash) return Promise.resolve(result);
      return Promise.resolve();
    });
  }

  shrink(adapters, opts) {
    super.shrink(adapters, opts);

    const options = Object.assign({}, {
      save: true,
      unique: true
    }, opts);

    if (!options.url) return Promise.reject(new Error('No opts.url specified.'));

    return this.isUnique(adapters, options).then((data) => {
      if (data) return Promise.resolve(data);

      options.hash = opts.hashGenerator.generate();

      if (options.save && Object.keys(adapters).length) {
        return adapters.default.save(options);
      }

      return Promise.resolve({ hash, url: options.url });
    });
  }

  unshrink(adapters, opts) {
    super.unshrink(adapters, opts);

    if (!opts.hash) return Promise.reject(new Error('No opts.hash specified.'));

    return adapters.default.find({ hash: opts.hash, unique: opts.unique || true });
  }
}

module.exports = SimpleStrategy;
