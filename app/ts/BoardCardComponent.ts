/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'boardcard'
})
@View({
    templateUrl: 'boardCardTemplate.html'
})
export class BoardCardComponent {
    title: string;
    constructor(private issue:GithubIssue) {
        this.title = issue.getTitle();

    }
}
