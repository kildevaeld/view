/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = __webpack_require__(1);

var TodoList =
/*#__PURE__*/
function (_index_1$withTemplate) {
  _inherits(TodoList, _index_1$withTemplate);

  function TodoList() {
    var _this;

    _classCallCheck(this, TodoList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TodoList).apply(this, arguments));
    _this.model = {
      todos: []
    };

    _this.template = function (model) {
      return model.todos.map(function (m) {
        return "<li>".concat(m.name, "</li>");
      }).join('');
    };

    return _this;
  }

  return TodoList;
}(index_1.withTemplate(index_1.View));

var TodoPage =
/*#__PURE__*/
function (_index_1$withAttached) {
  _inherits(TodoPage, _index_1$withAttached);

  function TodoPage() {
    var _this2;

    _classCallCheck(this, TodoPage);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(TodoPage).apply(this, arguments));

    _this2.template = function () {
      return "\n        <button>Create</button>\n        <ul class=\"list\"></ul>\n    ";
    };

    return _this2;
  }

  _createClass(TodoPage, [{
    key: "onclick",
    value: function onclick() {
      this.list.model.todos.push({
        name: "New Todo"
      });
      this.render();
    }
  }]);

  return TodoPage;
}(index_1.withAttachedViews(index_1.withTemplate(index_1.withElement(index_1.View))));

__decorate([index_1.attach('.list'), __metadata("design:type", TodoList)], TodoPage.prototype, "list", void 0);

__decorate([index_1.event.click('button'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], TodoPage.prototype, "onclick", null);

var Base = TodoPage.inherit({
  constructor: function constructor() {
    Base.__super__.constructor.call(this);
  },
  onclick: function onclick() {
    console.log('Hello, World');

    Base.__super__.onclick.call(this);
  }
});
var page = new Base().render();

window.onload = function () {
  return document.body.appendChild(page.el);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(2));

__export(__webpack_require__(4));

__export(__webpack_require__(5));

__export(__webpack_require__(6)); // mixins


__export(__webpack_require__(7));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(3);

function className(name) {
  return function (target) {
    Object.defineProperty(target, "name", {
      value: name
    });
  };
}

exports.className = className;
;

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
      throw new TypeError('must be a function');
    }

    var key = "".concat(eventName, " ").concat(selector);

    if (target.events && utils_1.has(target.events, key)) {
      var old = target.events[key];
      if (!Array.isArray(old)) old = [old];
      old.push(property);
      target.events[key] = old;
    } else {
      target.events = utils_1.extend(target.events || {}, _defineProperty({}, key, property));
    }
  };
}

exports.event = event;

var keyEventDecorator = function keyEventDecorator(eventName, selector, keyCodes) {
  var factory = event(eventName, selector);
  if (keyCodes && !Array.isArray(keyCodes)) keyCodes = [keyCodes];
  return function (target, property, desc) {
    if (!desc) throw new Error('no description');

    if (typeof desc.value !== 'function') {
      throw new TypeError('must be a function');
    }

    if (keyCodes) {
      var oldValue = desc.value;

      desc.value = function (e) {
        if (e && e instanceof KeyboardEvent) {
          if (~keyCodes.indexOf(e.keyCode)) return oldValue.call(this, e);
          return;
        }

        var args = Array.prototype.slice.call(arguments);
        return utils_1.callFuncCtx(oldValue, args, this);
      };
    }

    return factory(target, property, desc);
  };
};

(function (event) {
  function click(selector) {
    return event('click', selector);
  }

  event.click = click;

  function change(selector) {
    return event('change', selector);
  }

  event.change = change;

  function keypress(selector, keyCodes) {
    return keyEventDecorator("keypress", selector, keyCodes);
  }

  event.keypress = keypress;

  function keydown(selector, keyCodes) {
    return keyEventDecorator("keydown", selector, keyCodes);
  }

  event.keydown = keydown;

  function keyup(selector, keyCodes) {
    return keyEventDecorator("keyup", selector, keyCodes);
  }

  event.keyup = keyup;
})(event = exports.event || (exports.event = {}));
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
    var View;

    if (utils_1.isFunction(options.view)) {
      View = options.view;
    } else {
      View = Reflect.getOwnMetadata("design:type", target, prop);
    }

    if (!View) throw new Error("design:type does not exists for prop '".concat(prop, "' on '").concat(target, "'"));
    if (!target.views) target.views = {};
    target.views[prop] = {
      selector: selector,
      view: View,
      optional: typeof options.optional !== 'boolean' ? false : options.optional
    };
  };
}

