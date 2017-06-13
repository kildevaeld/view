"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_view_1 = require("./base-view");
const view_1 = require("./view");
const utils_1 = require("./utils");
function ArrayCollection(a) {
    return new class {
        constructor(a) {
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
    }(a);
}
exports.ArrayCollection = ArrayCollection;
class BaseCollectionView extends base_view_1.BaseView {
    set collection(collection) {
        if (this._collection == collection)
            return;
        this._collection = collection;
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
            let el = this._createChildView(item);
            frag.appendChild(el.render().el);
            this._childViews.push(el);
        }
        container.appendChild(frag);
    }
    _createChildView(model) {
        let V = this.options.childView || this.childView || view_1.View;
        let options = utils_1.extend({}, this.options.childViewOptions || {}, {
            ensureElement: "div"
        });
        let el = new V(options);
        el.data = model;
        return el;
    }
    _getChildViewContainer() {
        if (!this.options.childViewContainer)
            return this.el;
        let el = this.el.querySelector(this.options.childViewContainer);
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
