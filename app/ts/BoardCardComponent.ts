/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

import {GithubIssue} from './GithubApi/GithubIssue';

@Component({
    selector: 'card',
    properties: ['issue: issue']
})
@View({
    templateUrl: 'boardCardTemplate.html'
})
export class BoardCardComponent {
    issue:GithubIssue;
    constructor() {
    }
}
