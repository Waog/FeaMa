/// <reference path="tsd.d.ts" />

module Stomap {

    export class Board implements GithubApi.IssueCommitHandler {
        constructor() {
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

        private dropHandler = (event, draggable) => {
            console.log('dropped!: ', this, event, event.target, event.toElement, draggable);
            console.log('data:', $(event.toElement).data('model'));
            console.log('target feature:', $(event.target).children('div.feature:first-child').data('model'));
            var draggedIssue: GithubIssue = $(event.toElement).data('model');
            var oldFeature = draggedIssue.getParent();
            var newFeature = $(event.target).children('div.feature:first-child').data('model');
            this.removeReference(oldFeature, draggedIssue);
            this.addReference(newFeature, draggedIssue);
            oldFeature.commit(this);
            newFeature.commit(this);
        }

        handleGithubCommitSuccess = (obj1: any) => {
            // TODO: implement method properly
            console.log('Issue was successfully commited: ', obj1);
        }

        handleGithubCommitError = (e) => {
            // TODO: implement method properly
            console.log('Issue was not commited: ', e);
        }

        private removeReference = (featureIssue: GithubIssue, removedSubIssue: GithubIssue) => {
            var oldBody: string = featureIssue.getBody();

            var regexToRemove = new RegExp('\n- \\[[ x]\\] #' + removedSubIssue.getNumber() + ' $', 'm');
            var subst = '';

            var newBody = oldBody.replace(regexToRemove, subst);
            featureIssue.setBody(newBody);
        }

        private addReference = (featureIssue: GithubIssue, addedSubIssue: GithubIssue) => {
            var oldBody: string = featureIssue.getBody();

            var regexToRemove = new RegExp('(\\*\\*Sub-Issues:\\*\\*$)', 'm');
            var subst = '$1\n- [ ] #' + addedSubIssue.getNumber() + ' ';

            var newBody = oldBody.replace(regexToRemove, subst);
            featureIssue.setBody(newBody);
        }

        private getSubIssues = (featureIssue: GithubIssue, allIssues: GithubIssues) => {
            var result: GithubIssue[] = [];
            for (var i = 0; i < allIssues.size(); i++) {
                var issue = allIssues.get(i);

                var regexToFindIssueReference = '#' + issue.getNumber() + '([^a-zA-Z0-9]|$)';

                if (featureIssue.getBody().match(regexToFindIssueReference)) {
                    issue.setParent(featureIssue);
                    result.push(issue);
                }
            }
            return result;
        }

        private addFeature = (columnIndex, issue) => {
            this.addGenericCard(columnIndex, issue, true);
        }

        private addCard = (columnIndex, issue) => {
            this.addGenericCard(columnIndex, issue, false);
        }

        private addGenericCard = (columnIndex: number, issue: GithubIssue, isFeature: boolean) => {
            var featureClassString = isFeature ? 'feature' : 'sortableCard';

            var column = $('.column:eq(' + columnIndex + ')');

            column.append('<div class="portlet ' +
                'ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ' +
                featureClassString + '"></div>');
            var portlet = column.children('div.portlet:last-child');
            portlet.data("model", issue);
            portlet.data("colIndex", columnIndex);

            portlet.append('<div class="portlet-header ui-widget-header ui-corner-all">'
                + '<a href="' + issue.getHtmlUrl() + '">#' +
                issue.getNumber() + '</a> ' + issue.getTitle() + '</div>');
            var portletHeader = portlet.find('.portlet-header');

            portletHeader
                .prepend('<span class="portlet-toggle ui-icon ui-icon-plusthick"></span>');
            var portletToggle = portletHeader.find('.portlet-toggle');
            portletToggle.click(function() {
                var icon = $(this);
                icon.toggleClass('ui-icon-minusthick ui-icon-plusthick');
                icon.closest('.portlet').find('.portlet-content').toggle();
            });

            portlet.append('<div class="portlet-content">' + issue.getBody() + '</div>');
            portlet.find('.portlet-content').hide();

        }

        public fillBoardWithIssues = (issues: GithubApi.GithubIssues) => {
            var columnCount = 0;
            for (var i = 0; i < issues.size(); ++i) {
                var issue: GithubApi.GithubIssue = issues.get(i);

                if (issue.hasLabel('feature')) {
                    var featureIssue = issue;
                    this.addColumn();
                    this.addFeature(columnCount, featureIssue);

                    var subIssues: GithubApi.GithubIssue[] = this.getSubIssues(featureIssue, issues);

                    for (var subIssueIndex = 0; subIssueIndex < subIssues.length; subIssueIndex++) {
                        this.addCard(columnCount, subIssues[subIssueIndex]);
                    }
                    columnCount++;
                }
            }
        }

    }
}