/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />

module GithubApi {

    export interface IssueCommitHandler {
        handleGithubCommitSuccess(obj: any): void;
        handleGithubCommitError(err: any): void;
    }

    export class GithubIssue {

        private helloGithub: HelloJSStaticNamed;
        private githubResponse;

        constructor(githubResponse: any, private githubLogin: GithubLogin) {
            this.githubResponse = jQuery.extend(true, {}, githubResponse); // deep copy
            this.helloGithub = githubLogin.getHello();
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
            this.helloGithub.api('/repos/Waog/sandboxRepo/issues/' + this.githubResponse.number,
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
    }
}