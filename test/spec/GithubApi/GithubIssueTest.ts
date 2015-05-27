/// <reference path="../../../app/ts/GithubApi/GithubIssue.ts" />
/// <reference path="../WaogTest.ts" />

module GithubApi {

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