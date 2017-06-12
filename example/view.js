(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["view"] = factory();
	else
		root["view"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
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
            }return;
        case 1:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1);
            }return;
        case 2:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2);
            }return;
        case 3:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
            }return;
        case 4:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
            }return;
        default:
            while (++i < l) {
                fn[i].handler.apply(fn[i].ctx, args);
            }return;
    }
}
exports.callFunc = callFunc;
function result(obj, prop) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
    return obj[prop];
}
exports.result = result;
function triggerMethodOn(self, eventName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
    }

    //var self: any = this;
    var ev = camelcase("on-" + eventName.replace(':', '-'));
    if (self[ev] && typeof self[ev] === 'function') {
        callFunc([{
            handler: self[ev],
            ctx: self
        }], args);
    }
    args = [eventName].concat(args);
    callFunc([{
        handler: self.trigger,
        ctx: self
    }], args);
}
exports.triggerMethodOn = triggerMethodOn;
function isObject(obj) {
    return obj === Object(obj);
}
exports.isObject = isObject;
function isFunction(a) {
    return typeof a === 'function';
}
exports.isFunction = isFunction;
function isString(a) {
    return typeof a === 'string';
}
exports.isString = isString;
function extend(obj) {
    if (!isObject(obj)) return obj;
    //let o, k

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var o = _step.value;

            if (!isObject(o)) continue;
            for (var k in o) {
                if (has(o, k)) obj[k] = o[k];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return obj;
}
exports.extend = extend;
var _has = Object.prototype.hasOwnProperty;
function has(obj, prop) {
    return _has.call(obj, prop);
}
exports.has = has;
function camelcase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (_, group1) {
        return group1.toUpperCase();
    });
}
exports.camelcase = camelcase;
;
// Bind a function to an object for ever and ever....
function bind(target, property, descriptor) {
    var fn = descriptor.value;
    if (!isFunction(fn)) {
        throw new TypeError("Can only bind functions");
    }
    var definingProperty = false;
    return {
        configurable: true,
        get: function get() {
            if (definingProperty || this === target.prototype || this.hasOwnProperty(property)) {
                return fn;
            }
            var boundFn = fn.bind(this);
            definingProperty = true;
            Object.defineProperty(this, property, {
                value: boundFn,
                configurable: true,
                writable: true
            });
            definingProperty = false;
            return boundFn;
        }
    };
}
exports.bind = bind;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var base_view_1 = __webpack_require__(2);
function ViewMountable(Base) {
    return function (_Base) {
        _inherits(_class, _Base);

        function _class() {
            var _ref;

            _classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));
        }

        _createClass(_class, [{
            key: "render",
            value: function render() {
                if (!this.el || !this._views) return this;
                this._unbindViews(this._views);
                _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
                this._bindViews(this._views);
                return this;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                if (this._views) {
                    this._unbindViews(this._views);
                }
                _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "destroy", this).call(this);
            }
        }, {
            key: "_bindViews",
            value: function _bindViews(views) {
                var el = void 0,
                    o = void 0;
                for (var key in views) {
                    o = views[key];
                    el = this.el.querySelector(o.selector);
                    if (!el) throw new Error("No selector " + o.selector + " in dom");
                    var _view = ViewMountable.Invoker.get(o.view);
                    _view.setElement(el, false);
                    this[key] = _view.render();
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
        }]);

        return _class;
    }(Base);
}
exports.ViewMountable = ViewMountable;
(function (ViewMountable) {
    ViewMountable.Invoker = {
        get: function get(V) {
            return new V();
        }
    };
})(ViewMountable = exports.ViewMountable || (exports.ViewMountable = {}));
function view(selector) {
    return function (target, prop) {
        var View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View) throw new Error('design:type does not exists');
        if (!target._views) target._views = {};
        //transient(View);
        target._views[prop] = {
            selector: selector,
            view: View
        };
    };
}
exports.view = view;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var abstract_view_1 = __webpack_require__(4);
//import * as Debug from 'debug';
var dom = __webpack_require__(8);
var debug = function debug() {}; //Debug("views");
var kUIRegExp = /@ui.([a-zA-Z_\-\$#]+)/i;
var unbubblebles = 'focus blur change'.split(' ');
function normalizeUIKeys(obj, uimap) {
    var o = {},
        k = void 0,
        v = void 0,
        ms = void 0,
        sel = void 0,
        ui = void 0;
    for (k in obj) {
        v = obj[k];
        if ((ms = kUIRegExp.exec(k)) !== null) {
            ui = ms[1], sel = uimap[ui];
            if (sel != null) {
                k = k.replace(ms[0], sel);
            }
        }
        o[k] = v;
    }
    return o;
}
exports.normalizeUIKeys = normalizeUIKeys;
var Events;
(function (Events) {
    Events.BeforeRender = "before:render";
    Events.Render = "render";
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
    Events.BeforeDelegateEvents = "before:delegate:events";
    Events.DelegateEvents = "delegate:events";
    Events.UndelegateEvents = "undelegate:events";
})(Events = exports.Events || (exports.Events = {}));

var BaseView = function (_abstract_view_1$Abst) {
    _inherits(BaseView, _abstract_view_1$Abst);

    function BaseView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BaseView);

        //this._el = options.el;
        var _this = _possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).call(this));

        _this.setElement(options.el, false);
        _this._domEvents = [];
        return _this;
    }

    _createClass(BaseView, [{
        key: "delegateEvents",
        value: function delegateEvents(events) {
            var _this2 = this;

            if (!this.el) return;
            this._bindUIElements();
            events = events || this.events || {}; //result(this, 'events');
            events = normalizeUIKeys(events, this._ui);
            var triggers = this._configureTriggers();
            events = utils_1.extend({}, events, triggers);
            debug('%s delegate events %j', this, events);
            if (!events) return this;
            //if (!(events || (events = result(this, 'events')))) return this;
            this.undelegateEvents();
            var dels = [];
            for (var key in events) {
                var method = events[key];
                if (typeof method !== 'function') method = this[method];
                var match = key.match(/^(\S+)\s*(.*)$/);
                // Set delegates immediately and defer event on this.el
                var boundFn = method.bind(this); // bind(<Function>method, this);
                if (match[2]) {
                    this.delegate(match[1], match[2], boundFn);
                } else {
                    dels.push([match[1], boundFn]);
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
            debug('%s undelegate events', this);
            if (this.el) {
                for (var i = 0, len = this._domEvents.length; i < len; i++) {
                    var item = this._domEvents[i];
                    dom.removeEventListener(this.el, item.eventName, item.handler);
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
                var node = e.target || e.srcElement;
                // Already handled
                if (e.delegateTarget) return;
                for (; node && node != root; node = node.parentNode) {
                    if (node && dom.matches(node, selector)) {
                        e.delegateTarget = node;
                        listener(e);
                    }
                }
            } : function (e) {
                if (e.delegateTarget) return;
                listener(e);
            };
            var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
            debug('%s delegate event %s ', this, eventName);
            dom.addEventListener(this.el, eventName, handler, useCap);
            this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
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
                    dom.removeEventListener(this.el, item.eventName, item.handler);
                    this._domEvents.splice(dom.indexOf(handlers, item), 1);
                }
            }
            return this;
        }
    }, {
        key: "render",
        value: function render() {
            utils_1.triggerMethodOn(this, Events.BeforeRender);
            this.undelegateEvents();
            this.delegateEvents();
            utils_1.triggerMethodOn(this, Events.Render);
            return this;
        }
    }, {
        key: "setElement",
        value: function setElement(el) {
            var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            utils_1.triggerMethodOn(this, Events.BeforeSetElement);
            if (trigger) this.undelegateEvents();
            this._el = el;
            if (trigger) this.delegateEvents();
            utils_1.triggerMethodOn(this, Events.SetElement);
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.undelegateEvents();
            this.off();
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
            triggers = normalizeUIKeys(triggers, this._ui);
            // Configure the triggers, prevent default
            // action and stop propagation of DOM events
            var events = {},
                val = void 0,
                key = void 0;
            for (key in triggers) {
                val = triggers[key];
                debug('%s added trigger %s %s', this, key, val);
                events[key] = this._buildViewTrigger(val);
            }
            return events;
        }
    }, {
        key: "_buildViewTrigger",
        value: function _buildViewTrigger(triggerDef) {
            var _this4 = this;

            if (typeof triggerDef === 'string') triggerDef = { event: triggerDef };
            var options = utils_1.extend({
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
                utils_1.triggerMethodOn(_this4, options.event, {
                    view: _this4
                }, e);
            };
        }
    }], [{
        key: "find",
        value: function find(selector, context) {
            return context.querySelectorAll(selector);
        }
    }]);

    return BaseView;
}(abstract_view_1.AbstractView);

exports.BaseView = BaseView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
function removeFromListener(listeners, fn, ctx) {
    for (var i = 0; i < listeners.length; i++) {
        var e = listeners[i];
        if (fn == null && ctx != null && e.ctx === ctx || fn != null && ctx == null && e.handler === fn || fn != null && ctx != null && e.handler === fn && e.ctx === ctx) {
            listeners.splice(i, 1);
        }
    }
    return listeners;
}
function isEventEmitter(a) {
    return a && (a instanceof EventEmitter || utils_1.isFunction(a.on) && utils_1.isFunction(a.once) && utils_1.isFunction(a.off) && utils_1.isFunction(a.trigger));
}
exports.isEventEmitter = isEventEmitter;

var EventEmitter = function () {
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);
    }

    _createClass(EventEmitter, [{
        key: "on",
        value: function on(event, fn, ctx) {
            var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var events = (this._listeners || (this._listeners = new Map())).get(event) || [];
            events.push({
                name: event,
                once: once,
                handler: fn,
                ctx: ctx || this
            });
            if (!this._listeners.has(event)) this._listeners.set(event, events);
            return this;
        }
    }, {
        key: "once",
        value: function once(event, fn, ctx) {
            return this.on(event, fn, ctx, true);
        }
    }, {
        key: "off",
        value: function off(eventName, fn, ctx) {
            this._listeners = this._listeners || new Map();
            if (eventName == null && ctx == null) {
                this._listeners = new Map();
            } else if (this._listeners.has(eventName)) {
                var events = this._listeners.get(eventName);
                if (fn == null && ctx == null) {
                    this._listeners.set(eventName, []);
                } else {
                    removeFromListener(events, fn, ctx);
                }
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._listeners.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var en = _step.value;

                        removeFromListener(en, fn, ctx);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            return this;
        }
    }, {
        key: "trigger",
        value: function trigger(eventName) {
            this._listeners = this._listeners || new Map();
            var events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);
            var event = void 0,
                a = void 0,
                index = void 0;
            var calls = [];
            var alls = [];

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            for (var i = 0, ii = events.length; i < ii; i++) {
                event = events[i];
                a = args;
                if (events[i].name === '*') {
                    alls.push(events[i]);
                } else {
                    calls.push(events[i]);
                }
                if (events[i].once === true) {
                    index = this._listeners.get(events[i].name).indexOf(events[i]);
                    this._listeners.get(events[i].name).splice(index, 1);
                }
            }
            if (alls.length) {
                var _a = [eventName].concat(args);
                this._executeListener(alls, _a);
            }
            if (calls.length) this._executeListener(calls, args);
            return this;
        }
    }, {
        key: "_executeListener",
        value: function _executeListener(func, args) {
            EventEmitter.executeListenerFunction(func, args);
        }
    }]);

    return EventEmitter;
}();

