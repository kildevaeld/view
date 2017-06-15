"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const view_1 = require("./view");
const mixins_1 = require("./mixins");
const event_emitter_1 = require("./event-emitter");
class ArrayCollection extends event_emitter_1.EventEmitter {
    constructor(a = []) {
        super();
        this.a = a;
    }
    get length() {
        return this.a.length;
    }
    item(index) {
        if (index >= this.a.length)
            return undefined;
        return this.a[index];
    }
    push(m) {
        this.a.push(m);
        this.trigger(ModelEvents.Add, m, this.a.length - 1);
    }
    pop() {
        let m = this.a.pop();
        this.trigger(ModelEvents.Remove, m, this.a.length);
        return m;
    }
    insert(m, index) {
        if (index >= this.length)
            return;
        this.a.splice(index, 0, m);
        this.trigger(ModelEvents.Add, m, index);
    }
    indexOf(m) {
        return this.a.indexOf(m);
    }
    remove(index) {
        let m = this.item(index);
        if (!m)
            return undefined;
        this.a.splice(index, 1);
        this.trigger(ModelEvents.Remove, m, index);
        return m;
    }
    find(fn) {
        return this.a.find(fn);
    }
    clear() {
        this.a = [];
        this.trigger(ModelEvents.Clear);
    }
    array() { return this.a; }
}
exports.ArrayCollection = ArrayCollection;
var ModelEvents;
(function (ModelEvents) {
    ModelEvents.Add = "add";
    ModelEvents.Remove = "remove";
    ModelEvents.Clear = "clear";
})(ModelEvents = exports.ModelEvents || (exports.ModelEvents = {}));
class BaseCollectionView extends base_view_1.BaseView {
    set collection(collection) {
        if (this._collection == collection)
            return;
        if (this.collection) {
            this._removeModelEvents();
            this._removeChildViews();
        }
        this._collection = collection;
        if (this.collection) {
            this._addModelEvents();
        }
        this.render();
    }
    get collection() {
        return this._collection;
    }
    render() {
        this.undelegateEvents();
        this._removeChildViews();
        if (!this.el || !this.collection)
            return this;
        this._renderCollection();
        this.delegateEvents();
        return this;
    }
    _removeChildViews() {
        if (!this._childViews) {
            this._childViews = [];
        }
        for (let v of this._childViews) {
            v.destroy();
            v.el.remove();
        }
        this._childViews = [];
    }
    _renderCollection(collection) {
        let col = collection || this.collection;
        let container = this._getChildViewContainer();
        container.innerHTML = '';
        const frag = document.createDocumentFragment();
        for (let i = 0, ii = col.length; i < ii; i++) {
            let item = col.item(i);
            if (!item)
                throw TypeError("invalid index");
            let view = this._createChildView(item);
            this._renderChildView(view);
            this._attachChildView(frag, view, i);
        }
        container.appendChild(frag);
    }
    _renderChildView(view) {
        view.render();
    }
    _attachChildView(container, view, index) {
        if (index >= this._childViews.length) {
            container.appendChild(view.el);
            this._childViews.push(view);
        }
        else {
            let after = this._childViews[index];
            this._childViews.splice(index, 0, view);
            container.insertBefore(view.el, after.el);
        }
    }
    _createChildView(model) {
        let Vi = this.options.childView || this.childView || view_1.View;
        let el = mixins_1.ViewMountable.Invoker.get(Vi);
        el.data = model;
        if (!el.options.ensureElement)
            el.options.ensureElement = 'div';
        el.options.attachId = true;
        return el;
    }
    _destroyChildView(view) {
        let index = this._childViews.indexOf(view);
        this._childViews.splice(index, 1);
        let container = this._getChildViewContainer();
        container.removeChild(view.el);
        view.destroy();
    }
    _modelAdded(item, index) {
        let view = this._createChildView(item);
        this._renderChildView(view);
        this._attachChildView(this._getChildViewContainer(), view, index);
    }
    _modelRemoved(_, index) {
        let view = this._childViews[index];
        this._destroyChildView(view);
    }
    _addModelEvents() {
        if (this.collection instanceof event_emitter_1.EventEmitter) {
            this.collection.on(ModelEvents.Add, this._modelAdded, this);
            this.collection.on(ModelEvents.Remove, this._modelRemoved, this);
            this.collection.on(ModelEvents.Clear, this._removeChildViews, this);
        }
    }
    _removeModelEvents() {
        if (this.collection instanceof event_emitter_1.EventEmitter) {
            this.collection.off(null, undefined, this);
        }
    }
    _getChildViewContainer() {
        let sel = this.options.childViewContainer || this.childViewContainer;
        if (!sel)
            return this.el;
        let el = this.el.querySelector(sel);
        if (!el)
            throw new Error(`tag not found: ${this.options.childViewContainer}`);
        return el;
    }
    destroy() {
        this._removeChildViews();
        super.destroy();
    }
}
exports.BaseCollectionView = BaseCollectionView;
class CollectionView extends BaseCollectionView {
}
exports.CollectionView = CollectionView;
