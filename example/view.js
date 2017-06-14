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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
var idCounter = 0;
function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    return prefix + ++idCounter;
}
exports.uniqueId = uniqueId;
function indexOf(array, item) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === item) return i;
    }return -1;
}
exports.indexOf = indexOf;

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
var utils_1 = __webpack_require__(0);
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
                if (this.el && this._views) this._unbindViews(this._views);
                _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this);
                if (this.el && this._views) this._bindViews(this._views);
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
                    var sel = base_view_1.normalizeUIString(o.selector, this._ui || {});
                    el = this.el.querySelector(sel);
                    if (!el) throw new Error("No selector " + sel + " in dom");
                    var view = ViewMountable.Invoker.get(o.view);
                    view.setElement(el, false);
                    this[key] = view.render();
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
var Events;
(function (Events) {
    Events.BeforeRender = "before:render";
    Events.Render = "render";
    Events.BeforeSetElement = "before:set:element";
    Events.SetElement = "set:element";
    Events.BeforeDelegateEvents = "before:delegate:events";
    Events.DelegateEvents = "delegate:events";
    Events.BeforeUndelegateEvents = "before:undelegate:events";
    Events.UndelegateEvents = "undelegate:events";
    Events.BeforeDestroy = "before:destroy";
    Events.Destroy = "destroy";
})(Events = exports.Events || (exports.Events = {}));
function ViewObservable(Base) {
    return function (_Base2) {
        _inherits(_class2, _Base2);

        function _class2() {
            _classCallCheck(this, _class2);

            return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
        }

        _createClass(_class2, [{
            key: "render",
            value: function render() {
                utils_1.triggerMethodOn(this, Events.BeforeRender);
                _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "render", this).call(this);
                utils_1.triggerMethodOn(this, Events.Render);
                return this;
            }
        }, {
            key: "setElement",
            value: function setElement(el, trigger) {
                utils_1.triggerMethodOn(this, Events.BeforeSetElement);
                _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "setElement", this).call(this, el, trigger);
                utils_1.triggerMethodOn(this, Events.SetElement);
                return this;
            }
        }, {
            key: "delegateEvents",
            value: function delegateEvents(events) {
                utils_1.triggerMethodOn(this, Events.BeforeDelegateEvents);
                _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "delegateEvents", this).call(this, events);
                utils_1.triggerMethodOn(this, Events.DelegateEvents);
                return this;
            }
        }, {
            key: "undelegateEvents",
            value: function undelegateEvents() {
                utils_1.triggerMethodOn(this, Events.BeforeUndelegateEvents);
                _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "undelegateEvents", this).call(this);
                utils_1.triggerMethodOn(this, Events.UndelegateEvents);
                return this;
            }
        }, {
            key: "destroy",
            value: function destroy() {
                utils_1.triggerMethodOn(this, Events.BeforeDestroy);
                var off = this.off;
                this.off = function () {};
                _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "destroy", this).call(this);
                this.off = off;
                utils_1.triggerMethodOn(this, Events.Destroy);
                this.off();
            }
        }]);

        return _class2;
    }(Base);
}
exports.ViewObservable = ViewObservable;

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
var abstract_view_1 = __webpack_require__(6);
//import * as Debug from 'debug';
var debug = function debug() {}; //Debug("views");
var kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#]+)/i,
    unbubblebles = 'focus blur change'.split(' ');
function normalizeUIKeys(obj, uimap) {
    var o = {},
        k = void 0,
        v = void 0,
        ms = void 0,
        sel = void 0,
        ui = void 0;
    for (k in obj) {
        v = obj[k];
        /*if ((ms = kUIRegExp.exec(k)) !== null) {
            ui = ms[1], sel = uimap[ui];
            if (sel != null) {
                k = k.replace(ms[0], sel);
            }
        }*/
        k = normalizeUIString(k, uimap);
        o[k] = v;
    }
    return o;
}
exports.normalizeUIKeys = normalizeUIKeys;
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
exports.normalizeUIString = normalizeUIString;
/*
export namespace Events {
    export const BeforeRender = "before:render";
    export const Render = "render";
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
    export const BeforeDelegateEvents = "before:delegate:events";
    export const DelegateEvents = "delegate:events";
    export const UndelegateEvents = "undelegate:events";
}*/

