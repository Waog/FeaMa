/// <reference path="tsd.d.ts" />
/// <reference path="GithubApi/GithubLogin.ts" />
/// <reference path="GithubApi/GithubIssue.ts" />
/// <reference path="GithubApi/GithubIssues.ts" />

import GithubIssue = GithubApi.GithubIssue;
import GithubIssues = GithubApi.GithubIssues;
import GithubLogin = GithubApi.GithubLogin;

module Stomap {

    export class AppFlow implements GithubApi.UserLoginHandler, GithubApi.IssueCommitHandler, GithubApi.IssuesFetchedHandler {

        constructor() {
            console.log('constructor');

            var githubLogin = new GithubLogin(this);
        }

        handleUserLogin = (githubLogin: GithubLogin) => {
            var issues: GithubIssues = new GithubIssues(githubLogin);
            issues.fetchAll(this);
        }

        handleFetchedIssues = (allIssues: GithubIssues) => {
            console.log('handleFetchedIssues ', allIssues);

            var board = new Board();
            board.fillBoardWithIssues(allIssues);
        }

        handleFetchedIssuesError = (e) => {
            console.log('Error Fetching Issues: ', e);
        }

        handleGithubCommitSuccess = (obj1: any) => {
            // TODO: implement method properly
            console.log('Issue was successfully commited: ', obj1);
        }

        handleGithubCommitError = (e) => {
            // TODO: implement method properly
            console.log('Issue was not commited: ', e);
        }
    };
}
new Stomap.AppFlow();