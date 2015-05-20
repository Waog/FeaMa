'use strict';

console.log('\'Allo \'Allo!');

var stomap = {};

stomap.addColumn = function() {
    $('.board').append('<div class="column"></div>');

    $('.board > .column:last-child').sortable({
        connectWith : '.column',
        handle : '.portlet-header',
        cancel : '.portlet-toggle',
        placeholder : 'portlet-placeholder ui-corner-all',
        containment : '.board'
    });
};

stomap.getSubIssues = function(feature, allIssues) {
    var result = [];
    for (var i = 0; i < allIssues.length; i++) {
        var issue = allIssues[i];
        
        if (feature.body.indexOf('#' + issue.number) > -1) {
            result.push(issue);
        }
    }
    return result;
};

stomap.isFeature = function(issue) {
    for (var i = 0; i < issue.labels.length; i++) {
        if (issue.labels[i].name === 'feature') {
            return true;
        }
    }
    return false;
};

stomap.addFeature = function(columnIndex, issue) {
    stomap.addGenericCard(columnIndex, issue, true);
};

stomap.addCard = function(columnIndex, issue) {
    stomap.addGenericCard(columnIndex, issue, false);
};

stomap.addGenericCard = function(columnIndex, issue, isFeature) {
    var featureClassString = isFeature ? ' feature' : '';

    var column = $('.column:eq(' + columnIndex + ')');

    column.append('<div class="portlet '
            + 'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'
            + featureClassString + '"></div>');
    var portlet = column.children('div.portlet:last-child');

    portlet
            .append('<div class="portlet-header ui-widget-header ui-corner-all">'
                    + issue.title + '</div>');
    var portletHeader = portlet.find('.portlet-header');

    portletHeader
            .prepend('<span class="portlet-toggle ui-icon ui-icon-plusthick"></span>');
    var portletToggle = portletHeader.find('.portlet-toggle');
    portletToggle.click(function() {
        var icon = $(this);
        icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
        icon.closest('.portlet').find('.portlet-content').toggle();
    });

    portlet.append('<div class="portlet-content">' + issue.body + '</div>');
    portlet.find('.portlet-content').hide();

};

$(function() {

    /* global Github */
    var github = new Github({
    // username : 'YOU_USER',
    // password : 'YOUR_PASSWORD',
    // auth : 'basic'
    });

    var issues = github.getIssues('Waog', 'sandboxRepo');

    var options = {};

    issues
            .list(
                    options,
                    function(err, issues) {
                        console.log('err:', err);
                        console.log('issues:', issues);

                        var columnCount = 0;
                        for (var i = 0; i < issues.length; ++i) {
                            if (i in issues) {
                                var issue = issues[i];
                                console.log('issue' + i + ':', issue);

                                if (stomap.isFeature(issue)) {
                                    stomap.addColumn();
                                    stomap.addFeature(columnCount, issue);

                                    var subIssues = stomap.getSubIssues(issue,
                                            issues);

                                    for (var subIssueIndex = 0; subIssueIndex < subIssues.length; subIssueIndex++) {
                                        stomap.addCard(columnCount,
                                                subIssues[subIssueIndex]);
                                    }
                                    columnCount++;
                                }
                            }
                        }
                    });
});