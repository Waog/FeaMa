/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../app/ts/Calculations/Calculations.ts" />

/**
 * Globals
 */
var expect = chai.expect;

/**
 * Unit tests
 */
describe('Calculations Unit Tests:',() => {

    describe('positive test',() => {
        it('should never fail',(done) => {
            expect(1).to.equals(1);
            done();
        });
    });

    describe('SimpleMath',() => {
        it('should return 2 for 1 + 1',(done) => {
            var simpleMath = new Calculations.SimpleMath();
            expect(simpleMath.addTwoNumbers(1, 1)).to.equals(2);
            done();
        });
    });

    describe('TeddyMocks',() => {
        it('should Stub objects like described in their readme',(done) => {
            var expected = 123;
            var stub = new TeddyMocks.Stub<GithubApi.GithubLogin>(GithubApi.GithubLogin);

            stub.stubs(m => m.getHello()).andReturns(null);
            expect(stub.object.getHello()).to.equal(null);

            expect(stub.assertsThat(s => s.getHello()).wasCalled()).to.equal(true);

            done();
        });

        it('should replace globals with GlobalStub',(done) => {
            
//            var xmlhttp = new XMLHttpRequest();
//            
//            expect(xmlhttp.send).to.be.instanceOf(Function);
//            
//            TeddyMocks.GlobalOverride.createScope(() => {
//
//                var globalStub = new TeddyMocks.GlobalStub<XMLHttpRequest>("XMLHttpRequest");
//                globalStub.stubs(s => s.send(undefined), false);
//
//                var request = new XMLHttpRequest();
//                request.send(undefined);
//
//                expect(globalStub.assertsThat(s => s.send(undefined)).wasCalled()).to.equal(true);
//            });
            done();
        });
    });
});