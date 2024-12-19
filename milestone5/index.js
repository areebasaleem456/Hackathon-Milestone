// Get references to the form and display area
var form = document.getElementById("resume");
var resume = document.getElementById("display");
var link = document.getElementById("shareable");
var element = document.getElementById("shareable-link");
var button = document.getElementById("download");
//Handle Form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect input values
    var username = document.getElementById("username")
        .value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var contact = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills")
        .value;
    //Save from data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        contact: contact,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //Generate the resume content dynamically
    var resumeHTML = "\n<h2><b>Editable Resume</b></h2>\n<h3>Personal Information</h3>\n<p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n<p><b>E-mail:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n<p><b>Contact:</b><span contenteditable=\"true\"> ").concat(contact, "</span></p>\n\n<h3>Education</h3>\n<p contenteditable=\"true\">").concat(education, "</p>\n\n<h3>Experience</h3>\n<p contenteditable=\"true\">>").concat(experience, "</p>\n\n<h3>Skills</h3>\n<p contenteditable=\"true\">>").concat(skills, "</p>\n");
    // Display generated resume
    resume.innerHTML = resumeHTML;
    //Generate a shareable URL with username only
    var shareable_url = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //Display the shareable link
    link.style.display = "block";
    element.href = shareable_url;
    element.textContent = shareable_url;
});
button.addEventListener("click", function () {
    window.print();
});
//prefill the form based on the username in the url
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        //Autofill form if data is found in local storage
        var saveData = localStorage.getItem(username);
        if (saveData) {
            var resumeData = JSON.parse(saveData);
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.name;
            document.getElementById("email").value =
                resumeData.email;
            document.getElementById("contact").value =
                resumeData.phone;
            document.getElementById("education").value =
                resumeData.education;
            document.getElementById("experience").value =
                resumeData.experience;
            document.getElementById("skills").value =
                resumeData.skills;
        }
    }
});
