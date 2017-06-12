"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const template_view_1 = require("./template-view");
const slick_di_1 = require("slick-di");
class Rapper {
}
let TestView = class TestView extends template_view_1.View {
    constructor(rapper) {
        super();
        console.log(rapper);
    }
    template(data = {}) {
        return `<h1>Hello, ${data.what}!</h1>`;
    }
    data() {
        return { what: 'World' };
    }
};
TestView = __decorate([
    slick_di_1.autoinject,
    __metadata("design:paramtypes", [Rapper])
], TestView);
exports.TestView = TestView;
class TestController extends controller_1.Controller {
}
__decorate([
    controller_1.view('.view1'),
    __metadata("design:type", TestView)
], TestController.prototype, "view1", void 0);
exports.TestController = TestController;
