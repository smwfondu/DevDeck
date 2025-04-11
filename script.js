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

/*---------------GitHub Project---------------*/
document.addEventListener('DOMContentLoaded', function(){
  fetch('user_repos_fake_data.json')  //  Fetch the data from .json file
  .then(function(response) {          //  Convert the data to JS object
    return response.json();
  })
    .then(function(user){
      const githubProjectsEl = document.getElementById('github-projects');
      const displayProjectsEl = document.getElementById('projects'); 

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

        project.addEventListener('click', function() { // Highlight the project the user selects
          document.querySelectorAll('.project').forEach(el => {
            el.style.border = 'solid 4px transparent';
          });
          this.style.border = '4px solid red';
        });

        /* Display user projects on the resume */
        const checkbox = document.getElementById(project.children[0].id);
        checkbox.addEventListener('change', function(event) {
          if (event.target.checked) {
            let alreadyExists = false; // Flag to track if the project already exists

            console.log("This checkbox is checked");

            // Check if the project already exists in the projects div
            for (let j = 0; j < displayProjectsEl.children.length; j++) {
              if (displayProjectsEl.children[j].id === repo.repo_name) {
                alreadyExists = true;
                break; // No need to continue checking if found
              }
            }
            
            // If the project doesn't exist, create and append it
            if (!alreadyExists) {
              const projectName = document.createElement('div');
              projectName.innerText = repo.repo_name;
              projectName.id = repo.repo_name;
              displayProjectsEl.appendChild(projectName);
            }

          } else {

            let alreadyExists = false; // Flag to track if the project already exists

            // Check if the project already exists in the projects div
            for (let j = 0; j < displayProjectsEl.children.length; j++) {
              if (displayProjectsEl.children[j].id === repo.repo_name) {
                console.log("The id exists");
                alreadyExists = true;
                break; // No need to continue checking if found
              }
            }
            
            // If the project doesn't exist, create and append it
            if (alreadyExists) {
              const childToRemove = document.getElementById(repo.repo_name);
              displayProjectsEl.removeChild(childToRemove);
            }
          }
        });
      });
    })
  .catch(function(error) { // Check erros in parsing the user data
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