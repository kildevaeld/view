"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol") { _typeof = function (_typeof2) { function _typeof(_x) { return _typeof2.apply(this, arguments); } _typeof.toString = function () { return _typeof2.toString(); }; return _typeof; }(function (obj) { return _typeof(obj); }); } else { _typeof = function (_typeof3) { function _typeof(_x2) { return _typeof3.apply(this, arguments); } _typeof.toString = function () { return _typeof3.toString(); }; return _typeof; }(function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj); }); } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var base_view_1 = require("../base-view");

var utils_1 = require("../utils");

var types_1 = require("../types");

function withAttachedViews(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      var _ref;

      var _this;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));
      if (_this.views) _this._bindViews(_this.views);
      return _this;
    }

    _createClass(_class, [{
      key: "render",
      value: function render() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);

        this._renderViews(this.views);

        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.views) {
          this._unbindViews(this.views);
        }

        return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
      }
    }, {
      key: "_bindViews",
      value: function _bindViews(views) {
        var o = void 0;

        for (var key in views) {
          o = views[key];
          var view = types_1.Invoker.get(o.view);
          this[key] = view;
        }
      }
    }, {
      key: "_unbindViews",
      value: function _unbindViews(views) {
        var self = this;

        for (var key in views) {
          if (self[key] && self[key] instanceof base_view_1.BaseView) {
            self[key].destroy();
            self[key] = void 0;
          }
        }
      }
    }, {
      key: "_renderViews",
      value: function _renderViews(views) {
        var el = void 0,
            o = void 0;

        for (var key in views) {
          o = views[key];
          var sel = utils_1.normalizeUIString(o.selector, this._ui || {});
          el = this.el.querySelector(sel);
          if (!el && !o.optional) throw new ReferenceError("selector \"".concat(sel, "\" for view ").concat(o.view.name, " not found in dom")); // No element - return!

          if (!el) return;
          var view = this[key];
          if (!view) throw new ReferenceError("view \"".concat(o.view.name, "\" not mount"));
          view.el = el;
          view.render();
        }
      }
    }]);

    return _class;
  }(Base);
}

exports.withAttachedViews = withAttachedViews;