var BaseView = function (_abstract_view_1$Abst) {
    _inherits(BaseView, _abstract_view_1$Abst);

    function BaseView() {
        var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BaseView);

        var _this = _possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).call(this));

        _this._options = _options;
        //this._el = options.el;
        _this.setElement(_options.el, false);
        _this._domEvents = [];
        _this._vid = utils_1.uniqueId('vid');
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
                var node = e.target || e.srcElement;
                // Already handled
                if (e.delegateTarget) return;
                for (; node && node != root; node = node.parentNode) {
                    if (node && node.matches(selector)) {
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
            this.el.addEventListener(eventName, handler, useCap);
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
                    this.el.removeEventListener(item.eventName, item.handler);
                    this._domEvents.splice(utils_1.indexOf(handlers, item), 1);
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
            this.off();
            if (this.el && this.options.attachId) {
                this.el.removeAttribute('data-vid');
            }
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


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
function attributes(attrs) {
    return function (target) {
        utils_1.extend(target.prototype, attrs);
    };
}
exports.attributes = attributes;
function event(eventName, selector) {
    return function (target, property, desc) {
        if (!desc) throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new Error('must be a function');
        }
        target.events = utils_1.extend(target.events || {}, _defineProperty({}, eventName + " " + selector, property));
    };
}
exports.event = event;
(function (event) {
    function click(selector) {
        return event('click', selector);
    }
    event.click = click;
    function change(selector) {
        return event('change', selector);
    }
    event.change = change;
})(event = exports.event || (exports.event = {}));
function view(selector) {
    return function (target, prop) {
        var View = Reflect.getOwnMetadata("design:type", target, prop);
        if (!View) throw new Error('design:type does not exists');
        if (!target._views) target._views = {};
        target._views[prop] = {
            selector: selector,
            view: View
        };
    };
}
exports.view = view;

/***/ }),
/* 5 */
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
var mixins_1 = __webpack_require__(1);

