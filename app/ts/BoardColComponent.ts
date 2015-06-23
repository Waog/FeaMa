/// <reference path="tsd.d.ts" />
import {Component, View, coreDirectives, ElementRef} from 'angular2/angular2';
import {BoardCardComponent} from './BoardCardComponent';

import {GithubIssue} from './GithubApi/GithubIssue';
import {GithubIssues} from './GithubApi/GithubIssues';
import {DomToCompMap} from './DomToCompMap';

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
        setTimeout(() => {
            var el: any = elementRef.domElement.children[0];
            // TODO: introduce instance variable
            $(el).find('.stomap-board-col').sortable({
                placeholder: "portlet-placeholder ui-corner-all panel panel-default",
                connectWith: ".stomap-board-col"
            });

            $(el).find('.stomap-board-col').droppable({
                drop: this.dropHandler
            });
        }, 0);
    }

    private dropHandler = (event, draggable) => {
        console.log('target column component: ', this);
        console.log('dropped card model: ', $(draggable.draggable[0]).find('.stomap-board-card').data('model'));
        
        var draggedIssue:GithubIssue = $(draggable.draggable[0]).find('.stomap-board-card').data('model');
        draggedIssue.setParent(this.featureIssue);
    }
}
