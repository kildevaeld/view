(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.view = {})));
}(this, (function (exports) { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return _get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function callFunc(fn) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var l = fn.length,
      i = -1,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2],
      a4 = args[3];

  switch (args.length) {
    case 0:
      while (++i < l) {
        fn[i].handler.call(fn[i].ctx);
      }

      return;

    case 1:
      while (++i < l) {
        fn[i].handler.call(fn[i].ctx, a1);
      }

      return;

    case 2:
      while (++i < l) {
        fn[i].handler.call(fn[i].ctx, a1, a2);
      }

      return;

    case 3:
      while (++i < l) {
        fn[i].handler.call(fn[i].ctx, a1, a2, a3);
      }

      return;

    case 4:
      while (++i < l) {
        fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
      }

      return;

    default:
      while (++i < l) {
        fn[i].handler.apply(fn[i].ctx, args);
      }

      return;
  }
}
function result(obj, prop) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
  return obj[prop];
}
function getOption(option, objs) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    if (isObject(objs[i]) && objs[i][option]) return objs[i][option];
  }

  return undefined;
}
/**
 * Trigger an event on an object, if it's an eventemitter,
 * will also call an method "on<EventName>" if it's exists
 *
 * @export
 * @template T
 * @param {T} self
 * @param {string} eventName
 * @param {...any[]} args
 */

function triggerMethodOn(self, eventName) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  var ev = camelcase("on-" + eventName.replace(':', '-'));

  if (self[ev] && typeof self[ev] === 'function') {
    callFunc([{
      handler: self[ev],
      ctx: self
    }], args);
  }

  if (isFunction(self.trigger)) {
    args = [eventName].concat(args);
    callFunc([{
      handler: self.trigger,
      ctx: self
    }], args);
  }
}
function isObject(obj) {
  return obj === Object(obj);
}
function isFunction(a) {
  return typeof a === 'function';
}
function isString(a) {
  return typeof a === 'string';
}
function isElement(a) {
  return a instanceof Element;
}
function extend(obj) {
  if (!isObject(obj)) return obj;

  for (var i = 0, ii = arguments.length <= 1 ? 0 : arguments.length - 1; i < ii; i++) {
    var o = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
    if (!isObject(o)) continue;

    for (var k in o) {
      if (has(o, k)) obj[k] = o[k];
    }
  }

  return obj;
}
var _has = Object.prototype.hasOwnProperty;
function has(obj, prop) {
  return _has.call(obj, prop);
}
function camelcase(input) {
  return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
    return group1.toUpperCase();
  });
}

var idCounter = 0;
function uniqueId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return prefix + ++idCounter;
}
function indexOf(array, item) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === item) return i;
  }

  return -1;
} // Because IE/edge stinks!

var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};

var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
  var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
  return !!~indexOf(nodeList, this);
};

function matches(elm, selector) {
  return matchesSelector.call(elm, selector);
}
var kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;
function normalizeUIKeys(obj, uimap) {
  var o = {},
      k = void 0,
      v = void 0;

  for (k in obj) {
    v = obj[k];
    k = normalizeUIString(k, uimap);
    o[k] = v;
  }

  return o;
}
function normalizeUIString(str, uimap) {
  var ms = void 0,
      ui = void 0,
      sel = void 0;

  if ((ms = kUIRegExp.exec(str)) != null) {
    ui = ms[1], sel = uimap[ui];
    if (sel != null) str = str.replace(ms[0], sel);
  }

  return str;
}

var AbstractView = function () {
  function AbstractView() {
    _classCallCheck(this, AbstractView);
  }

  _createClass(AbstractView, [{
    key: "render",
    value: function render() {
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this;
    }
  }, {
    key: "el",
    get: function get() {
      return this._el;
    },
    set: function set(el) {
      this.setElement(el);
    }
  }]);
  return AbstractView;
}();

var debug = function debug() {}; //Debug("views");


