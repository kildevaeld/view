describe('checkers', () => {

    const utils = viewjs.utils;

    it("isObject", () => {
        utils.isObject({}).should.equal(true);
        utils.isObject(new function () {}).should.equal(true);
        utils.isObject(Object.create(null)).should.equal(true);
        utils.isObject(Object.create({})).should.equal(true);

        utils.isObject([]).should.equal(false);
        utils.isObject("test str").should.equal(false);
        utils.isObject(1000).should.equal(false);
        utils.isObject(false).should.equal(false);
        utils.isObject(true).should.equal(false);
        utils.isObject(() => {}).should.equal(false);
        utils.isObject(function () {}).should.equal(false);

    });

    it("isObjectLike", () => {
        utils.isObjectLike({}).should.equal(true);
        utils.isObjectLike(new function () {}).should.equal(true);
        utils.isObjectLike(Object.create(null)).should.equal(true);
        utils.isObjectLike(Object.create({})).should.equal(true);
        utils.isObjectLike(() => {}).should.equal(true);
        utils.isObjectLike(function () {}).should.equal(true);
        utils.isObjectLike([]).should.equal(true);

        utils.isObjectLike("test str").should.equal(false);
        utils.isObjectLike(1000).should.equal(false);
        utils.isObjectLike(false).should.equal(false);
        utils.isObjectLike(true).should.equal(false);


    });

    it("isPlainObject", () => {
        utils.isPlainObject({}).should.equal(true);
        utils.isPlainObject(Object.create({})).should.equal(true);
        utils.isObject(Object.create(null)).should.equal(true);

        utils.isPlainObject(() => {}).should.equal(false);
        utils.isPlainObject(new function () {}, false);
        utils.isObject([]).should.equal(false);
        utils.isObject("test str").should.equal(false);
        utils.isObject(1000).should.equal(false);
        utils.isObject(false).should.equal(false);
        utils.isObject(true).should.equal(false);
    });

    it("isString", () => {
        utils.isString("").should.equal(true);
        utils.isString(true).should.equal(false);
        utils.isString(function () {}).should.equal(false);
    });

    it("isFunction", () => {
        utils.isFunction(() => {}).should.equal(true);
        utils.isFunction(function () {}).should.equal(true);
        utils.isFunction(class {}).should.equal(true);

        utils.isFunction("").should.equal(false);
    });

    it.skip("isConstructor", () => {
        utils.isConstructor(() => {}).should.equal(false);
        utils.isConstructor(function () {}).should.equal(true);
        utils.isConstructor(class {}).should.equal(true);
    });


});