declare var $: any;
declare var Github: any;

module Stomap {

    export class Stomap {
        constructor() {
            console.log('\'Allo \'Allo!');
            
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
                Stomap.handleListResponse);
        }

        private static addColumn() {
            $('.board').append('<div class="column"></div>');

            $('.board > .column:last-child').sortable({
                connectWith: '.column',
                handle: '.portlet-header',
                cancel: '.portlet-toggle',
                placeholder: 'portlet-placeholder ui-corner-all',
                containment: '.board'
            });
        }

        private static getSubIssues(feature, allIssues) {
            var result = [];
            for (var i = 0; i < allIssues.length; i++) {
                var issue = allIssues[i];

                if (feature.body.indexOf('#' + issue.number) > -1) {
                    result.push(issue);
                }
            }
            return result;
        }

        private static isFeature(issue) {
            for (var i = 0; i < issue.labels.length; i++) {
                if (issue.labels[i].name === 'feature') {
                    return true;
                }
            }
            return false;
        }

        private static addFeature(columnIndex, issue) {
            Stomap.addGenericCard(columnIndex, issue, true);
        }

        private static addCard(columnIndex, issue) {
            Stomap.addGenericCard(columnIndex, issue, false);
        }

        private static addGenericCard(columnIndex, issue, isFeature) {
            var featureClassString = isFeature ? ' feature' : '';

            var column = $('.column:eq(' + columnIndex + ')');

            column.append('<div class="portlet ' +
                'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all' +
                featureClassString + '"></div>');
            var portlet = column.children('div.portlet:last-child');

            portlet.append('<div class="portlet-header ui-widget-header ui-corner-all">' +
                issue.title + '</div>');
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

        }

        public static handleListResponse(err, issues) {
            if (err) {
                console.log('err:', err);
            } else {
                Stomap.fillBoardWithIssues(issues);
            }


        }

        private static fillBoardWithIssues(issues) {
            var columnCount = 0;
            for (var i = 0; i < issues.length; ++i) {
                if (i in issues) {
                    var issue = issues[i];

                    if (Stomap.isFeature(issue)) {
                        Stomap.addColumn();
                        Stomap.addFeature(columnCount, issue);

                        var subIssues = Stomap.getSubIssues(issue, issues);

                        for (var subIssueIndex = 0; subIssueIndex < subIssues.length; subIssueIndex++) {
                            Stomap.addCard(columnCount, subIssues[subIssueIndex]);
                        }
                        columnCount++;
                    }
                }
            }
        }

    }
}

new Stomap.Stomap();
