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
    constructor(elementRef: ElementRef) {
        setTimeout(function() {
            var el: any = elementRef.domElement.children[0];
            console.log('e1:', el);
            console.log('$(el):', $(el));
            $(el).sortable({
                placeholder: "portlet-placeholder ui-corner-all panel panel-default"
            });
        }, 0);
    }
}
