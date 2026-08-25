let userLatitude = null;
let userLongitude = null;


// =============================
// SELECT PROBLEM
// =============================

function selectProblem(problem) {

    const select =
        document.getElementById("issueType");

    if (select) {

        select.value = problem;

        document
            .getElementById("report")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


// =============================
// GET LOCATION
// =============================

function getLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );


    if (!navigator.geolocation) {

        status.textContent =
            "GPS is not supported on this device.";

        return;

    }


    status.textContent =
        "📍 Location getting...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            userLatitude =
                position.coords.latitude;

            userLongitude =
                position.coords.longitude;


            status.textContent =
                "✓ Location captured";


            console.log(
                "Latitude:",
                userLatitude
            );

            console.log(
                "Longitude:",
                userLongitude
            );

        },


        function(error) {

            console.log(error);

            status.textContent =
                "❌ Location could not be found.";

        }

    );

}


// =============================
// COMPLAINT SUBMIT
// =============================

const form =
    document.getElementById(
        "complaintForm"
    );


if (form) {

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "citizenName"
                ).value;


            const problem =
                document.getElementById(
                    "issueType"
                ).value;


            const description =
                document.getElementById(
                    "description"
                ).value;


            if (!name || !problem || !description) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            const complaintNumber =
                "JAL-2026-" +
                Math.floor(
                    10000 +
                    Math.random() * 90000
                );


            alert(
                "Complaint Submitted Successfully!\n\n" +
                "Complaint Number: " +
                complaintNumber +
                "\n\n" +
                "Please save this number."
            );


            form.reset();


            document.getElementById(
                "locationStatus"
            ).textContent =
                "Location not captured";

        }
    );

}

/* =========================================
   DARK MODE
========================================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "jalsahayDarkMode",
        isDark ? "dark" : "light"
    );

    updateDarkModeButton();

}


/* Change icon */

function updateDarkModeButton() {

    const button =
        document.getElementById("darkModeBtn");

    if (!button) return;

    const isDark =
        document.body.classList.contains("dark-mode");

    button.innerHTML =
        isDark ? "☀️" : "🌙";

    button.title =
        isDark
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";

}


/* Remember user's choice */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedMode =
            localStorage.getItem(
                "jalsahayDarkMode"
            );

        if (savedMode === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

        }

        updateDarkModeButton();

    }
);