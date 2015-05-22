/// <reference path="tsd.d.ts" />

module Stomap {

    export class Stomap {
        constructor() {
            console.log('\'Allo \'Allo!');
            
            /* global Github */
            var github: Github = new Github({
                // username : 'YOU_USER',
                // password : 'YOUR_PASSWORD',
                // auth : 'basic'
            });

            var issues = github.getIssues('Waog', 'sandboxRepo');

            var options = {};

            issues
                .list(
                options,
                this.handleListResponse);
        }

        private addColumn = () => {
            $('.board').append('<div class="column"></div>');

            var newColumn = $('.board > .column:last-child');

            newColumn.sortable({
                connectWith: '.column',
                items: '.sortableCard',
                placeholder: 'portlet-placeholder ui-corner-all',
            });

            newColumn.droppable({
                drop: this.dropHandler
            });
        }

        private dropHandler = function(event, draggable) {
            var droppable = $(this);
            console.log('dropped!: ', droppable, event, draggable);
        }

        private getSubIssues = (feature, allIssues) => {
            var result = [];
            for (var i = 0; i < allIssues.length; i++) {
                var issue = allIssues[i];

                if (feature.body.indexOf('#' + issue.number) > -1) {
                    result.push(issue);
                }
            }
            return result;
        }

        private isFeature = (issue) => {
            for (var i = 0; i < issue.labels.length; i++) {
                if (issue.labels[i].name === 'feature') {
                    return true;
                }
            }
            return false;
        }

        private addFeature = (columnIndex, issue) => {
            this.addGenericCard(columnIndex, issue, true);
        }

        private addCard = (columnIndex, issue) => {
            this.addGenericCard(columnIndex, issue, false);
        }

        private addGenericCard = (columnIndex, issue, isFeature) => {
            var featureClassString = isFeature ? 'feature' : 'sortableCard';

            var column = $('.column:eq(' + columnIndex + ')');

            column.append('<div class="portlet ' +
                'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ' +
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

        public handleListResponse = (err, issues) => {
            if (err) {
                console.log('err:', err);
            } else {
                this.fillBoardWithIssues(issues);
            }


        }

        private fillBoardWithIssues = (issues) => {
            var columnCount = 0;
            for (var i = 0; i < issues.length; ++i) {
                if (i in issues) {
                    var issue = issues[i];

                    if (this.isFeature(issue)) {
                        this.addColumn();
                        this.addFeature(columnCount, issue);

                        var subIssues = this.getSubIssues(issue, issues);

                        for (var subIssueIndex = 0; subIssueIndex < subIssues.length; subIssueIndex++) {
                            this.addCard(columnCount, subIssues[subIssueIndex]);
                        }
                        columnCount++;
                    }
                }
            }
        }

    }
}

new Stomap.Stomap();