exports.attach = attach;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGlobal", function() { return getGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callFunc", function() { return callFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callFuncCtx", function() { return callFuncCtx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "result", function() { return result; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOption", function() { return getOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerMethodOn", function() { return triggerMethodOn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObjectLike", function() { return isObjectLike; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isConstructor", function() { return isConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return isNumeric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelcase", function() { return camelcase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueId", function() { return uniqueId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return indexOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherit", function() { return inherit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return noop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Base", function() { return Base; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equal", function() { return equal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invoker", function() { return Invoker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInvoker", function() { return setInvoker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return debug; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Base = function () {
    function Base() {
        classCallCheck(this, Base);
    }

    createClass(Base, [{
        key: 'destroy',
        value: function destroy() {}
    }]);
    return Base;
}();

Base.inherit = inherit;
// Because IE/edge stinks!
var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
    return !!~indexOf(nodeList, this);
};
function matches(elm, selector) {
    return matchesSelector.call(elm, selector);
}
function getGlobal() {
    return Function('return this')();
}
function callFunc(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var l = fn.length,
        i = -1,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2],
        a4 = args[3],
        a5 = args[4];
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
        case 5:
            while (++i < l) {
                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
            }return;
        default:
            while (++i < l) {
                fn[i].handler.apply(fn[i].ctx, args);
            }return;
    }
}
function callFuncCtx(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var ctx = arguments[2];

    if (!Array.isArray(fn)) fn = [fn];
    var l = fn.length,
        i = -1,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2],
        a4 = args[3],
        a5 = args[4];
    switch (args.length) {
        case 0:
            while (++i < l) {
                fn[i].call(ctx);
            }return;
        case 1:
            while (++i < l) {
                fn[i].call(ctx, a1);
            }return;
        case 2:
            while (++i < l) {
                fn[i].call(ctx, a1, a2);
            }return;
        case 3:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3);
            }return;
        case 4:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3, a4);
            }return;
        case 5:
            while (++i < l) {
                fn[i].call(ctx, a1, a2, a3, a4, a5);
            }return;
        default:
            while (++i < l) {
                fn[i].apply(ctx, args);
            }return;
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
    var resolve = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    for (var i = 0, ii = objs.length; i < ii; i++) {
        if (isObjectLike(objs[i]) && objs[i][option]) {
            return resolve ? result(objs[i], option) : objs[i][option];
        }
    }
    return void 0;
}
/**
 * Trigger an event on an object, if it's an eventemitter.
 * Will also call an method "on<EventName>" if it's exists
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
function isObjectLike(val) {
    return val === Object(val);
}
function isObject(val) {
    return val != null && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && Array.isArray(val) === false;
}
function isObjectObject(o) {
    return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}
function isPlainObject(o) {
    var ctor, prot;
    if (isObjectObject(o) === false) return false;
    // If has modified constructor
    ctor = o.constructor;
    if (typeof ctor !== 'function') return false;
    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;
    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
    // Most likely a plain Object
    return true;
}
function isFunction(a) {
    return typeof a === 'function';
}
function isConstructor(a) {
    try {
        Reflect.construct(String, [], a);
    } catch (e) {
        return false;
    }
    return true;
}
function isString(a) {
    return typeof a === 'string';
}
function isElement(input) {
    if (!input) return false;else if (input instanceof Element) return true;
    return input != null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.nodeType === Node.ELEMENT_NODE && _typeof(input.style) === 'object' && _typeof(input.ownerDocument) === 'object';
}
function isNumber(num) {
    return typeof num === 'number';
}
function isNumeric(num) {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
}
function extend(obj) {
    if (!isObject(obj)) return obj;

    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
    }

    for (var i = 0, ii = args.length; i < ii; i++) {
        var o = args[i];
        if (!isObject(o)) continue;
        for (var k in o) {
            if (has(o, k)) obj[k] = o[k];
        }
    }
    return obj;
}
var _has = Object.prototype.hasOwnProperty,
    _slice = Array.prototype.slice;
function has(obj, prop) {
    return _has.call(obj, prop);
}
function slice(obj, start, len) {
    return _slice.call(obj, start, len);
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
    }return -1;
}
function inherit(protoProps, staticProps) {
    var parent = this;
    var child;
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `protoProps` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function child() {
            return parent.apply(this, arguments);
        };
    }
    // Add static properties to the constructor function, if supplied.
    Object.assign(child, parent, staticProps);
    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = create(parent.prototype, protoProps);
    child.prototype.constructor = child;
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
}
var nativeCreate = Object.create;
function Ctor() {}
function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor();
    Ctor.prototype = null;
    return result;
}
function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) Object.assign(result, props);
    return result;
}
function noop() {}

function equal(a, b) {
    return eq(a, b, [], []);
}
var toString = Object.prototype.toString;
function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
        // Strings, numbers, dates, and booleans are compared by value.
        case '[object String]':
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return a == String(b);
        case '[object Number]':
            // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
            // other numeric values.
            return a !== +a ? b !== +b : a === 0 ? 1 / a === 1 / b : a === +b;
        case '[object Date]':
        case '[object Boolean]':
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a == +b;
        // RegExps are compared by their source patterns and flags.
        case '[object RegExp]':
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
    }
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor,
        bCtor = b.constructor;
    if (aCtor !== bCtor && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)) {
        return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0,
        result$$1 = true;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
        // Compare array lengths to determine if a deep comparison is necessary.
        size = a.length;
        result$$1 = size === b.length;
        if (result$$1) {
            // Deep compare the contents, ignoring non-numeric properties.
            while (size--) {
                if (!(result$$1 = eq(a[size], b[size], aStack, bStack))) break;
            }
        }
    } else {
        // Deep compare objects.
        for (var key in a) {
            if (has(a, key)) {
                // Count the expected number of properties.
                size++;
                // Deep compare each member.
                if (!(result$$1 = has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
            }
        }
        // Ensure that both objects contain the same number of properties.
        if (result$$1) {
            for (key in b) {
                if (has(b, key) && !size--) break;
            }
            result$$1 = !size;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result$$1;
}

var hasReflect = typeof Reflect !== 'undefined' && isFunction(Reflect.construct);
var defaultInvoker = {
    get: function get(V) {
        if (hasReflect) return Reflect.construct(V, []);
        return new V();
    }
};
var Invoker = defaultInvoker;
/**
 * Set current  invoker.
 * If `i` is undefined, the defaultInvoker will be used
 *
 * @export
 * @param {IInvoker} [i]
 */
