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

module WaogTest {

    export class ModuleTest {
        constructor(private moduleName: string, private theModule) { }

        public run = () => {
            describe(this.moduleName + ':', this.runAllClasses);
        }

        private runAllClasses = () => {
            for (var clazzName in this.theModule) {
                var objectOfModulesClass = new this.theModule[clazzName]();
                if (objectOfModulesClass instanceof Test) {
                    (<Test> objectOfModulesClass).run(clazzName);
                }
            }
        }
    }

    export class Test {

        private static METHOD_PREFIX = 'Test';

        private endsWith = (str, suffix) => {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }

        public run = (clazzName: string) => {
            describe(clazzName, this.runAllProperties);
        }

        private runAllProperties = () => {
            for (var property in this) {
                this.callPropertyIfTestMethod(property);
            }
        }

        private callPropertyIfTestMethod = (property: any) => {
            if (typeof property == 'string' && typeof this[property] == 'function') {
                var propertyName = <string> property;
                if (this.endsWith(propertyName, Test.METHOD_PREFIX)) {
                    describe('.' + propertyName + '()', this[propertyName]);
                }
            }
        }
    }
}

module Calculations {

    export class SimpleMathTest extends WaogTest.Test {

        positiveTest = () => {
            it('should never fail',(done) => {
                expect(1).to.equals(1);
                done();
            });
        }

        addTwoNumbersTest = () => {
            it('should return 2 for 1 + 1',(done) => {
                var simpleMath = new Calculations.SimpleMath();
                expect(simpleMath.addTwoNumbers(1, 1)).to.equals(245486685);
                done();
            });
        }
    }
}
new WaogTest.ModuleTest("Calculations", Calculations).run();

module TeddyMocks {

    export class StubTest extends WaogTest.Test {

        exampleTest = () => {
            it('should Stub objects like described in their readme',(done) => {
                var expected = 123;
                var stub = new TeddyMocks.Stub<GithubApi.GithubLogin>(GithubApi.GithubLogin);

                stub.stubs(m => m.getHello()).andReturns(null);
                expect(stub.object.getHello()).to.equal(null);

                expect(stub.assertsThat(s => s.getHello()).wasCalled()).to.be.true;
                done();
            });
        }
    }

    export class GlobalStubTest extends WaogTest.Test {

        exampleTest = () => {
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
        }
    }
}
new WaogTest.ModuleTest("TeddyMocks", TeddyMocks).run();