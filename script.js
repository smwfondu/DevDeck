/*Dialog Box (Template)*/
const modalTemplate = document.getElementById("modal_template");
const buttonTemplate = document.getElementById("button_template");
const buttonTemplateClose = document.getElementById("button_template_close");

// Open the template modal when the "Available Templates" button is clicked
buttonTemplate.onclick = function() {
  modalTemplate.style.display = "block";
}

// Close the template modal when the "Close" button is clicked
buttonTemplateClose.onclick = function() {
  modalTemplate.style.display = "none";
}

// Close the template modal when the user clicks outside of it
window.onclick = function(event) {
  if (event.target == modalTemplate) {
    modalTemplate.style.display = "none";
  }
}

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

let currentTemplate = null;

document.addEventListener("DOMContentLoaded", function() {
  fetch('templates.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(templates) {
      /*---------------Templates Section---------------*/
      let templateEls = document.querySelectorAll(".template");
      var templateSelectedEl = document.querySelector(".template-selected");

      for (let i = 0; i < templateEls.length; i++) {
        templateEls[i].onclick = function() {
          for (let j = 0; j < templateEls.length; j++) {
            templateEls[j].style.border = "solid 4px transparent";
          }
          this.style.border = "solid 4px red";
          
          // Store the selected template
          currentTemplate = templates[i];
          let styles = currentTemplate.styles;

          templateSelectedEl.style.backgroundColor = styles.backgroundColor;
          templateSelectedEl.style.color = styles.color;
          templateSelectedEl.style.fontFamily = styles.fontFamily;
        };
      }
    })
    .catch(function(error){
      console.error('Error loading templates:', error);
    });

  // PDF Export Functionality
  document.getElementById('export-pdf').addEventListener('click', function() {
    if (!currentTemplate) {
      alert('Please select a template first');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFont(currentTemplate.styles.fontFamily.split(',')[0].trim());
    doc.setTextColor(currentTemplate.styles.color);
    
    const element = document.querySelector('.template-selected');
    const text = element.innerText;

    doc.text(text, 10, 10);
    doc.save('resume.pdf');
  });
});

// Github_data.json generating
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
    { label: "Graduation Year", id: "graduation_year", placeholder: "Graduation Year", name: "graduation_year" }
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