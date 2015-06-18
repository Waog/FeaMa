/// <reference path="tsd.d.ts" />
import {Component, View, coreDirectives} from 'angular2/angular2';
import {BoardColComponent} from './BoardColComponent';
import {GithubIssue} from './GithubApi/GithubIssue';

@Component({
    selector: 'board',
    properties: ['allIssues: allissues']
})
@View({
    templateUrl: 'boardTemplate.html',
    directives: [BoardColComponent, coreDirectives]
})
export class BoardComponent {

    allIssues: any;
    
    getFeatures = () => {
       return this.allIssues.getFeatures().issues; 
    }
    
    getSubissues = (feature:GithubIssue) => {
       return feature.getSubIssues(this.allIssues);
    }
}
