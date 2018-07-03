(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@viewjs/utils')) :
    typeof define === 'function' && define.amd ? define(['exports', '@viewjs/utils'], factory) :
    (factory((global.viewjs = global.viewjs || {}, global.viewjs.view = {}),global.viewjs.utils));
}(this, (function (exports,utils) { 'use strict';

    // Because IE/edge stinks!
    var ElementProto = typeof Element !== 'undefined' && Element.prototype || {};
    var matchesSelector = ElementProto.matches || ElementProto.webkitMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.msMatchesSelector || ElementProto.oMatchesSelector || function (selector) {
        var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
        return !!~utils.indexOf(nodeList, this);
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

    var AbstractView = function () {
        function AbstractView() {
            classCallCheck(this, AbstractView);
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
                return this._el;
            },
            set: function set$$1(el) {
                this.setElement(el);
            }
        }]);
        return AbstractView;
    }();

    var unbubblebles = 'focus blur change'.split(' ');

    var BaseView = function (_AbstractView) {
        inherits(BaseView, _AbstractView);

        function BaseView(_options) {
            classCallCheck(this, BaseView);

            var _this = possibleConstructorReturn(this, (BaseView.__proto__ || Object.getPrototypeOf(BaseView)).call(this));

            _this._options = _options;
            _this._options = _this._options || {};
            _this.setElement(_options.el, false);
            _this._domEvents = [];
            _this._vid = utils.uniqueId('vid');
            return _this;
        }

        createClass(BaseView, [{
            key: 'delegateEvents',
            value: function delegateEvents(events) {
                var _this2 = this;

                if (!this.el) return;
                this._bindUIElements();
                events = events || utils.result(this, 'events') || {};
                events = normalizeUIKeys(events, this._ui);
                var triggers = this._configureTriggers();
                events = utils.extend({}, events, triggers);
                if (!events) return this;
                //if (!(events || (events = result(this, 'events')))) return this;
                this.undelegateEvents();
                var dels = [];
                for (var key in events) {
                    var methods = events[key];
                    var match = key.match(/^(\S+)\s*(.*)$/);
                    if (!Array.isArray(methods)) methods = [methods];
                    for (var i = 0, ii = methods.length; i < ii; i++) {
                        var method = methods[i];
                        if (typeof method !== 'function') method = this[method];
                        // Set delegates immediately and defer event on this.el
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
            key: 'undelegateEvents',
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
            key: 'delegate',
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
                this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
                return handler;
            }
        }, {
            key: 'undelegate',
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
                        this._domEvents.splice(utils.indexOf(handlers, item), 1);
                    }
                }
                return this;
            }
        }, {
            key: 'render',
            value: function render() {
                this.undelegateEvents();
                this.delegateEvents();
                return this;
            }
        }, {
            key: 'setElement',
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
            key: 'destroy',
            value: function destroy() {
                this.undelegateEvents();
                if (this.el && this.options.attachId) {
                    this.el.removeAttribute('data-vid');
                }
                get(BaseView.prototype.__proto__ || Object.getPrototypeOf(BaseView.prototype), 'destroy', this).call(this);
                return this;
            }
        }, {
            key: '_bindUIElements',
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
                        _this3.ui[k] = elm;
                    }
                });
            }
        }, {
            key: '_unbindUIElements',
            value: function _unbindUIElements() {}
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
                    events[key] = this._buildViewTrigger(val);
                }
                return events;
            }
        }, {
            key: '_buildViewTrigger',
            value: function _buildViewTrigger(triggerDef) {
                var _this4 = this;

                if (typeof triggerDef === 'string') triggerDef = { event: triggerDef };
                var options = utils.extend({
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
                    utils.triggerMethodOn(_this4, options.event, {
                        view: _this4
                    }, e);
                };
            }
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
        }], [{
            key: 'find',
            value: function find(selector, context) {
                return context.querySelectorAll(selector);
            }
        }]);
        return BaseView;
    }(AbstractView);

    var View = function (_BaseView) {
        inherits(View, _BaseView);

        function View() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { attachId: true };
            classCallCheck(this, View);
            return possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
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
            utils.extend(target.prototype, attrs);
        };
    }
    function event(eventName, selector) {
        return function (target, property, desc) {
            if (!desc) throw new Error('no description');
            if (typeof desc.value !== 'function') {
                throw new TypeError('must be a function');
            }
            var key = eventName + ' ' + selector;
            if (target.events && utils.has(target.events, key)) {
                var old = target.events[key];
                if (!Array.isArray(old)) old = [old];
                old.push(property);
                target.events[key] = old;
            } else {
                target.events = utils.extend(target.events || {}, defineProperty({}, key, property));
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

    var Controller = function (_AbstractView) {
        inherits(Controller, _AbstractView);

        function Controller() {
            classCallCheck(this, Controller);
            return possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
        }

        createClass(Controller, [{
            key: 'setElement',
            value: function setElement(el) {
                this._el = el;
                return this;
            }
        }]);
        return Controller;
    }(AbstractView);

    function withAttachedViews(Base) {
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
                        var view = exports.Invoker.get(o.view);
                        this[key] = view;
                    }
                }
            }, {
                key: '_unbindViews',
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
                key: '_renderViews',
                value: function _renderViews(views) {
                    var el = void 0,
                        o = void 0;
                    for (var key in views) {
                        o = views[key];
                        var sel = normalizeUIString(o.selector, this._ui || {});
                        el = this.el.querySelector(sel);
                        if (!el && !o.optional) throw new ReferenceError('selector "' + sel + '" for view ' + o.view.name + ' not found in dom');
                        // No element - return!
                        if (!el) return;
                        var view = this[key];
                        if (!view) throw new ReferenceError('view "' + o.view.name + '" not mount');
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
                    var tagName = utils.getOption('tagName', [this.options, this]) || 'div',
                        className = utils.getOption('className', [this.options, this]),
                        attr = utils.getOption('attributes', [this.options, this]),
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
                key: 'remove',
                value: function remove() {
                    if (this.el && this.el.parentNode) {
                        if (typeof this.undelegateEvents === 'function') this.undelegateEvents();
                        this.el.parentNode.removeChild(this.el);
                        this.el = void 0;
                    }
                    return this;
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
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
            inherits(_class, _Base);

            function _class() {
                classCallCheck(this, _class);
                return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            createClass(_class, [{
                key: 'getTemplateData',
                value: function getTemplateData() {
                    var data = utils.result(this, 'model') || {};
                    return data;
                }
            }, {
                key: 'render',
                value: function render() {
                    if (!this.el) return this;
                    if (utils.isFunction(this.undelegateEvents)) this.undelegateEvents();
                    this.renderTemplate();
                    return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'render', this).call(this);
                }
            }, {
                key: 'destroy',
                value: function destroy() {
                    var data = this.getTemplateData();
                    try {
                        var template = utils.result(this, 'template', data);
                        if (template && this.el) this.el.innerHTML = '';
                    } catch (e) {}
                    return get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'destroy', this).call(this);
                }
            }, {
                key: 'renderTemplate',
                value: function renderTemplate() {
                    if (!this.el) return;
                    var data = this.getTemplateData();
                    var template = utils.result(this, 'template', data);
                    if (!template) return;
                    if (utils.isString(template)) this.el.innerHTML = template;else if (utils.isElement(template)) {
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
    exports.event = event;
    exports.attach = attach;
    exports.BaseView = BaseView;
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
