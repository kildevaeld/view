import { extend, has, callFuncCtx, Base, triggerMethodOn, uniqueId, indexOf, result, debug, matches, Invoker, getOption, isFunction, isString, isElement } from '@viewjs/utils';

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

var defineProperty = function (obj, key, value) {
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
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
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
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
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
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

function className(name) {
    return function (target) {
        Object.defineProperty(target, "name", { value: name });
    };
}
function attributes(attrs) {
    return function (target) {
        extend(target.prototype, attrs);
    };
}
function event(eventName, selector) {
    return function (target, property, desc) {
        if (!desc) throw new Error('no description');
        if (typeof desc.value !== 'function') {
            throw new TypeError('must be a function');
        }
        var key = eventName + ' ' + selector;
        if (target.events && has(target.events, key)) {
            var old = target.events[key];
            if (!Array.isArray(old)) old = [old];
            old.push(property);
            target.events[key] = old;
        } else {
            target.events = extend(target.events || {}, defineProperty({}, key, property));
        }
    };
}
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
                return callFuncCtx(oldValue, args, this);
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
})(event || (event = {}));
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
        if (!View) throw new Error('design:type does not exists for prop \'' + prop + '\' on \'' + target + '\'');
        if (!target.views) target.views = {};
        target.views[prop] = {
            selector: selector,
            view: View,
            optional: typeof options.optional !== 'boolean' ? false : options.optional
        };
    };
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

var AbstractView = function (_Base) {
    inherits(AbstractView, _Base);

    function AbstractView() {
        classCallCheck(this, AbstractView);
        return possibleConstructorReturn(this, (AbstractView.__proto__ || Object.getPrototypeOf(AbstractView)).apply(this, arguments));
    }

    createClass(AbstractView, [{
        key: 'render',
        value: function render() {
            return this;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            return this;
        }
    }, {
        key: 'el',
        get: function get$$1() {
            return this.getElement();
        },
        set: function set$$1(el) {
            this.setElement(el);
        }
    }]);
    return AbstractView;
}(Base);

var debug$1 = debug("View");
var unbubblebles = 'focus blur change'.split(' ');

var View = function (_AbstractView) {
    inherits(View, _AbstractView);

    function View(options) {
        classCallCheck(this, View);

        var _this = possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));

        _this._options = extend({}, options || {});
        _this._domEvents = [];
        _this._vid = uniqueId('vid');
        if (_this._options.el) _this.setElement(_this._options.el);
        return _this;
    }

    createClass(View, [{
        key: 'delegateEvents',
        value: function delegateEvents(events) {
            var _this2 = this;

            if (!this.el) return;
            events = events || result(this, 'events') || {};
            debug$1('%s delegate events %o', this, events);
            this._bindUIElements();
            events = normalizeUIKeys(events, this._ui);
            var triggers = this._configureTriggers();
            events = extend({}, events, triggers);
            if (!events) return this;
            var dels = [];
            for (var key in events) {
                var methods = events[key];
                var match = key.match(/^(\S+)\s*(.*)$/);
                if (!Array.isArray(methods)) methods = [methods];
                for (var i = 0, ii = methods.length; i < ii; i++) {
                    var method = methods[i];
                    if (typeof method !== 'function') method = this[method];
                    // Set delegates immediately and defer event on this.el
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
        key: 'undelegateEvents',
        value: function undelegateEvents() {
            if (!this.el) return this;
            debug$1('%s undelegate events', this);
            this._unbindUIElements();
            if (this.el) {
                for (var i = 0, len = this._domEvents.length; i < len; i++) {
                    var item = this._domEvents[i];
                    debug$1("%s remove dom eventlistener for event '%s'", this, item.eventName);
                    this.el.removeEventListener(item.eventName, item.handler);
                }
                this._domEvents.length = 0;
            }
            return this;
        }
    }, {
        key: 'delegate',
        value: function delegate(eventName, selector, listener) {
            if (!this.el) return this;
            if (typeof selector === 'function') {
                listener = selector;
                selector = undefined;
            }
            var id = uniqueId();
            var domEvent = this._domEvents.find(function (m) {
                return m.eventName == eventName && m.selector == selector;
            });
            if (domEvent) {
                id = domEvent.id;
                domEvent.listeners.push(listener);
                return this;
            } else {
                domEvent = { id: id, selector: selector, listeners: [listener], eventName: eventName };
            }
            var root = this.el;
            var self = this;
            domEvent.handler = selector ? function (e) {
                var node = e.target || e.srcElement;
                if (e.delegateTarget) return;
                for (; node && node != root; node = node.parentNode) {
                    if (node && matches(node, selector)) {
                        e.delegateTarget = node;
                        debug$1("%s trigger %i listeners for '%s'-event on selector '%s'", self, domEvent.listeners.length, domEvent.eventName, domEvent.selector);
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
            debug$1("%s delegate event '%s'", this, eventName);
            this.el.addEventListener(eventName, domEvent.handler, useCap);
            this._domEvents.push(domEvent);
            return this;
        }
    }, {
        key: 'undelegate',
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
                    debug$1("%s remove dom eventlistener for event '%s'", this, item.eventName);
                    this.el.removeEventListener(item.eventName, item.handler);
                    this._domEvents.splice(indexOf(handlers, item), 1);
                } else {
                    debug$1("%s remove listener for event '%s'", this, item.eventName);
                    item.listeners.splice(indexOf(item.listeners, listener), 1);
                }
            }
            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            debug$1("%s render", this);
            this.undelegateEvents();
            this.delegateEvents();
            return this;
        }
    }, {
        key: 'setElement',
        value: function setElement(el) {
            this.undelegateEvents();
            if (this.el && this.options.attachId) {
                debug$1("%s remove view id attribute", this);
                this.el.removeAttribute('data-vid');
            }
            debug$1("%s set element", this, el);
            this._el = el;
            if (this.el && this.options.attachId) {
                debug$1("%s set view id attribute", this);
                this.el.setAttribute('data-vid', this.vid);
            }
            return this;
        }
    }, {
        key: 'getElement',
        value: function getElement() {
            return this._el;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            debug$1("%s destroy", this);
            if (this.el && this.options.attachId) {
                this.el.removeAttribute('data-vid');
            }
            this.setElement(void 0);
            get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'destroy', this).call(this);
            return this;
        }
    }, {
        key: '_bindUIElements',
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
                    debug$1('%s added ui element %s %s', _this3, k, ui[k]);
                    _this3.ui[k] = elm;
                } else {
                    debug$1('%s ui element not found ', _this3, k, ui[k]);
                }
            });
        }
    }, {
        key: '_unbindUIElements',
        value: function _unbindUIElements() {
            debug$1("%s unbind ui elements", this);
            this.ui = {};
        }
    }, {
        key: '_configureTriggers',
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
                debug$1('%s added trigger %s %s', this, key, val);
                events[key] = this._buildViewTrigger(val);
            }
            return events;
        }
    }, {
        key: '_buildViewTrigger',
        value: function _buildViewTrigger(triggerDef) {
            var _this4 = this;

            if (typeof triggerDef === 'string') triggerDef = { event: triggerDef };
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
        key: 'toString',
        value: function toString() {
            return '[' + (this.name || this.constructor.name) + ' ' + this.vid + ']';
        }
    }, {
        key: 'events',
        set: function set$$1(events) {
            if (this._events) {
                this.undelegateEvents();
            }
            this._events = extend({}, events);
        },
        get: function get$$1() {
            return extend({}, this._events || {});
        }
        // Unique view id

    }, {
        key: 'vid',
        get: function get$$1() {
            return this._vid;
        }
    }, {
        key: 'options',
        get: function get$$1() {
            return this._options;
        }
    }]);
    return View;
}(AbstractView);

