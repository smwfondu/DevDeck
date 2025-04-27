const githubProjectsEl = document.getElementById('github-projects');

/*---------------GitHub Project---------------*/
document.addEventListener('DOMContentLoaded', function(){
  fetch('github_data.json')  //  Fetch the data from .json file
  .then(function(response) {          //  Convert the data to JS object
    return response.json();
  })
    .then(function(user){
      const printProjectEl = document.getElementById('projects');
      const displayProjectEl = document.getElementById('to_display_project');
      
      user.repositories.forEach((repo, index) => {

        /* User "GitHub projects" section */
        const project = document.createElement('div');
        project.innerText = repo.repo_name;
        const addProjectInputEl = document.createElement('input');
        addProjectInputEl.type = "checkbox";
        addProjectInputEl.id = "myCheckbox" + index;
        addProjectInputEl.name = "myCheckbox";
        addProjectInputEl.value = "checked";
        const addProjectLabelEl = document.createElement('label');
        addProjectLabelEl.for = "myCheckbox" + index;
        project.appendChild(addProjectInputEl);
        project.appendChild(addProjectLabelEl);
        project.classList.add('project');
        githubProjectsEl.appendChild(project);

        const checkbox = document.getElementById(project.children[0].id);

        project.addEventListener('click', function() { // Highlight the project the user selects
          document.querySelectorAll('.project').forEach(el => {
            el.style.border = 'solid 4px transparent';
          });
          this.style.border = '4px solid red';

          if (!checkbox.checked) {  // Preview the project on the resume before adding
            displayProjectEl.innerHTML = `
                <div>${repo.repo_name}</div>
                <div>${repo.language}</div>
                <div>${repo.description}</div>
                <div>${repo.link}</div>
              `;
          } else {                  // Don't preview the project if already added on the resume
            displayProjectEl.innerHTML = '';
          }

        });

        /* Display user projects on the resume */
        checkbox.addEventListener('change', function(event) {
          if (event.target.checked) {
            let alreadyExists = false; // Flag to track if the project already exists
            // Check if the project already exists in the projects div
            for (let j = 0; j < printProjectEl.children.length; j++) {
              if (printProjectEl.children[j].id === repo.repo_name) {
                alreadyExists = true;
                break; // No need to continue checking if found
              }
            }
            // If the project doesn't exist, create and append it
            if (!alreadyExists) {
              const projectFinalEl = document.createElement('div');

              /* Add information to the project */
              const projectNameEl = document.createElement('div');          //  project name
              projectNameEl.innerText = repo.repo_name;
              projectFinalEl.appendChild(projectNameEl);
              const projectLanguagesEl = document.createElement('div');     //  project programming languages
              projectLanguagesEl.innerText = repo.language;
              projectFinalEl.appendChild(projectLanguagesEl);
              const projectDescriptionEl = document.createElement('div');   //  project description
              projectDescriptionEl.innerText = repo.description;
              projectFinalEl.appendChild(projectDescriptionEl);
              const projectLinkEl = document.createElement('div');          //  project link
              projectLinkEl.innerText = repo.link;
              projectFinalEl.appendChild(projectLinkEl);

              projectFinalEl.id = repo.repo_name;
              printProjectEl.appendChild(projectFinalEl);
            }
          } else {
            let alreadyExists = false; // Flag to track if the project already exists
            // Check if the project already exists in the projects div
            for (let j = 0; j < printProjectEl.children.length; j++) {
              if (printProjectEl.children[j].id === repo.repo_name) {
                alreadyExists = true;
                break; // No need to continue checking if found
              }
            }
            // If the project doesn't exist, create and append it
            if (alreadyExists) {
              const childToRemove = document.getElementById(repo.repo_name);
              printProjectEl.removeChild(childToRemove);
            }
          }
        });
      });
    })
  .catch(function(error) { // Check erros in parsing the user data
    githubProjectsEl.innerText = "No projects are available";
    console.log('Error loading templates:', error);
  });
});

/*---------------Templates Section---------------*/
let templateEls = document.querySelectorAll(".template");
var templateSelectedEl = document.querySelector(".template-selected");
const buttonCustomization = document.getElementById('button_template');

