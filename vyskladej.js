$(function () {
    // Prohozeni rozmeru
    $("#switchWidthHeight").click(function () {
        var width = $("#width").val();
        var height = $("#height").val();
        $("#width").val(height);
        $("#height").val(width);
        vyskladej();
    });

    // Sirky role
    $("#roles button").click(function () {
        $("#role").val($(this).text());
        vyskladej();
    });

    // Odeslani
    $("#run").click(function () {
        vyskladej();
    });

    // Odeslani
    $("form input").change(function () {
        vyskladej();
    });

    vyskladej();

});

function vyskladej() {

    var vyskladejCanvas = $("#vyskladejCanvas");
    var messages = $("#messages");

    var multiplier = 2;
    var width = parseInt($("#width").val());
    var height = parseInt($("#height").val());
    var pieces = parseInt($("#pieces").val());
    var role = parseInt($("#role").val());
    var gap = parseInt($("#gap").val());

    vyskladejCanvas.css("width", (role * multiplier) + "px");
    vyskladejCanvas.empty();

    for (var i = 1; i <= pieces; i++) {
        var element = $("<div class='element'></div>");
        element.css("width", width * multiplier);
        element.css("height", height * multiplier);
        element.css("border-top-width", gap * multiplier);
        element.css("border-left-width", gap * multiplier);
        vyskladejCanvas.append(element);
    }

    var total_length = vyskladejCanvas.outerHeight() / multiplier;
    var total_width = vyskladejCanvas.outerWidth() / multiplier;

    if (width + gap > role) {
        messages.html('<p class="alert alert-danger"><i class="fa fa-exclamation-triangle fa-2x pull-right"></i> Chyba: Tisk je větší než plátno.</p>');
        $("#infoBox").addClass("hidden");
    } else {
        messages.empty();
        $("#infoBox").removeClass("hidden");
    }

    var total_material = total_width * total_length / 10000;
    var total_used = pieces * (width + gap) * (height + gap) / 10000;
    var total_used_percent = Math.round(total_used / total_material * 100);
    var total_waste = total_material - total_used;
    var total_waste_percent = Math.round(total_waste / total_material * 100);

    $("#total_material").text(round(total_material));
    $("#total_used").text(round(total_used));
    $("#total_used_percent").text(total_used_percent);
    $("#total_waste").text(round(total_waste));
    $("#total_waste_percent").text(total_waste_percent);
    $("#total_length").text(round(total_length));

    $(".progress-bar-success").css("width", total_used_percent + "%");
    $(".progress-bar-danger").css("width", total_waste_percent + "%");

}

function round(number) {
    return Math.round(number * 100) / 100;
}