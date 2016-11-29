if(localStorage.defaultTranslation == undefined){
    localStorage.defaultTranslation = 'en-it';
    localStorage.defaultReverseTranslation = 'it-en';
}

function goToTranslation(term, translation){
    var translateLanguages = translation.split('-');
    chrome.tabs.create({ url:'http://www.wordreference.com/' + translateLanguages[0] + translateLanguages[1] + '/' + term });
}
