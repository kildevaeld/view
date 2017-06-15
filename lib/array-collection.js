"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    sort(fn) {
        this.a.sort(fn);
        this.trigger('sort');
    }
    clear() {
        this.a = [];
        this.trigger(ModelEvents.Clear);
    }
    array() { return [...this.a]; }
}
exports.ArrayCollection = ArrayCollection;
var ModelEvents;
(function (ModelEvents) {
    ModelEvents.Add = "add";
    ModelEvents.Remove = "remove";
    ModelEvents.Clear = "clear";
    ModelEvents.Sort = "sort";
})(ModelEvents = exports.ModelEvents || (exports.ModelEvents = {}));
