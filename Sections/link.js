export function addLink() {
  const linkSectionEl = document.getElementById('link_section');
  const linkContainer = document.createElement('div');
  linkContainer.style.marginTop = "5px";

  let inputId = 'professional_link' + String(linkSectionEl.children.length + 1);
  const linkLabel = document.createElement('label');
  linkLabel.setAttribute('for', inputId);
  linkLabel.innerText = 'Link'

  const linkInput = document.createElement('input');
  linkInput.id = inputId;
  linkInput.type = 'url';
  linkInput.name = 'link';
  linkInput.placeholder = 'Enter a URL';

  const removeButton = document.createElement('button');
  removeButton.innerText = 'Remove';
  removeButton.style.marginLeft = "10px";
  removeButton.style.marginBottom = "10px";
  removeButton.addEventListener('click', () => {
    linkContainer.remove();
  });

  linkContainer.appendChild(linkLabel);
  linkContainer.appendChild(linkInput);
  linkContainer.appendChild(removeButton);

  linkSectionEl.appendChild(linkContainer);
}