const LANG_KEYS = {
    keyName: 'lang',
    en: 'en_US',
    ch: 'ch_CH',
    zh: 'zh_CH',
    languages: ['en_US', 'ch_CH', 'zh_CH'],
    match: {
        "English": "en_US",
        "繁體中文": "ch_CH",
        "简体中文": "zh_CH"
    }
};


initializeLanguage();


function initializeLanguage() {
    var langValue = localStorage.getItem(LANG_KEYS.keyName);

    if (langValue == null || langValue == '') {
        localStorage.clear();
        openLanguageModal();
    } else {
        setLanguage(langValue);
    }

}

if (document.querySelector('.js-language-btn') != null) {
    document.querySelector('.js-language-btn').onclick = function() {

        var e = document.querySelector('#languageSelect').value;
        setLanguage(e);
        closeLanguageModal();
    };
}

function openLanguageModal() {
    var modal = document.getElementById("myModal");

    if (modal == null) {
        return;
    }
    var body = document.querySelector("body");
    body.classList.add("no-scroll");
    modal.style.display = "block";
}

function closeLanguageModal() {
    var modal = document.getElementById("myModal");
    var body = document.querySelector("body");
    body.classList.remove("no-scroll");
    modal.style.display = "none";
}

function setLanguage(lang) {
    var body = document.querySelector("body");

    if (hasClass(body, lang)) {
        localStorage.setItem(LANG_KEYS.keyName, lang);
        return;
    }

    for (var i = 0; i < LANG_KEYS.languages.length; i++) {
        if (hasClass(body, LANG_KEYS.languages[i])) {
            body.classList.remove(LANG_KEYS.languages[i]);
        }
    }

    body.classList.add(lang);
    localStorage.setItem(LANG_KEYS.keyName, lang);

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}