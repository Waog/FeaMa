/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />

import {GithubLogin} from './GithubLogin';
import {GithubIssues} from './GithubIssues';

export interface IssueCommitHandler {
    handleGithubCommitSuccess(obj: any): void;
    handleGithubCommitError(err: any): void;
}

export class GithubIssue {

    private githubResponse;
    private parent;

    constructor(githubResponse: any, private githubLogin: GithubLogin) {
        this.githubResponse = jQuery.extend(true, {}, githubResponse); // deep copy
    }

    public setBody = (body: string) => {
        this.githubResponse.body = body;
    }

    public getBody: () => string = () => {
        return this.githubResponse.body;
    }

    public getTitle: () => string = () => {
        return this.githubResponse.title;
    }

    public getNumber: () => number = () => {
        return this.githubResponse.number;
    }

    public commit = (resultHandler: IssueCommitHandler) => {
        this.githubLogin.getHello().api('/repos/Waog/sandboxRepo/issues/' + this.githubResponse.number,
            'PATCH', {
                title: this.githubResponse.title,
                body: this.githubResponse.body,
                assignee: this.githubResponse.assignee.login,
                state: this.githubResponse.state,
                milestone: this.githubResponse.milestone,
                labels: this.labelResponseToRequest(this.githubResponse.labels)
            }).then(resultHandler.handleGithubCommitSuccess, resultHandler.handleGithubCommitError);
    }

    private labelResponseToRequest = (issueResponse: any[]) => {
        var result: string[] = [];
        for (var i = 0; i < issueResponse.length; i++) {
            result.push(issueResponse[i].name);
        }
        return result;
    }

    public hasLabel = (label: string) => {
        for (var i = 0; i < this.githubResponse.labels.length; i++) {
            if (this.githubResponse.labels[i].name === label) {
                return true;
            }
        }
        return false;
    }

    public setParent = (parent: GithubIssue) => {
        this.parent = parent;
    }

    public getParent: () => GithubIssue = () => {
        return this.parent;
    }

    public getHtmlUrl: () => string = () => {
        return this.githubResponse.html_url;
    }

    public getSubIssues = (allIssues: GithubIssues) => {
        var result: GithubIssues = new GithubIssues(this.githubLogin);
        for (var i = 0; i < allIssues.size(); i++) {
            var other = allIssues.get(i);

            var regexToFindIssueReference = '#' + other.getNumber() + '([^a-zA-Z0-9]|$)';

            if (this.getBody().match(regexToFindIssueReference)) {
                other.setParent(this);
                result.add(other);
            }
        }
        return result;
    }

    toString = () => {
        var result: string = 'issue[#' + this.getNumber();
        for (var i = 0; i < this.githubResponse.labels.length; i++) {
            result += ',';
            result += this.githubResponse.labels[i].name;
        }
        result += ']';
        return result;
    }
}
