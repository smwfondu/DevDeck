import { applyTemplateOne } from './Templates/template1.js';
import { applyTemplateTwo } from './Templates/template2.js';
import { applyTemplateThree } from './Templates/template3.js';
import { addWorkExperience } from './Sections/work_experience.js';
import { addEducation } from './Sections/education.js';
import { addProject } from './Sections/project.js';
import { addLink } from './Sections/link.js';

const githubProjectsEl = document.getElementById('github-projects');
const buttonCustomization = document.getElementById('button_template');
const CustomColumnEl = document.getElementById('custom_template');
const TemplateOneColumnEl = document.getElementById('template_one_place');
const TemplateTwoColumnEl = document.getElementById('template_two_place');
const TemplateThreeColumnEl = document.getElementById('template_three_place');


const templateColumns = [
  CustomColumnEl,
  TemplateOneColumnEl,
  TemplateTwoColumnEl,
  TemplateThreeColumnEl
];

/* Display a particular template */
function displayColumnEl(columnEl) {
  if (templateColumns.includes(columnEl)) {
    templateColumns.forEach(el => el.style.display = 'none'); // Hide all columns
    columnEl.style.display = 'block';                         // Show the selected column
  }
}

function displayGitHubProjects(user) {
  const printProjectEl = document.getElementById('projects');
  const displayProjectEl = document.getElementById('to_display_project');
  
  user.repositories.forEach((repo, index) => {

    /* User "GitHub projects" section */
    const project = document.createElement('a');
    project.href = "#projects";
    project.style.textDecoration = 'none';
    project.style.color = 'black';
    project.innerText = repo.repo_name;
    const addProjectInputEl = document.createElement('input');
    addProjectInputEl.type = "checkbox";
    addProjectInputEl.style.width = "20px";
    addProjectInputEl.style.height = "20px";
    addProjectInputEl.style.accentColor = "#4CAF50"; // Green color
    addProjectInputEl.style.borderRadius = "5px"; // Rounded corners
    addProjectInputEl.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)"; // Subtle shadow
    addProjectInputEl.style.marginRight = "10px";
    addProjectInputEl.style.cursor = "pointer";
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
      displayColumnEl(CustomColumnEl);

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
          displayProjectEl.style.border = '4px dotted green';
          displayProjectEl.style.padding = '10px';
      } else {                  // Don't preview the project if already added on the resume
        displayProjectEl.innerHTML = '';
        displayProjectEl.style.border = 'none';
        displayProjectEl.style.padding = '0';
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
}

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

      const title = `${document.getElementById('full_name').value}'s Resume`

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(title);

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
  const username = document.getElementById('input_header').value.trim();
  if (!username) {
      alert('Please enter a GitHub username');
      return;
  }

  try {
    const data = await fetchGitHubData(username);
    
    localStorage.setItem('github_data', JSON.stringify(data));

    document.getElementById('github-projects').innerHTML = '';
    displayGitHubProjects(data);

  } catch (error) {
    console.error('Error fetching github data:', error);
  }
});

async function fetchGitHubData(username) {
  const url = "https://api.github.com/users/" + username + "/repos";
  const response = await fetch(url, {
      headers: {
          'Accept': 'application/vnd.github.v3+json',
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

/* ------------------ Links (Section) ------------------ */
const linkButtonEl = document.getElementById('button_link');
linkButtonEl.addEventListener('click', () => {
  addLink();
});

/* ------------------ Education (Section) ------------------ */
const educationButtonEl = document.getElementById('button_education');
educationButtonEl.addEventListener('click', () => {
  addEducation();
});

/* ------------------ Work Experience (Section) ------------------ */
const workExperienceButtonEl = document.getElementById('button_work_experience');
workExperienceButtonEl.addEventListener('click', () => {
  addWorkExperience();
});

/* ------------------ Projects (Section) ------------------ */
const projectButtonEl = document.getElementById('button_project');
projectButtonEl.addEventListener('click', () => {
  addProject();
});

/* ------------------ Customization ------------------ */
buttonCustomization.onclick = function() {
  rightMostColumnEl.style.display = "flex";
  displayColumnEl(CustomColumnEl);
};

const rightMostColumnEl = document.getElementById('right_column');

/* ------------------ Templates ------------------ */
const templatesDropdown = document.getElementById('multiple_template');
templatesDropdown.addEventListener('click', () => {
  const selectedValue = templatesDropdown.value;
  if (selectedValue === 'template_one') {           // Template 1
    rightMostColumnEl.style.display = "none";
    displayColumnEl(TemplateOneColumnEl);
    applyTemplateOne(TemplateOneColumnEl);
  } else if (selectedValue === 'template_two') {    // Template 2
    rightMostColumnEl.style.display = "none";
    displayColumnEl(TemplateTwoColumnEl);
    applyTemplateTwo(TemplateTwoColumnEl);
  } else if (selectedValue === 'template_three') {  // Template 3
    rightMostColumnEl.style.display = "none";
    displayColumnEl(TemplateThreeColumnEl);
    applyTemplateThree(TemplateThreeColumnEl);
  }
});