for (let i = 0; i < templateEls.length; i++) {
  templateEls[i].onclick = function() {
    for (let j = 0; j < templateEls.length; j++) {
      templateEls[j].style.border = "solid 4px transparent";
    }
    this.style.border = "solid 4px red";
  };
}

/* Custom Templating */
buttonCustomization.addEventListener('click', () => {
  for (let i = 0; i < templateEls.length; i++) {
    templateEls[i].style.border = "none";
  }
  buttonCustomization.style.backgroundColor = "black";
  buttonCustomization.style.color = "white";
});

// PDF EXPORATION LISTENER
document.getElementById('export-pdf').addEventListener('click', async function() {
  const originalElement = document.querySelector('.template-selected[style*="display: block"]') || 
                        document.querySelector('.template-selected:not([style*="display: none"])');
  
  if (!originalElement) {
      alert('Please select a template to export');
      return;
  }

  const clone = originalElement.cloneNode(true);
  prepareForExport(clone);
  
  document.body.appendChild(clone);

  try {
      const canvas = await html2canvas(clone, {
          scale: 2,
          logging: false,
          useCORS: true
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      title = `${document.getElementById('full_name').value}'s Resume`

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');

  } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
  } finally {
      document.body.removeChild(clone);
  }
});

function prepareForExport(element) {
  // Make temporary adjustments for better PDF output
  element.style.boxShadow = 'none';
  element.querySelectorAll('input, button').forEach(el => {
      el.style.border = '1px solid #000';
      el.style.backgroundColor = 'transparent';
  });
  
  // Convert inputs to read-only text
  element.querySelectorAll('input').forEach(input => {
      const text = document.createElement('div');
      text.textContent = input.value;
      text.style.minHeight = '20px';
      input.replaceWith(text);
  });
  
  return element;
}

document.getElementById('fetchButton').addEventListener('click', async () => {
  const username = document.getElementById('link').value.trim();
  if (!username) {
      alert('Please enter a GitHub username');
      return;
  }

  try {
    const data = await fetchGitHubData(username);
    console.log(data);
    const fs = require('fs')
    fs.writeFile("github_data.json", data)
    //document.getElementById('github-projects').textContent = JSON.stringify(data, null, 2);
    // You can also process this data further for your resume builder
  } catch (error) {
    console.error('Error fetching github data:', error);
    //document.getElementById('output').textContent = 'Error fetching data: ' + error.message;
  }
});

async function fetchGitHubData(username) {
  const url = "https://api.github.com/users/" + username + "/repos";
  const response = await fetch(url, {
      headers: {
          'Accept': 'application/vnd.github.v3+json',
          // If you need authentication (higher rate limits):
          // 'Authorization': 'token YOUR_GITHUB_TOKEN'
      }
  })

  if (!response.ok) {
    throw new Error("GitHub API error: ${response.status}");
  }

  const repos = await response.json();

  return {
      username,
      repositories: repos.map(repo => ({
          repo_name: repo.name,
          language: repo.language,
          description: repo.description,
          link: repo.html_url
      }))
};
};

document.style.padding = "30px 40px";
document.style.margin = "0 auto";

/*--------- Add more links ---------*/
const linkButtonEl = document.getElementById('button_link');
linkButtonEl.addEventListener('click', () => {
  const linkSectionEl = document.getElementById('link_section');
  const linkContainer = document.createElement('div');
  linkContainer.style.marginTop = "5px";

  const linkLabel = document.createElement('label');
  linkLabel.setAttribute('for', 'link');
  linkLabel.innerText = 'Link:';

  const linkInput = document.createElement('input');
  linkInput.type = 'url';
  linkInput.id = 'link';
  linkInput.name = 'link';
  linkInput.placeholder = 'Enter a URL';

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.style.marginLeft = '10px';
  removeButton.addEventListener('click', () => {
    linkContainer.remove();
  });

  linkContainer.appendChild(linkLabel);
  linkContainer.appendChild(linkInput);
  linkContainer.appendChild(removeButton);

  linkSectionEl.appendChild(linkContainer);
});

/*--------- Add more education section ---------*/
const educationButtonEl = document.getElementById('button_education');
educationButtonEl.addEventListener('click', () => {
  const educationContainer = document.createElement('div');
  educationContainer.classList.add("education");

  // Create the first input element with a label
  const fields = [
    { label: "School Name", id: "school_name", placeholder: "School Name", name: "school_name" },
    { label: "Degree", id: "degree", placeholder: "Degree", name: "degree" },
    { label: "Field of Study", id: "field_of_study", placeholder: "Field of Study", name: "field_of_study" },
    { label: "Graduation Year", id: "graduation_year", placeholder: "Graduation Year", name: "graduation_year" },
    { label: "Location", id: "location", placeholder: "Location", name: "location" }
  ];

  fields.forEach(field => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('education-entry');

    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.innerText = field.label;

    const input = document.createElement('input');
    input.id = field.id;
    input.type = "text";
    input.placeholder = field.placeholder;
    input.name = field.name;

    entryDiv.appendChild(label);
    entryDiv.appendChild(input);
    educationContainer.appendChild(entryDiv);
  });

  const educationSectionEl = document.getElementById('education');

  const removeButton = document.createElement('button'); // Remove button
  removeButton.innerText = "Remove";
  removeButton.style.marginLeft = "10px";
  removeButton.addEventListener('click', () => {
    educationContainer.remove();
  });
  educationContainer.appendChild(removeButton);

  educationSectionEl.appendChild(educationContainer);
});

