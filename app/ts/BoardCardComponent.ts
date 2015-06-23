/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap, ElementRef} from 'angular2/angular2';

import {GithubIssue} from './GithubApi/GithubIssue';

@Component({
    selector: 'card',
    injectables: [ElementRef],
    properties: ['issue: issue']
})
@View({
    templateUrl: 'boardCardTemplate.html'
})
export class BoardCardComponent {
    issue:GithubIssue;
    constructor(elementRef: ElementRef) {
        this.registerInMap(elementRef);
    }

    registerInMap = (elementRef: ElementRef) => {
        setTimeout(() => {
            var el: any = elementRef.domElement.children[0];
            console.log('new card comp:', this.issue.toString(), el);
            $(el).data('model', this.issue);
            console.log('stored card data:', $(el), $(el).data('model'));
        }, 0);
    }
}
