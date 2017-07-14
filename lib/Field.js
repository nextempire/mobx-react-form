'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prototypes = exports.default = undefined;

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _toString2 = require('lodash/toString');

var _toString3 = _interopRequireDefault(_toString2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _isDate2 = require('lodash/isDate');

var _isDate3 = _interopRequireDefault(_isDate2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isNaN2 = require('lodash/isNaN');

var _isNaN3 = _interopRequireDefault(_isNaN2);

var _toNumber2 = require('lodash/toNumber');

var _toNumber3 = _interopRequireDefault(_toNumber2);

var _split2 = require('lodash/split');

var _split3 = _interopRequireDefault(_split2);

var _endsWith2 = require('lodash/endsWith');

var _endsWith3 = _interopRequireDefault(_endsWith2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _desc2, _value2, _obj;

var _mobx = require('mobx');

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

var _utils = require('./utils');

var _parser = require('./parser');

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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Field = (_class = function (_Base) {
  _inherits(Field, _Base);

  function Field(_ref) {
    var key = _ref.key,
        path = _ref.path,
        _ref$data = _ref.data,
        data = _ref$data === undefined ? {} : _ref$data,
        _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props,
        _ref$update = _ref.update,
        update = _ref$update === undefined ? false : _ref$update,
        state = _ref.state;

    _classCallCheck(this, Field);

    var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this));

    _this.fields = _mobx.observable.map ? _mobx.observable.map({}) : (0, _mobx.asMap)({});
    _this.hasInitialNestedFields = false;
    _this.incremental = false;

    _this.noop = function () {};

    _this.$parser = function ($) {
      return $;
    };

    _this.$formatter = function ($) {
      return $;
    };

    _initDefineProp(_this, '$options', _descriptor, _this);

    _initDefineProp(_this, '$type', _descriptor2, _this);

    _initDefineProp(_this, '$value', _descriptor3, _this);

    _initDefineProp(_this, '$label', _descriptor4, _this);

    _initDefineProp(_this, '$placeholder', _descriptor5, _this);

    _initDefineProp(_this, '$default', _descriptor6, _this);

    _initDefineProp(_this, '$initial', _descriptor7, _this);

    _initDefineProp(_this, '$bindings', _descriptor8, _this);

    _initDefineProp(_this, '$extra', _descriptor9, _this);

    _initDefineProp(_this, '$related', _descriptor10, _this);

    _initDefineProp(_this, '$rules', _descriptor11, _this);

    _initDefineProp(_this, '$validators', _descriptor12, _this);

    _initDefineProp(_this, '$disabled', _descriptor13, _this);

    _initDefineProp(_this, '$focused', _descriptor14, _this);

    _initDefineProp(_this, '$touched', _descriptor15, _this);

    _initDefineProp(_this, '$changed', _descriptor16, _this);

    _initDefineProp(_this, '$submitting', _descriptor17, _this);

    _initDefineProp(_this, '$validating', _descriptor18, _this);

    _initDefineProp(_this, 'autoFocus', _descriptor19, _this);

    _initDefineProp(_this, 'showError', _descriptor20, _this);

    _initDefineProp(_this, 'errorSync', _descriptor21, _this);

    _initDefineProp(_this, 'errorAsync', _descriptor22, _this);

    _initDefineProp(_this, 'validationErrorStack', _descriptor23, _this);

    _initDefineProp(_this, 'validationFunctionsData', _descriptor24, _this);

    _initDefineProp(_this, 'validationAsyncData', _descriptor25, _this);

    _initDefineProp(_this, 'files', _descriptor26, _this);

    _this.sync = (0, _mobx.action)(function (e) {
      var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      _this.$changed = true;

      var $get = function $get($) {
        return (0, _utils.$isBool)($, _this.value) ? $.target.checked : $.target.value;
      };

      // assume "v" or "e" are the values
      if ((0, _isNil3.default)(e) || (0, _isNil3.default)(e.target)) {
        if (!(0, _isNil3.default)(v) && !(0, _isNil3.default)(v.target)) {
          v = $get(v); // eslint-disable-line
        }

        _this.value = (0, _utils.$try)(e, v);
        return;
      }

      if (!(0, _isNil3.default)(e.target)) {
        _this.value = $get(e);
        return;
      }

      _this.value = e;
    });
    _this.onChange = _this.sync;
    _this.onToggle = _this.sync;
    _this.onDrop = (0, _mobx.action)(function () {
      for (var _len = arguments.length, all = Array(_len), _key = 0; _key < _len; _key++) {
        all[_key] = arguments[_key];
      }

      var e = all[0];
      var files = null;

      if ((0, _utils.$isEvent)(e) && (0, _utils.$hasFiles)(e)) {
        files = (0, _map3.default)(e.target.files);
      }

      _this.files = files || all;
      _this.$onDrop.apply(_this, [_this]);
    });
    _this.onBlur = (0, _mobx.action)(function () {
      _this.$focused = false;
    });
    _this.onFocus = (0, _mobx.action)(function () {
      _this.$focused = true;
      _this.$touched = true;
    });


    _this.state = state;

    _this.setupField(key, path, data, props, update);
    _this.checkDVRValidationPlugin();
    _this.initNestedFields(data, update);

    _this.incremental = _this.hasIncrementalNestedFields !== 0;

    _this.debouncedValidation = (0, _debounce3.default)(_this.validate, _this.state.options.get('validationDebounceWait', _this), _this.state.options.get('validationDebounceOptions', _this));

    _this.observeValidation();

    _this.initMOBXEvent('observers');
    _this.initMOBXEvent('interceptors');
    return _this;
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  _createClass(Field, [{
    key: 'checkValidationErrors',
    get: function get() {
      return this.validationAsyncData.valid === false && !(0, _isEmpty3.default)(this.validationAsyncData) || !(0, _isEmpty3.default)(this.validationErrorStack) || (0, _isString3.default)(this.errorAsync) || (0, _isString3.default)(this.errorSync);
    }
  }, {
    key: 'value',
    get: function get() {
      return this.getComputedProp('value');
    },
    set: function set(newVal) {
      if (this.$value === newVal) return;
      // handle numbers
      if (this.state.options.get('autoParseNumbers', this) === true) {
        if ((0, _isNumber3.default)(this.$initial)) {
          if (!(0, _endsWith3.default)(newVal, '.') && !(0, _endsWith3.default)((0, _split3.default)(newVal, '.', 2)[1], '0')) {
            var numericVal = (0, _toNumber3.default)(newVal);
            if (!(0, _isString3.default)(numericVal) && !(0, _isNaN3.default)(numericVal)) {
              this.$value = numericVal;
              return;
            }
          }
        }
      }
      // handle parse value
      this.$value = newVal;
    }
  }, {
    key: 'initial',
    get: function get() {
      return this.getComputedProp('initial');
    },
    set: function set(val) {
      this.$initial = (0, _parser.parseFieldValue)(this.$parser, { separated: val });
    }
  }, {
    key: 'default',
    get: function get() {
      return this.getComputedProp('default');
    },
    set: function set(val) {
      this.$default = (0, _parser.parseFieldValue)(this.$parser, { separated: val });
    }
  }, {
    key: 'submitting',
    get: function get() {
      return (0, _mobx.toJS)(this.$submitting);
    }
  }, {
    key: 'validating',
    get: function get() {
      return (0, _mobx.toJS)(this.$validating);
    }
  }, {
    key: 'label',
    get: function get() {
      return (0, _parser.parseGetLabel)(this.$label);
    }
  }, {
    key: 'placeholder',
    get: function get() {
      return (0, _mobx.toJS)(this.$placeholder);
    }
  }, {
    key: 'extra',
    get: function get() {
      return (0, _mobx.toJS)(this.$extra);
    }
  }, {
    key: 'options',
    get: function get() {
      return (0, _mobx.toJS)(this.$options);
    }
  }, {
    key: 'bindings',
    get: function get() {
      return (0, _mobx.toJS)(this.$bindings);
    }
  }, {
    key: 'type',
    get: function get() {
      return (0, _mobx.toJS)(this.$type);
    }
  }, {
    key: 'related',
    get: function get() {
      return (0, _mobx.toJS)(this.$related);
    }
  }, {
    key: 'disabled',
    get: function get() {
      return (0, _mobx.toJS)(this.$disabled);
    }
  }, {
    key: 'rules',
    get: function get() {
      return (0, _mobx.toJS)(this.$rules);
    }
  }, {
    key: 'validators',
    get: function get() {
      return (0, _mobx.toJS)(this.$validators);
    }
  }, {
    key: 'error',
    get: function get() {
      if (this.showError === false) return null;
      return this.errorAsync || this.errorSync;
    }
  }, {
    key: 'hasError',
    get: function get() {
      return this.checkValidationErrors || this.check('hasError', true);
    }
  }, {
    key: 'isValid',
    get: function get() {
      return !this.checkValidationErrors && this.check('isValid', true);
    }
  }, {
    key: 'isDirty',
    get: function get() {
      return this.hasNestedFields ? this.check('isDirty', true) : !(0, _isEqual3.default)(this.$default, this.value);
    }
  }, {
    key: 'isPristine',
    get: function get() {
      return this.hasNestedFields ? this.check('isPristine', true) : (0, _isEqual3.default)(this.$default, this.value);
    }
  }, {
    key: 'isDefault',
    get: function get() {
      return this.hasNestedFields ? this.check('isDefault', true) : (0, _isEqual3.default)(this.$default, this.value);
    }
  }, {
    key: 'isEmpty',
    get: function get() {
      if (this.hasNestedFields) return this.check('isEmpty', true);
      if ((0, _isBoolean3.default)(this.value)) return !!this.$value;
      if ((0, _isNumber3.default)(this.value)) return false;
      if ((0, _isDate3.default)(this.value)) return false;
      return (0, _isEmpty3.default)(this.value);
    }
  }, {
    key: 'focused',
    get: function get() {
      return this.hasNestedFields ? this.check('focused', true) : this.$focused;
    }
  }, {
    key: 'touched',
    get: function get() {
      return this.hasNestedFields ? this.check('touched', true) : this.$touched;
    }
  }, {
    key: 'changed',
    get: function get() {
      return this.hasNestedFields ? this.check('changed', true) : this.$changed;
    }

    /* ------------------------------------------------------------------ */
    /* EVENTS HANDLERS */

  }]);

  return Field;
}(_Base3.default), (_descriptor = _applyDecoratedDescriptor(_class.prototype, '$options', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, '$type', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, '$value', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, '$label', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, '$placeholder', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, '$default', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, '$initial', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, '$bindings', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, '$extra', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, '$related', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, '$rules', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, '$validators', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, '$disabled', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, '$focused', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, '$touched', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, '$changed', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, '$submitting', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, '$validating', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'autoFocus', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'showError', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, 'errorSync', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, 'errorAsync', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, 'validationErrorStack', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, 'validationFunctionsData', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, 'validationAsyncData', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, 'files', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'checkValidationErrors', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'checkValidationErrors'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'value', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'value'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'initial', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'initial'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'default', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'default'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'submitting', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'submitting'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validating', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'validating'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'label', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'label'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'placeholder', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'placeholder'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'extra', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'extra'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'options', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'options'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bindings', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'bindings'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'type', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'type'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'related', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'related'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'disabled', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'disabled'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rules', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'rules'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'validators', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'validators'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'error', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'error'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'hasError', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'hasError'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isValid', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'isValid'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isDirty', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'isDirty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isPristine', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'isPristine'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isDefault', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'isDefault'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'isEmpty', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'isEmpty'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'focused', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'focused'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'touched', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'touched'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changed', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'changed'), _class.prototype)), _class);

/**
  Prototypes
*/

exports.default = Field;
var prototypes = exports.prototypes = (_obj = {
  setupField: function setupField($key, $path, $data, $props, update) {
    this.key = $key;
    this.path = $path;
    this.id = (0, _utils.makeId)(this.path);

    var isEmptyArray = (0, _has3.default)($data, 'fields') && (0, _isArray3.default)($data.fields);
    var checkArray = function checkArray(val) {
      return isEmptyArray ? [] : val;
    };

    var $options = $props.$options,
        $extra = $props.$extra,
        $value = $props.$value,
        $label = $props.$label,
        $placeholder = $props.$placeholder,
        $default = $props.$default,
        $initial = $props.$initial,
        $disabled = $props.$disabled,
        $bindings = $props.$bindings,
        $type = $props.$type,
        $related = $props.$related,
        $validators = $props.$validators,
        $rules = $props.$rules,
        $parse = $props.$parse,
        $format = $props.$format,
        $observers = $props.$observers,
        $interceptors = $props.$interceptors,
        $onDrop = $props.$onDrop,
        $onSubmit = $props.$onSubmit,
        $onClear = $props.$onClear,
        $onReset = $props.$onReset;

    // eslint-disable-next-line

    if ((0, _isNil3.default)($data)) $data = '';

    if ((0, _isPlainObject3.default)($data)) {
      var _$data = $data,
          options = _$data.options,
          extra = _$data.extra,
          value = _$data.value,
          name = _$data.name,
          label = _$data.label,
          placeholder = _$data.placeholder,
          disabled = _$data.disabled,
          bindings = _$data.bindings,
          type = _$data.type,
          related = _$data.related,
          validators = _$data.validators,
          rules = _$data.rules,
          parse = _$data.parse,
          format = _$data.format,
          observers = _$data.observers,
          interceptors = _$data.interceptors,
          onDrop = _$data.onDrop,
          onSubmit = _$data.onSubmit,
          onClear = _$data.onClear,
          onReset = _$data.onReset;


      this.$type = $type || type || 'text';
      this.$onDrop = $onDrop || onDrop || null;
      this.$onSubmit = $onSubmit || onSubmit || null;
      this.$onClear = $onClear || onClear || this.noop;
      this.$onReset = $onReset || onReset || this.noop;

      this.$parser = (0, _utils.$try)($parse, parse, this.$parser);
      this.$formatter = (0, _utils.$try)($format, format, this.$formatter);

      this.$initial = (0, _parser.parseFieldValue)(this.$parser, {
        isEmptyArray: isEmptyArray,
        type: this.type,
        unified: checkArray(value),
        separated: checkArray($initial),
        initial: checkArray($data.initial)
      });

      this.$default = (0, _parser.parseFieldValue)(this.$parser, {
        isEmptyArray: isEmptyArray,
        type: this.type,
        unified: update ? '' : checkArray($data.default),
        separated: checkArray($default),
        initial: checkArray(this.$initial)
      });

      this.name = (0, _toString3.default)(name || $key);
      this.$value = this.$initial;
      this.$label = $label || label || this.name;
      this.$placeholder = $placeholder || placeholder || '';
      this.$disabled = $disabled || disabled || false;
      this.$bindings = $bindings || bindings || 'default';
      this.$related = $related || related || [];
      this.$validators = (0, _mobx.toJS)($validators || validators || null);
      this.$rules = $rules || rules || null;
      this.$observers = $observers || observers || null;
      this.$interceptors = $interceptors || interceptors || null;
      this.$extra = $extra || extra || null;
      this.$options = $options || options || {};
      return;
    }

    /* The field IS the value here */
    this.name = (0, _toString3.default)($key);
    this.$type = $type || 'text';
    this.$onDrop = $onDrop || null;
    this.$onSubmit = $onSubmit || null;
    this.$onClear = $onClear || this.noop;
    this.$onReset = $onReset || this.noop;

    this.$parser = (0, _utils.$try)($parse, this.$parser);
    this.$formatter = (0, _utils.$try)($format, this.$formatter);

    this.$initial = (0, _parser.parseFieldValue)(this.$parser, {
      isEmptyArray: isEmptyArray,
      type: this.type,
      unified: checkArray($data),
      separated: checkArray($value)
    });

    this.$default = (0, _parser.parseFieldValue)(this.$parser, {
      isEmptyArray: isEmptyArray,
      type: this.type,
      unified: update ? '' : checkArray($data.default),
      separated: checkArray($default),
      initial: this.$initial
    });

    this.$value = this.$initial;
    this.$label = $label || this.name;
    this.$placeholder = $placeholder || '';
    this.$disabled = $disabled || false;
    this.$bindings = $bindings || 'default';
    this.$related = $related || [];
    this.$validators = (0, _mobx.toJS)($validators || null);
    this.$rules = $rules || null;
    this.$observers = $observers || null;
    this.$interceptors = $interceptors || null;
    this.$extra = $extra || null;
    this.$options = $options || {};
  },
  getComputedProp: function getComputedProp(key) {
    var _this2 = this;

    if (this.incremental || this.hasNestedFields) {
      var $val = key === 'value' ? this.get(key, false) : (0, _mobx.untracked)(function () {
        return _this2.get(key, false);
      });

      return !(0, _isEmpty3.default)($val) ? $val : [];
    }

    var val = this['$' + key];

    if ((0, _isArray3.default)(val) || (0, _mobx.isObservableArray)(val)) {
      return [].slice.call(val);
    }

    return (0, _mobx.toJS)(val);
  },
  checkDVRValidationPlugin: function checkDVRValidationPlugin() {
    var drivers = this.state.form.validator.drivers;
    if ((0, _isNil3.default)(drivers.dvr) && !(0, _isNil3.default)(this.rules)) {
      // eslint-disable-next-line
      console.warn('The DVR validation rules are defined', 'but no plugin provided (DVR). Field:', this.path);
    }
  },
  initNestedFields: function initNestedFields(field, update) {
    var fields = (0, _isNil3.default)(field) ? null : field.fields;
    if ((0, _isArray3.default)(fields)) this.hasInitialNestedFields = true;
    this.initFields({ fields: fields }, update);
  },
  invalidate: function invalidate(message) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (async === true) {
      this.errorAsync = message;
      return;
    }

    if ((0, _isArray3.default)(message)) {
      this.validationErrorStack = message;
      this.showErrors(true);
      return;
    }

    this.validationErrorStack.unshift(message);
    this.showErrors(true);
  },
  setValidationAsyncData: function setValidationAsyncData() {
    var valid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    this.validationAsyncData = { valid: valid, message: message };
  },
  resetValidation: function resetValidation() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.showError = true;
    this.errorSync = null;
    this.errorAsync = null;
    this.validationAsyncData = {};
    this.validationFunctionsData = [];
    this.validationErrorStack = [];
    if (deep) this.each(function (field) {
      return field.resetValidation();
    });
  },
  clear: function clear() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this.$touched = false;
    this.$changed = false;

    this.$value = (0, _parser.defaultClearValue)({ value: this.$value });
    this.files = undefined;

    this.showErrors(this.state.options.get('showErrorsOnClear', this));
    if (deep) this.each(function (field) {
      return field.clear(true, false);
    });

    if (call) {
      this.$onClear.apply(this, [{
        form: this.state.form,
        field: this
      }]);
    }
  },
  reset: function reset() {
    var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this.$touched = false;
    this.$changed = false;

    var useDefaultValue = this.$default !== this.$initial;
    if (useDefaultValue) this.value = this.$default;
    if (!useDefaultValue) this.value = this.$initial;
    this.files = undefined;

    this.showErrors(this.state.options.get('showErrorsOnReset', this));
    if (deep) this.each(function (field) {
      return field.reset(true, false);
    });

    if (call) {
      this.$onReset.apply(this, [{
        form: this.state.form,
        field: this
      }]);
    }
  },
  focus: function focus() {
    // eslint-disable-next-line
    this.state.form.each(function (field) {
      return field.autoFocus = false;
    });
    this.autoFocus = true;
  },
  showErrors: function showErrors() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.showError = show;
    this.errorSync = (0, _head3.default)(this.validationErrorStack);
    this.each(function (field) {
      return field.showErrors(show);
    });
  },
  showAsyncErrors: function showAsyncErrors() {
    if (this.validationAsyncData.valid === false) {
      this.errorAsync = this.validationAsyncData.message;
      return;
    }
    this.errorAsync = null;
  },
  observeValidation: function observeValidation(type) {
    var _this3 = this;

    var validateOnChange = this.state.options.get('validateOnChange', this);
    var showErrorsOnChange = this.state.options.get('showErrorsOnChange', this);
    var validateOnBlur = this.state.options.get('validateOnBlur', this);
    var showErrorsOnBlur = this.state.options.get('showErrorsOnBlur', this);

    if (type === 'onBlur' || validateOnBlur) {
      this.disposeValidationOnBlur = (0, _mobx.observe)(this, '$focused', function (_ref2) {
        var newValue = _ref2.newValue;
        return newValue === false && _this3.debouncedValidation({ showErrors: showErrorsOnBlur });
      });
    }

    if (type === 'onChange' || validateOnChange) {
      this.disposeValidationOnChange = (0, _mobx.observe)(this, '$value', function () {
        return _this3.debouncedValidation({ showErrors: showErrorsOnChange });
      });
    }
  },
  initMOBXEvent: function initMOBXEvent(type) {
    if (!(0, _isArray3.default)(this['$' + type])) return;

    var fn = void 0;
    if (type === 'observers') fn = this.observe;
    if (type === 'interceptors') fn = this.intercept;
    this['$' + type].map(function (obj) {
      return fn((0, _omit3.default)(obj, 'path'));
    });
  },
  bind: function bind() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return this.state.bindings.load(this, this.bindings, props);
  }
}, (_applyDecoratedDescriptor(_obj, 'setupField', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'setupField'), _obj), _applyDecoratedDescriptor(_obj, 'initNestedFields', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'initNestedFields'), _obj), _applyDecoratedDescriptor(_obj, 'invalidate', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'invalidate'), _obj), _applyDecoratedDescriptor(_obj, 'setValidationAsyncData', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'setValidationAsyncData'), _obj), _applyDecoratedDescriptor(_obj, 'resetValidation', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'resetValidation'), _obj), _applyDecoratedDescriptor(_obj, 'clear', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'clear'), _obj), _applyDecoratedDescriptor(_obj, 'reset', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'reset'), _obj), _applyDecoratedDescriptor(_obj, 'focus', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'focus'), _obj), _applyDecoratedDescriptor(_obj, 'showErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'showErrors'), _obj), _applyDecoratedDescriptor(_obj, 'showAsyncErrors', [_mobx.action], Object.getOwnPropertyDescriptor(_obj, 'showAsyncErrors'), _obj)), _obj);