/// <reference path="../tsd.d.ts" />
/// <reference path="GithubLogin" />

module GithubApi {

    export interface IssueCommitHandler {
        handleGithubCommitSuccess(obj: any): void;
        handleGithubCommitError(err: any): void;
    }

    export class GithubIssue {

        private githubResponse;

        constructor(githubResponse: any, private helloGithub: HelloJSStaticNamed) {
            this.githubResponse = jQuery.extend(true, {}, githubResponse); // deep copy
        }

        public setBody = (body: string) => {
            this.githubResponse.body = body;
        }

        public getBody: () => string = () => {
            return this.githubResponse.body;
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
    }
}