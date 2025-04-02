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


let projectEls = document.querySelectorAll(".project"); // templates

/* Highlight GitHub project based on the user selection */
for (let i = 0; i < projectEls.length; i++) {
  projectEls[i].onclick = function() {
      for (let j = 0; j < projectEls.length; j++) { // Remove the border from all divs first
        projectEls[j].style.border = "solid 4px transparent";
      }
      this.style.border = "solid 4px red"; // Apply the border to current element
    };
}

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