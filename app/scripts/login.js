'use strict';

/* global hello */

var stomapLogin = {};

var stomapGithub = null;

stomapLogin.handleError = function(e) {
	console.log('authorization error: ', e);
};

stomapLogin.handleDebugSuccess = function(obj1, obj2, obj3) {
	console.log('debug success: ', obj1);
	if (obj2) {
		console.log('debug success: ', obj2);
	}
	if (obj3) {
		console.log('debug success: ', obj3);
		console.log('Are there more parameters?');
	}
};

stomapLogin.handleGetBugIssue = function(bugIssuesResponse) {
	console.log('get Bug Issues success: ', bugIssuesResponse);

	var bugIssue0 = bugIssuesResponse.data[0];

	console.log('bug-body?: ' + bugIssue0.body);
	hello('github').api('/repos/Waog/sandboxRepo/issues/' + bugIssue0.number,
	    'PATCH', {
	        title : bugIssue0.title,
	        body : bugIssue0.body + " STOMAP",
	        assignee : bugIssue0.assignee.login,
	        state : bugIssue0.state,
	        milestone : bugIssue0.milestone,
	        labels : stomapLogin.labelResponseToRequest(bugIssue0.labels)
	    }).then(stomapLogin.handleDebug, stomapLogin.handleError);
};

stomapLogin.labelResponseToRequest = function(issueResponse) {
	var result = [];
	for (var i = 0; i < issueResponse.length; i++) {
		result.push(issueResponse[i].name);
	}
	return result;
}

stomapLogin.handleAuthLogin = function(auth) {

	console.log('auth.login success #1: ', auth);

	$('#profile').empty();
	$('#login').empty();
	$('#logout').empty();
	$('#logout').append(
	    '<button onclick="hello(\'github\').logout()">logout</button>');

	// Call user information, for the given network
	hello(auth.network).api('/me').then(stomapLogin.handleMeResponse,
	    stomapLogin.handleError);

	hello(auth.network).api('/repos/Waog/sandboxRepo/issues', 'get', {
		labels : 'bug'
	}).then(stomapLogin.handleGetBugIssue, stomapLogin.handleError);
};

stomapLogin.handleAuthLogout = function(auth) {

	console.log('auth.logout success #1: ', auth);

	// Call user information, for the given network
	$('#profile').empty();
	$('#login').empty();
	$('#logout').empty();
	$('#logout').append(
	    '<button onclick="hello(\'github\').login()">login</button>');
};

stomapLogin.handleMeResponse = function(r) {

	console.log('logged in as ' + r.name, r);

	$('#profile').empty();
	$('#profile').append(r.name);
	$('#profile').append(
	    '<img style="height: 50px; width: auto;" src="' + r.thumbnail + '" />');
};

hello.init({
	// google :
	// '707503277953-0l52gh27j9dbpaoubeec5kqsupvirn2h.apps.googleusercontent.com',
	github : '1418f544c5ed81d99e77'
}, {
    /* display: 'page', */
    /* jshint camelcase: false */
    redirect_uri : 'http://localhost:9000/',
    oauth_proxy : 'https://auth-server.herokuapp.com/proxy',
    scope : 'repo'
/* jshint camelcase: true */
});

$('#logout').append(
    '<button onclick="hello(\'github\').login()">login</button>');
hello.on('auth.login', stomapLogin.handleAuthLogin, stomapLogin.handleError);
hello.on('auth.logout', stomapLogin.handleAuthLogout, stomapLogin.handleError);