document.addEventListener("DOMContentLoaded", function() {
  fetch('templates.json') // fetch the JSON data
    .then(function(response) {
      return response.json(); // convert into javascript objects
    })
      .then(function(templates) {
        let templateEls = document.querySelectorAll(".template"); // templates

        var templateSelectedEl = document.querySelector(".template-selected");

        /* Highlight template based on the user selection */
        for (let i = 0; i < templateEls.length; i++) {
            templateEls[i].onclick = function() {
              for (let j = 0; j < templateEls.length; j++) { // Remove the border from all divs first
                templateEls[j].style.border = "solid 4px transparent";
              }
              this.style.border = "solid 4px red"; // Apply the border to current element
              
              // apply the styles from the JSON
              let selectedTemplate = templates[i];
              let styles = selectedTemplate.styles;

              templateSelectedEl.style.backgroundColor = styles.backgroundColor;
              templateSelectedEl.style.color = styles.color;
              templateSelectedEl.style.fontFamily = styles.fontFamily;
            };
        }
    })
    .catch(function(error){
      console.error('Error loading templates:', error);
    });
});

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

      user.repositories.forEach((repo, index) => {
        const project = document.createElement('div');
        project.innerHTML = `GitHub Project: ${index + 1}`;
        project.classList.add('project');
        githubProjectsEl.appendChild(project);
        
        project.addEventListener('click', function() {
          document.querySelectorAll('.project').forEach(el => {
            el.style.border = 'solid 4px transparent';
          });
          this.style.border = '4px solid red';
        });
      });
    })
  .catch(function(error){
    console.log('Error loading templates:', error);
  });
});
