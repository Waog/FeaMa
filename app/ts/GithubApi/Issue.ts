/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />

import {GithubLogin} from './GithubLogin';
import {GithubIssues} from './GithubIssues';

export interface IssueCommitHandler {
    handleCommitSuccess(obj: any): void;
    handleCommitError(err: any): void;
}

export interface IssueCommitter {
    commit(issue: Issue, issueCommitHandler: IssueCommitHandler): void;
    commit(issues: Issue[], issueCommitHandler: IssueCommitHandler): void;
}

export class Issue implements IssueCommitHandler {

    private number: number;
    private title: string;
    private body: string;
    private labels: string[] = [];

    private parent: Issue;
    private children: Issue[] = [];

    private currentlyCommiting: boolean;

    constructor(private issueCommitter: IssueCommitter) {
    }

    public setTitle = (title: string) => {
        this.currentlyCommiting = true;
        this.title = title;
        this.issueCommitter.commit(this, this);
    }

    public getTitle: () => string = () => {
        return this.title;
    }

    public setBody = (body: string) => {
        this.currentlyCommiting = true;
        this.body = body;
        this.issueCommitter.commit(this, this);
    }

    public getBody: () => string = () => {
        return this.body;
    }

    public getNumber: () => number = () => {
        return this.number;
    }

    public hasLabel = (label: string) => {
        return this.labels.indexOf(label) > -1;
    }

    public setParent = (parent: Issue) => {
        this.currentlyCommiting = true;
        var changedIssues: Issue[] = [parent, this.parent, this];
        
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = parent;
        parent.addChild(this);
        this.issueCommitter.commit(changedIssues, this);
    }

    public getParent: () => Issue = () => {
        return this.parent;
    }

    private addChild = (issue: Issue) => {
        this.children.push(issue);
    }

    private removeChild = (issue: Issue) => {
        var index = this.children.indexOf(issue);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    public getChildren = () => {
        return this.children;
    }

    toString = () => {
        var result: string = 'issue[#' + this.getNumber();
        for (var i = 0; i < this.labels.length; i++) {
            result += ',';
            result += this.labels[i];
        }
        result += ']';
        return result;
    }

    handleCommitSuccess = (obj: any) => {
        this.currentlyCommiting = false;
    }

    handleCommitError = (err: any) => {
        this.currentlyCommiting = false;
        console.log("some error occured:", err);
    }

    isCommiting: () => boolean = () => {
        return this.currentlyCommiting;
    }
}
