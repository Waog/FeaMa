/// <reference path="../tsd.d.ts" />

export interface UserLoginHandler {
    handleUserLogin(githubLogin: GithubLogin): void;
}

export class GithubLogin {
    constructor(private loginHandler: UserLoginHandler) {
        console.log('GithubLogin constructor');
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
        console.log('GithubLogin constructor end');
    }

    private displayLoginButton = () => {
        $('.login-button-hook').append(
            '<li onclick="hello(\'github\').login()"><a>Login With Github</a></li>'
            );
    }

    private handleMeResponse = (r) => {

        console.log('handleMeResponse ', r);

        $('#profile').empty();
        $('#profile').append(r.name);
        $('#profile').append(
            '<img style="height: 50px; width: auto;" src="' + r.thumbnail + '" />');

        this.loginHandler.handleUserLogin(this);
    }

    private handleAuthLogout = (auth) => {

        console.log('handleAuthLogout ', auth);

        // Call user information, for the given network
        $('#profile').empty();
        $('.login-button-hook').empty();
        $('.login-button-hook').append(
            '<li onclick="hello(\'github\').login()"><a>Login With Github</a></li>');
    }

    private handleAuthLogin = (auth: HelloJSEventArgument) => {

        console.log('handleAuthLogin ', auth);

        $('#profile').empty();
        $('.login-button-hook').empty();
        $('.login-button-hook').append(
            '<li onclick="hello(\'github\').logout()"><a>Logut</a></li>');

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
