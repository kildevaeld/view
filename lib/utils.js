"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.callFunc = callFunc;

function result(obj, prop) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (isFunction(obj[prop])) return obj[prop].apply(obj, args);
  return obj[prop];
}

exports.result = result;

function getOption(option, objs) {
  for (var i = 0, ii = objs.length; i < ii; i++) {
    if (isObject(objs[i]) && objs[i][option]) return objs[i][option];
  }

  return undefined;
}

exports.getOption = getOption;
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

function isElement(a) {
  return a instanceof Element;
}

exports.isElement = isElement;

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
var idCounter = 0;

function uniqueId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return prefix + ++idCounter;
}

exports.uniqueId = uniqueId;

function indexOf(array, item) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === item) return i;
  }

  return -1;
}

exports.indexOf = indexOf; // Because IE/edge stinks!

var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};

var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
  var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
  return !!~indexOf(nodeList, this);
};

function matches(elm, selector) {
  return matchesSelector.call(elm, selector);
}

exports.matches = matches;
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