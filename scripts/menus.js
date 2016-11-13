if(localStorage.defaultTranslation == undefined){
	localStorage.defaultTranslation = 'en-it';
	localStorage.defaultReverseTranslation = 'it-en';
}

function goToTranslate(term, translation){
	translateLanguages = translation.split('-');
	window.open('http://www.wordreference.com/' + translateLanguages[0] + translateLanguages[1] + '/' + term, '_blank');
}

chrome.contextMenus.create({
		"title": chrome.i18n.getMessage("menus_translate") + " \"%s\" ("+ chrome.i18n.getMessage("menus_languages_en") +" > " + chrome.i18n.getMessage("menus_languages_it") + ")", 
		"contexts":["selection"],
		"id": "defaultTranslation",
		"onclick": function(info, tab){ goToTranslate(info.selectionText, localStorage.defaultTranslation); }
	});

chrome.contextMenus.create({
		"title": chrome.i18n.getMessage("menus_translate") + " \"%s\" ("+ chrome.i18n.getMessage("menus_languages_it") +" > " + chrome.i18n.getMessage("menus_languages_en") + ")", 
		"contexts":["selection"],
		"id": "defaultReverseTranslation",
		"onclick": function(info, tab){ goToTranslate(info.selectionText, localStorage.defaultReverseTranslation); }
	});

chrome.contextMenus.create({"title": chrome.i18n.getMessage("menus_translate") + " \"%s\" " + chrome.i18n.getMessage("menus_from") + "...", "id": "translateParent", "contexts": ["selection"]});

$.each(languages, function( i1, v1 ) {
	chrome.contextMenus.create({"title": v1.name + " " + chrome.i18n.getMessage("menus_to") + "...", "parentId": "translateParent", "id": "from_" + i1, "contexts": ["selection"]});

	$.each(v1.translations, function( i2, v2 ) {
		chrome.contextMenus.create({
			"title": v2, 
			"parentId": "from_" + i1, 
			"id": "to_" + i1 + i2, 
			"contexts": ["selection"], 
			"onclick": function(info, tab){ goToTranslate(info.selectionText, i1 + "-" + i2); }
		});
	});
});

chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.executeScript( 
		null,
		{ code:"var textSelection = window.getSelection().toString(); textSelection" },
		function(results){
			results = $.trim(results);

			if(results != ''){
				switch(command){
					case 'sc-translate':
						goToTranslate(results, localStorage.defaultTranslation);
					break;

					case 'sc-translate-reverse':
						goToTranslate(results, localStorage.defaultReverseTranslation);
					break;
				}
			}
		}
	);
});
