/// <reference path="tsd.d.ts" />
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {BoardCardComponent} from './BoardCardComponent';

@Component({
    selector: 'boardrow'
})
@View({
    templateUrl: 'boardColTemplate.html',
    directives: [BoardCardComponent]
})
export class BoardColComponent {
    constructor() {
    }
}
