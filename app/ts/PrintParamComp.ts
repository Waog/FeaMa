/// <reference path="tsd.d.ts" />
import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'printparam',
    properties: ['param: param']
})
@View({
    template: `<p>Param: [{{param}}]</p>`
})
export class PrintParamComponent {

    param: any;
}
