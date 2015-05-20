console.log('\'Allo \'Allo!');

feama = {};

feama.initBoard = function() {
    $(".column").sortable({
        connectWith : ".column",
        handle : ".portlet-header",
        cancel : ".portlet-toggle",
        placeholder : "portlet-placeholder ui-corner-all"
    });

    $(".column").sortable({
        containment : ".board"
    });

    $(".portlet")
            .addClass(
                    "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend(
                    "<span class='ui-icon ui-icon-plusthick portlet-toggle'></span>");

    $(".portlet-content").hide();

    $(".portlet-toggle").click(function() {
        var icon = $(this);
        icon.toggleClass("ui-icon-minusthick ui-icon-plusthick");
        icon.closest(".portlet").find(".portlet-content").toggle();
    });
};

feama.addColumn = function() {
    $(".board").append('<div class="column"></div>');
};

feama.addFeature = function(columnIndex, header, content) {
    feama.addGenericCard(columnIndex, header, content, true);
};

feama.addCard = function(columnIndex, header, content) {
    feama.addGenericCard(columnIndex, header, content, false);
};

feama.addGenericCard = function(columnIndex, header, content, isFeature) {
    var featureClassString = isFeature ? " feature" : "";

    $(".column:eq(" + columnIndex + ")").append(
            '<div class="portlet' + featureClassString + '"></div>');
    $('.column:eq(' + columnIndex + ') > div:last-child').append(
            '<div class="portlet-header">' + header + '</div>');
    $('.column:eq(' + columnIndex + ') > div:last-child').append(
            '<div class="portlet-content">' + content + '</div>');
};

$(function() {

    for (i = 0; i < 5; i++) {
        feama.addColumn();
        feama.addFeature(i, "My Feature " + i, "My Verbose Content");
        feama.addCard(i, "My Card A" + i, "My Verbose Content");
        feama.addCard(i, "My Card B" + i, "My Verbose Content");
    }
    feama.initBoard();
});