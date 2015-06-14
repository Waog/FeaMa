/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap, ElementRef} from 'angular2/angular2';
import {BoardCardComponent} from './BoardCardComponent';

@Component({
    selector: 'boardrow',
    injectables: [ElementRef]
})
@View({
    templateUrl: 'boardColTemplate.html',
    directives: [BoardCardComponent]
})
export class BoardColComponent {

    featureCard: BoardCardComponent;
    subCards: BoardCardComponent[] = [];

    constructor(featureIssue: GithubIssue, allIssues: GithubIssues, elementRef: ElementRef) {
        this.makeSortable(elementRef);

        this.featureCard = new BoardCardComponent(featureIssue);

        var subIssues = featureIssue.getSubIssues(allIssues);
        for (var i = 0; i < subIssues.size(); i++) {
            this.subCards.push(new BoardCardComponent(subIssues.get(i)));
        }
    }

    makeSortable = (elementRef: ElementRef) => {
        setTimeout(function() {
            var el: any = elementRef.domElement.children[0];
            $(el).sortable({
                placeholder: "portlet-placeholder ui-corner-all panel panel-default",
                connectWith: ".stomap-board-col"
            });
        }, 0);
    }
}
