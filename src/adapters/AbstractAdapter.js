const log = require('../logger');

/**
 * Adapter Interface
 * @interface
 */
class AbstractAdapter {
  constructor(opts = {}) {
    log.debug({opts}, `${this.adapterName}#constructor`);

    this.log = log;
    this.opts = opts;
    this.adapterName = '';
  }

  setAdapterName(name = '') {
    this.adapterName = name;
  }

  /**
   * Search the store using an URL.
   * @return {Promise} Resolve with the shorturl object. Reject with error.
   * @example
   * adapter.findByUrl({ url: 'http://domain.tld' });
   */
  findByUrl(opts = {}) {
    log.debug({opts}, `${this.adapterName}#findByUrl`);
  }

  /**
   * Search the store using a hash.
   * @return {Promise} Resolve with the shorturl object. Reject with error.
   * @example
   * adapter.findByHash({ hash: 'XXXXX' });
   */
  findByHash(opts = {}) {
    log.debug({opts}, `${this.adapterName}#findByHash`);
  }

  /**
   * Convenience method. Dispatch to findByUrl or findByHash.
   * If an hash is specified, it has priority over URL (depends on adapter implementation)
   * @return {Promise} Resolve with the shorturl object. Reject with error.
   * @example
   * adapter.find({ hash: 'XXXX' });
   * adapter.find({ url: 'http://domain.tld' });
   * adapter.find({ url: 'http://domain.tld', hash: 'XXXX' });
   */
  find(opts = {}, dispatch = false) {
    log.debug({opts, dispatch}, `${this.adapterName}#find`);
    if (opts.hash) return this.findByHash(opts);
    if (opts.url) return this.findByUrl(opts);
  }

  /**
   * Save the hash and url to the store.
   * @return {Promise} Resolve with the shorturl object. Reject with error.
   * @example
   * adapter.save({ url: 'http://domain.tld', hash: 'XXXXX'})
   */
  save(opts = {}) {
    log.debug({opts}, `${this.adapterName}#save`);
  }
}

module.exports = AbstractAdapter;
