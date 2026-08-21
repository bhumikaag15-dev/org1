
const form = document.getElementById("complaintForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();
let address = document.getElementById("address").value;
let photoInput = document.getElementById("issuePhoto");
let photo = photoInput.files[0];
let complaint = {

    id: "JR" + Math.floor(Math.random() * 100000),

    name: document.getElementById("name").value,

    mobile: document.getElementById("mobile").value,

    village: document.getElementById("villagename").value,

    address: address,

    problem: document.getElementById("problem").value,

    description: document.getElementById("description").value,

    photo: photo ? photo.name : "",

    status: "Pending"
};

let complaints=JSON.parse(localStorage.getItem("complaints"))||[];

complaints.push(complaint);

localStorage.setItem("complaints",JSON.stringify(complaints));

document.getElementById("successMessage").innerHTML=
"✅ Complaint Registered! Complaint ID: <b>"+complaint.id+"</b>";

form.reset();

});

}
function trackComplaint(){

let id=document.getElementById("trackId").value;

let complaints=JSON.parse(localStorage.getItem("complaints"))||[];

let complaint=complaints.find(c=>c.id===id);

let result=document.getElementById("result");

if(complaint){

result.innerHTML=`
<h3>Complaint Details</h3>

<p><b>ID:</b> ${complaint.id}</p>

<p><b>Name:</b> ${complaint.name}</p>

<p><b>Village:</b> ${complaint.village}</p>

<p><b>Problem:</b> ${complaint.problem}</p>

<p><b>Status:</b> ${complaint.status}</p>
`;

}

else{

result.innerHTML="<h3 style='color:red;'>Complaint Not Found</h3>";

}

}
function loadComplaints(){

let table=document.querySelector("#complaintTable tbody");

if(!table) return;

let complaints=JSON.parse(localStorage.getItem("complaints"))||[];

table.innerHTML="";

complaints.forEach((c,index)=>{

table.innerHTML+=`
<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.village}</td>
<td>${c.problem}</td>
<td>${c.status}</td>

<td>
<button onclick="resolveComplaint(${index})">
Resolve
</button>
</td>

</tr>
`;

});

}

function resolveComplaint(index){

let complaints=JSON.parse(localStorage.getItem("complaints"))||[];

complaints[index].status="Resolved";

localStorage.setItem("complaints",JSON.stringify(complaints));

loadComplaints();

}

loadComplaints();
// ===============================
// JALSAHAY USER AUTHENTICATION
// ===============================


// SIGN UP

let signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", function(event) {

event.preventDefault();

let name = document.getElementById("signupName").value;
let email = document.getElementById("signupEmail").value;
let password = document.getElementById("signupPassword").value;
let confirmPassword = document.getElementById("confirmPassword").value;

let message = document.getElementById("signupMessage");


// Check passwords

if (password !== confirmPassword) {

message.innerHTML = "❌ Passwords do not match.";
message.style.color = "red";

return;

}


// Get existing users

let users = JSON.parse(localStorage.getItem("users")) || [];


// Check whether email already exists

let existingUser = users.find(function(user) {

return user.email === email;

});


if (existingUser) {

message.innerHTML = "❌ An account with this email already exists.";
message.style.color = "red";

return;

}


// Create user

let newUser = {

name: name,
email: email,
password: password

};


// Save user

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));


message.innerHTML = "✅ Account created successfully!";
message.style.color = "green";


signupForm.reset();

});

}


// LOGIN

let loginForm = document.getElementById("loginForm");


if (loginForm) {

loginForm.addEventListener("submit", function(event) {

event.preventDefault();


let email = document.getElementById("loginEmail").value;

let password = document.getElementById("loginPassword").value;

let message = document.getElementById("loginMessage");


let users = JSON.parse(localStorage.getItem("users")) || [];


let user = users.find(function(user) {

return user.email === email &&
       user.password === password;

});


if (user) {

localStorage.setItem(
"loggedInUser",
JSON.stringify(user)
);


message.innerHTML =
"✅ Login successful! Welcome " + user.name;

message.style.color = "green";


setTimeout(function() {

window.location.href = "index.html";

}, 1000);


}

else {

message.innerHTML =
"❌ Incorrect email or password.";

message.style.color = "red";

}

});

}// ===============================
// WATER MANAGEMENT ANALYTICS
// ===============================

function loadAnalytics() {

    let complaints =
        JSON.parse(localStorage.getItem("complaints")) || [];

    let total = complaints.length;

    let pending = complaints.filter(
        complaint => complaint.status === "Pending"
    ).length;

    let inProgress = complaints.filter(
        complaint =>
            complaint.status === "In Progress"
    ).length;

    let resolved = complaints.filter(
        complaint =>
            complaint.status === "Resolved"
    ).length;


    // Update dashboard cards

    let totalElement =
        document.getElementById("totalComplaints");

    let pendingElement =
        document.getElementById("pendingComplaints");

    let progressElement =
        document.getElementById("progressComplaints");

    let resolvedElement =
        document.getElementById("resolvedComplaints");


    if (totalElement)
        totalElement.innerText = total;

    if (pendingElement)
        pendingElement.innerText = pending;

    if (progressElement)
        progressElement.innerText = inProgress;

    if (resolvedElement)
        resolvedElement.innerText = resolved;


    // ===============================
    // PROBLEMS
    // ===============================

    let problemCounts = {};

    complaints.forEach(complaint => {

        let problem =
            complaint.problem || "Other";

        problemCounts[problem] =
            (problemCounts[problem] || 0) + 1;

    });


    // ===============================
    // VILLAGES
    // ===============================

    let villageCounts = {};

    complaints.forEach(complaint => {

        let village =
            complaint.village ||
            complaint.villagename ||
            "Unknown";

        villageCounts[village] =
            (villageCounts[village] || 0) + 1;

    });


    // ===============================
    // PROBLEM CHART
    // ===============================

    let problemCanvas =
        document.getElementById("problemChart");

    if (problemCanvas) {

        new Chart(problemCanvas, {

            type: "bar",

            data: {

                labels:
                    Object.keys(problemCounts),

                datasets: [{

                    label: "Complaints",

                    data:
                        Object.values(problemCounts)

                }]

            },

            options: {

                responsive: true,

                plugins: {

                    legend: {
                        display: false
                    }

                }

            }

        });

    }


    // ===============================
    // STATUS CHART
    // ===============================

    let statusCanvas =
        document.getElementById("statusChart");

    if (statusCanvas) {

        new Chart(statusCanvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Pending",
                    "In Progress",
                    "Resolved"
                ],

                datasets: [{

                    data: [
                        pending,
                        inProgress,
                        resolved
                    ]

                }]

            },

            options: {

                responsive: true

            }

        });

    }


    // ===============================
    // VILLAGE CHART
    // ===============================

    let villageCanvas =
        document.getElementById("villageChart");

    if (villageCanvas) {

        new Chart(villageCanvas, {

            type: "bar",

            data: {

                labels:
                    Object.keys(villageCounts),

                datasets: [{

                    label:
                        "Complaints by Village",

                    data:
                        Object.values(villageCounts)

                }]

            },

            options: {

                responsive: true

            }

        });

    }

}


// Run analytics when admin page loads

if (
    document.getElementById("totalComplaints")
) {

    loadAnalytics();

}
function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");

}