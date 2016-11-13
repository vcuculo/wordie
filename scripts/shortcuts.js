chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.executeScript(
        null,
        { code:"var textSelection = window.getSelection().toString(); textSelection" },
        function(results){
            results = $.trim(results);

            if(results != ''){
                switch(command){
                    case 'sc-translate':
                        goToTranslation(results, localStorage.defaultTranslation);
                        break;

                    case 'sc-translate-reverse':
                        goToTranslation(results, localStorage.defaultReverseTranslation);
                        break;
                }
            }
        }
    );
});
