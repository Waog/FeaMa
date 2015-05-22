/// <reference path="../tsd.d.ts" />

module GithubApi {

    export class GithubIssues {
        constructor(private helloGithub: HelloJSStaticNamed) {
        }

        fetchByLabel(label: string, successHandler: (obj: any) => void, errorHandler: (err: any) => void) {
            this.helloGithub.api('/repos/Waog/sandboxRepo/issues', 'get', {
                labels: label
            }).then(successHandler, errorHandler);
        }
    }
}