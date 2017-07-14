'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _max2 = require('lodash/max');

var _max3 = _interopRequireDefault(_max2);

var _isInteger2 = require('lodash/isInteger');

var _isInteger3 = _interopRequireDefault(_isInteger2);

var _ary2 = require('lodash/ary');

var _ary3 = _interopRequireDefault(_ary2);

var _isDate2 = require('lodash/isDate');

var _isDate3 = _interopRequireDefault(_isDate2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _keys2 = require('lodash/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _values2 = require('lodash/values');

var _values3 = _interopRequireDefault(_values2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _union2 = require('lodash/union');

var _union3 = _interopRequireDefault(_union2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _partial2 = require('lodash/partial');

var _partial3 = _interopRequireDefault(_partial2);

var _trimEnd2 = require('lodash/trimEnd');

var _trimEnd3 = _interopRequireDefault(_trimEnd2);

var _replace2 = require('lodash/replace');

var _replace3 = _interopRequireDefault(_replace2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _intersection2 = require('lodash/intersection');

var _intersection3 = _interopRequireDefault(_intersection2);

var _every2 = require('lodash/every');

var _every3 = _interopRequireDefault(_every2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var props = {
  booleans: ['hasError', 'isValid', 'isDirty', 'isPristine', 'isDefault', 'isEmpty', 'focused', 'touched', 'changed', 'disabled'],
  field: ['value', 'initial', 'default', 'label', 'placeholder', 'disabled', 'related', 'options', 'extra', 'bindings', 'type', 'error'],
  separated: ['values', 'initials', 'defaults', 'labels', 'placeholders', 'disabled', 'related', 'options', 'extra', 'bindings', 'types'],
  function: ['observers', 'interceptors', 'parse', 'format'],
  hooks: ['onDrop', 'onSubmit', 'onReset', 'onClear'],
  validation: ['rules', 'validators'],
  types: {
    isDirty: 'some',
    isValid: 'every',
    isPristine: 'every',
    isDefault: 'every',
    isEmpty: 'every',
    hasError: 'some',
    focused: 'some',
    touched: 'some',
    changed: 'some',
    disabled: 'every'
  }
};

var checkObserveItem = function checkObserveItem(change) {
  return function (_ref) {
    var key = _ref.key,
        to = _ref.to,
        type = _ref.type,
        exec = _ref.exec;
    return change.type === type && change.name === key && change.newValue === to && exec.apply(change, [change]);
  };
};

var checkObserve = function checkObserve(collection) {
  return function (change) {
    return collection.map(checkObserveItem(change));
  };
};

var checkPropType = function checkPropType(_ref2) {
  var type = _ref2.type,
      data = _ref2.data;

  var $check = void 0;
  switch (type) {
    case 'some':
      $check = function $check($data) {
        return (0, _some3.default)($data, Boolean);
      };break;
    case 'every':
      $check = function $check($data) {
        return (0, _every3.default)($data, Boolean);
      };break;
    default:
      $check = null;
  }
  return $check(data);
};

var hasProps = function hasProps($type, $data) {
  var $ = void 0;
  switch ($type) {
    case 'booleans':
      $ = props.booleans;break;
    case 'field':
      $ = [].concat(_toConsumableArray(props.field), _toConsumableArray(props.validation));break;
    case 'all':
      $ = ['id'].concat(_toConsumableArray(props.booleans), _toConsumableArray(props.field), _toConsumableArray(props.validation));break;
    default:
      $ = null;
  }
  return (0, _intersection3.default)($data, $).length > 0;
};

/**
  Check Allowed Properties
*/
var allowedProps = function allowedProps(type, data) {
  if (hasProps(type, data)) return;
  var $msg = 'The selected property is not allowed';
  throw new Error($msg + ' (' + JSON.stringify(data) + ')');
};

/**
  Throw Error if undefined Fields
*/
var throwError = function throwError(path, fields) {
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!(0, _isNil3.default)(fields)) return;
  var $msg = (0, _isNil3.default)(msg) ? 'The selected field is not defined' : msg;
  throw new Error($msg + ' (' + path + ')');
};

var pathToStruct = function pathToStruct(path) {
  var struct = void 0;
  struct = (0, _replace3.default)(path, new RegExp('[.]\\d+($|.)', 'g'), '[].');
  struct = (0, _replace3.default)(struct, '..', '.');
  struct = (0, _trimEnd3.default)(struct, '.');
  return struct;
};

var hasSome = function hasSome(obj, keys) {
  return (0, _some3.default)(keys, (0, _partial3.default)(_has3.default, obj));
};

var isPromise = function isPromise(obj) {
  return !!obj && typeof obj.then === 'function' && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function');
};

var isStruct = function isStruct(_ref3) {
  var fields = _ref3.fields;
  return (0, _isArray3.default)(fields) && (0, _every3.default)(fields, _isString3.default);
};

var isEmptyArray = function isEmptyArray(field) {
  return (0, _isEmpty3.default)(field) && (0, _isArray3.default)(field);
};

var $getKeys = function $getKeys(fields) {
  return (0, _union3.default)((0, _map3.default)((0, _values3.default)(fields), function (values) {
    return (0, _keys3.default)(values);
  })[0]);
};

var $checkKeys = function $checkKeys(keys) {
  return hasProps('field', keys) || hasProps('validation', keys) || hasProps('function', keys);
};

var hasUnifiedProps = function hasUnifiedProps(_ref4) {
  var fields = _ref4.fields;
  return !isStruct({ fields: fields }) && $checkKeys($getKeys(fields));
};

var hasSeparatedProps = function hasSeparatedProps(initial) {
  return hasSome(initial, props.separated) || hasSome(initial, props.validation);
};

var allowNested = function allowNested(field, strictProps) {
  return (0, _isObject3.default)(field) && !(0, _isDate3.default)(field) && !(0, _has3.default)(field, 'fields') && (!hasSome(field, props.field) || strictProps);
};

var parseIntKeys = function parseIntKeys(fields) {
  return (0, _map3.default)(fields.keys(), (0, _ary3.default)(parseInt, 1));
};

var hasIntKeys = function hasIntKeys(fields) {
  return (0, _every3.default)(parseIntKeys(fields), _isInteger3.default);
};

var maxKey = function maxKey(fields) {
  var max = (0, _max3.default)(parseIntKeys(fields));
  return (0, _isUndefined3.default)(max) ? 0 : max + 1;
};

var makeId = function makeId(path) {
  return (0, _uniqueId3.default)([(0, _replace3.default)(path, new RegExp('\\.', 'g'), '-'), '--'].join(''));
};

var $isEvent = function $isEvent(obj) {
  if ((0, _isNil3.default)(obj) || typeof Event === 'undefined') return false;
  return obj instanceof Event || !(0, _isNil3.default)(obj.target); // eslint-disable-line
};

var $hasFiles = function $hasFiles($) {
  return $.target.files && $.target.files.length !== 0;
};

var $isBool = function $isBool($, val) {
  return (0, _isBoolean3.default)(val) && (0, _isBoolean3.default)($.target.checked);
};

var $try = function $try() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var found = null;

  args.map(function (val) {
    return found === null && !(0, _isNil3.default)(val) && (found = val);
  });

  return found;
};

exports.default = {
  props: props,
  checkObserve: checkObserve,
  checkPropType: checkPropType,
  hasProps: hasProps,
  allowedProps: allowedProps,
  throwError: throwError,
  isPromise: isPromise,
  isStruct: isStruct,
  isEmptyArray: isEmptyArray,
  pathToStruct: pathToStruct,
  hasUnifiedProps: hasUnifiedProps,
  hasSeparatedProps: hasSeparatedProps,
  allowNested: allowNested,
  parseIntKeys: parseIntKeys,
  hasIntKeys: hasIntKeys,
  maxKey: maxKey,
  makeId: makeId,
  $isEvent: $isEvent,
  $hasFiles: $hasFiles,
  $isBool: $isBool,
  $try: $try
};
module.exports = exports['default'];