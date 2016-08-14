const shortid = require('shortid');

const DumbAdapter = require('./adapters/DumbAdapter');
const MemoryAdapter = require('./adapters/MemoryAdapter');
const BaseAdapter = require('./adapters/BaseAdapter');

const BaseStrategy = require('./strategies/BaseStrategy');
const SimpleStrategy = require('./strategies/SimpleStrategy');

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

    this.strategy = null;

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
      BaseAdapter,
    };
  }

  static get Strategies() {
    return {
      BaseStrategy,
      SimpleStrategy
    };
  }

  useStrategy(strategy) {
    log.info({ strategyName: strategy.strategyName }, `Use strategy: ${strategy.strategyName}`);
    this.strategy = strategy;
  }

  /**
   * Add an adapter to the list of available adapter.
   * The default adapter by default in every calls.
   * The first adapter registered is set as default.
   * @param {string} name    Internal name for the adapter. Must be unique.
   * @param {object} adapter Adapter instance. Must qualify with BaseAdapter.
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
      hashGenerator: shortid
    }, opts);
    return this.strategy.shrink(this.adapters, options);
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
    return this.strategy.unshrink(this.adapters, opts);
  }
}

module.exports = Shrinku;