var unbubblebles = 'focus blur change'.split(' ');

var BaseView = function (_AbstractView) {
  _inherits(BaseView, _AbstractView);

  function BaseView() {
    var _this;

    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BaseView);
    _this = _possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).call(this));
    _this._options = _options;

    _this.setElement(_options.el, false);

    _this._domEvents = [];
    _this._vid = uniqueId('vid');
    return _this;
  }

  _createClass(BaseView, [{
    key: "delegateEvents",
    value: function delegateEvents(events) {
      var _this2 = this;

      if (!this.el) return;

      this._bindUIElements();

      events = events || result(this, 'events') || {};
      events = normalizeUIKeys(events, this._ui);

      var triggers = this._configureTriggers();

      events = extend({}, events, triggers);
      if (!events) return this; //if (!(events || (events = result(this, 'events')))) return this;

      this.undelegateEvents();
      var dels = [];

      for (var key in events) {
        var methods = events[key];
        var match = key.match(/^(\S+)\s*(.*)$/);
        if (!Array.isArray(methods)) methods = [methods];

        for (var i = 0, ii = methods.length; i < ii; i++) {
          var method = methods[i];
          if (typeof method !== 'function') method = this[method]; // Set delegates immediately and defer event on this.el

          var boundFn = method.bind(this); // bind(<Function>method, this);

          if (match[2]) {
            this.delegate(match[1], match[2], boundFn);
          } else {
            dels.push([match[1], boundFn]);
          }
        }
      }

      dels.forEach(function (d) {
        _this2.delegate(d[0], d[1]);
      });
      return this;
    }
  }, {
    key: "undelegateEvents",
    value: function undelegateEvents() {
      if (!this.el) return this;

      this._unbindUIElements();

      if (this.el) {
        for (var i = 0, len = this._domEvents.length; i < len; i++) {
          var item = this._domEvents[i];
          this.el.removeEventListener(item.eventName, item.handler);
        }

        this._domEvents.length = 0;
      }

      return this;
    }
  }, {
    key: "delegate",
    value: function delegate(eventName, selector, listener) {
      if (!this.el) return this;

      if (typeof selector === 'function') {
        listener = selector;
        selector = undefined;
      }

      var root = this.el;
      var handler = selector ? function (e) {
        var node = e.target || e.srcElement; // Already handled

        if (e.delegateTarget) return;

        for (; node && node != root; node = node.parentNode) {
          if (node && matches(node, selector)) {
            e.delegateTarget = node;
            listener(e);
          }
        }
      } : function (e) {
        if (e.delegateTarget) return;
        listener(e);
      };
      var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
      this.el.addEventListener(eventName, handler, useCap);

      this._domEvents.push({
        eventName: eventName,
        handler: handler,
        listener: listener,
        selector: selector
      });

      return handler;
    }
  }, {
    key: "undelegate",
    value: function undelegate(eventName, selector, listener) {
      if (!this.el) return this;

      if (typeof selector === 'function') {
        listener = selector;
        selector = undefined;
      }

      if (this.el) {
        var handlers = this._domEvents.slice();

        for (var i = 0, len = handlers.length; i < len; i++) {
          var item = handlers[i];
          var match = item.eventName === eventName && (listener ? item.listener === listener : true) && (selector ? item.selector === selector : true);
          if (!match) continue;
          this.el.removeEventListener(item.eventName, item.handler);

          this._domEvents.splice(indexOf(handlers, item), 1);
        }
      }

      return this;
    }
  }, {
    key: "render",
    value: function render() {
      this.undelegateEvents();
      this.delegateEvents();
      return this;
    }
  }, {
    key: "setElement",
    value: function setElement(el) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (trigger) this.undelegateEvents();

      if (this.el && this.options.attachId) {
        this.el.removeAttribute('data-vid');
      }

      this._el = el;
      if (trigger) this.delegateEvents();

      if (this.el && this.options.attachId) {
        this.el.setAttribute('data-vid', this.vid);
      }

      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.undelegateEvents();

      if (this.el && this.options.attachId) {
        this.el.removeAttribute('data-vid');
      }

      _get(BaseView.prototype.__proto__ || Object.getPrototypeOf(BaseView.prototype), "destroy", this).call(this);
      return this;
    }
  }, {
    key: "_bindUIElements",
    value: function _bindUIElements() {
      var _this3 = this;

      var ui = this.ui;
      if (!ui) return;

      if (!this._ui) {
        this._ui = ui;
      }

      ui = this._ui;
      this.ui = {};
      Object.keys(ui).forEach(function (k) {
        var elm = _this3.el.querySelectorAll(ui[k]);

        if (elm && elm.length) {
          // unwrap if it's a nodelist.
          if (elm instanceof NodeList) {
            elm = elm[0];
          }

          debug('%s added ui element %s %s', _this3, k, ui[k]);
          _this3.ui[k] = elm;
        } else {
          debug('%s ui element not found ', _this3, k, ui[k]);
        }
      });
    }
  }, {
    key: "_unbindUIElements",
    value: function _unbindUIElements() {}
  }, {
    key: "_configureTriggers",
    value: function _configureTriggers() {
      var triggers = this.triggers || {};
      triggers = normalizeUIKeys(triggers, this._ui); // Configure the triggers, prevent default
      // action and stop propagation of DOM events

      var events = {},
          val = void 0,
          key = void 0;

      for (key in triggers) {
        val = triggers[key];
        events[key] = this._buildViewTrigger(val);
      }

      return events;
    }
  }, {
    key: "_buildViewTrigger",
    value: function _buildViewTrigger(triggerDef) {
      var _this4 = this;

      if (typeof triggerDef === 'string') triggerDef = {
        event: triggerDef
      };
      var options = extend({
        preventDefault: true,
        stopPropagation: true
      }, triggerDef);
      return function (e) {
        if (e) {
          if (e.preventDefault && options.preventDefault) {
            e.preventDefault();
          }

          if (e.stopPropagation && options.stopPropagation) {
            e.stopPropagation();
          }
        }

        triggerMethodOn(_this4, options.event, {
          view: _this4
        }, e);
      };
    }
  }, {
    key: "vid",
    get: function get() {
      return this._vid;
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    }
  }], [{
    key: "find",
    value: function find(selector, context) {
      return context.querySelectorAll(selector);
    }
  }]);
  return BaseView;
}(AbstractView);

