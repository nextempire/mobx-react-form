'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _startsWith2 = require('lodash/startsWith');

var _startsWith3 = _interopRequireDefault(_startsWith2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _every2 = require('lodash/every');

var _every3 = _interopRequireDefault(_every2);

var _split2 = require('lodash/split');

var _split3 = _interopRequireDefault(_split2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _last2 = require('lodash/last');

var _last3 = _interopRequireDefault(_last2);

var _trimEnd2 = require('lodash/trimEnd');

var _trimEnd3 = _interopRequireDefault(_trimEnd2);

var _endsWith2 = require('lodash/endsWith');

var _endsWith3 = _interopRequireDefault(_endsWith2);

var _reduceRight2 = require('lodash/reduceRight');

var _reduceRight3 = _interopRequireDefault(_reduceRight2);

var _without2 = require('lodash/without');

var _without3 = _interopRequireDefault(_without2);

var _values2 = require('lodash/values');

var _values3 = _interopRequireDefault(_values2);

var _parseInt2 = require('lodash/parseInt');

var _parseInt3 = _interopRequireDefault(_parseInt2);

var _isInteger2 = require('lodash/isInteger');

var _isInteger3 = _interopRequireDefault(_isInteger2);

var _replace2 = require('lodash/replace');

var _replace3 = _interopRequireDefault(_replace2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isDate2 = require('lodash/isDate');

var _isDate3 = _interopRequireDefault(_isDate2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultClearValue = function defaultClearValue(_ref) {
  var value = _ref.value;

  if ((0, _isArray3.default)(value)) return [];
  if ((0, _isDate3.default)(value)) return null;
  if ((0, _isBoolean3.default)(value)) return false;
  if ((0, _isNumber3.default)(value)) return 0;
  if ((0, _isString3.default)(value)) return '';
  return undefined;
};

var defaultValue = function defaultValue(_ref2) {
  var type = _ref2.type,
      _ref2$isEmptyArray = _ref2.isEmptyArray,
      isEmptyArray = _ref2$isEmptyArray === undefined ? false : _ref2$isEmptyArray;

  if (type === 'date') return null;
  if (type === 'checkbox') return false;
  if (type === 'number') return 0;
  return isEmptyArray ? [] : '';
};

var parsePath = function parsePath(path) {
  var $path = path;
  $path = (0, _replace3.default)($path, new RegExp('\\[', 'g'), '.');
  $path = (0, _replace3.default)($path, new RegExp('\\]', 'g'), '');
  return $path;
};

var parseFieldValue = function parseFieldValue(parser, _ref3) {
  var type = _ref3.type,
      isEmptyArray = _ref3.isEmptyArray,
      separated = _ref3.separated,
      unified = _ref3.unified,
      initial = _ref3.initial;
  return parser(_utils2.default.$try(separated, unified, initial, defaultValue({ type: type, isEmptyArray: isEmptyArray })));
};

// make integers labels empty
var parseGetLabel = function parseGetLabel(label) {
  return (0, _isInteger3.default)((0, _parseInt3.default)(label)) ? '' : label;
};

var parseArrayProp = function parseArrayProp($val, $prop) {
  var $values = (0, _values3.default)($val);
  if ($prop === 'value' || $prop === 'initial' || $prop === 'default') {
    return (0, _without3.default)($values, null, undefined, '');
  }
  return $values;
};

var parseCheckArray = function parseCheckArray(field, value, prop) {
  return field.hasIncrementalNestedFields ? parseArrayProp(value, prop) : value;
};

var parseCheckFormatter = function parseCheckFormatter($field, $prop) {
  return $prop === 'value' ? $field.$formatter($field[$prop]) : $field[$prop];
};

var defineFieldsFromStruct = function defineFieldsFromStruct(struct) {
  var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (0, _reduceRight3.default)(struct, function ($, name) {
    var obj = {};
    if ((0, _endsWith3.default)(name, '[]')) {
      var val = add ? [$] : [];
      obj[(0, _trimEnd3.default)(name, '[]')] = val;
      return obj;
    }
    // no brakets
    var prev = struct[struct.indexOf(name) - 1];
    var stop = (0, _endsWith3.default)(prev, '[]') && (0, _last3.default)(struct) === name;
    if (!add && stop) return obj;
    obj[name] = $;
    return obj;
  }, {});
};

var handleFieldsValuesFallback = function handleFieldsValuesFallback(fields, initial) {
  if (!(0, _has3.default)(initial, 'values')) return fields;
  // if the 'fields' object is not provided into the constructor
  // and the 'values' object is passed, use it to create fields
  return (0, _merge3.default)(fields, initial.values);
};

var handleFieldsArrayOfStrings = function handleFieldsArrayOfStrings($fields) {
  var add = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var fields = $fields;
  // handle array with field struct (strings)
  if (_utils2.default.isStruct({ fields: fields })) {
    fields = (0, _reduce3.default)(fields, function ($obj, $) {
      var pathStruct = (0, _split3.default)($, '.');
      // as array of strings (with empty values)
      if (!pathStruct.length) return Object.assign($obj, _defineProperty({}, $, ''));
      // define flat or nested fields from pathStruct
      return (0, _merge3.default)($obj, defineFieldsFromStruct(pathStruct, add));
    }, {});
  }
  return fields;
};

var handleFieldsArrayOfObjects = function handleFieldsArrayOfObjects($fields) {
  var fields = $fields;
  // handle array of objects (with unified props)
  if ((0, _isArray3.default)(fields) && (0, _every3.default)(fields, _isPlainObject3.default)) {
    fields = (0, _reduce3.default)(fields, function ($obj, $) {
      if (!(0, _has3.default)($, 'name')) return undefined;
      return Object.assign($obj, _defineProperty({}, $.name, $));
    }, {});
  }
  return fields;
};

var handleFieldsNested = function handleFieldsNested(fields, initial, strictProps) {
  return (0, _reduce3.default)(fields, function (obj, field, key) {
    if (_utils2.default.allowNested(field, strictProps)) {
      // define nested field
      return Object.assign(obj, _defineProperty({}, key, { fields: _utils2.default.isEmptyArray(field) ? [] : handleFieldsNested(field) }));
    }
    return Object.assign(obj, _defineProperty({}, key, field));
  }, {});
};

var mergeSchemaDefaults = function mergeSchemaDefaults(fields, validator) {
  if (validator) {
    var properties = validator.schema.properties;
    if ((0, _isEmpty3.default)(fields) && !!properties) {
      (0, _each3.default)(properties, function (prop, key) {
        (0, _set3.default)(fields, key, {
          value: prop.default,
          label: prop.title
        });
      });
    }
  }
  return fields;
};

var prepareFieldsData = function prepareFieldsData(initial) {
  var strictProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var fields = initial.fields || {};
  fields = handleFieldsArrayOfStrings(fields, false);
  fields = handleFieldsArrayOfObjects(fields);
  fields = handleFieldsValuesFallback(fields, initial);
  fields = handleFieldsNested(fields, initial, strictProps);
  return fields;
};

var pathToFieldsTree = function pathToFieldsTree(struct, path) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var add = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var structPath = _utils2.default.pathToStruct(path);
  var structArray = (0, _filter3.default)(struct, function (item) {
    return (0, _startsWith3.default)(item, structPath);
  });
  var $tree = handleFieldsArrayOfStrings(structArray, add);
  var $struct = (0, _replace3.default)(structPath, new RegExp('\\[]', 'g'), '[' + n + ']');
  return handleFieldsNested((0, _get3.default)($tree, $struct));
};

exports.default = {
  defaultValue: defaultValue,
  defaultClearValue: defaultClearValue,
  parseFieldValue: parseFieldValue,
  parsePath: parsePath,
  parseGetLabel: parseGetLabel,
  parseArrayProp: parseArrayProp,
  parseCheckArray: parseCheckArray,
  parseCheckFormatter: parseCheckFormatter,
  mergeSchemaDefaults: mergeSchemaDefaults,
  handleFieldsNested: handleFieldsNested,
  handleFieldsArrayOfStrings: handleFieldsArrayOfStrings,
  prepareFieldsData: prepareFieldsData,
  pathToFieldsTree: pathToFieldsTree
};
module.exports = exports['default'];