/// <reference path="../../app/ts/Calculations/Calculations.ts" />
/// <reference path="../../app/ts/GithubApi/GithubLogin.ts" />
/// <reference path="WaogTest.ts" />

module GithubApi {

    class UserLoginHandlerMock implements UserLoginHandler {
        handleUserLogin(login: GithubLogin) { console.error("method should be replaced by mock"); }
    }

    export class GithubLoginTest extends WaogTest.ClassTest {

        loginHandler: TeddyMocks.Stub<UserLoginHandler> = null;
        githubLogin: GithubLogin = null;

        beforeEach = () => {
            this.loginHandler = new TeddyMocks.Stub<UserLoginHandler>(UserLoginHandlerMock);
            this.githubLogin = new GithubLogin(this.loginHandler.object);
            this.loginHandler.stubs(m => m.handleUserLogin(this.githubLogin));
            expect(this.githubLogin).to.be.ok;
        }

        constructorTest = () => {
            it('should work properly',() => {
                expect(this.githubLogin).to.be.ok;
                expect(this.githubLogin).to.be.a.instanceOf(GithubLogin);
                expect(this.loginHandler.assertsThat(s => s.handleUserLogin(this.githubLogin)).wasCalledXTimes(0)).to.be.true;
            });
        }


        getHelloTest = () => {
            it('should work properly',() => {
                expect(this.githubLogin).to.be.ok;
                var helloGithub = this.githubLogin.getHello();
                expect(helloGithub).to.be.ok;
                expect(helloGithub.login).to.be.an.instanceOf(Function);
            });
        }
    }

    export class GithubIssueTest extends WaogTest.ClassTest {

        target: GithubIssue = null;

        githubResponse: any = null;

        ghLoginMock: TeddyMocks.Stub<GithubLogin> = null;

        beforeEach = (done) => {
            // TODO: use a relative path here
            $.getJSON("base/test/res/githubResponses/issue-authorized.json",(json) => {

                this.githubResponse = json;
                expect(this.githubResponse).to.be.ok;
                expect(this.githubResponse.url).to.be.ok;
                this.ghLoginMock = new TeddyMocks.Stub<GithubLogin>(GithubLogin);
                this.target = new GithubIssue(this.githubResponse, this.ghLoginMock.object);
                done();
            });
        }

        constructorTest = () => {
            it('should work properly',() => {

                expect(this.target).to.be.ok;
                expect(this.target).to.be.a.instanceOf(GithubIssue);
                expect(this.target.getBody()).to.be.a('string');
                expect(this.target.getBody()).to.equal(this.githubResponse.body);
            });
        }

        getBodyTest = () => {
            it('should return the initialized value',() => {

                expect(this.target.getBody()).to.be.a('string');
                expect(this.target.getBody()).to.equal(this.githubResponse.body);
            });
        }

        setBodyTest = () => {
            it('should be returned by the getter after setting',() => {

                expect(this.target.getBody()).to.equal(this.githubResponse.body);
                var newBody: string = 'some string ' + Math.random();
                this.target.setBody(newBody);
                expect(this.target.getBody()).to.equal(newBody);
            });

            it('should not influence the original response',() => {

                expect(this.target.getBody()).to.equal(this.githubResponse.body);
                this.target.setBody('some string ' + Math.random());
                expect(this.target.getBody()).to.not.equal(this.githubResponse.body);
            });
        }

        commitTest = () => {
            it('should call either successhandler or errorhandler with a legal object',(done) => {

                this.target = new GithubIssue(this.githubResponse, new GithubLogin(null));
                
                var commitHandler: GithubApi.IssueCommitHandler = {
                    handleGithubCommitSuccess: (obj: any) => {
                        expect(obj).to.be.ok;
                        done();
                    },
                    handleGithubCommitError: (err: any) => {
                        expect(err).to.be.ok;
                        done();
                    }
                }

                this.target.commit(commitHandler);
            });
        }
    }
}
new WaogTest.ModuleTest("GithubApi", GithubApi).run();