$(document).ready(function(){
    renderPopupUi();
    populateDefaultLanguagesMenu();
    $("#default_languages").change(onDefaultLanguageChange);    
});

function populateDefaultLanguagesMenu() {
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
}

function onDefaultLanguageChange() {
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
}

function renderPopupUi() {
    var template = '';

    template += '<p>' + chrome.i18n.getMessage("popup_intro") + '</p>';
    template += '<ul>';
    template += '<li>' + chrome.i18n.getMessage("popup_step1") + '</li>';
    template += '<li>' + chrome.i18n.getMessage("popup_step2") + '</li>';
    template += '<li>' + chrome.i18n.getMessage("popup_step3") + '</li>';
    template += '</ul>';
    template += '<p>' + chrome.i18n.getMessage("popup_also") + '</p>';
    template += '<p>' + chrome.i18n.getMessage("popup_default") + '</p>';
    template += '<p>' + chrome.i18n.getMessage("popup_default_explanation") + '</p>';
    template += '<p><select id="default_languages"></select></p>';
    template += '<div class="separator"></div>';

    $('.content').html(template);
}
