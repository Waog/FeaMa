/// <reference path="tsd.d.ts" />

import {Component, View, bootstrap} from 'angular2/angular2';
import {BoardComponent} from './BoardComponent';

@Component({
    selector: 'stomap'
})
@View({
    templateUrl: 'stomapTemplate.html',
    directives: [BoardComponent]
})
class StomapComponent {
    message: string;

    constructor() {
        this.message = "I'm the parent";
        $(".stomap-board-col").sortable({
            placeholder: "portlet-placeholder ui-corner-all panel panel-default"
        });
    }
}
bootstrap(StomapComponent);
