export function applyTemplateOne(TemplateOneColumnEl) {
    const fullNameInputEl = document.getElementById('full_name'); // get the user name
    const bioInputEl = document.getElementById('bio');            // get the user bio
    const linkInputEl = document.getElementById('sample_link');   // get the user bio
    const projects = document.getElementById('projects');         // get the user projects
  
    TemplateOneColumnEl.innerHTML = '';
  
    // Full name
    const nameEl = document.createElement('h3');
    nameEl.innerText = fullNameInputEl.value.toUpperCase();
    TemplateOneColumnEl.appendChild(nameEl);
  
    // Bio
    const bioEl = document.createElement('p');
    bioEl.innerText = bioInputEl.value;
    TemplateOneColumnEl.appendChild(bioEl);
  
    // Link
    const githubLinkEl = document.getElementById('sample_link');
    const linkEl = document.createElement('a');
    if (githubLinkEl.value !== ''){
      let userGithubAccount = ('https://github.com/' + String(githubLinkEl.value));
      linkEl.href = userGithubAccount;
      linkEl.innerText = userGithubAccount;
    } else {
      linkEl.href = linkInputEl.href;
      linkEl.innerText = linkEl.href;
    }
    linkEl.target = '_blank'; // Open the link in a new tab
    TemplateOneColumnEl.appendChild(linkEl);
    // Add more links
    const linkSectionEl = document.getElementById('link_section');
    const linksSection = document.createElement('span');
    // linksSection.style.marginTop = "10px";
    Array.from(linkSectionEl.children).forEach(linkContainer => {
      const linkInput = linkContainer.querySelector('input[type="url"]');
      if (linkInput && linkInput.value.trim()) {
        const linkEl = document.createElement('a');
        linkEl.href = linkInput.value.trim();
        linkEl.innerText = linkInput.value.trim();
        linkEl.target = '_blank'; // Open the link in a new tab
        // linkEl.style.display = 'block'; // Display each link on a new line
        const separator = document.createElement('span');
        separator.innerText = ' | ';
        linksSection.appendChild(separator);
        linksSection.appendChild(linkEl);
      }
    });
    TemplateOneColumnEl.appendChild(linksSection);
  
    // Project
    const headingProject = document.createElement('h1');
    headingProject.style.borderTop = "1px solid black";
    headingProject.style.borderBottom = "1px solid black";
    headingProject.innerText = "Project";
    headingProject.style.fontSize = "20px";
    TemplateOneColumnEl.appendChild(headingProject);
    const projectsEl = document.createElement('div');
    projectsEl.classList.add('projects-section');
    Array.from(projects.children).forEach(project => {
      /* Project - First line */
      const projectFirst = document.createElement('p');
      projectFirst.style.display = 'flex';
      projectFirst.style.justifyContent = 'space-between';
      const projectName = document.createElement('span');
      if (project.className == 'add_project_manual') {
        projectName.innerHTML = `<b>${project.children[0].children[1].value}</b>`; // Project Name
  
      } else {
        projectName.innerHTML = `<b>${project.children[0].innerText}</b>`; // Project Name
      }
      projectFirst.appendChild(projectName);
      const projectTechnologies = document.createElement('span');
      if (project.className == 'add_project_manual') {
        projectTechnologies.innerHTML = `<i>${project.children[1].children[1].value}</i>`;  // Project Technologies
  
      } else {
        projectTechnologies.innerHTML = `<i>${project.children[1].innerText}</i>`;  // Project Technologies
      }
      if (projectTechnologies.innerText.trim() !== 'Not specified') {               // Not Technologies specified
        projectFirst.appendChild(projectTechnologies);
      }
  
      /* Project - Second line */
      const projectSecond = document.createElement('p');
      const projectLink = document.createElement('a');
      if (project.className == 'add_project_manual') {
        projectLink.innerText = project.children[3].children[1].value; // Project link
        projectLink.href = project.children[3].children[1].value;
      } else {
        projectLink.innerText = project.children[3].innerText; // Project link
        projectLink.href = project.children[3].innerText;
      }
  
      projectLink.target = '_blank';
      projectSecond.style.textAlign = 'left';
      projectSecond.appendChild(projectLink);
      
      /* Project - Thrid line */
      const projectThird = document.createElement('ul');
      projectThird.style.textAlign = 'left';
      let descriptionPoints;
      if (project.className === 'add_project_manual') {
        descriptionPoints = project.children[2].children[1].value.split('.').filter(point => point.trim() !== '');
      } else {
        descriptionPoints = project.children[2].innerText.split('.').filter(point => point.trim() !== '');
      }
      descriptionPoints.forEach(point => {
        const listItem = document.createElement('li');
        listItem.innerText = point.trim();
        projectThird.appendChild(listItem);
      });
  
      projectsEl.appendChild(projectFirst);
      projectsEl.appendChild(projectSecond);
      projectsEl.appendChild(projectThird);
    });
    TemplateOneColumnEl.appendChild(projectsEl);
  
    // Education
    const educationProject = document.createElement('h1');
    educationProject.style.borderTop = "1px solid black";
    educationProject.style.borderBottom = "1px solid black";
    educationProject.innerText = "Education";
    educationProject.style.fontSize = "20px";
    TemplateOneColumnEl.appendChild(educationProject);
    const educationSectionEl = document.getElementById('education');
    const educations = document.createElement('div');
    Array.from(educationSectionEl.children).forEach(education => {
      const schoolName = document.createElement('span');
      schoolName.innerHTML = `<b>${education.children[0].children[1].value}</b>`;
  
      const location = document.createElement('span');
      location.innerText = education.children[4].children[1].value;
  
      const degreeAndFieldOfStudy = document.createElement('span');
  
      Array.from(education.querySelectorAll('input')).forEach(input => {
        const value = input.value.trim();
        if (value) {
          degreeAndFieldOfStudy.innerHTML = `<i>${education.children[1].children[1].value}, ${education.children[2].children[1].value}</i>`;
  
        }
      });
      const graduationYear = document.createElement('span');
      graduationYear.innerText = education.children[3].children[1].value;
  
      const educationFirst = document.createElement('p');
      educationFirst.style.display = 'flex';
      educationFirst.style.justifyContent = 'space-between';
      // educationFirst.style.marginBottom = '10px';
      educationFirst.appendChild(schoolName);
      educationFirst.appendChild(location);
  
      const educationSecond = document.createElement('p');
      educationSecond.style.display = 'flex';
      educationSecond.style.justifyContent = 'space-between';
      // educationFirst.style.marginBottom = '10px';
      educationSecond.appendChild(degreeAndFieldOfStudy);
      educationSecond.appendChild(graduationYear);
  
      educations.appendChild(educationFirst);
      educations.appendChild(educationSecond);
    });
    if (educations.innerText.trim()) {
      TemplateOneColumnEl.appendChild(educations);
    }
  
    // Work Experience
    const workExperienceHeading = document.createElement('h1');
    workExperienceHeading.style.borderTop = "1px solid black";
    workExperienceHeading.style.borderBottom = "1px solid black";
    workExperienceHeading.innerText = "Work Experience";
    workExperienceHeading.style.fontSize = "20px";
    TemplateOneColumnEl.appendChild(workExperienceHeading);
  
    const workExperienceSectionEl = document.getElementById('work_experience');
    const workExperiences = document.createElement('div');
    Array.from(workExperienceSectionEl.children).forEach(workExperience => {
      const companyName = document.createElement('span');
      companyName.innerHTML = `<b>${workExperience.children[0].children[1].value}</b>`;
  
      const location = document.createElement('span');
      location.innerText = workExperience.children[3].children[1].value;
  
      const position = document.createElement('span');
      position.innerHTML = `<i>${workExperience.children[1].children[1].value}</i>`;
  
      const duration = document.createElement('span');
      duration.innerText = workExperience.children[2].children[1].value;
  
      const workExperienceFirst = document.createElement('p');
      workExperienceFirst.style.display = 'flex';
      workExperienceFirst.style.justifyContent = 'space-between';
      workExperienceFirst.appendChild(companyName);
      workExperienceFirst.appendChild(location);
  
      const workExperienceSecond = document.createElement('p');
      workExperienceSecond.style.display = 'flex';
      workExperienceSecond.style.justifyContent = 'space-between';
      workExperienceSecond.appendChild(position);
      workExperienceSecond.appendChild(duration);
  
      const workExperienceThird = document.createElement('ul');
      workExperienceThird.style.textAlign = 'left';
      const descriptionPoints = workExperience.children[4].children[1].value.split('.').filter(point => point.trim() !== '');
      descriptionPoints.forEach(point => {
        const listItem = document.createElement('li');
        listItem.innerText = point.trim();
        workExperienceThird.appendChild(listItem);
      });
  
      workExperiences.appendChild(workExperienceFirst);
      workExperiences.appendChild(workExperienceSecond);
      workExperiences.appendChild(workExperienceThird);
    });
    if (workExperiences.innerText.trim()) {
      TemplateOneColumnEl.appendChild(workExperiences);
    }
  
    // Technical Skills
    const technicalSkills = document.createElement('h1');
    technicalSkills.style.borderTop = "1px solid black";
    technicalSkills.style.borderBottom = "1px solid black";
    technicalSkills.innerText = "Technical Skills";
    technicalSkills.style.fontSize = "20px";
    TemplateOneColumnEl.appendChild(technicalSkills);
  
    const skillsSectionEl = document.getElementById('multiple_skills');
    const skillsDiv = document.createElement('div');
    skillsDiv.innerText = skillsSectionEl.value;
    TemplateOneColumnEl.appendChild(skillsDiv);
  
    TemplateOneColumnEl.style.padding = "30px 40px";
    TemplateOneColumnEl.style.margin = "0 auto";
}