var stomapLogin = {};

stomapLogin.handleError = function(e) {
    console.log('authorization error: ', e)
}

stomapLogin.handleAuthLogin = function(auth) {

    console.log("auth.login success #1: ", auth);

    // Call user information, for the given network
    hello(auth.network).api('/me').then(stomapLogin.handleMeResponse,
            stomapLogin.handleError);
}

stomapLogin.handleMeResponse = function(r) {

    console.log('logged in as ' + r.name, r);

    $('#profile').empty();
    $('#profile').append(r.name);
    $('#profile').append('<img src="' + r.thumbnail + '" />');
    $('#login').remove();
    
    // Inject it into the container
    var label = document.getElementById('profile_' + auth.network);
    if (!label) {
        label = document.createElement('div');
        label.id = 'profile_' + auth.network;
        document.getElementById('profile').appendChild(label);
    }
    label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
}

hello
        .init(
                {
                    google : '707503277953-0l52gh27j9dbpaoubeec5kqsupvirn2h.apps.googleusercontent.com',
                    github : '1418f544c5ed81d99e77'
                }, {
                    /* display: 'page', */
                    redirect_uri : 'http://localhost:9000/'
                });

hello.on('auth.login', stomapLogin.handleAuthLogin, stomapLogin.handleError);