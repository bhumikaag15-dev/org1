// ==========================================
// JALSAHAY LANGUAGE SYSTEM
// ==========================================

let currentLanguage = "mr";


// ==========================================
// CHANGE LANGUAGE
// ==========================================

function changeLanguage(language) {

    console.log("Language selected:", language);

    currentLanguage = language;

    // Save language
    localStorage.setItem(
        "jalsahayLanguage",
        language
    );

    applyLanguage();
}


// ==========================================
// APPLY LANGUAGE
// ==========================================

function applyLanguage() {

    console.log(
        "Applying language:",
        currentLanguage
    );


    // Check translations.js
    if (typeof translations === "undefined") {

        console.error(
            "❌ translations.js is NOT loaded"
        );

        return;
    }


    // Get selected language
    const lang =
        translations[currentLanguage];


    if (!lang) {

        console.error(
            "❌ Language does not exist:",
            currentLanguage
        );

        return;
    }


    // ======================================
    // CHANGE NORMAL TEXT
    // ======================================

    const elements =
        document.querySelectorAll(
            "[data-translate]"
        );


    elements.forEach(function(element) {

        const key =
            element.getAttribute(
                "data-translate"
            );


        if (lang[key] !== undefined) {

            element.textContent =
                lang[key];

        } else {

            console.warn(
                "Translation missing:",
                key,
                currentLanguage
            );

        }

    });


    // ======================================
    // CHANGE PLACEHOLDERS
    // ======================================

    const placeholders =
        document.querySelectorAll(
            "[data-placeholder]"
        );


    placeholders.forEach(function(element) {

        const key =
            element.getAttribute(
                "data-placeholder"
            );


        if (lang[key] !== undefined) {

            element.placeholder =
                lang[key];

        }

    });


    // ======================================
    // CHANGE SELECTED LANGUAGE
    // ======================================

    const selector =
        document.getElementById(
            "languageSelector"
        );


    if (selector) {

        selector.value =
            currentLanguage;

    }


    console.log(
        "✅ Language applied:",
        currentLanguage
    );
}


// ==========================================
// WHEN WEBSITE OPENS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedLanguage =
            localStorage.getItem(
                "jalsahayLanguage"
            );


        if (savedLanguage &&
            translations[savedLanguage]) {

            currentLanguage =
                savedLanguage;

        }


        applyLanguage();

    }
);