/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />
/// <reference path="GithubIssue" />

module GithubApi {

    export interface IssuesFetchedHandler {
        handleFetchedIssues(result: GithubIssues): void;
        handleFetchedIssuesError(err: any): void;
    }

    export class GithubIssues {

        private githubIssues: any;

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
                this.githubIssues = successResponse;
                handler.handleFetchedIssues(this);
            }, handler.handleFetchedIssuesError);
        }

        get(index: number): GithubIssue {
            return new GithubIssue(this.githubIssues.data[index], this.githubLogin);
        }

        size(): number {
            return this.githubIssues.data.length;
        }
    }
}