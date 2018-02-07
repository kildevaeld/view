"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
;
;
exports.Invoker = {
  get: function get(V) {
    return Reflect.construct(V, []);
  }
};

function setInvoker(i) {
  exports.Invoker = i;
}

exports.setInvoker = setInvoker;