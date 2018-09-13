'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isObject(v) {
  return v !== null && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' && Array.isArray(v) === false;
};

function isArray(v) {
  return Array.isArray(v);
}

var mapFilter = function mapFilter(_d, map, filter) {
  if (isArray(_d)) {
    //array
    var arr = _d;
    if (filter) arr = arr.filter(filter);
    if (map) arr = arr.map(map);
    return new TinySeq(arr);
  } else if (isObject(_d)) {
    //object
    var r = {};
    for (var k in _d) {
      if (filter && !filter(_d[k], k, _d)) continue;
      r[k] = map ? map(_d[k], k, _d) : _d[k];
    }
    return new TinySeq(r);
  }
  throw new Error('Unreachable');
};

var TinySeq = function () {
  function TinySeq(_d) {
    _classCallCheck(this, TinySeq);

    //so we can chain TinySeq
    if (_d && isObject(_d) && _d instanceof TinySeq && _d.toRaw) _d = _d.toRaw();
    this._d = _d;
  }

  _createClass(TinySeq, [{
    key: '_isObject',
    value: function _isObject() {
      return isObject(this._d);
    }
  }, {
    key: '_isArray',
    value: function _isArray() {
      return isArray(this._d);
    }
  }, {
    key: 'forEach',
    value: function forEach(f) {
      this.map(f);
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      if (this._isObject()) {
        return this._d;
      }
      var r = {};
      this.forEach(function (v, k) {
        r[k] = v;
      });
      return r;
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      if (this._isArray()) {
        return this._d;
      } else if (this._isObject()) {
        return Object.values(this._d);
      }
      throw new Error('Unreachable');
    }
  }, {
    key: 'first',
    value: function first() {
      if (this._isArray()) {
        return this._d[0];
      } else if (this._isObject()) {
        //object
        for (var k in this._d) {
          return _d[k];
        }
        return undefined;
      }

      throw new Error('Unreachable');
    }
  }, {
    key: 'filter',
    value: function filter(f) {
      return mapFilter(this._d, undefined, f);
    }
  }, {
    key: 'map',
    value: function map(f) {
      return mapFilter(this._d, f);
    }
  }, {
    key: 'toKeyed',
    value: function toKeyed() {
      return new TinySeq(this.toObject());
    }
  }, {
    key: 'toIndexed',
    value: function toIndexed() {
      return new TinySeq(this.toArray());
    }
  }, {
    key: 'isKeyed',
    value: function isKeyed() {
      return this._isObject();
    }
  }, {
    key: 'isIndexed',
    value: function isIndexed() {
      return this._isArray();
    }
  }, {
    key: 'toRaw',
    value: function toRaw() {
      return this._d;
    }
  }, {
    key: 'mapValues',
    value: function mapValues(f) {
      var ret = {};
      this.forEach(function (v, k) {
        var _f = f([k, v]),
            _f2 = _slicedToArray(_f, 2),
            newk = _f2[0],
            newv = _f2[1];

        ret[newk] = newv;
      });
      return new TinySeq(ret);
    }
  }, {
    key: 'size',
    value: function size() {
      if (this._isArray()) return this._d.length;else if (this._isObject()) return Object.keys(this._d).length;
      throw new Error('Unreachable');
    }
  }, {
    key: 'concat',
    value: function concat() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args = new TinySeq(args).map(function (e) {
        return createSeq(e);
      }).toArray();

      var indexed = args.reduce(function (prev, cur) {
        return prev && cur.isIndexed();
      }, this.isIndexed());

      if (indexed) {
        var d = this.toArray();
        args.forEach(function (e) {
          d = d.concat(e.toArray());
        });
        return new TinySeq(d);
      } else {
        var _d2 = {};
        var addEls = function addEls(e, k) {
          _d2[k] = e;
        };
        this.forEach(addEls);
        args.forEach(function (e) {
          return e.forEach(addEls);
        });
        return new TinySeq(_d2);
      }
    }
  }]);

  return TinySeq;
}();

;

function createSeq(_d) {
  if (_d && isObject(_d) && _d !== null && _d instanceof TinySeq) return _d;
  return new TinySeq(_d);
}
createSeq.class = TinySeq;

function isSeq(e) {
  return e instanceof TinySeq;
}

exports.default = createSeq;
exports.isObject = isObject;
exports.isSeq = isSeq;