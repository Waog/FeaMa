var stomapLogin = {};

stomapLogin.handleError = function(e) {
    console.log('authorization error: ', e)
}

stomapLogin.handleAuthLogin = function(auth) {

    console.log("auth.login success #1: ", auth);

    $('#profile').empty();
    $('#login').empty();
    $('#logout').empty();
    $('#logout').append('<button onclick="hello(\'github\').logout()">logout</button>');

    // Call user information, for the given network
    hello(auth.network).api('/me').then(stomapLogin.handleMeResponse,
            stomapLogin.handleError);
}

stomapLogin.handleAuthLogout = function(auth) {
    
    console.log("auth.logout success #1: ", auth);
    
    // Call user information, for the given network
    $('#profile').empty();
    $('#login').empty();
    $('#logout').empty();
    $('#logout').append('<button onclick="hello(\'github\').login()">login</button>');
}

stomapLogin.handleMeResponse = function(r) {

    console.log('logged in as ' + r.name, r);

    $('#profile').empty();
    $('#profile').append(r.name);
    $('#profile').append('<img style="height: 50px; width: auto;" src="' + r.thumbnail + '" />');
}

hello.init({
    // google :
    // '707503277953-0l52gh27j9dbpaoubeec5kqsupvirn2h.apps.googleusercontent.com',
    github : '1418f544c5ed81d99e77'
}, {
    /* display: 'page', */
    redirect_uri : 'http://localhost:9000/',
    oauth_proxy : 'https://auth-server.herokuapp.com/proxy'
});

hello.on('auth.login', stomapLogin.handleAuthLogin, stomapLogin.handleError);
hello.on('auth.logout', stomapLogin.handleAuthLogout, stomapLogin.handleError);