export function addWorkExperience() {
    const workExperienceContainer = document.createElement('div');
    workExperienceContainer.classList.add("work-experience");

    // Create the input fields with labels
    const fields = [
    { label: "Company Name", id: "company_name", placeholder: "XYZ", name: "company_name" },
    { label: "Position", id: "position", placeholder: "Front-End Developer", name: "position" },
    { label: "Duration", id: "duration", placeholder: "Duration (e.g., Jan 2020 - Dec 2022)", name: "duration" },
    { label: "Location", id: "location", placeholder: "Lowell, MA", name: "location" },
    { label: "Description", id: "description", placeholder: "Description (e.g., Achievements, Responsibilities)", name: "description" }
    ];

    fields.forEach(field => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('work-experience-entry');

    const label = document.createElement('label');
    label.setAttribute('for', field.id);
    label.innerText = field.label;

    const input = document.createElement(field.id === "description" ? 'textarea' : 'input');
    input.id = field.id;
    if (input.tagName.toLowerCase() === 'input') {
        input.type = 'text';
    } else if (input.tagName.toLowerCase() === 'textarea') {
        input.rows = 4;
    }
    input.placeholder = field.placeholder;
    input.name = field.name;

    entryDiv.appendChild(label);
    entryDiv.appendChild(input);
    workExperienceContainer.appendChild(entryDiv);
    });

    const workExperienceSectionEl = document.getElementById('work_experience');

    const removeButton = document.createElement('button'); // Remove button
    removeButton.innerText = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.style.marginBottom = "10px";
    removeButton.addEventListener('click', () => {
    workExperienceContainer.remove();
    });
    workExperienceContainer.appendChild(removeButton);

    workExperienceSectionEl.appendChild(workExperienceContainer);
}
