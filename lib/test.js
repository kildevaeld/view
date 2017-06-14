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
const view_1 = require("./view");
const slick_di_1 = require("slick-di");
const decorators_1 = require("./decorators");
const mixins_1 = require("./mixins");
const utils_1 = require("./utils");
const collection_view_1 = require("./collection-view");
let Rapper = class Rapper {
    constructor() {
        this.id = utils_1.uniqueId();
    }
};
Rapper = __decorate([
    slick_di_1.singleton()
], Rapper);
exports.Rapper = Rapper;
var container = new slick_di_1.Container();
mixins_1.ViewMountable.Invoker = container;
class ChildView extends view_1.View {
    constructor() {
        super(...arguments);
        this.template = (data) => `${data.name}`;
    }
    render() {
        super.render();
        this.el.setAttribute('data-id', this.data.id + '');
        this.el.classList.add('item');
        return this;
    }
}
exports.ChildView = ChildView;
;
let List = class List extends collection_view_1.CollectionView {
    constructor(rapper) {
        super();
        this.childView = ChildView;
        this.collection = new collection_view_1.ArrayCollection([
            { name: 'Test 1', id: 1 }, { name: 'Test 2', id: 2 }
        ]);
        console.log(rapper);
    }
    onClick(e) {
        let id = e.delegateTarget.getAttribute('data-id');
        let m = this.collection.find(m => {
            return m.id == parseInt(id);
        });
        this.collection.remove(this.collection.indexOf(m));
    }
};
__decorate([
    decorators_1.event.click('.item'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], List.prototype, "onClick", null);
List = __decorate([
    slick_di_1.autoinject,
    __metadata("design:paramtypes", [Rapper])
], List);
exports.List = List;
let TestView = class TestView extends mixins_1.ViewObservable(view_1.View) {
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
    onHeaderClicked(e) {
        console.log('Clicked', e);
    }
};
__decorate([
    decorators_1.event.click('@header'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], TestView.prototype, "onHeaderClicked", null);
TestView = __decorate([
    slick_di_1.autoinject,
    decorators_1.attributes({
        ui: {
            header: 'h1'
        }
    }),
    __metadata("design:paramtypes", [Rapper])
], TestView);
exports.TestView = TestView;
class TestController extends controller_1.ViewController {
    constructor() {
        super();
        this.view1.on('*', (event) => {
            console.log(event);
        });
    }
}
__decorate([
    decorators_1.view('.view1'),
    __metadata("design:type", TestView)
], TestController.prototype, "view1", void 0);
__decorate([
    decorators_1.view('.view2'),
    __metadata("design:type", List)
], TestController.prototype, "list", void 0);
exports.TestController = TestController;
