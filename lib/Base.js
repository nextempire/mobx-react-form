'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _mobx = require('mobx');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Base = (_class = function () {
  function Base() {
    var _this = this;

    _classCallCheck(this, Base);

    this.intercept = function (opt) {
      return _this.MOBXEvent((0, _isFunction3.default)(opt) ? { type: 'interceptor', call: opt } : _extends({ type: 'interceptor' }, opt));
    };

    this.observe = function (opt) {
      return _this.MOBXEvent((0, _isFunction3.default)(opt) ? { type: 'observer', call: opt } : _extends({ type: 'observer' }, opt));
    };

    this.onClear = function (e) {
      e.preventDefault();
      _this.clear(true);
    };

    this.onReset = function (e) {
      e.preventDefault();
      _this.reset(true);
    };

    this.onSubmit = function (e) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      e.preventDefault();
      _this.submit(o);
    };

    this.onAdd = function (e, val) {
      e.preventDefault();
      _this.add((0, _utils.$isEvent)(val) ? null : val);
    };

    this.onDel = function (e, path) {
      e.preventDefault();
      _this.del((0, _utils.$isEvent)(path) ? _this.path : path);
    };
  }

  _createClass(Base, [{
    key: 'hasIncrementalNestedFields',
    get: function get() {
      return this.fields.size && (0, _utils.hasIntKeys)(this.fields);
    }
  }, {
    key: 'hasNestedFields',
    get: function get() {
      return this.hasInitialNestedFields || this.fields.size !== 0;
    }
  }, {
    key: 'size',
    get: function get() {
      return this.fields.size;
    }

    /**
     Interceptor
     */


    /**
     Observer
     */


    /**
      Event Handler: On Clear
    */


    /**
      Event Handler: On Reset
    */


    /**
      Event Handler: On Submit
     */


    /**
      Event Handler: On Add
    */


    /**
      Event Handler: On Del
    */

  }]);

  return Base;
}(), (_applyDecoratedDescriptor(_class.prototype, 'hasIncrementalNestedFields', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'hasIncrementalNestedFields'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasNestedFields', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'hasNestedFields'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'size', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'size'), _class.prototype)), _class);
exports.default = Base;
module.exports = exports['default'];