var View = function (_base_view_1$BaseView) {
    _inherits(View, _base_view_1$BaseView);

    function View() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { attachId: true };

        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            if (this.options.ensureElement) this._ensureElement();
            if (!this.el) return this;
            this.undelegateEvents();
            this.renderTemplate();
            this.delegateEvents();
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
        key: "_ensureElement",
        value: function _ensureElement() {
            if (this.el) return;
            var el = document.createElement(this.options.ensureElement);
            this.setElement(el);
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
exports.LayoutView = mixins_1.ViewMountable(View);

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
//export * from './controller';
__export(__webpack_require__(5));
__export(__webpack_require__(3));
__export(__webpack_require__(1));
__export(__webpack_require__(4));
__export(__webpack_require__(2));
__export(__webpack_require__(0));
__export(__webpack_require__(13));
var mixins_1 = __webpack_require__(1);
function mount(el, mountable) {
    var view = mixins_1.ViewMountable.Invoker.get(mountable);
    if (view) view.el = el;
    return view;
}
exports.mount = mount;
__export(__webpack_require__(12));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
/**
* Used to instantiate a class.
*
* @class ClassActivator
* @constructor
*/

var ClassActivator = function () {
    function ClassActivator() {
        _classCallCheck(this, ClassActivator);
    }

    _createClass(ClassActivator, [{
        key: "invoke",
        value: function invoke(fn, args) {
            return Reflect.construct(fn, args);
        }
    }]);

    return ClassActivator;
}();

ClassActivator.instance = new ClassActivator();
exports.ClassActivator = ClassActivator;
/**
* Used to invoke a factory method.
*
* @class FactoryActivator
* @constructor
*/

var FactoryActivator = function () {
    function FactoryActivator() {
        _classCallCheck(this, FactoryActivator);
    }

    _createClass(FactoryActivator, [{
        key: "invoke",
        value: function invoke(fn, args) {
            return fn.apply(undefined, args);
        }
    }]);

    return FactoryActivator;
}();

FactoryActivator.instance = new FactoryActivator();
exports.FactoryActivator = FactoryActivator;

var AsyncClassActivator = function () {
    function AsyncClassActivator() {
        _classCallCheck(this, AsyncClassActivator);
    }

    _createClass(AsyncClassActivator, [{
        key: "invoke",
        value: function invoke(fn, args) {
            return Promise.all(args).then(function (args) {
                return Reflect.construct(fn, args);
            });
        }
    }]);

    return AsyncClassActivator;
}();

AsyncClassActivator.instance = new AsyncClassActivator();
exports.AsyncClassActivator = AsyncClassActivator;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaKeys = {
    registration: Symbol.for('di:registration'),
    instanceActivator: Symbol.for('di:instance-activator'),
    dependencyResolver: Symbol.for('di:dependency-resolver'),
    paramTypes: 'design:paramtypes',
    properties: 'design:properties'
};
exports.emptyParameters = Object.freeze([]);
var paramRegEx = /function[^(]*\(([^)]*)\)/i;
function getFunctionParameters(fn) {
    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var params = Reflect.getOwnMetadata(exports.MetaKeys.paramTypes, fn);
    if (!params) {
        var match = fn.toString().match(paramRegEx);
        if (match) {
            params = match[1].replace(/\W+/, ' ').split(' ').map(function (x) {
                return x.replace(',', '').trim();
            }).filter(function (m) {
                return m !== '';
            });
            if (cache) Reflect.defineMetadata(exports.MetaKeys.paramTypes, params, fn);
        }
    }
    return params || [];
}
exports.getFunctionParameters = getFunctionParameters;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

Object.defineProperty(exports, "__esModule", { value: true });

var DIError = function (_Error) {
    _inherits(DIError, _Error);

    function DIError(message) {
        _classCallCheck(this, DIError);

        var _this = _possibleConstructorReturn(this, (DIError.__proto__ || Object.getPrototypeOf(DIError)).call(this, message));

        _this.message = message;
        return _this;
    }

    _createClass(DIError, [{
        key: "toString",
        value: function toString() {
            return "[" + this.name + ": " + this.message + "]";
        }
    }]);

    return DIError;
}(Error);

exports.DIError = DIError;

var DIAggregateError = function (_DIError) {
    _inherits(DIAggregateError, _DIError);

    function DIAggregateError(message, errors) {
        _classCallCheck(this, DIAggregateError);

        var _this2 = _possibleConstructorReturn(this, (DIAggregateError.__proto__ || Object.getPrototypeOf(DIAggregateError)).call(this, message));

        _this2.error = errors;
        return _this2;
    }

    _createClass(DIAggregateError, [{
        key: "toString",
        value: function toString() {
            if (this.error == null) {
                return "[" + this.name + ": " + this.message + "]";
            } else {
                return String.prototype.toString.call(this.error);
            }
        }
    }, {
        key: "inner",
        get: function get() {
            if (this.error && this.error.inner) return this.error.inner;
            return this.error;
        }
    }]);

    return DIAggregateError;
}(DIError);

exports.DIAggregateError = DIAggregateError;
function createError(name, message, error) {
    var e = void 0;
    if (error) {
        e = new DIAggregateError(message, error);
    } else {
        e = new DIError(message);
    }
    e.name = name;
    return e;
}
exports.createError = createError;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
/**
* An abstract resolver used to allow functions/classes to specify custom dependency resolution logic.
*
* @class Resolver
* @constructor
*/

var Resolver = function Resolver() {
    _classCallCheck(this, Resolver);
};

exports.Resolver = Resolver;
/**
* Used to allow functions/classes to specify lazy resolution logic.
*
* @class Lazy
* @constructor
* @extends Resolver
* @param {Object} key The key to lazily resolve.
*/

var Lazy = function (_Resolver) {
    _inherits(Lazy, _Resolver);

    function Lazy(key) {
        _classCallCheck(this, Lazy);

        var _this = _possibleConstructorReturn(this, (Lazy.__proto__ || Object.getPrototypeOf(Lazy)).call(this));

        _this.key = key;
        return _this;
    }
    /**
    * Called by the container to lazily resolve the dependency into a lazy locator function.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Function} Returns a function which can be invoked at a later time to obtain the actual dependency.
    */

    _createClass(Lazy, [{
        key: "get",
        value: function get(container) {
            var _this2 = this;

            return function () {
                return container.get(_this2.key);
            };
        }
        /**
        * Creates a Lazy Resolver for the supplied key.
        *
        * @method of
        * @static
        * @param {Object} key The key to lazily resolve.
        * @return {Lazy} Returns an insance of Lazy for the key.
        */

    }], [{
        key: "of",
        value: function of(key) {
            return new Lazy(key);
        }
    }]);

    return Lazy;
}(Resolver);

exports.Lazy = Lazy;
/**
* Used to allow functions/classes to specify resolution of all matches to a key.
*
* @class All
* @constructor
* @extends Resolver
* @param {Object} key The key to lazily resolve all matches for.
*/

var All = function (_Resolver2) {
    _inherits(All, _Resolver2);

    function All(key) {
        _classCallCheck(this, All);

        var _this3 = _possibleConstructorReturn(this, (All.__proto__ || Object.getPrototypeOf(All)).call(this));

        _this3.key = key;
        return _this3;
    }
    /**
    * Called by the container to resolve all matching dependencies as an array of instances.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Object[]} Returns an array of all matching instances.
    */

    _createClass(All, [{
        key: "get",
        value: function get(container) {
            return container.getAll(this.key);
        }
        /**
        * Creates an All Resolver for the supplied key.
        *
        * @method of
        * @static
        * @param {Object} key The key to resolve all instances for.
        * @return {All} Returns an insance of All for the key.
        */

    }], [{
        key: "of",
        value: function of(key) {
            return new All(key);
        }
    }]);

    return All;
}(Resolver);

exports.All = All;
/**
* Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.
*
* @class Optional
* @constructor
* @extends Resolver
* @param {Object} key The key to optionally resolve for.
* @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
*/

var Optional = function (_Resolver3) {
    _inherits(Optional, _Resolver3);

    function Optional(key) {
        var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Optional);

        var _this4 = _possibleConstructorReturn(this, (Optional.__proto__ || Object.getPrototypeOf(Optional)).call(this));

        _this4.key = key;
        _this4.checkParent = checkParent;
        return _this4;
    }
    /**
    * Called by the container to provide optional resolution of the key.
    *
    * @method get
    * @param {Container} container The container to resolve from.
    * @return {Object} Returns the instance if found; otherwise null.
    */

    _createClass(Optional, [{
        key: "get",
        value: function get(container) {
            if (container.hasHandler(this.key, this.checkParent)) {
                return container.get(this.key);
            }
            return null;
        }
        /**
        * Creates an Optional Resolver for the supplied key.
        *
        * @method of
        * @static
        * @param {Object} key The key to optionally resolve for.
        * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
        * @return {Optional} Returns an insance of Optional for the key.
        */

    }], [{
        key: "of",
        value: function of(key) {
            var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return new Optional(key, checkParent);
        }
    }]);

    return Optional;
}(Resolver);

exports.Optional = Optional;
/**
* Used to inject the dependency from the parent container instead of the current one.
*
* @class Parent
* @constructor
* @extends Resolver
* @param {Object} key The key to resolve from the parent container.
*/

var Parent = function (_Resolver4) {
    _inherits(Parent, _Resolver4);

    function Parent(key) {
        _classCallCheck(this, Parent);

        var _this5 = _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).call(this));

        _this5.key = key;
        return _this5;
    }
    /**
    * Called by the container to load the dependency from the parent container
    *
    * @method get
    * @param {Container} container The container to resolve the parent from.
    * @return {Function} Returns the matching instance from the parent container
    */

    _createClass(Parent, [{
        key: "get",
        value: function get(container) {
            return container.parent ? container.parent.get(this.key) : null;
        }
        /**
        * Creates a Parent Resolver for the supplied key.
        *
        * @method of
        * @static
        * @param {Object} key The key to resolve.
        * @return {Parent} Returns an insance of Parent for the key.
        */

    }], [{
        key: "of",
        value: function of(key) {
            return new Parent(key);
        }
    }]);

    return Parent;
}(Resolver);

