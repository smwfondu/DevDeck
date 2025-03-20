let templateEls = document.querySelectorAll(".template"); // templates

var templateSelectedEl = document.querySelector(".template-selected");

/* Highlight template based on the user selection */
for (let i = 0; i < templateEls.length; i++) {
    templateEls[i].onclick = function() {
      for (let j = 0; j < templateEls.length; j++) { // Remove the border from all divs first
        templateEls[j].style.border = "solid 4px transparent";
      }
      this.style.border = "solid 4px red"; // Apply the border to current element
      templateSelectedEl.innerHTML = this.innerHTML; // Display this element on the middle column
    };
}

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