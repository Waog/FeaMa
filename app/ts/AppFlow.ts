/// <reference path="tsd.d.ts" />
/// <reference path="GithubApi/GithubLogin.ts" />
/// <reference path="GithubApi/GithubIssue.ts" />
/// <reference path="GithubApi/GithubIssues.ts" />

import GithubIssue = GithubApi.GithubIssue;
import GithubIssues = GithubApi.GithubIssues;
import GithubLogin = GithubApi.GithubLogin;

module Stomap {

    export class AppFlow implements GithubApi.UserLoginHandler, GithubApi.IssueCommitHandler {
        constructor() {
            console.log('constructor');

            var githubLogin = new GithubLogin(this);
        }

        handleGithubCommitError = (e) => {
            // TODO: implement method properly
            console.log('Issue was not commited: ', e);
        }
        
        handleError = (e) => {
            console.log('Some error occured: ', e);
        }

        handleGithubCommitSuccess = (obj1:any) => {
            // TODO: implement method properly
            console.log('Issue was successfully commited: ', obj1);
        }

        private handleGetBugIssues = (bugIssues: GithubIssues) => {
            console.log('handleGetBugIssue ', bugIssues);

            var bugIssue0: GithubIssue = bugIssues.get(0);

            bugIssue0.setBody(bugIssue0.getBody() + ' STOMAP');

            bugIssue0.commit(this);
        }

        handleUserLogin = (githubLogin: GithubLogin) => {
            var issues: GithubIssues = new GithubIssues(githubLogin);
            issues.fetchByLabel('bug', this.handleGetBugIssues, this.handleError);
        }
    };
}
new Stomap.AppFlow();