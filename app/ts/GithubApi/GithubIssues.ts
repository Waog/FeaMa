/// <reference path="../tsd.d.ts" />

module GithubApi {

    export class GithubIssues {

        private githubIssues: any;
        private helloGithub: HelloJSStaticNamed;

        constructor(private githubLogin: GithubLogin) {
            this.helloGithub = githubLogin.getHello();
        }

        fetchByLabel(label: string, successHandler: (result: GithubIssues) => void, errorHandler: (err: any) => void) {
            this.helloGithub.api('/repos/Waog/sandboxRepo/issues', 'get', {
                labels: label
            }).then((bugIssuesResponse: any) => {
                this.githubIssues = bugIssuesResponse;
                successHandler(this);
            }, errorHandler);
        }

        get(index: number): GithubIssue {
            return new GithubIssue(this.githubIssues.data[0], this.helloGithub);
        }


    }
}