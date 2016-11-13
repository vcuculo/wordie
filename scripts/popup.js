$(document).ready(function(){
    $( "#default_languages" ).change(function() {
        var value = $('#default_languages').val();

        defaultTranslation = value.split('-');

        chrome.contextMenus.update("defaultTranslation", {
            "title": chrome.i18n.getMessage("menus_translate") + " \"%s\" (" + languages[defaultTranslation[0]].name + " > " + languages[defaultTranslation[1]].name + ")"
        });

        chrome.contextMenus.update("defaultReverseTranslation", {
            "title": chrome.i18n.getMessage("menus_translate") + " \"%s\" (" + languages[defaultTranslation[1]].name + " > " + languages[defaultTranslation[0]].name + ")"
        });

        localStorage.defaultTranslation = defaultTranslation[0] + "-" + defaultTranslation[1];
        localStorage.defaultReverseTranslation = defaultTranslation[1] + "-" + defaultTranslation[0];
    });

    var defaultTranslationMenuOptions = '';
    $.each(languages, function( i1, v1 ) {
        $.each(v1.translations, function( i2, v2 ) {
            defaultTranslationMenuOptions += '<option id="'+ i1 + '-' + i2 +'" value="'+ i1 + '-' + i2 +'">'+ v1.name +' &gt; '+ v2 +' </option>';
        });
    });

    $('#default_languages').html(defaultTranslationMenuOptions);

    var options = $('#default_languages option');
    var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
    arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
    options.each(function(i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
    });

    defaultTranslation = localStorage.defaultTranslation;
    $('#default_languages').val(defaultTranslation);
});