exports.Parent = Parent;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var controller_1 = __webpack_require__(14);
var view_1 = __webpack_require__(5);
var slick_di_1 = __webpack_require__(15);
var decorators_1 = __webpack_require__(4);
var mixins_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(0);
var collection_view_1 = __webpack_require__(13);
var Rapper = function Rapper() {
    _classCallCheck(this, Rapper);

    this.id = utils_1.uniqueId();
};
Rapper = __decorate([slick_di_1.singleton()], Rapper);
exports.Rapper = Rapper;
var container = new slick_di_1.Container();
mixins_1.ViewMountable.Invoker = container;
var List = function (_collection_view_1$Co) {
    _inherits(List, _collection_view_1$Co);

    function List(rapper) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

        _this.childView = function (_view_1$View) {
            _inherits(ChildView, _view_1$View);

            function ChildView() {
                _classCallCheck(this, ChildView);

                var _this2 = _possibleConstructorReturn(this, (ChildView.__proto__ || Object.getPrototypeOf(ChildView)).apply(this, arguments));

                _this2.template = function (data) {
                    return "" + data.name;
                };
                return _this2;
            }

            return ChildView;
        }(view_1.View);
        _this.collection = collection_view_1.ArrayCollection([{ name: 'Test 1' }, { name: 'Test 2' }]);
        console.log(rapper);
        return _this;
    }

    return List;
}(collection_view_1.CollectionView);
List = __decorate([slick_di_1.autoinject, __metadata("design:paramtypes", [Rapper])], List);
var TestView = function (_mixins_1$ViewObserva) {
    _inherits(TestView, _mixins_1$ViewObserva);

    function TestView(rapper) {
        _classCallCheck(this, TestView);

        var _this3 = _possibleConstructorReturn(this, (TestView.__proto__ || Object.getPrototypeOf(TestView)).call(this));

        console.log(rapper);
        return _this3;
    }

    _createClass(TestView, [{
        key: "template",
        value: function template() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return "<h1>Hello, " + data.what + "!</h1>";
        }
    }, {
        key: "data",
        value: function data() {
            return { what: 'World' };
        }
    }, {
        key: "onHeaderClicked",
        value: function onHeaderClicked(e) {
            console.log('Clicked', e);
        }
    }]);

    return TestView;
}(mixins_1.ViewObservable(view_1.View));
__decorate([decorators_1.event.click('@header'), __metadata("design:type", Function), __metadata("design:paramtypes", [MouseEvent]), __metadata("design:returntype", void 0)], TestView.prototype, "onHeaderClicked", null);
TestView = __decorate([slick_di_1.autoinject, decorators_1.attributes({
    ui: {
        header: 'h1'
    }
}), __metadata("design:paramtypes", [Rapper])], TestView);
exports.TestView = TestView;

