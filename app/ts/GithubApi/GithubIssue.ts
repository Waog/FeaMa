/// <reference path="../tsd.d.ts" />

module GithubApi {

    export class GithubIssue {
        constructor(private githubResponse: any, private helloGithub: HelloJSStaticNamed) {
        }

        public setBody(body: string): void {
            this.githubResponse.body = body;
        }

        public getBody(): string {
            return this.githubResponse.body;
        }

        public commit(successHandler: (obj: any) => void, errorHandler: (err: any) => void): void {
            this.helloGithub.api('/repos/Waog/sandboxRepo/issues/' + this.githubResponse.number,
                'PATCH', {
                    title: this.githubResponse.title,
                    body: this.githubResponse.body,
                    assignee: this.githubResponse.assignee.login,
                    state: this.githubResponse.state,
                    milestone: this.githubResponse.milestone,
                    labels: this.labelResponseToRequest(this.githubResponse.labels)
                }).then(successHandler, errorHandler);
        }

        private labelResponseToRequest = (issueResponse: any[]) => {
            console.log('labelResponseToRequest ', issueResponse);

            var result: string[] = [];
            for (var i = 0; i < issueResponse.length; i++) {
                result.push(issueResponse[i].name);
            }
            return result;
        }
    }
}