var View = function (_BaseView) {
  _inherits(View, _BaseView);

  function View() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      attachId: true
    };
    _classCallCheck(this, View);
    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
  }

  return View;
}(BaseView);

exports.Invoker = {
  get: function get(V) {
    return Reflect.construct(V, []);
  }
};
function setInvoker(i) {
  exports.Invoker = i;
}

function attributes(attrs) {
  return function (target) {
    extend(target.prototype, attrs);
  };
}
function exports.event(eventName, selector) {
  return function (target, property, desc) {
    if (!desc) throw new Error('no description');

    if (typeof desc.value !== 'function') {
      throw new TypeError('must be a function');
    }

    var key = "".concat(eventName, " ").concat(selector);

    if (target.events && has(target.events, key)) {
      var old = target.events[key];
      if (!Array.isArray(old)) old = [old];
      old.push(property);
      target.events[key] = old;
    } else {
      target.events = extend(target.events || {}, _defineProperty({}, key, property));
    }
  };
}

(function (event) {
  function click(selector) {
    return event('click', selector);
  }

  event.click = click;

  function change(selector) {
    return event('change', selector);
  }

  event.change = change;
})(exports.event || (exports.event = {}));
/**
 * Mount a view on the target and bind matched element
 *
 * @export
 * @param {string} selector
 * @returns
 */


