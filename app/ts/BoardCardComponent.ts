/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap, For, If} from 'angular2/angular2';

@Component({
    selector: 'boardcard'
})
@View({
    templateUrl: 'boardCardTemplate.html'
})
export class BoardCardComponent {
    rndVal:number;       
    constructor() {
        this.rndVal = Math.random();
    }
}
