/// <reference path="tsd.d.ts" />

module Stomap {

    export class Login {
        constructor(greeting: string) {
            console.log('constructor ', greeting);

            hello.init({
                // google :
                // '707503277953-0l52gh27j9dbpaoubeec5kqsupvirn2h.apps.googleusercontent.com',
                github: '1418f544c5ed81d99e77'
            }, {
                    /* display: 'page', */
                    /* jshint camelcase: false */
                    redirect_uri: 'http://localhost:9000/',
                    oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
                    scope: 'repo'
                    /* jshint camelcase: true */
                });

            $('#logout').append(
                '<button onclick="hello(\'github\').login()">login</button>');
            hello.on('auth.login', this.handleAuthLogin)
            hello.on('auth.logout', this.handleAuthLogout)
        }

        private handleError = (e) => {
            console.log('handleError ', e);
        }

        private handleDebugSuccess = (obj1, obj2?, obj3?) => {
            console.log('handleDebugSuccess ', obj1, obj2, obj3);
        }

        private handleGetBugIssue = (bugIssuesResponse) => {
            console.log('handleGetBugIssue ', bugIssuesResponse);

            var bugIssue0 = bugIssuesResponse.data[0];

            console.log('bug-body?: ' + bugIssue0.body);
            hello('github').api('/repos/Waog/sandboxRepo/issues/' + bugIssue0.number,
                'PATCH', {
                    title: bugIssue0.title,
                    body: bugIssue0.body + " STOMAP",
                    assignee: bugIssue0.assignee.login,
                    state: bugIssue0.state,
                    milestone: bugIssue0.milestone,
                    labels: this.labelResponseToRequest(bugIssue0.labels)
                }).then(this.handleDebugSuccess, this.handleError);
        }

        private labelResponseToRequest = (issueResponse) => {
            console.log('labelResponseToRequest ', issueResponse);

            var result = [];
            for (var i = 0; i < issueResponse.length; i++) {
                result.push(issueResponse[i].name);
            }
            return result;
        }

        private handleAuthLogin = (auth: HelloJSEventArgument) => {

            console.log('handleAuthLogin ', auth);

            $('#profile').empty();
            $('#login').empty();
            $('#logout').empty();
            $('#logout').append(
                '<button onclick="hello(\'github\').logout()">logout</button>');

            hello('github').api('/me').then(this.handleMeResponse,
                this.handleError);
                
            hello('github').api('/repos/Waog/sandboxRepo/issues', 'get', {
                labels: 'bug'
            }).then(this.handleGetBugIssue, this.handleError);
        }

        private handleAuthLogout = (auth) => {

            console.log('handleAuthLogout ', auth);

            // Call user information, for the given network
            $('#profile').empty();
            $('#login').empty();
            $('#logout').empty();
            $('#logout').append(
                '<button onclick="hello(\'github\').login()">login</button>');
        }

        private handleMeResponse = (r) => {

            console.log('handleMeResponse ', r);

            $('#profile').empty();
            $('#profile').append(r.name);
            $('#profile').append(
                '<img style="height: 50px; width: auto;" src="' + r.thumbnail + '" />');
        }
    };
}
new Stomap.Login("Hello Typescript!");