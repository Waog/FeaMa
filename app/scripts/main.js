'use strict';

console.log('\'Allo \'Allo!');

var feama = {};

feama.addColumn = function() {
    $('.board').append('<div class="column"></div>');

    $('.board > .column:last-child').sortable({
        connectWith : '.column',
        handle : '.portlet-header',
        cancel : '.portlet-toggle',
        placeholder : 'portlet-placeholder ui-corner-all',
        containment : '.board'
    });
};

feama.addFeature = function(columnIndex, header, content) {
    feama.addGenericCard(columnIndex, header, content, true);
};

feama.addCard = function(columnIndex, header, content) {
    feama.addGenericCard(columnIndex, header, content, false);
};

feama.addGenericCard = function(columnIndex, header, content, isFeature) {
    var featureClassString = isFeature ? ' feature' : '';

    var column = $('.column:eq(' + columnIndex + ')');

    column.append('<div class="portlet' + featureClassString + '"></div>');
    var portlet = column.children('div.portlet:last-child');

    portlet.append('<div class="portlet-header">' + header + '</div>');
    portlet.append('<div class="portlet-content">' + content + '</div>');

    portlet
            .addClass(
                    'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all')
            .find('.portlet-header')
            .addClass('ui-widget-header ui-corner-all')
            .prepend(
                    '<span class="ui-icon ui-icon-plusthick portlet-toggle"></span>');

    portlet.find('.portlet-content').hide();

    portlet.find('.portlet-toggle').click(function() {
        var icon = $(this);
        icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
        icon.closest('.portlet').find('.portlet-content').toggle();
    });
};

$(function() {

    /*global Github */
    var github = new Github({
    // username : 'YOU_USER',
    // password : 'YOUR_PASSWORD',
    // auth : 'basic'
    });

    var issues = github.getIssues('Waog', 'towelGuy');

    var options = {};

    issues.list(options, function(err, issues) {
        console.log('err:', err);
        console.log('issues:', issues);

        for (var colIndex = 0; colIndex < 5; colIndex++) {
            feama.addColumn();
        }
        
        for (var i = 0; i < issues.length; ++i) {
            if (i in issues) {
                var issue = issues[i];
                console.log('issue' + i + ':', issue);
                console.log('title' + i + ':', issue.title);
                console.log('issue' + i + ':', issue.body);
                feama.addCard(i % 5, issue.title, issue.body);
            }
        }
    });
});