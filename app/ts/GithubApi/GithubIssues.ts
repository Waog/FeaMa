/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />
/// <reference path="GithubIssue" />

module GithubApi {

    export interface IssuesFetchedHandler {
        handleFetchedIssues(result: GithubIssues): void;
        handleFetchedIssuesError(err: any): void;
    }

    export class GithubIssues {

        private issues: GithubIssue[] = [];

        constructor(private githubLogin: GithubLogin) {
        }

        fetchByLabel(label: string, handler: IssuesFetchedHandler) {
            this.fetch({ labels: label }, handler);
        }

        fetchAll(handler: IssuesFetchedHandler) {
            this.fetch({}, handler);
        }

        private fetch(options: any, handler: IssuesFetchedHandler) {
            this.githubLogin.getHello().api('/repos/Waog/sandboxRepo/issues', 'get', options)
                .then((successResponse: any) => {
                    this.initFromResponse(successResponse);
                    handler.handleFetchedIssues(this);
                }, handler.handleFetchedIssuesError);
        }

        private initFromResponse = (successResponse: any) => {
            for (var i = 0; i < successResponse.data.length; ++i) {
                this.issues.push(new GithubIssue(successResponse.data[i], this.githubLogin));
            }
        }

        get(index: number): GithubIssue {
            return this.issues[index];
        }

        getByLabel: (label: string) => GithubIssues = (label: string) => {
            var result = new GithubIssues(this.githubLogin);
            for (var i = 0; i < this.size(); i++) {
                if (this.get(i).hasLabel(label)) {
                    result.issues.push(this.get(i))
                }
            }
            return result;
        }

        size(): number {
            return this.issues.length;
        }
        
        add = (issue:GithubIssue) => {
            this.issues.push(issue);
        }
    }
}