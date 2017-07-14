'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor; // Vanilla JavaScript Functions
// Json Schema Validation Keywords


var _mobx = require('mobx');

var _utils = require('./utils');

var _VJF = require('./validators/VJF');

var _VJF2 = _interopRequireDefault(_VJF);

var _SVK = require('./validators/SVK');

var _SVK2 = _interopRequireDefault(_SVK);

var _DVR = require('./validators/DVR');

var _DVR2 = _interopRequireDefault(_DVR);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

// Declarative Validation Rules

var Validator = (_class = function () {
  function Validator() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Validator);

    this.promises = [];
    this.form = {};
    this.options = {};
    this.schema = {};
    this.plugins = {
      vjf: true,
      dvr: false,
      svk: false
    };
    this.drivers = {
      vjf: null,
      dvr: null,
      svk: null
    };

    _initDefineProp(this, '$genericErrorMessage', _descriptor, this);

    this.assignInitData(obj);
    this.initializePlugins();
    this.checkSVKValidationPlugin();
  }

  _createClass(Validator, [{
    key: 'assignInitData',
    value: function assignInitData(_ref) {
      var form = _ref.form,
          _ref$options = _ref.options,
          options = _ref$options === undefined ? {} : _ref$options,
          _ref$plugins = _ref.plugins,
          plugins = _ref$plugins === undefined ? {} : _ref$plugins,
          _ref$schema = _ref.schema,
          schema = _ref$schema === undefined ? {} : _ref$schema;

      (0, _merge3.default)(this.plugins, plugins);
      this.form = form;
      this.options = options;
      this.schema = schema;
    }
  }, {
    key: 'initializePlugins',
    value: function initializePlugins() {
      var _this = this;

      (0, _map3.default)({
        vjf: _VJF2.default,
        dvr: _DVR2.default,
        svk: _SVK2.default
      }, function (Class, key) {
        return _this.plugins[key] && (_this.drivers[key] = new Class(_this.plugins[key], {
          schema: key === 'svk' ? _this.schema : null,
          promises: _this.promises,
          options: _this.options
        }));
      });
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var path = (0, _utils.$try)(opt.path, opt);
      var field = (0, _utils.$try)(opt.field, this.form.select(path, null, null));
      var related = (0, _utils.$try)(opt.related, obj.related, true);
      var showErrors = (0, _utils.$try)(opt.showErrors, obj.showErrors, false);
      var instance = field || this.form;
      instance.$validating = true;
      this.$genericErrorMessage = null;

      return new Promise(function (resolve) {
        // validate instance (form or filed)
        if (instance.path || (0, _isString3.default)(path)) {
          _this2.validateField({
            field: instance,
            showErrors: showErrors,
            related: related,
            path: path
          });
        }

        // validate nested fields
        instance.each(function ($field) {
          return _this2.validateField({
            path: $field.path,
            $field: $field,
            showErrors: showErrors,
            related: related
          });
        });

        // wait all promises then resolve
        return Promise.all(_this2.promises).then((0, _mobx.action)(function () {
          return instance.$validating = false;
        })) // eslint-disable-line
        .catch((0, _mobx.action)(function (err) {
          // eslint-disable-next-line
          instance.$validating = false;
          throw err;
        })).then(function () {
          return resolve(instance);
        });
      });
    }
  }, {
    key: 'validateField',
    value: function validateField(_ref2) {
      var _ref2$field = _ref2.field,
          field = _ref2$field === undefined ? null : _ref2$field,
          path = _ref2.path,
          _ref2$showErrors = _ref2.showErrors,
          showErrors = _ref2$showErrors === undefined ? false : _ref2$showErrors,
          _ref2$related = _ref2.related,
          related = _ref2$related === undefined ? false : _ref2$related;

      var $field = field || this.form.select(path);
      // reset field validation
      $field.resetValidation();
      // get all validators
      var _drivers = this.drivers,
          svk = _drivers.svk,
          dvr = _drivers.dvr,
          vjf = _drivers.vjf;
      // validate with vanilla js functions (vjf)

      if (vjf) vjf.validateField($field, this.form);
      // validate with json schema validation keywords (dvr)
      if (dvr) dvr.validateField($field, this.form);
      // validate with json schema validation keywords (svk)
      if (svk) svk.validateField($field);
      // send error to the view
      $field.showErrors(showErrors);
      // related validation
      if (related) this.relatedFieldValidation($field, showErrors);
    }

    /**
      Validate 'related' fields if specified
      and related validation allowed (recursive)
    */

  }, {
    key: 'relatedFieldValidation',
    value: function relatedFieldValidation(field, showErrors) {
      var _this3 = this;

      if (!field.related || !field.related.length) return;

      (0, _each3.default)(field.related, function (path) {
        return _this3.validateField({ path: path, showErrors: showErrors, related: false });
      });
    }
  }, {
    key: 'getDefaultErrorMessage',
    value: function getDefaultErrorMessage() {
      // set defaultGenericError message from options
      var $default = this.options.get('defaultGenericError');
      if ((0, _isString3.default)($default)) return $default;
      return 'The form is invalid';
    }
  }, {
    key: 'invalidate',
    value: function invalidate() {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // set custom genericErrorMessage if provided
      if ((0, _isString3.default)(message)) {
        this.$genericErrorMessage = message;
        return;
      }
      // if no string provided, show default error.
      this.$genericErrorMessage = this.getDefaultErrorMessage();
    }
  }, {
    key: 'checkSVKValidationPlugin',
    value: function checkSVKValidationPlugin() {
      if ((0, _isNil3.default)(this.drivers.svk) && !(0, _isEmpty3.default)(this.schema)) {
        // eslint-disable-next-line
        console.warn('The SVK validation schema is defined', 'but no plugin provided (SVK).');
      }
    }
  }, {
    key: 'genericErrorMessage',
    get: function get() {
      return this.options.get('alwaysShowDefaultError') ? this.$genericErrorMessage || this.options.get('defaultGenericError') : this.$genericErrorMessage;
    }
  }]);

  return Validator;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, '$genericErrorMessage', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class.prototype, 'validate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'validate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validateField', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'validateField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'genericErrorMessage', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'genericErrorMessage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'invalidate', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'invalidate'), _class.prototype)), _class);
exports.default = Validator;
module.exports = exports['default'];