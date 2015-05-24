/// <reference path="tsd.d.ts" />
/// <reference path="GithubApi/GithubLogin.ts" />
/// <reference path="GithubApi/GithubIssue.ts" />
/// <reference path="GithubApi/GithubIssues.ts" />

import GithubIssue = GithubApi.GithubIssue;
import GithubIssues = GithubApi.GithubIssues;
import GithubLogin = GithubApi.GithubLogin;

module Stomap {

    export class AppFlow  implements GithubApi.UserLoginHandler {
        constructor() {
            console.log('constructor');

            var githubLogin = new GithubLogin(this);
        }

        private handleError = (e) => {
            console.log('handleError ', e);
        }

        private handleDebugSuccess = (obj1, obj2?, obj3?) => {
            console.log('handleDebugSuccess ', obj1, obj2, obj3);
        }

        private handleGetBugIssues = (bugIssues: GithubIssues) => {
            console.log('handleGetBugIssue ', bugIssues);

            var bugIssue0: GithubIssue = bugIssues.get(0);

            bugIssue0.setBody(bugIssue0.getBody() + ' STOMAP');

            bugIssue0.commit(this.handleDebugSuccess, this.handleError);
        }

        handleUserLogin = (githubLogin: GithubLogin) => {
            var issues: GithubIssues = new GithubIssues(githubLogin);
            issues.fetchByLabel('bug', this.handleGetBugIssues, this.handleError);
        }
    };
}
new Stomap.AppFlow();