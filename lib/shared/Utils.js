'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trim2 = require('lodash/trim');

var _trim3 = _interopRequireDefault(_trim2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isNil2 = require('lodash/isNil');

var _isNil3 = _interopRequireDefault(_isNil2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _split2 = require('lodash/split');

var _split3 = _interopRequireDefault(_split2);

var _merge3 = require('lodash/merge');

var _merge4 = _interopRequireDefault(_merge3);

var _mobx = require('mobx');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
  Field Utils
*/
exports.default = {

  /**
   MobX Event (observe/intercept)
   */
  MOBXEvent: function MOBXEvent(_ref) {
    var _this = this;

    var _ref$path = _ref.path,
        path = _ref$path === undefined ? null : _ref$path,
        _ref$key = _ref.key,
        key = _ref$key === undefined ? 'value' : _ref$key,
        call = _ref.call,
        type = _ref.type;

    var $instance = this.select(path || this.path, null, null) || this;

    var $call = function $call(change) {
      return call.apply(null, [{
        change: change,
        form: _this.state.form,
        path: $instance.path || null,
        field: $instance.path ? $instance : null
      }]);
    };

    var fn = void 0;
    var ffn = void 0;

    if (type === 'observer') {
      fn = _mobx.observe;
      ffn = $instance.fields.observe;
    }

    if (type === 'interceptor') {
      // eslint-disable-next-line
      key = '$' + key;
      fn = _mobx.intercept;
      ffn = $instance.fields.intercept;
    }

    var $dkey = $instance.path ? key + '@' + $instance.path : key;

    (0, _merge4.default)(this.state.disposers[type], _defineProperty({}, $dkey, key === 'fields' ? ffn.apply(function (change) {
      return $call(change);
    }) : fn($instance, key, function (change) {
      return $call(change);
    })));
  },


  /**
   Disposer
   */
  dispose: function dispose(_ref2) {
    var type = _ref2.type,
        _ref2$key = _ref2.key,
        key = _ref2$key === undefined ? 'value' : _ref2$key,
        _ref2$path = _ref2.path,
        path = _ref2$path === undefined ? null : _ref2$path;

    var $path = _parser2.default.parsePath(_utils2.default.$try(path, this.path));
    // eslint-disable-next-line
    if (type === 'interceptor') key = '$' + key;
    this.state.disposers[type][key + '@' + $path].apply();
    delete this.state.disposers[type][key + '@' + $path];
  },


  /**
   Fields Selector
   */
  select: function select(path) {
    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var $path = _parser2.default.parsePath(path);

    var keys = (0, _split3.default)($path, '.');
    var head = (0, _head3.default)(keys);

    keys.shift();

    var $fields = (0, _isNil3.default)(fields) ? this.fields.get(head) : fields.get(head);

    var stop = false;
    (0, _each3.default)(keys, function ($key) {
      if (stop) return;
      if ((0, _isNil3.default)($fields)) {
        $fields = undefined;
        stop = true;
      } else {
        $fields = $fields.fields.get($key);
      }
    });

    if (isStrict) _utils2.default.throwError(path, $fields);

    return $fields;
  },


  /**
    Get Container
   */
  container: function container(path) {
    var $path = _parser2.default.parsePath(_utils2.default.$try(path, this.path));
    var cpath = (0, _trim3.default)($path.replace(new RegExp('[^./]+$'), ''), '.');

    if (!!this.path && (0, _isNil3.default)(path)) {
      return this.state.form.select(cpath, null, false);
    }

    return this.select(cpath, null, false);
  },


  /**
    Has Field
   */
  has: function has(path) {
    return this.fields.has(path);
  },


  /**
   Map Fields
  */
  map: function map(cb) {
    return this.fields.values().map(cb);
  },


  /**
   * Iterates deeply over fields and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, depth).
   *
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Array|Object} [fields=form.fields] fields to iterate over.
   * @param {number} [depth=1] The recursion depth for internal use.
   * @returns {Array} Returns [fields.values()] of input [fields] parameter.
   * @example
   *
   * JSON.stringify(form)
   * // => {
     *   "fields": {
     *     "state": {
     *       "fields": {
     *         "city": {
     *           "fields": { "places": {
     *                "fields": {},
     *                "key": "places", "path": "state.city.places", "$value": "NY Places"
     *              }
     *           },
     *           "key": "city", "path": "state.city", "$value": "New York"
     *         }
     *       },
     *       "key": "state", "path": "state", "$value": "USA"
     *     }
     *   }
     * }
   *
   * const data = {};
   * form.each(field => data[field.path] = field.value);
   * // => {
     *   "state": "USA",
     *   "state.city": "New York",
     *   "state.city.places": "NY Places"
     * }
   *
   */
  each: function each(iteratee) {
    var _this2 = this;

    var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var $fields = fields || this.fields;
    (0, _each3.default)($fields.values(), function (field, index) {
      iteratee(field, index, depth);

      if (field.fields.size !== 0) {
        _this2.each(iteratee, field.fields, depth + 1);
      }
    });
  }
};
module.exports = exports['default'];