var TestController = function (_controller_1$ViewCon) {
    _inherits(TestController, _controller_1$ViewCon);

    function TestController() {
        _classCallCheck(this, TestController);

        return _possibleConstructorReturn(this, (TestController.__proto__ || Object.getPrototypeOf(TestController)).call(this));
    }

    _createClass(TestController, [{
        key: "render",
        value: function render() {
            _get(TestController.prototype.__proto__ || Object.getPrototypeOf(TestController.prototype), "render", this).call(this);
            this.view1.on('*', function (event) {
                console.log(event);
            });
            return this;
        }
    }]);

    return TestController;
}(controller_1.ViewController);

__decorate([decorators_1.view('.view1'), __metadata("design:type", TestView)], TestController.prototype, "view1", void 0);
__decorate([decorators_1.view('.view2'), __metadata("design:type", List)], TestController.prototype, "view2", void 0);
exports.TestController = TestController;
/*
import { View } from './view';
import { ViewMountable, view } from './mixins'
class TestView extends ViewMountable(View) {

    @view('.view1')
    view1: View

}*/

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var base_view_1 = __webpack_require__(2);
var view_1 = __webpack_require__(5);
var mixins_1 = __webpack_require__(1);
function ArrayCollection(a) {
    return new (function () {
        function _class(a) {
            _classCallCheck(this, _class);

            this.a = a;
        }

        _createClass(_class, [{
            key: "item",
            value: function item(index) {
                if (index >= this.a.length) return undefined;
                return this.a[index];
            }
        }, {
            key: "length",
            get: function get() {
                return this.a.length;
            }
        }]);

        return _class;
    }())(a);
}
exports.ArrayCollection = ArrayCollection;

