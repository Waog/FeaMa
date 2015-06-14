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
    constructor() {
    }
}
