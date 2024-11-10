// Get references to the form and display area
var form = document.getElementById("resume-form");
var resume_display_element = document.getElementById("resume-display");
var shareable_link_container = document.getElementById("shareable");
var shareable_link_element = document.getElementById("shareable-link");
var download_pdf_button = document.getElementById("download-pdf");
//Handle Form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect input values
    var username = document.getElementById("username")
        .value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills")
        .value;
    //Save from data in localStorage with the username as the key
    var resume_data = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resume_data));
    //Generate the resume content dynamically
    var resumeHTML = "\n<h2><b>Editable Resume</b></h2>\n<h3>Personal Information</h3>\n<p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n<p><b>E-mail:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n<p><b>Contact:</b><span contenteditable=\"true\"> ").concat(phone, "</span></p>\n\n<h3>Education</h3>\n<p contenteditable=\"true\">").concat(education, "</p>\n\n<h3>Experience</h3>\n<p contenteditable=\"true\">>").concat(experience, "</p>\n\n<h3>Skills</h3>\n<p contenteditable=\"true\">>").concat(skills, "</p>\n");
    // Display generated resume
    resume_display_element.innerHTML = resumeHTML;
    //Generate a shareable URL with username only
    var shareable_url = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    //Display the shareable link
    shareable_link_container.style.display = "block";
    shareable_link_element.href = shareable_url;
    shareable_link_element.textContent = shareable_url;
});
//Handle pdf Download
download_pdf_button.addEventListener("click", function () {
    window.print(); //it will open the print dialog and allow the user to save as PDF
});
//prefill the form based on the username in the url
window.addEventListener("DOMContentLoaded", function () {
    var url_params = new URLSearchParams(window.location.search);
    var username = url_params.get("username");
    if (username) {
        //Autofill form if data is found in local storage
        var saved_resume = localStorage.getItem(username);
        if (saved_resume) {
            var resume_data = JSON.parse(saved_resume);
            document.getElementById("username").value = username;
            document.getElementById("name").value =
                resume_data.name;
            document.getElementById("email").value =
                resume_data.email;
            document.getElementById("phone").value =
                resume_data.phone;
            document.getElementById("education").value =
                resume_data.education;
            document.getElementById("experience").value =
                resume_data.experience;
            document.getElementById("skills").value =
                resume_data.skills;
        }
    }
});
