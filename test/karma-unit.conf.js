// Karma configuration

var shared = require('./karma-shared.conf');

module.exports = function (config) {
  shared(config);

  config.files = shared.files.concat([
    'bower_components/angular-mocks/index.js',
    'test/unit/*.spec.js'
  ]);

  config.browsers = ['PhantomJS'];
};