function setInvoker(i) {
    if (!i) i = defaultInvoker;
    Invoker = i;
}

var global$1 = getGlobal();
//
var debug = global$1.localStorage && global$1.localStorage.getItem("viewjs.debug") != null ? function (namespace) {
    return function () {
        var _console;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var l = args.length;
        if (l && isString(args[0])) {
            args[0] = namespace + ' ' + args[0];
        } else if (l) {
            args.unshift(namespace);
        } else return;
        (_console = console).log.apply(_console, toConsumableArray(args.map(function (m) {
            return isObject(m) && m instanceof Base ? String(m) : m;
        })));
    };
} : function (_) {
    return noop;
};




/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(5);

var utils_2 = __webpack_require__(3);

var abstract_view_1 = __webpack_require__(6);

var debug = utils_2.debug("View");
var unbubblebles = 'focus blur change'.split(' ');

var View =
/*#__PURE__*/
function (_abstract_view_1$Abst) {
  _inherits(View, _abstract_view_1$Abst);

  function View(options) {
    var _this;

    _classCallCheck(this, View);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(View).call(this));
    _this._options = utils_2.extend({}, options || {});
    _this._domEvents = [];
    _this._vid = utils_2.uniqueId('vid');
    if (_this._options.el) _this.setElement(_this._options.el);
    return _this;
  }

  _createClass(View, [{
    key: "delegateEvents",
    value: function delegateEvents(events) {
      var _this2 = this;

      if (!this.el) return;
      events = events || utils_2.result(this, 'events') || {};
      debug('%s delegate events %o', this, events);

      this._bindUIElements();

      events = utils_1.normalizeUIKeys(events, this._ui);

      var triggers = this._configureTriggers();

      events = utils_2.extend({}, events, triggers);
      if (!events) return this;
      var dels = [];

      for (var key in events) {
        var methods = events[key];
        var match = key.match(/^(\S+)\s*(.*)$/);
        if (!Array.isArray(methods)) methods = [methods];

        for (var i = 0, ii = methods.length; i < ii; i++) {
          var method = methods[i];
          if (typeof method !== 'function') method = this[method]; // Set delegates immediately and defer event on this.el

          var boundFn = method; // (<any>method).bind(this); // bind(<Function>method, this);

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
      debug('%s undelegate events', this);

      this._unbindUIElements();

      if (this.el) {
        for (var i = 0, len = this._domEvents.length; i < len; i++) {
          var item = this._domEvents[i];
          debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
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

      var id = utils_2.uniqueId();

      var domEvent = this._domEvents.find(function (m) {
        return m.eventName == eventName && m.selector == selector;
      });

      if (domEvent) {
        id = domEvent.id;
        domEvent.listeners.push(listener);
        return this;
      } else {
        domEvent = {
          id: id,
          selector: selector,
          listeners: [listener],
          eventName: eventName
        };
      }

      var root = this.el;
      var self = this;
      domEvent.handler = selector ? function (e) {
        var node = e.target || e.srcElement;
        if (e.delegateTarget) return;

        for (; node && node != root; node = node.parentNode) {
          if (node && utils_2.matches(node, selector)) {
            e.delegateTarget = node;
            debug("%s trigger %i listeners for '%s'-event on selector '%s'", self, domEvent.listeners.length, domEvent.eventName, domEvent.selector);
            domEvent.listeners.forEach(function (listener) {
              return listener.call(self, e);
            });
          }
        }
      } : function (e) {
        if (e.delegateTarget) return;
        domEvent.listeners.forEach(function (listener) {
          return listener.call(self, e);
        });
      };
      var useCap = !!~unbubblebles.indexOf(eventName) && selector != null;
      debug("%s delegate event '%s'", this, eventName);
      this.el.addEventListener(eventName, domEvent.handler, useCap);

      this._domEvents.push(domEvent);

      return this;
    }
  }, {
    key: "undelegate",
    value: function undelegate(eventName, selector, listener) {
      if (!this.el) return this;

      if (typeof selector === 'function') {
        listener = selector;
        selector = undefined;
      }

      var handlers = this._domEvents.slice();

      for (var i = 0, len = handlers.length; i < len; i++) {
        var item = handlers[i];
        var match = item.eventName === eventName && (listener ? !!~item.listeners.indexOf(listener) : true) && (selector ? item.selector === selector : true);
        if (!match) continue;

        if (listener && item.listeners.length == 1 || !listener) {
          debug("%s remove dom eventlistener for event '%s'", this, item.eventName);
          this.el.removeEventListener(item.eventName, item.handler);

          this._domEvents.splice(utils_2.indexOf(handlers, item), 1);
        } else {
          debug("%s remove listener for event '%s'", this, item.eventName);
          item.listeners.splice(utils_2.indexOf(item.listeners, listener), 1);
        }
      }

      return this;
    }
  }, {
    key: "render",
    value: function render() {
      debug("%s render", this);
      this.undelegateEvents();
      this.delegateEvents();
      return this;
    }
  }, {
    key: "setElement",
    value: function setElement(el) {
      this.undelegateEvents();

      if (this.el && this.options.attachId) {
        debug("%s remove view id attribute", this);
        this.el.removeAttribute('data-vid');
      }

      debug("%s set element", this, el);
      this._el = el;

      if (this.el && this.options.attachId) {
        debug("%s set view id attribute", this);
        this.el.setAttribute('data-vid', this.vid);
      }

      return this;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this._el;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      debug("%s destroy", this);

      if (this.el && this.options.attachId) {
        this.el.removeAttribute('data-vid');
      }

      ;
      this.setElement(void 0);

      _get(_getPrototypeOf(View.prototype), "destroy", this).call(this);

      return this;
    }
  }, {
    key: "_bindUIElements",
    value: function _bindUIElements() {
      var _this3 = this;

      if (!this._ui) {
        return;
      }

      var ui = this._ui;
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
    value: function _unbindUIElements() {
      debug("%s unbind ui elements", this);
      this.ui = {};
    }
  }, {
    key: "_configureTriggers",
    value: function _configureTriggers() {
      var triggers = this.triggers || {};
      triggers = utils_1.normalizeUIKeys(triggers, this._ui); // Configure the triggers, prevent default
      // action and stop propagation of DOM events

      var events = {},
          val,
          key;

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

      if (typeof triggerDef === 'string') triggerDef = {
        event: triggerDef
      };
      var options = utils_2.extend({
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

        utils_2.triggerMethodOn(_this4, options.event, {
          view: _this4
        }, e);
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[".concat(this.name || this.constructor.name, " ").concat(this.vid, "]");
    }
  }, {
    key: "events",
    set: function set(events) {
      if (this._events) {
        this.undelegateEvents();
      }

      this._events = utils_2.extend({}, events);
    },
    get: function get() {
      return utils_2.extend({}, this._events || {});
    } // Unique view id

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
  }]);

  return View;
}(abstract_view_1.AbstractView);

exports.View = View;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(3);

var kUIRegExp = /@(?:ui\.)?([a-zA-Z_\-\$#\d]+)/i;

function normalizeUIKeys(obj, uimap) {
  var o = {},
      k,
      v;

  for (k in obj) {
    v = obj[k];
    k = normalizeUIString(k, uimap);

    if (utils_1.has(o, k)) {
      if (!Array.isArray(o[k])) o[k] = [o[k]];
      o[k].push(v);
    } else {
      o[k] = v;
    }
  }

  return o;
}

exports.normalizeUIKeys = normalizeUIKeys;

function normalizeUIString(str, uimap) {
  var ms, ui, sel;

  if ((ms = kUIRegExp.exec(str)) != null) {
    ui = ms[1], sel = uimap[ui];
    if (sel != null) str = str.replace(ms[0], sel);
  }

  return str;
}

exports.normalizeUIString = normalizeUIString;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(3);

var AbstractView =
/*#__PURE__*/
function (_utils_1$Base) {
  _inherits(AbstractView, _utils_1$Base);

  function AbstractView() {
    _classCallCheck(this, AbstractView);

    return _possibleConstructorReturn(this, _getPrototypeOf(AbstractView).apply(this, arguments));
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
      return this.getElement();
    },
    set: function set(el) {
      this.setElement(el);
    }
  }]);

  return AbstractView;
}(utils_1.Base);

exports.AbstractView = AbstractView;

var Controller =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Controller, _AbstractView);

  function Controller() {
    _classCallCheck(this, Controller);

    return _possibleConstructorReturn(this, _getPrototypeOf(Controller).apply(this, arguments));
  }

  _createClass(Controller, [{
    key: "setElement",
    value: function setElement(el) {
      this._el = el;
      return this;
    }
  }, {
    key: "getElement",
    value: function getElement() {
      return this._el;
    }
  }]);

  return Controller;
}(AbstractView);

exports.Controller = Controller;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function __export(m) {
  for (var p in m) {
    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

__export(__webpack_require__(8));

__export(__webpack_require__(9));

__export(__webpack_require__(10));

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var base_view_1 = __webpack_require__(4);

var utils_1 = __webpack_require__(5);

var utils_2 = __webpack_require__(3);

var debug = utils_2.debug("withAtachedViews");

function withAttachedViews(Base) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));
        if (_this.views) _this._bindViews(_this.views);
        return _this;
      }

      _createClass(_class, [{
        key: "render",
        value: function render() {
          _get(_getPrototypeOf(_class.prototype), "render", this).call(this);

          this._renderViews(this.views);

          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          if (this.views) {
            this._unbindViews(this.views);
          }

          return _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);
        }
      }, {
        key: "_bindViews",
        value: function _bindViews(views) {
          var o;

          for (var key in views) {
            o = views[key];
            var view = utils_2.Invoker.get(o.view);
            this[key] = view;
          }
        }
      }, {
        key: "_unbindViews",
        value: function _unbindViews(views) {
          var self = this;

          for (var key in views) {
            if (self[key] && self[key] instanceof base_view_1.View) {
              self[key].destroy();
              delete self[key];
            }
          }
        }
      }, {
        key: "_renderViews",
        value: function _renderViews(views) {
          var el, o;
          debug("%s render attached views", this);

          for (var key in views) {
            o = views[key];
            var sel = utils_1.normalizeUIString(o.selector, this._ui || {});
            el = this.el.querySelector(sel);
            if (!el && !o.optional) throw new ReferenceError("selector \"".concat(sel, "\" for view ").concat(o.view.name, " not found in dom")); // No element - return!

            if (!el) return;
            var view = this[key];
            if (!view) throw new ReferenceError("view \"".concat(o.view.name, "\" not mount"));
            debug("%s render atcched view %s", this, view);
            view.el = el;
            view.render();
          }
        }
      }]);

      return _class;
    }(Base)
  );
}