function attach(selector) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (target, prop) {
    var View = Reflect.getOwnMetadata("design:type", target, prop);
    if (!View) throw new Error("design:type does not exists for prop '".concat(prop, "' on '").concat(target, "'"));
    if (!target.views) target.views = {};
    target.views[prop] = {
      selector: selector,
      view: View,
      optional: typeof options.optional !== 'boolean' ? false : options.optional
    };
  };
}

var Controller = function (_AbstractView) {
  _inherits(Controller, _AbstractView);

  function Controller() {
    _classCallCheck(this, Controller);
    return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
  }

  _createClass(Controller, [{
    key: "setElement",
    value: function setElement(el) {
      this._el = el;
      return this;
    }
  }]);
  return Controller;
}(AbstractView);

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
          var view = exports.Invoker.get(o.view);
          this[key] = view;
        }
      }
    }, {
      key: "_unbindViews",
      value: function _unbindViews(views) {
        var self = this;

        for (var key in views) {
          if (self[key] && self[key] instanceof BaseView) {
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
          var sel = normalizeUIString(o.selector, this._ui || {});
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

function withElement(Base) {
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
      if (!_this.el) _this._ensureElement();
      return _this;
    }

    _createClass(_class, [{
      key: "_ensureElement",
      value: function _ensureElement() {
        if (this.el) return;
        var tagName = getOption('tagName', [this.options, this]) || 'div',
            className = getOption('className', [this.options, this]),
            attr = getOption('attributes', [this.options, this]),
            el = document.createElement(tagName);

        if (className) {
          // IE < 11 does not support multiple arguments in add/remove
          className.split(' ').map(function (m) {
            return m.trim();
          }).forEach(function (cl) {
            return el.classList.add(cl);
          });
        }

        if (attr) {
          for (var key in attr) {
            el.setAttribute(key, attr[key]);
          }
        }

        this.el = el;
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.el && this.el.parentNode) {
          if (typeof this.undelegateEvents === 'function') this.undelegateEvents();
          this.el.parentNode.removeChild(this.el);
          this.el = void 0;
        }

        return this;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);

        if (this.el && this.__created) {
          this.remove();
        }

        return this;
      }
    }]);
    return _class;
  }(Base);
}

function withTemplate(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);
      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "getTemplateData",
      value: function getTemplateData() {
        var data = result(this, 'model') || {};
        return data;
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.el) return this;
        if (isFunction(this.undelegateEvents)) this.undelegateEvents();
        this.renderTemplate();
        return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var data = this.getTemplateData();

        try {
          var template = result(this, 'template', data);
          if (template && this.el) this.el.innerHTML = '';
        } catch (e) {}

        return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
      }
    }, {
      key: "renderTemplate",
      value: function renderTemplate() {
        if (!this.el) return;
        var data = this.getTemplateData();
        var template = result(this, 'template', data);
        if (!template) return;
        if (isString(template)) this.el.innerHTML = template;else if (isElement(template)) {
          this.el.appendChild(template);
        } else {
          this.el.innerHTML = '';
        }
      }
    }]);
    return _class;
  }(Base);
}

exports.View = View;
exports.setInvoker = setInvoker;
exports.attributes = attributes;
exports.attach = attach;
exports.BaseView = BaseView;
exports.callFunc = callFunc;
exports.result = result;
exports.getOption = getOption;
exports.triggerMethodOn = triggerMethodOn;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isElement = isElement;
exports.extend = extend;
exports.has = has;
exports.camelcase = camelcase;
exports.uniqueId = uniqueId;
exports.indexOf = indexOf;
exports.matches = matches;
exports.normalizeUIKeys = normalizeUIKeys;
exports.normalizeUIString = normalizeUIString;
exports.AbstractView = AbstractView;
exports.Controller = Controller;
exports.withAttachedViews = withAttachedViews;
exports.withElement = withElement;
exports.withTemplate = withTemplate;

Object.defineProperty(exports, '__esModule', { value: true });

})));
