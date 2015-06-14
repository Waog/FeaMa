/// <reference path="tsd.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {BoardComponent} from './BoardComponent';

@Component({
    selector: 'stomap'
})
@View({
    templateUrl: 'stomapTemplate.html',
    directives: [BoardComponent]
})
class StomapComponent implements GithubApi.UserLoginHandler, GithubApi.IssuesFetchedHandler {
        
        board: BoardComponent;
    
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

            this.board = new BoardComponent(allIssues);
        }

        handleFetchedIssuesError = (e) => {
            console.log('Error Fetching Issues: ', e);
        }
}
bootstrap(StomapComponent);
