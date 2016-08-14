const shortid = require('shortid');

const DumbAdapter = require('./adapters/DumbAdapter');
const MemoryAdapter = require('./adapters/MemoryAdapter');
const AbstractAdapter = require('./adapters/AbstractAdapter');

const log = require('./logger');


/**
 * Shrinku
 * @example
 * const Shrinku = require('shrinku');
 * const shrinku = new Shrinku();
 */
class Shrinku {
  /**
   * Constructor
   * @param {object} [opts={}] options
   */
  constructor(opts) {
    this.opts = opts || {};
    this.adapters = {};

    log.info({ opts: opts }, 'Shrinku is initializing.');
  }

  /**
   * Returns basics adapters
   * @static
   */
  static get Adapters() {
    return {
      MemoryAdapter,
      DumbAdapter,
      AbstractAdapter,
    };
  }

  /**
   * Add an adapter to the list of available adapter.
   * The default adapter by default in every calls.
   * The first adapter registered is set as default.
   * @param {string} name    Internal name for the adapter. Must be unique.
   * @param {object} adapter Adapter instance. Must qualify with AbstractAdapter.
   * @param {objects} opts    Options used by shrinku.
   * @example
   * shrinku.addAdapter('memory', new Shrinku.Adapters.MemoryAdapter());
   * shrinku.addAdapter('dumb', new Shrinku.Adapters.DumbAdapter(), { default: true });
   */
  addAdapter(name, adapter, opts) {
    log.info({ adapterName: name, opts: opts }, `Adding new adapter. [${name}]`);

    if (name === 'default') {
      const err = new Error('Adapter name \'default\' is reserved.')
      log.warn(err);
      return Promise.reject(err);
    }

    if(adapter.name === '' && adapter.setAdapterName) {
      adapter.setAdapterName(name);
    }

    const adaptersLength = Object.keys(this.adapters).length;

    log.debug({ adaptersLength: adaptersLength });

    this.adapters[name] = adapter;

    if (!adaptersLength || opts.default) {
      log.info({adapterName: name}, `Adapter ${name} is set as default`);
      this.adapters.default = this.adapters[name];
    }

    return Promise.resolve(this.adapters[name]);
  }

  isUnique(opts) {
    if (!opts.unique) return Promise.resolve();

    log.debug({opts}, 'Checking for uniqueness.');

    return this.adapters.default.findByUrl(opts).then((result) => {
      if (result && result.url && result.hash) return Promise.resolve(result);
      return Promise.resolve();
    });
  }

  /**
   * Shorten an url, verify if it exists (opt-out) and save it (opt-out).
   * @param  {object} opts = {save: true, unique: true} Options object. opts.url is required.
   * @return {Promise}      Returns an object with url and hash on resolve.
   * @example
   * shrinku
   * 	.shrink({ url: 'http://domain.tld' })
   * 	.then((result) => console.log(result.hash, result.url));
   */
  shrink(opts = {}) {
    const options = Object.assign({}, {
      save: true,
      unique: true
    }, opts);

    if (!options.url) return reject(new Error('No opts.url specified.'));

    return this.isUnique(options).then((data) => {
      if (data) return Promise.resolve(data);

      options.hash = shortid.generate();

      if (options.save && Object.keys(this.adapters).length) {
        return this.adapters.default.save(options);
      }

      return Promise.resolve({ hash, url: options.url });
    });
  }

  /**
   * Get the corresponding data for a specified hash.
   * @param  {objects} opts = {} Options object. opts.hash is required.
   * @return {Promise}       Returns an object with url and hash on resolve.
   * @example
   * shrinku.unshrink({ hash: 'XXXXX' })
   * 	.then((result) => console.log(result.hash, result.url));
   */
  unshrink(opts = {}) {
    return new Promise((resolve, reject) => {
      if (!opts.hash) return reject(new Error('No opts.hash specified.'));

      return this.adapters.default.find({ hash: opts.hash }).then(resolve);
    });
  }
}

module.exports = Shrinku;
