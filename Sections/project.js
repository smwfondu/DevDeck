export function addProject() {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('add_project_manual');

    // Create the input fields with labels
    const fields = [
    { label: "Project Name", id: "project_name", placeholder: "DevDeck", name: "project_name" },
    { label: "Technologies Used", id: "technologies_used", placeholder: "HTML, CSS, JS", name: "technologies_used" },
    { label: "Description", id: "description", placeholder: "Description (e.g., Features, Achievements)", name: "description" },
    { label: "Project Link", id: "project_link", placeholder: "Project URL", name: "project_link" }
    ];

    fields.forEach(field => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('project-entry');

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
    projectContainer.appendChild(entryDiv);
    });

    const projectSectionEl = document.getElementById('projects');

    const removeButton = document.createElement('button'); // Remove button
    removeButton.innerText = "Remove";
    removeButton.style.marginLeft = "10px";
    removeButton.style.marginBottom = "10px";
    removeButton.style.marginTop = "5px";
    removeButton.addEventListener('click', () => {
    projectContainer.remove();
    });
    projectContainer.appendChild(removeButton);

    projectSectionEl.appendChild(projectContainer);
}