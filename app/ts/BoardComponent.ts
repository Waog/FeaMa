/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {BoardColComponent} from './BoardColComponent';

@Component({
    selector: 'board'
})
@View({
    templateUrl: 'boardTemplate.html',
    directives: [BoardColComponent]
})
export class BoardComponent {

    columns: BoardColComponent[] = [];

    constructor(allIssues: GithubIssues) {
        this.fillBoardWithIssues(allIssues);
    }

    public fillBoardWithIssues = (allIssues: GithubApi.GithubIssues) => {
        var columnCount = 0;

        var featureIssues = allIssues.getByLabel('feature');

        for (var i = 0; i < featureIssues.size(); ++i) {
            var featureIssue = featureIssues.get(i);

            this.columns.push(new BoardColComponent(featureIssue, allIssues));
        }
    }

}
