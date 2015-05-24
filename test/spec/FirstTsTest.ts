/// <reference path="../../typings/mocha/mocha.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../app/ts/Calculations/Calculations.ts" />

/**
 * Globals
 */
var expect = chai.expect;

chai.config.includeStack = true;

/**
 * Unit tests
 */
describe('Test Framework Tests:',() => {

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

module GithubApi {

    class UserLoginHandlerMock implements UserLoginHandler {
        handleUserLogin(login: GithubLogin) { console.error("method should be replaced by mock"); }
    }

    describe('GithubApi:',() => {
        describe('GithubLogin:',() => {

            var loginHandler: TeddyMocks.Stub<UserLoginHandler> = null;
            var githubLogin: GithubLogin = null;

            beforeEach(function() {
                loginHandler = new TeddyMocks.Stub<UserLoginHandler>(UserLoginHandlerMock);
                githubLogin = new GithubLogin(loginHandler.object);
                loginHandler.stubs(m => m.handleUserLogin(githubLogin));
                expect(githubLogin).to.be.ok;
            })

            describe('#constructor()',() => {
                it('should work properly',() => {
                    expect(githubLogin).to.be.ok;
                    expect(githubLogin).to.be.a.instanceOf(GithubLogin);
                    expect(loginHandler.assertsThat(s => s.handleUserLogin(githubLogin)).wasCalledXTimes(0)).to.be.true;
                });
            });
            describe('#getHello()',() => {
                it('should work properly',() => {
                    expect(githubLogin).to.be.ok;
                    var helloGithub = githubLogin.getHello();
                    expect(helloGithub).to.be.ok;
                    expect(helloGithub.login).to.be.an.instanceOf(Function);
                });
            });
        });
    });
}