/// <reference path="tsd.d.ts" />

import {Component, View, bootstrap, For, If} from 'angular2/angular2';

@Component({
  selector: 'child'
})
@View({
  templateUrl: 'temp.html'
})
class ChildComponent {
  message: string;
  constructor() {
    this.message = "I'm the child";
  }
}

@Component({
  selector: 'stomap'
})
@View({
  templateUrl: 'someTemplate.html',
  directives: [ChildComponent]
})
class ParentComponent {
  message: string;
  
  constructor() {
    this.message = "I'm the parent";
  }
}
bootstrap(ParentComponent);