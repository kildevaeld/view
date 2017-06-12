"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("./event-emitter");
class AbstractView extends event_emitter_1.EventEmitter {
    get el() { return this._el; }
    set el(el) { this.setElement(el); }
    render() { return this; }
    destroy() { this.off(); }
}
exports.AbstractView = AbstractView;
