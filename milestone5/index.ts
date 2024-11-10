// Get references to the form and display area
const form = document.getElementById("resume-form") as HTMLFormElement;
const resume_display_element = document.getElementById(
  "resume-display"
) as HTMLDivElement;
const shareable_link_container = document.getElementById(
  "shareable"
) as HTMLDivElement;
const shareable_link_element = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;
const download_pdf_button = document.getElementById(
  "download-pdf"
) as HTMLButtonElement;

//Handle Form Submission
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  // Collect input values
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const experience = (
    document.getElementById("experience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;

  //Save from data in localStorage with the username as the key
  const resume_data = {
    name,
    email,
    phone,
    education,
    experience,
    skills,
  };
  localStorage.setItem(username, JSON.stringify(resume_data));

  //Generate the resume content dynamically
  const resumeHTML = `
<h2><b>Editable Resume</b></h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>E-mail:</b> <span contenteditable="true">${email}</span></p>
<p><b>Contact:</b><span contenteditable="true"> ${phone}</span></p>

<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">>${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">>${skills}</p>
`;

  // Display generated resume
  resume_display_element.innerHTML = resumeHTML;

  //Generate a shareable URL with username only
  const shareable_url = `${
    window.location.origin
  }?username=${encodeURIComponent(username)}`;

  //Display the shareable link
  shareable_link_container.style.display = "block";
  shareable_link_element.href = shareable_url;
  shareable_link_element.textContent = shareable_url;
});

//Handle pdf Download
download_pdf_button.addEventListener("click", () => {
  window.print(); //it will open the print dialog and allow the user to save as PDF
});

//prefill the form based on the username in the url
window.addEventListener("DOMContentLoaded", () => {
  const url_params = new URLSearchParams(window.location.search);
  const username = url_params.get("username");

  if (username) {
    //Autofill form if data is found in local storage
    const saved_resume = localStorage.getItem(username);
  if (saved_resume) {
    const resume_data = JSON.parse(saved_resume);
    (document.getElementById("username") as HTMLInputElement).value = username;
    (document.getElementById("name") as HTMLInputElement).value =
      resume_data.name;
    (document.getElementById("email") as HTMLInputElement).value =
      resume_data.email;
    (document.getElementById("phone") as HTMLInputElement).value =
      resume_data.phone;
    (document.getElementById("education") as HTMLInputElement).value =
      resume_data.education;
    (document.getElementById("experience") as HTMLInputElement).value =
      resume_data.experience;
    (document.getElementById("skills") as HTMLInputElement).value =
      resume_data.skills;
  }
}
});
