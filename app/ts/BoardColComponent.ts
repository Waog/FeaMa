/// <reference path="tsd.d.ts" />
import {Component, View, coreDirectives, ElementRef} from 'angular2/angular2';
import {BoardCardComponent} from './BoardCardComponent';

import {GithubIssue} from './GithubApi/GithubIssue';
import {GithubIssues} from './GithubApi/GithubIssues';

@Component({
    selector: 'boardcol',
    injectables: [ElementRef],
    properties: ['allIssues: allissues', 'featureIssue: featureissue', 'subIssues: subissues']
})
@View({
    templateUrl: 'boardColTemplate.html',
    directives: [BoardCardComponent, coreDirectives]
})
export class BoardColComponent {

    featureIssue: GithubIssue;
    subIssues: GithubIssues;
    allIssues: GithubIssues;

    constructor(elementRef: ElementRef) {
        this.makeSortable(elementRef);
    }

    makeSortable = (elementRef: ElementRef) => {
        setTimeout(function() {
            var el: any = elementRef.domElement.children[0];
            $(el).find('.stomap-board-col').sortable({
                placeholder: "portlet-placeholder ui-corner-all panel panel-default",
                connectWith: ".stomap-board-col"
            });
        }, 0);
    }
}
