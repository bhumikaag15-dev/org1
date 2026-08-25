// ==========================================
// JALSAHAY - COMPLAINT TRACKING
// ==========================================


// ==========================================
// DEMO COMPLAINT DATABASE
// ==========================================

const demoComplaints = {

    "JAL-2026-00421": {

        problem: "Water Leakage",

        village: "Example Village",

        date: "23 Aug 2026",

        engineer: "Rahul Patil",

        status: "In Progress"

    },

    "JAL-2026-00422": {

        problem: "No Water Supply",

        village: "Shivgaon",

        date: "22 Aug 2026",

        engineer: "Amit Deshmukh",

        status: "Under Review"

    },

    "JAL-2026-00423": {

        problem: "Dirty Water",

        village: "Ramgaon",

        date: "21 Aug 2026",

        engineer: "Priya Jadhav",

        status: "Resolved"

    }

};


// ==========================================
// TRACK COMPLAINT
// ==========================================

function trackComplaint() {

    const input =
        document.getElementById("trackingId");

    const result =
        document.getElementById("complaintResult");

    const error =
        document.getElementById("trackingError");


    // Safety check

    if (!input || !result || !error) {

        console.error(
            "Tracking elements not found in HTML."
        );

        return;

    }


    // Get complaint ID

    const id =
        input.value
            .trim()
            .toUpperCase();


    // Hide old result/error

    result.style.display = "none";

    error.style.display = "none";


    // ======================================
    // EMPTY INPUT
    // ======================================

    if (!id) {

        showTrackingError(
            "Please enter a complaint number."
        );

        return;

    }


    // ======================================
    // SEARCH COMPLAINT
    // ======================================

    const complaint =
        demoComplaints[id];


    // Complaint not found

    if (!complaint) {

        showTrackingError(
            "Complaint not found. Try JAL-2026-00421"
        );

        return;

    }


    // ======================================
    // DISPLAY COMPLAINT INFORMATION
    // ======================================

    const complaintId =
        document.getElementById(
            "resultComplaintId"
        );

    const problem =
        document.getElementById(
            "resultProblem"
        );

    const village =
        document.getElementById(
            "resultVillage"
        );

    const date =
        document.getElementById(
            "resultDate"
        );

    const engineer =
        document.getElementById(
            "resultEngineer"
        );

    const engineerName =
        document.getElementById(
            "engineerName"
        );

    const status =
        document.getElementById(
            "resultStatus"
        );


    if (complaintId) {
        complaintId.textContent = id;
    }


    if (problem) {
        problem.textContent =
            complaint.problem;
    }


    if (village) {
        village.textContent =
            complaint.village;
    }


    if (date) {
        date.textContent =
            complaint.date;
    }


    if (engineer) {
        engineer.textContent =
            complaint.engineer;
    }


    if (engineerName) {
        engineerName.textContent =
            complaint.engineer;
    }


    if (status) {

        status.textContent =
            complaint.status;

    }


    // ======================================
    // UPDATE TIMELINE
    // ======================================

    updateTimeline(
        complaint.status
    );


    // ======================================
    // SHOW RESULT
    // ======================================

    result.style.display = "block";


    // Scroll to result

    result.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ==========================================
// SHOW ERROR
// ==========================================

function showTrackingError(message) {

    const error =
        document.getElementById(
            "trackingError"
        );


    if (!error) {

        console.error(message);

        return;

    }


    error.textContent =
        "⚠️ " + message;


    error.style.display =
        "block";

}


// ==========================================
// UPDATE TIMELINE
// ==========================================

function updateTimeline(status) {

    const submitted =
        document.getElementById(
            "stepSubmitted"
        );

    const review =
        document.getElementById(
            "stepReview"
        );

    const engineer =
        document.getElementById(
            "stepEngineer"
        );

    const progress =
        document.getElementById(
            "stepProgress"
        );

    const resolved =
        document.getElementById(
            "stepResolved"
        );


    // Remove old classes

    const steps = [
        submitted,
        review,
        engineer,
        progress,
        resolved
    ];


    steps.forEach(function(step) {

        if (step) {

            step.classList.remove(
                "completed"
            );

            step.classList.remove(
                "active"
            );

        }

    });


    // ======================================
    // SUBMITTED
    // ======================================

    if (submitted) {

        submitted.classList.add(
            "completed"
        );

    }


    // ======================================
    // UNDER REVIEW
    // ======================================

    if (status === "Under Review") {

        if (review) {

            review.classList.add(
                "active"
            );

        }

        return;

    }


    // ======================================
    // IN PROGRESS
    // ======================================

    if (status === "In Progress") {

        if (review) {

            review.classList.add(
                "completed"
            );

        }


        if (engineer) {

            engineer.classList.add(
                "completed"
            );

        }


        if (progress) {

            progress.classList.add(
                "active"
            );

        }

        return;

    }


    // ======================================
    // RESOLVED
    // ======================================

    if (status === "Resolved") {

        steps.forEach(function(step) {

            if (step) {

                step.classList.add(
                    "completed"
                );

            }

        });

    }

}


// ==========================================
// FEEDBACK
// ==========================================

function submitFeedback() {

    alert(
        "Thank you for your feedback!"
    );

}


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const trackingInput =
            document.getElementById(
                "trackingId"
            );


        if (trackingInput) {

            trackingInput.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {

                        trackComplaint();

                    }

                }
            );

        }

    }
);