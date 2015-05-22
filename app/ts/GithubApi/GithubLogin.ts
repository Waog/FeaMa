/// <reference path="../tsd.d.ts" />

module GithubApi {

    export class GithubLogin {
        constructor(private loginHandler: (githubLogin: GithubLogin) => void) {
            hello.init({
                github: '1418f544c5ed81d99e77'
            }, {
                    redirect_uri: 'http://localhost:9000/',
                    oauth_proxy: 'https://auth-server.herokuapp.com/proxy',
                    scope: 'repo'
                });
            hello.on('auth.login', this.handleAuthLogin);
            hello.on('auth.logout', this.handleAuthLogout);

            this.displayLoginButton();
        }

        displayLoginButton() {
            $('#logout').append(
                '<button onclick="hello(\'github\').login()">login</button>');
        }

        private handleMeResponse = (r) => {

            console.log('handleMeResponse ', r);

            $('#profile').empty();
            $('#profile').append(r.name);
            $('#profile').append(
                '<img style="height: 50px; width: auto;" src="' + r.thumbnail + '" />');

            this.loginHandler(this);
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

        private handleAuthLogin = (auth: HelloJSEventArgument) => {

            console.log('handleAuthLogin ', auth);

            $('#profile').empty();
            $('#login').empty();
            $('#logout').empty();
            $('#logout').append(
                '<button onclick="hello(\'github\').logout()">logout</button>');

            hello('github').api('/me').then(this.handleMeResponse,
                this.handleError);
        }

        private handleError = (e) => {
            console.log('handleError ', e);
        }

        public getHello(): HelloJSStaticNamed {
            return hello('github');
        }
    }
}