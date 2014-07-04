var util = require('util');


var TEMPLATE = '' +
  'window.__html__ = window.__html__ || {};\n' +
  'window.__html__[\'%s\'] = \'%s\'';

var escapeContent = function(content, linesToStrip) {

  linesToStrip.forEach(function(line) {
    content = content.replace(line, '');
  });

  return content.replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');

};

var createHtml2JsPreprocessor = function(args, options, logger, basePath) {
  var log = logger.create('preprocessor.html2jsStripLines');
  var linesToStrip = options && options.lines || [];

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var htmlPath = file.originalPath.replace(basePath + '/', '');

    file.path = file.path + '.js';
    done(util.format(TEMPLATE, htmlPath, escapeContent(content, linesToStrip)));
  };
};

createHtml2JsPreprocessor.$inject = ['args', 'config.html2jsStripLines', 'logger', 'config.basePath'];

module.exports = createHtml2JsPreprocessor;
