// Get references to the form and display area
const form = document.getElementById("resume") as HTMLFormElement;
const resume = document.getElementById(
  "display"
) as HTMLDivElement;
const link = document.getElementById(
  "shareable"
) as HTMLDivElement;
const element = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;
const button = document.getElementById(
  "download"
) as HTMLButtonElement;

//Handle Form Submission
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  // Collect input values
  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("phone") as HTMLInputElement).value;
  const education = (
    document.getElementById("education") as HTMLTextAreaElement
  ).value;
  const experience = (
    document.getElementById("experience") as HTMLTextAreaElement
  ).value;
  const skills = (document.getElementById("skills") as HTMLTextAreaElement)
    .value;

  //Save from data in localStorage with the username as the key
  const resumeData = {
    name,
    email,
    contact,
    education,
    experience,
    skills,
  };
  localStorage.setItem(username, JSON.stringify(resumeData));

  //Generate the resume content dynamically
  const resumeHTML = `
<h2><b>Editable Resume</b></h2>
<h3>Personal Information</h3>
<p><b>Name:</b> <span contenteditable="true">${name}</span></p>
<p><b>E-mail:</b> <span contenteditable="true">${email}</span></p>
<p><b>Contact:</b><span contenteditable="true"> ${contact}</span></p>

<h3>Education</h3>
<p contenteditable="true">${education}</p>

<h3>Experience</h3>
<p contenteditable="true">>${experience}</p>

<h3>Skills</h3>
<p contenteditable="true">>${skills}</p>
`;

  // Display generated resume
  resume.innerHTML = resumeHTML;

  //Generate a shareable URL with username only
  const shareable_url = `${
    window.location.origin
  }?username=${encodeURIComponent(username)}`;

  //Display the shareable link
  link.style.display = "block";
  element.href = shareable_url;
  element.textContent = shareable_url;
});

button.addEventListener("click", () => {
  window.print();
});


//prefill the form based on the username in the url
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");

  if (username) {
    //Autofill form if data is found in local storage
    const saveData = localStorage.getItem(username);
    if (saveData) {
      const resumeData = JSON.parse(saveData);
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("name") as HTMLInputElement).value =
        resumeData.name;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("contact") as HTMLInputElement).value =
        resumeData.phone;
      (document.getElementById("education") as HTMLInputElement).value =
        resumeData.education;
      (document.getElementById("experience") as HTMLInputElement).value =
        resumeData.experience;
      (document.getElementById("skills") as HTMLInputElement).value =
        resumeData.skills;
    }
  }
});
