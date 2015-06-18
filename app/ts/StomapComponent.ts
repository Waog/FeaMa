/// <reference path="tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';
import {BoardComponent} from './BoardComponent';
import {GithubLogin} from './GithubApi/GithubLogin';
import {UserLoginHandler} from './GithubApi/GithubLogin';
import {GithubIssues} from './GithubApi/GithubIssues';
import {IssuesFetchedHandler} from './GithubApi/GithubIssues';
import {PrintParamComponent} from './PrintParamComp';

@Component({
    selector: 'stomap'
})
@View({
    templateUrl: 'stomapTemplate.html',
    directives: [BoardComponent, coreDirectives, PrintParamComponent]
})
class StomapComponent implements UserLoginHandler, IssuesFetchedHandler {

    allIssues: GithubIssues;

    constructor() {
        console.log('constructor');
        var githubLogin = new GithubLogin(this);
    }

    handleUserLogin = (githubLogin: GithubLogin) => {
        console.log('handleUserLogin');
        this.allIssues = new GithubIssues(null);
        var issues: GithubIssues = new GithubIssues(githubLogin);
        issues.fetchAll(this);
    }

    handleFetchedIssues = (allIssues: GithubIssues) => {
        console.log('handleFetchedIssues ', allIssues);
        this.allIssues = allIssues;
        console.log('this.allIssues', this.allIssues);
    }

    handleFetchedIssuesError = (e) => {
        console.log('Error Fetching Issues: ', e);
    }
}
bootstrap(StomapComponent);