exports.withAttachedViews = withAttachedViews;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(3);

function withElement(Base) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(_getPrototypeOf2, [this].concat(args)));
        if (!_this.el) _this._ensureElement();
        return _this;
      }

      _createClass(_class, [{
        key: "_ensureElement",
        value: function _ensureElement() {
          if (this.el) return;
          var tagName = utils_1.getOption('tagName', [this.options, this]) || 'div',
              className = utils_1.getOption('className', [this.options, this]),
              attr = utils_1.getOption('attributes', [this.options, this]),
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

          this.__created = true;
          this.el = el;
        }
      }, {
        key: "remove",
        value: function remove() {
          if (this.__created && this.el && this.el.parentNode) {
            if (typeof this.undelegateEvents === 'function') this.undelegateEvents();
            this.el.parentNode.removeChild(this.el);
            this.el = void 0;
          }

          this.__created = false;
          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);

          this.remove();
          return this;
        }
      }]);

      return _class;
    }(Base)
  );
}

exports.withElement = withElement;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(3);

var debug = utils_1.debug("withTemplate");

function withTemplate(Base) {
  return (
    /*#__PURE__*/
    function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "getTemplateData",
        value: function getTemplateData() {
          var data = utils_1.result(this, 'model') || {};
          debug("%s get template data", this);
          return data;
        }
      }, {
        key: "render",
        value: function render() {
          if (!this.el) return this;
          if (utils_1.isFunction(this.undelegateEvents)) this.undelegateEvents();
          this.renderTemplate();
          return _get(_getPrototypeOf(_class.prototype), "render", this).call(this);
        }
      }, {
        key: "destroy",
        value: function destroy() {
          var data = this.getTemplateData();

          try {
            var template = utils_1.result(this, 'template', data);
            if (template && this.el) this.el.innerHTML = '';
          } catch (e) {}

          return _get(_getPrototypeOf(_class.prototype), "destroy", this).call(this);
        }
      }, {
        key: "renderTemplate",
        value: function renderTemplate() {
          if (!this.el) return;
          var data = this.getTemplateData();
          var template = utils_1.result(this, 'template', data);
          if (!template) return;
          debug("%s render template", this);
          if (utils_1.isString(template)) this.el.innerHTML = template;else if (utils_1.isElement(template)) {
            this.el.appendChild(template);
          } else {
            this.el.innerHTML = '';
          }
        }
      }]);

      return _class;
    }(Base)
  );
}

exports.withTemplate = withTemplate;

/***/ })
/******/ ]);