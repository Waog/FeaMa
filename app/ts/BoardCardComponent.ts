/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap, ElementRef} from 'angular2/angular2';

@Component({
    selector: 'boardcard',
    injectables: [ElementRef]
})
@View({
    templateUrl: 'boardCardTemplate.html'
})
export class BoardCardComponent {
    rndVal: number;
    constructor(elementRef: ElementRef) {
        this.rndVal = Math.random();

        setTimeout(function() {
            var el: any = elementRef.domElement.children[0];
            console.log('e1:', el);
            console.log('$(el):', $(el));
        }, 0);
    }
}
