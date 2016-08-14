const log = require('../logger');

class BaseStrategy {
  constructor(strategyName) {
    log.debug({ strategyName }, 'Initializing strategy');
    this.strategyName = strategyName;
    this.log = log;
  }

  query(adapters, opts) {
    log.debug({ adapters: Object.keys(adapters), opts}, `${this.strategyName}#query`);
  }
}

module.exports = BaseStrategy;