EventEmitter.executeListenerFunction = function (func, args) {
    utils_1.callFunc(func, args);
};
exports.EventEmitter = EventEmitter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var event_emitter_1 = __webpack_require__(3);

var AbstractView = function (_event_emitter_1$Even) {
    _inherits(AbstractView, _event_emitter_1$Even);

    function AbstractView() {
        _classCallCheck(this, AbstractView);

        return _possibleConstructorReturn(this, (AbstractView.__proto__ || Object.getPrototypeOf(AbstractView)).apply(this, arguments));
    }

    _createClass(AbstractView, [{
        key: "render",
        value: function render() {
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.off();
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
}(event_emitter_1.EventEmitter);

exports.AbstractView = AbstractView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var abstract_view_1 = __webpack_require__(4);
var mixins_1 = __webpack_require__(1);
var Events;
(function (Events) {
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
})(Events || (Events = {}));

var Controller = function (_abstract_view_1$Abst) {
    _inherits(Controller, _abstract_view_1$Abst);

    function Controller() {
        _classCallCheck(this, Controller);

        return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
    }

    _createClass(Controller, [{
        key: "setElement",
        value: function setElement(el) {
            var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (this._el == el) {
                return;
            }
            if (trigger) utils_1.triggerMethodOn(this, Events.BeforeSetElement, this._el, el);
            this._el = el;
            if (trigger) utils_1.triggerMethodOn(this, Events.SetElement, this._el, el);
        }
    }]);

    return Controller;
}(abstract_view_1.AbstractView);

exports.Controller = Controller;

var ViewController = function (_mixins_1$ViewMountab) {
    _inherits(ViewController, _mixins_1$ViewMountab);

    function ViewController() {
        _classCallCheck(this, ViewController);

        return _possibleConstructorReturn(this, (ViewController.__proto__ || Object.getPrototypeOf(ViewController)).apply(this, arguments));
    }

    return ViewController;
}(mixins_1.ViewMountable(Controller));

exports.ViewController = ViewController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
function attributes(attrs) {
    return function (target) {
        utils_1.extend(target.prototype, attrs);
    };
}
exports.attributes = attributes;
function events(events) {
    return function (target) {
        target.prototype.events = events;
    };
}
exports.events = events;
function triggers(triggers) {
    return function (target) {
        target.prototype.triggers = triggers;
    };
}
exports.triggers = triggers;
/*
export function ui<U extends Object>(m: U) {
    return function <T extends Constructor<BaseView<U>>, U extends Element>(target: T) {
        target.prototype.ui = ui;
        return class extends target {
            ui: {
                [K in keyof U]?: Element;
            }
        }
    }
}*/

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var base_view_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(0);

var View = function (_base_view_1$BaseView) {
    _inherits(View, _base_view_1$BaseView);

    function View() {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).apply(this, arguments));
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            if (!this.el) return this;
            utils_1.triggerMethodOn(this, base_view_1.Events.BeforeRender);
            this.undelegateEvents();
            this.renderTemplate();
            this.delegateEvents();
            utils_1.triggerMethodOn(this, base_view_1.Events.Render);
            return this;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var data = utils_1.result(this, 'data');
            var template = utils_1.result(this, 'template', data);
            if (template) this.el.innerHTML = '';
            _get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), "destroy", this).call(this);
        }
    }, {
        key: "renderTemplate",
        value: function renderTemplate() {
            if (!this.el) return;
            var data = utils_1.result(this, 'data');
            var template = utils_1.result(this, 'template', data);
            if (!template) return;
            this.el.innerHTML = template;
        }
    }]);

    return View;
}(base_view_1.BaseView);

exports.View = View;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) return i;
    }return -1;
}
exports.indexOf = indexOf;
var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~indexOf(nodeList, this);
};
var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
    return this.attachEvent('on' + eventName, listener);
};
var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
    return this.detachEvent('on' + eventName, listener);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
exports.matches = matches;
function addEventListener(elm, eventName, listener) {
    var useCap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    elementAddEventListener.call(elm, eventName, listener, useCap);
}
exports.addEventListener = addEventListener;
function removeEventListener(elm, eventName, listener) {
    elementRemoveEventListener.call(elm, eventName, listener);
}
exports.removeEventListener = removeEventListener;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));
__export(__webpack_require__(7));
__export(__webpack_require__(3));
__export(__webpack_require__(1));
__export(__webpack_require__(6));
__export(__webpack_require__(2));
var mixins_1 = __webpack_require__(1);
function mount(el, mountable) {
    var view = mixins_1.ViewMountable.Invoker.get(mountable);
    if (view) view.el = el;
    return view;
}
exports.mount = mount;
//export * from './test';

/***/ })
/******/ ]);
});