var BaseCollectionView = function (_base_view_1$BaseView) {
    _inherits(BaseCollectionView, _base_view_1$BaseView);

    function BaseCollectionView() {
        _classCallCheck(this, BaseCollectionView);

        return _possibleConstructorReturn(this, (BaseCollectionView.__proto__ || Object.getPrototypeOf(BaseCollectionView)).apply(this, arguments));
    }

    _createClass(BaseCollectionView, [{
        key: "render",
        value: function render() {
            this.undelegateEvents();
            this._removeChildViews();
            if (!this.el || !this.collection) return this;
            this._renderCollection();
            return this;
        }
    }, {
        key: "_removeChildViews",
        value: function _removeChildViews() {
            if (!this._childViews) {
                this._childViews = [];
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._childViews[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    v.destroy();
                    v.el.remove();
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

            this._childViews = [];
        }
    }, {
        key: "_renderCollection",
        value: function _renderCollection(collection) {
            var col = collection || this.collection;
            var container = this._getChildViewContainer();
            container.innerHTML = '';
            var frag = document.createDocumentFragment();
            for (var i = 0, ii = col.length; i < ii; i++) {
                var item = col.item(i);
                if (!item) throw TypeError("invalid index");
                var el = this._createChildView(item);
                frag.appendChild(el.render().el);
                this._childViews.push(el);
            }
            container.appendChild(frag);
        }
    }, {
        key: "_createChildView",
        value: function _createChildView(model) {
            var Vi = this.options.childView || this.childView || view_1.View;
            /*let options = extend({}, this.options.childViewOptions || {}, {
                ensureElement: "div"
            });*/
            var el = mixins_1.ViewMountable.Invoker.get(Vi);
            el.data = model;
            if (!el.options.ensureElement) el.options.ensureElement = 'div';
            el.options.attachId = true;
            return el;
        }
    }, {
        key: "_getChildViewContainer",
        value: function _getChildViewContainer() {
            if (!this.options.childViewContainer) return this.el;
            var el = this.el.querySelector(this.options.childViewContainer);
            if (!el) throw new Error("tag not found: " + this.options.childViewContainer);
            return el;
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this._removeChildViews();
            _get(BaseCollectionView.prototype.__proto__ || Object.getPrototypeOf(BaseCollectionView.prototype), "destroy", this).call(this);
        }
    }, {
        key: "collection",
        set: function set(collection) {
            if (this._collection == collection) return;
            this._collection = collection;
        },
        get: function get() {
            return this._collection;
        }
    }]);

    return BaseCollectionView;
}(base_view_1.BaseView);

exports.BaseCollectionView = BaseCollectionView;

var CollectionView = function (_BaseCollectionView) {
    _inherits(CollectionView, _BaseCollectionView);

    function CollectionView() {
        _classCallCheck(this, CollectionView);

        return _possibleConstructorReturn(this, (CollectionView.__proto__ || Object.getPrototypeOf(CollectionView)).apply(this, arguments));
    }

    return CollectionView;
}(BaseCollectionView);

exports.CollectionView = CollectionView;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
//import { triggerMethodOn } from './utils'
var abstract_view_1 = __webpack_require__(6);
var mixins_1 = __webpack_require__(1);
/*namespace Events {
    export const BeforeSetElement = "before:set:element";
    export const SetElement = "set:element";
}*/

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
            this._el = el;
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(9);
var errors_1 = __webpack_require__(10);
var activators_1 = __webpack_require__(8);
var resolvers_1 = __webpack_require__(11);
var counter = 0;
function genid() {
    return ++counter + "";
}

var DIBadKeyError = function (_errors_1$DIError) {
    _inherits(DIBadKeyError, _errors_1$DIError);

    function DIBadKeyError(message) {
        _classCallCheck(this, DIBadKeyError);

        var _this = _possibleConstructorReturn(this, (DIBadKeyError.__proto__ || Object.getPrototypeOf(DIBadKeyError)).call(this, message));

        _this.name = 'BadKeyError';
        _this.message = "key not registered with container";
        return _this;
    }

    return DIBadKeyError;
}(errors_1.DIError);

exports.DIBadKeyError = DIBadKeyError;

var Container = function () {
    function Container(info) {
        _classCallCheck(this, Container);

        this.entries = new Map();
        this.constructionInfo = info || new Map();
        this.id = genid();
    }

    _createClass(Container, [{
        key: "hasHandler",

        /**
         * Inspects the container to determine if a particular key has been registred.
        *
        * @method hasHandler
        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
        * @param {Boolean} [checkParent=false] Indicates whether or not to check the parent container hierarchy.
        * @return {Boolean} Returns true if the key has been registred; false otherwise.
        */
        value: function hasHandler(key) {
            var checkParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (key === null || key === undefined) {
                throw new DIBadKeyError();
            }
            return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
        }
        /**
        * Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default transient registration is used.
        *
        * @method autoRegister
        * @param {Function} fn The constructor function to use when the dependency needs to be instantiated.
        * @param {Object} [key] The key that identifies the dependency at resolution time; usually a constructor function.
        */

    }, {
        key: "autoRegister",
        value: function autoRegister(fn, key, targetKey, resolveIn) {
            var registration;
            var container = resolveIn || this;
            if (fn === null || fn === undefined) {
                throw new DIBadKeyError('no key');
            }
            if (typeof fn === 'function') {
                registration = Reflect.getOwnMetadata(common_1.MetaKeys.registration, fn, targetKey); // Metadata.get(Metadata.registration, fn, targetKey);
                if (registration !== undefined) {
                    registration.register(container, key || fn, fn);
                } else {
                    container.registerTransient(key || fn, fn, targetKey);
                }
            } else {
                container.registerInstance(fn, fn);
            }
        }
        /**
        * Unregisters based on key.
        *
        * @method unregister
        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
        */

    }, {
        key: "unregister",
        value: function unregister(key) {
            //debug('%s: Unregister key: %s', this.id, key);
            this.entries.delete(key);
        }
        /**
        * Resolves a single instance based on the provided key.
        *
        * @method get
        * @param {Object} key The key that identifies the object to resolve.
        * @return {Object} Returns the resolved instance.
        */

    }, {
        key: "get",
        value: function get(key, targetKey, resolveIn) {
            //debug("%s: Get %s, target: %s", this.id, String(key), targetKey);
            var entry;
            if (key === null || key === undefined) {
                throw new DIBadKeyError();
            }
            if (key === Container) {
                return this;
            }
            if (key instanceof resolvers_1.Resolver) {
                return key.get(this);
            }
            entry = this.entries.get(key);
            if (entry !== undefined) {
                return entry[0](this);
            }
            if (this.parent && this.parent.hasHandler(key, true)) {
                //debug("%s: found key '%s' on parent", this.id, key);
                return this.parent.get(key, targetKey, resolveIn);
            }
            // No point in auto registrering a string or symbol or number
            if (typeof key === 'string' || (typeof key === "undefined" ? "undefined" : _typeof(key)) === 'symbol' || typeof key === 'number') {
                throw errors_1.createError('DIResolveError', 'no component registered for key: ' + String(key));
            }
            this.autoRegister(key, null, targetKey, resolveIn);
            entry = this.entries.get(key);
            return entry[0](this);
        }
        /**
        * Resolves all instance registered under the provided key.
        *
        * @method getAll
        * @param {Object} key The key that identifies the objects to resolve.
        * @return {Object[]} Returns an array of the resolved instances.
        */

    }, {
        key: "getAll",
        value: function getAll(key) {
            var _this2 = this;

            var entry;
            if (key === null || key === undefined) {
                throw new DIBadKeyError();
            }
            entry = this.entries.get(key);
            if (entry !== undefined) {
                return entry.map(function (x) {
                    return x(_this2);
                });
            }
            if (this.parent) {
                return this.parent.getAll(key);
            }
            return [];
        }
        /**
        * Creates a new dependency injection container whose parent is the current container.
        *
        * @method createChild
        * @return {Container} Returns a new container instance parented to this.
        */

    }, {
        key: "createChild",
        value: function createChild() {
            var childContainer = new Container(this.constructionInfo);
            childContainer.parent = this;
            //debug("%s: Create child container: %s", this.id, childContainer.id);
            return childContainer;
        }
        /**
         * Resolve dependencies for the given function
         * @method resolveDependencies
         * @param {Function} fn
         * @return {Array<any>}
         */

    }, {
        key: "resolveDependencies",
        value: function resolveDependencies(fn, targetKey) {
            //debug("%s: Resolve dependencies for: %j", this.id, fn.name);
            var info = this._getOrCreateConstructionSet(fn, targetKey),
                keys = info.keys,
                args = new Array(keys.length);
            var i, ii;
            try {
                for (i = 0, ii = keys.length; i < ii; ++i) {
                    args[i] = this.get(keys[i]);
                }
            } catch (e) {
                var message = "Error";
                if (i < ii) {
                    message += " The argument at index " + i + " (key:" + keys[i] + ") could not be satisfied.";
                }
                //debug('resolve error %s', e)
                throw errors_1.createError("DependencyError", message, e);
            }
            return args;
        }
        /**
        * Invokes a function, recursively resolving its dependencies.
        *
        * @method invoke
        * @param {Function} fn The function to invoke with the auto-resolved dependencies.
        * @param {any[]} [deps] Additional function dependencies to use during invocation.
        * @return {Object} Returns the instance resulting from calling the function.
        */

    }, {
        key: "invoke",
        value: function invoke(fn, deps, targetKey) {
            var info = this._getOrCreateConstructionSet(fn, targetKey);
            try {
                var keys, args;
                if (info.dependencyResolver) {
                    args = info.dependencyResolver.resolveDependencies(fn);
                } else {
                    args = this.resolveDependencies(fn, targetKey);
                }
                if (deps !== undefined && Array.isArray(deps)) {
                    args = args.concat(deps);
                }
                //debug("%s: invoking '%s', with dependencies:", this.id, fn.name, info.keys);
                return info.activator.invoke(fn, args, targetKey, keys);
            } catch (e) {
                var activatingText = info.activator instanceof activators_1.ClassActivator ? 'instantiating' : 'invoking';
                var message = "Error " + activatingText + " " + fn.name + ".";
                //debug('invoke error %s', e)
                message += ' Check the inner error for details.';
                throw errors_1.createError("DIInvokeError", message, e);
            }
        }
    }, {
        key: "registerInstance",
        value: function registerInstance(key, instance) {
            //debug("%s: Register instance %s", this.id, key);
            this.registerHandler(key, function (_) {
                return instance;
            });
        }
    }, {
        key: "registerTransient",
        value: function registerTransient(key, fn, targetKey) {
            //debug("%s: Register transient %s", this.id, key);
            this.registerHandler(key, function (x) {
                return x.invoke(fn, null, targetKey);
            });
        }
    }, {
        key: "registerSingleton",
        value: function registerSingleton(key, fn, targetKey) {
            //debug("%s: Register singleton %s", this.id, key);
            var singleton;
            this.registerHandler(key, function (x) {
                return singleton || (singleton = x.invoke(fn, null, targetKey));
            });
        }
    }, {
        key: "registerHandler",
        value: function registerHandler(key, handler) {
            this._getOrCreateEntry(key).push(handler);
        }
    }, {
        key: "_getOrCreateEntry",
        value: function _getOrCreateEntry(key) {
            var entry;
            if (key === null || key === undefined) {
                throw new errors_1.DIError('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
            }
            entry = this.entries.get(key);
            if (entry === undefined) {
                entry = [];
                this.entries.set(key, entry);
            }
            return entry;
        }
    }, {
        key: "_getOrCreateConstructionSet",
        value: function _getOrCreateConstructionSet(fn, targetKey) {
            var info = this.constructionInfo.get(fn);
            if (info === undefined) {
                info = this._createConstructionSet(fn, targetKey);
                this.constructionInfo.set(fn, info);
            }
            return info;
        }
    }, {
        key: "_createConstructionSet",
        value: function _createConstructionSet(fn, targetKey) {
            var info = {
                activator: Reflect.getOwnMetadata(common_1.MetaKeys.instanceActivator, fn, targetKey) || activators_1.ClassActivator.instance,
                dependencyResolver: Reflect.getOwnMetadata(common_1.MetaKeys.dependencyResolver, fn, targetKey) || this
            };
            if (fn.inject !== undefined) {
                if (typeof fn.inject === 'function') {
                    info.keys = fn.inject();
                } else {
                    info.keys = fn.inject;
                }
                return info;
            }
            info.keys = Reflect.getOwnMetadata(common_1.MetaKeys.paramTypes, fn, targetKey) || common_1.getFunctionParameters(fn, true) || common_1.emptyParameters;
            return info;
        }
    }, {
        key: "root",
        get: function get() {
            var root = this,
                tmp = root;
            while (tmp) {
                tmp = root.parent;
                if (tmp) root = tmp;
            }
            return root;
        }
    }]);

    return Container;
}();

exports.Container = Container;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(9);
var registers_1 = __webpack_require__(19);
var activators_1 = __webpack_require__(8);
/**
 * Auto inject dependencies.
 */
function autoinject(target) {
    target.inject = Reflect.getOwnMetadata(common_1.MetaKeys.paramTypes, target) || common_1.emptyParameters;
}
exports.autoinject = autoinject;
function inject() {
    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
    }

    return function (target) {
        target.inject = rest;
    };
}
exports.inject = inject;
function registration(value, targetKey) {
    return function (target) {
        Reflect.defineMetadata(common_1.MetaKeys.registration, value, target, targetKey);
    };
}
exports.registration = registration;
function transient(key, targetKey) {
    return registration(new registers_1.TransientRegistration(key), targetKey);
}
exports.transient = transient;
function singleton(keyOrRegisterInChild) {
    var registerInChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var targetKey = arguments[2];

    return registration(new registers_1.SingletonRegistration(keyOrRegisterInChild, registerInChild), targetKey);
}
exports.singleton = singleton;
function instanceActivator(value, targetKey) {
    return function (target) {
        Reflect.defineMetadata(common_1.MetaKeys.instanceActivator, value, target, targetKey);
    };
}
exports.instanceActivator = instanceActivator;
function factory() {
    return instanceActivator(activators_1.FactoryActivator.instance);
}
exports.factory = factory;
function dependencyResolve(value, targetKey) {
    return function (target) {
        Reflect.defineMetadata(common_1.MetaKeys.dependencyResolver, value, target, targetKey);
    };
}
exports.dependencyResolve = dependencyResolve;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = __webpack_require__(16);
exports.Container = container_1.Container;
exports.DIBadKeyError = container_1.DIBadKeyError;
var errors_1 = __webpack_require__(10);
exports.DIAggregateError = errors_1.DIAggregateError;
exports.DIError = errors_1.DIError;
__export(__webpack_require__(17));
__export(__webpack_require__(8));
__export(__webpack_require__(11));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

Object.defineProperty(exports, "__esModule", { value: true });
/**
* Used to allow functions/classes to indicate that they should be registered as transients with the container.
*
* @class TransientRegistration
* @constructor
* @param {Object} [key] The key to register as.
*/

var TransientRegistration = function () {
    function TransientRegistration(key) {
        _classCallCheck(this, TransientRegistration);

        this.key = key;
    }
    /**
    * Called by the container to register the annotated function/class as transient.
    *
    * @method register
    * @param {Container} container The container to register with.
    * @param {Object} key The key to register as.
    * @param {Object} fn The function to register (target of the annotation).
    */

    _createClass(TransientRegistration, [{
        key: "register",
        value: function register(container, key, fn) {
            container.registerTransient(this.key || key, fn);
        }
    }]);

    return TransientRegistration;
}();

exports.TransientRegistration = TransientRegistration;
/**
* Used to allow functions/classes to indicate that they should be registered as singletons with the container.
*
* @class SingletonRegistration
* @constructor
* @param {Object} [key] The key to register as.
*/

var SingletonRegistration = function () {
    function SingletonRegistration(keyOrRegisterInChild) {
        var registerInChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, SingletonRegistration);

        if (typeof keyOrRegisterInChild === 'boolean') {
            this.registerInChild = keyOrRegisterInChild;
        } else {
            this.key = keyOrRegisterInChild;
            this.registerInChild = registerInChild;
        }
    }
    /**
    * Called by the container to register the annotated function/class as a singleton.
    *
    * @method register
    * @param {Container} container The container to register with.
    * @param {Object} key The key to register as.
    * @param {Object} fn The function to register (target of the annotation).
    */

    _createClass(SingletonRegistration, [{
        key: "register",
        value: function register(container, key, fn) {
            var destination = this.registerInChild ? container : container.root;
            destination.registerSingleton(this.key || key, fn);
        }
    }]);

    return SingletonRegistration;
}();

exports.SingletonRegistration = SingletonRegistration;

/***/ })
/******/ ]);
});