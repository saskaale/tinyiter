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
    return new Seq(arr);
  } else if (isObject(_d)) {
    //object
    var r = {};
    for (var k in _d) {
      if (filter && !filter(_d[k], k, _d)) continue;
      r[k] = map ? map(_d[k], k, _d) : _d[k];
    }
    return new Seq(r);
  }
  throw new Error('Unreachable');
};

var Seq = function () {
  function Seq(_d) {
    _classCallCheck(this, Seq);

    //so we can chain Seq
    if (_d && isObject(_d) && _d instanceof Seq && _d.toRaw) _d = _d.toRaw();
    this._d = _d;
  }

  _createClass(Seq, [{
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
      return new Seq(this.toObject());
    }
  }, {
    key: 'toIndexed',
    value: function toIndexed() {
      return new Seq(this.toArray());
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
      return new Seq(ret);
    }
  }, {
    key: Symbol.iterator,
    value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
      var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e, _e;

      return regeneratorRuntime.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this._isArray()) {
                _context.next = 29;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 4;
              _iterator = this._d[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 13;
                break;
              }

              e = _step.value;
              _context.next = 10;
              return e;

            case 10:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 13:
              _context.next = 19;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 19:
              _context.prev = 19;
              _context.prev = 20;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 22:
              _context.prev = 22;

              if (!_didIteratorError) {
                _context.next = 25;
                break;
              }

              throw _iteratorError;

            case 25:
              return _context.finish(22);

            case 26:
              return _context.finish(19);

            case 27:
              _context.next = 40;
              break;

            case 29:
              if (!this._isObject()) {
                _context.next = 39;
                break;
              }

              _context.t1 = regeneratorRuntime.keys(this._d);

            case 31:
              if ((_context.t2 = _context.t1()).done) {
                _context.next = 37;
                break;
              }

              _e = _context.t2.value;
              _context.next = 35;
              return this._d[_e];

            case 35:
              _context.next = 31;
              break;

            case 37:
              _context.next = 40;
              break;

            case 39:
              throw new Error('Unreachable');

            case 40:
            case 'end':
              return _context.stop();
          }
        }
      }, value, this, [[4, 15, 19, 27], [20,, 22, 26]]);
    })
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

      args = new Seq(args).map(function (e) {
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
        return new Seq(d);
      } else {
        var _d2 = {};
        var addEls = function addEls(e, k) {
          _d2[k] = e;
        };
        this.forEach(addEls);
        args.forEach(function (e) {
          return e.forEach(addEls);
        });
        return new Seq(_d2);
      }
    }
  }]);

  return Seq;
}();

;

function createSeq(_d) {
  if (_d && isObject(_d) && _d !== null && _d instanceof Seq) return _d;
  return new Seq(_d);
}
createSeq.class = Seq;

function isSeq(e) {
  return e instanceof Seq;
}

exports.default = createSeq;
exports.isObject = isObject;
exports.isSeq = isSeq;