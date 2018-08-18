const Route = require('../lib/route').Route,
    pathToReqexp = require('path-to-regexp'),
    isRegexpEqual = require('is-equal-regex'),
    noop = require('@viewjs/utils').noop;


describe('Route', () => {

    it('should instantiate', () => {

        const route = new Route('/', () => {});
        route.path.should.be.equal('/');
        route.paramNames.length.should.be.equal(0);
        route.stack.length.should.equal(1);
        isRegexpEqual(route.regexp, pathToReqexp('/'));
    });

    it('should match', () => {

        const route = new Route('/', noop);
        route.match("/").should.be.true();
        (new Route("/test", noop)).match("/test").should.be.true();
        (new Route("/:test*", noop)).match("/test2").should.be.true();
        (new Route("/:test*", noop)).match("/test2/ost").should.be.false();
        (new Route("/:test*", noop, {
            end: true,
            strict: false,
            sensitive: false
        })).match("/test2/ost").should.be.true();
    });

});