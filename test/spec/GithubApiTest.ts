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

        githubResponse = {
            "url": "https://api.github.com/repos/Waog/sandboxRepo/issues/12",
            "labels_url": "https://api.github.com/repos/Waog/sandboxRepo/issues/12/labels{/name}",
            "comments_url": "https://api.github.com/repos/Waog/sandboxRepo/issues/12/comments",
            "events_url": "https://api.github.com/repos/Waog/sandboxRepo/issues/12/events",
            "html_url": "https://github.com/Waog/sandboxRepo/issues/12",
            "id": 79036412,
            "number": 12,
            "title": "stomap",
            "user": {
                "login": "Waog",
                "id": 5098472,
                "avatar_url": "https://avatars.githubusercontent.com/u/5098472?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/Waog",
                "html_url": "https://github.com/Waog",
                "followers_url": "https://api.github.com/users/Waog/followers",
                "following_url": "https://api.github.com/users/Waog/following{/other_user}",
                "gists_url": "https://api.github.com/users/Waog/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/Waog/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/Waog/subscriptions",
                "organizations_url": "https://api.github.com/users/Waog/orgs",
                "repos_url": "https://api.github.com/users/Waog/repos",
                "events_url": "https://api.github.com/users/Waog/events{/privacy}",
                "received_events_url": "https://api.github.com/users/Waog/received_events",
                "type": "User",
                "site_admin": false
            },
            "labels": [
                {
                    "url": "https://api.github.com/repos/Waog/sandboxRepo/labels/bug",
                    "name": "bug",
                    "color": "fc2929"
                },
                {
                    "url": "https://api.github.com/repos/Waog/sandboxRepo/labels/duplicate",
                    "name": "duplicate",
                    "color": "cccccc"
                },
                {
                    "url": "https://api.github.com/repos/Waog/sandboxRepo/labels/enhancement",
                    "name": "enhancement",
                    "color": "84b6eb"
                }
            ],
            "state": "open",
            "locked": false,
            "assignee": {
                "login": "Waog",
                "id": 5098472,
                "avatar_url": "https://avatars.githubusercontent.com/u/5098472?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/Waog",
                "html_url": "https://github.com/Waog",
                "followers_url": "https://api.github.com/users/Waog/followers",
                "following_url": "https://api.github.com/users/Waog/following{/other_user}",
                "gists_url": "https://api.github.com/users/Waog/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/Waog/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/Waog/subscriptions",
                "organizations_url": "https://api.github.com/users/Waog/orgs",
                "repos_url": "https://api.github.com/users/Waog/repos",
                "events_url": "https://api.github.com/users/Waog/events{/privacy}",
                "received_events_url": "https://api.github.com/users/Waog/received_events",
                "type": "User",
                "site_admin": false
            },
            "milestone": null,
            "comments": 0,
            "created_at": "2015-05-21T15:06:11Z",
            "updated_at": "2015-05-22T23:33:34Z",
            "closed_at": null,
            "body": "foo STOMAP STOMAP STOMAP STOMAP STOMAP STOMAP STOMAP STOMAP STOMAP",
            "closed_by": null
        }

        constructorTest = () => {
            it('should work properly',() => {

                var ghLoginMock = new TeddyMocks.Stub<GithubLogin>(GithubLogin);
                this.target = new GithubIssue(this.githubResponse, ghLoginMock.object);

                expect(this.target).to.be.ok;
                expect(this.target).to.be.a.instanceOf(GithubIssue);
            });
        }
    }
}
new WaogTest.ModuleTest("GithubApi", GithubApi).run();