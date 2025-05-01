export function addEducation() {
    const educationContainer = document.createElement('div');
    educationContainer.classList.add("education");
    const educationSectionEl = document.getElementById('education');

    let inputUniqueId = String(educationSectionEl.children.length + 1);

    // Create the first input element with a label
    const fields = [
    { label: "School Name", id: "school_name" + inputUniqueId, placeholder: "XYZ University", name: "school_name" },
    { label: "Degree", id: "degree" + inputUniqueId, placeholder: "Associate of Science", name: "degree" },
    { label: "Field of Study", id: "field_of_study" + inputUniqueId, placeholder: "Computer Science", name: "field_of_study" },
    { label: "Graduation Year", id: "graduation_year" + inputUniqueId, placeholder: "May 2027", name: "graduation_year" },
    { label: "Location", id: "location" + inputUniqueId, placeholder: "Boston, MA", name: "location" }
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

    const removeButton = document.createElement('button'); // Remove button
    removeButton.innerText = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.style.marginBottom = "10px";
    removeButton.ariaLabel = 'Remove education';
    removeButton.addEventListener('click', () => {
    educationContainer.remove();
    });
    educationContainer.appendChild(removeButton);

    educationSectionEl.appendChild(educationContainer);
}