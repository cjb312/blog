"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (content) {
  var loaderOpts = _loaderUtils2.default.getOptions(this) || {};

  var cb = this.async();

  Promise.resolve(String(content)).then(optimize(loaderOpts.svgo)).then(transform({ jsx: loaderOpts.jsx })).then(function (result) {
    return cb(null, result.code);
  }).catch(function (err) {
    return cb(err);
  });
};

var _svgo = require("svgo");

var _svgo2 = _interopRequireDefault(_svgo);

var _babelCore = require("babel-core");

var _loaderUtils = require("loader-utils");

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _svgo3 = require("./svgo");

var _babelPluginReactSvg = require("babel-plugin-react-svg");

var _babelPluginReactSvg2 = _interopRequireDefault(_babelPluginReactSvg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SVGO Optimize
function optimize() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  (0, _svgo3.validateAndFix)(opts);
  var svgo = new _svgo2.default(opts);

  return function (content) {
    return new Promise(function (resolve, reject) {
      return svgo.optimize(content, function (_ref) {
        var error = _ref.error,
            data = _ref.data;
        return error ? reject(error) : resolve(data);
      });
    });
  };
}

// Babel Transform
function transform(_ref2) {
  var _ref2$jsx = _ref2.jsx,
      jsx = _ref2$jsx === undefined ? false : _ref2$jsx;

  return function (content) {
    return (0, _babelCore.transform)(content, {
      babelrc: false,
      presets: [jsx ? void 0 : "react"].filter(Boolean),
      plugins: ["syntax-jsx", "transform-object-rest-spread", _babelPluginReactSvg2.default]
    });
  };
}
module.exports = exports["default"];