var debug$2 = debug("withAtachedViews");
function withAttachedViews(Base$$1) {
    return function (_Base) {
        inherits(_class, _Base);

        function _class() {
            var _ref;

            classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

            if (_this.views) _this._bindViews(_this.views);
            return _this;
        }

        createClass(_class, [{
            key: 'render',
            value: function render() {
                get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
                this._renderViews(this.views);
                return this;
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (this.views) {
                    this._unbindViews(this.views);
                }
                return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
            }
        }, {
            key: '_bindViews',
            value: function _bindViews(views) {
                var o = void 0;
                for (var key in views) {
                    o = views[key];
                    var view = Invoker.get(o.view);
                    this[key] = view;
                }
            }
        }, {
            key: '_unbindViews',
            value: function _unbindViews(views) {
                var self = this;
                for (var key in views) {
                    if (self[key] && self[key] instanceof View) {
                        self[key].destroy();
                        delete self[key];
                    }
                }
            }
        }, {
            key: '_renderViews',
            value: function _renderViews(views) {
                var el = void 0,
                    o = void 0;
                debug$2("%s render attached views", this);
                for (var key in views) {
                    o = views[key];
                    var sel = normalizeUIString(o.selector, this._ui || {});
                    el = this.el.querySelector(sel);
                    if (!el && !o.optional) throw new ReferenceError('selector "' + sel + '" for view ' + o.view.name + ' not found in dom');
                    // No element - return!
                    if (!el) return;
                    var view = this[key];
                    if (!view) throw new ReferenceError('view "' + o.view.name + '" not mount');
                    debug$2("%s render atcched view %s", this, view);
                    view.el = el;
                    view.render();
                }
            }
        }]);
        return _class;
    }(Base$$1);
}

function withElement(Base$$1) {
    return function (_Base) {
        inherits(_class, _Base);

        function _class() {
            var _ref;

            classCallCheck(this, _class);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var _this = possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

            if (!_this.el) _this._ensureElement();
            return _this;
        }

        createClass(_class, [{
            key: '_ensureElement',
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
                this.__created = true;
                this.el = el;
            }
        }, {
            key: 'remove',
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
            key: 'destroy',
            value: function destroy() {
                get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
                this.remove();
                return this;
            }
        }]);
        return _class;
    }(Base$$1);
}

var debug$3 = debug("withTemplate");
function withTemplate(Base$$1) {
    return function (_Base) {
        inherits(_class, _Base);

        function _class() {
            classCallCheck(this, _class);
            return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
        }

        createClass(_class, [{
            key: 'getTemplateData',
            value: function getTemplateData() {
                var data = result(this, 'model') || {};
                debug$3("%s get template data", this);
                return data;
            }
        }, {
            key: 'render',
            value: function render() {
                if (!this.el) return this;
                if (isFunction(this.undelegateEvents)) this.undelegateEvents();
                this.renderTemplate();
                return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                var data = this.getTemplateData();
                try {
                    var template = result(this, 'template', data);
                    if (template && this.el) this.el.innerHTML = '';
                } catch (e) {}
                return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
            }
        }, {
            key: 'renderTemplate',
            value: function renderTemplate() {
                if (!this.el) return;
                var data = this.getTemplateData();
                var template = result(this, 'template', data);
                if (!template) return;
                debug$3("%s render template", this);
                if (isString(template)) this.el.innerHTML = template;else if (isElement(template)) {
                    this.el.appendChild(template);
                } else {
                    this.el.innerHTML = '';
                }
            }
        }]);
        return _class;
    }(Base$$1);
}

export { className, attributes, event, attach, View, normalizeUIKeys, normalizeUIString, AbstractView, withAttachedViews, withElement, withTemplate };
