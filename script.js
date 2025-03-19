let templateEls = document.querySelectorAll(".template"); // templates

/* Highlight template based on the user selection */
for (let i = 0; i < templateEls.length; i++) {
    templateEls[i].onclick = function() {
      // Remove the border from all divs first
      for (let j = 0; j < templateEls.length; j++) {
        templateEls[j].style.border = "solid 4px transparent";
      }
      // Apply the border to current element
      this.style.border = "solid 4px red";
    };
}