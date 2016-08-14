const log = require('../logger');

class BaseStrategy {
  constructor(strategyName = '') {
    log.debug({ strategyName }, 'Initializing strategy');
    this.strategyName = strategyName;
    this.log = log;
  }

  shrink(adapters, opts) {
    log.debug({ adapters: Object.keys(adapters), opts}, `${this.strategyName}#shrink`);
  }

  unshrink(adapters, opts) {
    log.debug({ adapters: Object.keys(adapters), opts}, `${this.strategyName}#unshrink`);
  }
}

module.exports = BaseStrategy;