/* Applying templates to the resume */
const CustomColumnEl = document.getElementById('custom_template');
const TemplateOneColumnEl = document.getElementById('template_one_place');
const TemplateTwoColumnEl = document.getElementById('template_two_place');
const TemplateThreeColumnEl = document.getElementById('template_three_place');

/* Customization */
buttonCustomization.onclick = function() {
  if (TemplateOneColumnEl) {
    TemplateOneColumnEl.style.display = 'none';
  }
  if (CustomColumnEl) {
    CustomColumnEl.style.display = 'block';
  }
};

/*------------------ Template 1 ------------------*/
const buttonTemplateOne = document.getElementById('template_one');
buttonTemplateOne.addEventListener('click', () => {
  buttonCustomization.removeAttribute('style');
  if (CustomColumnEl) {
    CustomColumnEl.style.display = 'none';
  }
  if (TemplateOneColumnEl) {
    TemplateOneColumnEl.style.display = 'block';
  }
  const fullNameInputEl = document.getElementById('full_name'); // get the user name
  const bioInputEl = document.getElementById('bio');            // get the user bio
  const linkInputEl = document.getElementById('sample_link');   // get the user bio
  const projects = document.getElementById('projects');         // get the user projects

  TemplateOneColumnEl.innerHTML = '';

  // Full name
  const nameEl = document.createElement('h3');
  nameEl.innerText = fullNameInputEl.value.toUpperCase();
  TemplateOneColumnEl.appendChild(nameEl);

  // Bio
  const bioEl = document.createElement('p');
  bioEl.innerText = bioInputEl.value;
  TemplateOneColumnEl.appendChild(bioEl);

  // Link
  const linkEl = document.createElement('a');
  linkEl.href = linkInputEl.href;
  linkEl.innerText = linkEl.href;
  linkEl.target = '_blank'; // Open the link in a new tab
  TemplateOneColumnEl.appendChild(linkEl);

  // Project
  const headingProject = document.createElement('h1');
  headingProject.style.borderTop = "1px solid black";
  headingProject.style.borderBottom = "1px solid black";
  headingProject.innerText = "Project";
  headingProject.style.fontSize = "20px";
  TemplateOneColumnEl.appendChild(headingProject);
  const projectsEl = document.createElement('div');
  projectsEl.classList.add('projects-section');
  Array.from(projects.children).forEach(project => {
    /* Project - First line */
    const projectFirst = document.createElement('p');
    projectFirst.style.display = 'flex';
    projectFirst.style.justifyContent = 'space-between';
    const projectName = document.createElement('span');
    projectName.innerHTML = `<b>${project.children[0].innerText}</b>`; // Project Name
    projectFirst.appendChild(projectName);
    const projectTechnologies = document.createElement('span');
    projectTechnologies.innerHTML = `<i>${project.children[1].innerText}</i>`;  // Project Technologies
    projectFirst.appendChild(projectTechnologies);

    /* Project - Second line */
    const projectSecond = document.createElement('p');
    const projectLink = document.createElement('a');
    projectLink.innerText = project.children[3].innerText; // Project link
    projectLink.href = project.children[3].innerText;
    projectLink.target = '_blank';
    projectSecond.style.textAlign = 'left';
    projectSecond.appendChild(projectLink);
    
    /* Project - Thrid line */
    const projectThird = document.createElement('ul');
    projectThird.style.textAlign = 'left';
    const descriptionPoints = project.children[2].innerText.split('.').filter(point => point.trim() !== '');
    descriptionPoints.forEach(point => {
      const listItem = document.createElement('li');
      listItem.innerText = point.trim();
      projectThird.appendChild(listItem);
    });

    projectsEl.appendChild(projectFirst);
    projectsEl.appendChild(projectSecond);
    projectsEl.appendChild(projectThird);
  });
  TemplateOneColumnEl.appendChild(projectsEl);

  // Education
  const educationProject = document.createElement('h1');
  educationProject.style.borderTop = "1px solid black";
  educationProject.style.borderBottom = "1px solid black";
  educationProject.innerText = "Education";
  educationProject.style.fontSize = "20px";
  TemplateOneColumnEl.appendChild(educationProject);
  const educationSectionEl = document.getElementById('education');
  const educations = document.createElement('div');
  Array.from(educationSectionEl.children).forEach(education => {
    const schoolName = document.createElement('span');
    schoolName.innerHTML = `<b>${education.children[0].children[1].value}</b>`;

    const location = document.createElement('span');
    location.innerText = education.children[4].children[1].value;

    const degreeAndFieldOfStudy = document.createElement('span');

    Array.from(education.querySelectorAll('input')).forEach(input => {
      const value = input.value.trim();
      if (value) {
        degreeAndFieldOfStudy.innerHTML = `<i>${education.children[1].children[1].value}, ${education.children[2].children[1].value}</i>`;

      }
    });
    const graduationYear = document.createElement('span');
    graduationYear.innerText = education.children[3].children[1].value;

    const educationFirst = document.createElement('p');
    educationFirst.style.display = 'flex';
    educationFirst.style.justifyContent = 'space-between';
    // educationFirst.style.marginBottom = '10px';
    educationFirst.appendChild(schoolName);
    educationFirst.appendChild(location);

    const educationSecond = document.createElement('p');
    educationSecond.style.display = 'flex';
    educationSecond.style.justifyContent = 'space-between';
    // educationFirst.style.marginBottom = '10px';
    educationSecond.appendChild(degreeAndFieldOfStudy);
    educationSecond.appendChild(graduationYear);

    educations.appendChild(educationFirst);
    educations.appendChild(educationSecond);
  });
  TemplateOneColumnEl.appendChild(educations);  

  // Technical Skills
  const technicalSkills = document.createElement('h1');
  technicalSkills.style.borderTop = "1px solid black";
  technicalSkills.style.borderBottom = "1px solid black";
  technicalSkills.innerText = "Technical Skills";
  technicalSkills.style.fontSize = "20px";
  TemplateOneColumnEl.appendChild(technicalSkills);

  const skillsSectionEl = document.getElementById('skills');
  const skillsDiv = document.createElement('div');
  skillsDiv.innerText = skillsSectionEl.children[0].value;
  TemplateOneColumnEl.appendChild(skillsDiv);

  TemplateOneColumnEl.style.padding = "30px 40px";
  TemplateOneColumnEl.style.margin = "0 auto";
});

/* Template 2 */
const buttonTemplateTwo = document.getElementById('template_two');
buttonTemplateTwo.addEventListener('click', () => {
  buttonCustomization.removeAttribute('style');
  TemplateTwoColumnEl.innerHTML = '';

  TemplateTwoColumnEl.style.padding = "30px 40px";
  TemplateTwoColumnEl.style.margin = "0 auto";
});

/* Template 3 */
const buttonTemplateThree = document.getElementById('template_three');
buttonTemplateThree.addEventListener('click', () => {
  buttonCustomization.removeAttribute('style');
  TemplateThreeColumnEl.innerHTML = '';

  TemplateThreeColumnEl.style.padding = "30px 40px";
  TemplateThreeColumnEl.style.margin = "0 auto";
});