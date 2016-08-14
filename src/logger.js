const bunyan = require('bunyan');
const logger = bunyan.createLogger({
  name: process.env.SHRINKU_NAME || 'shrinku',
  level: process.env.SHRINKU_DEBUG || 'info'
});

module.exports = logger;
