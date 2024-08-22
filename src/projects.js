import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateProjects from "./populateprojects";

// Load page with all projects
const projectsLoad = () => {
  const content = document.getElementById("content");

  clearChildren(content);
  clearAddButton();

  const projectsHeading = document.createElement("div");
  const projectsTitle = document.createElement("div");
  const addLabel = document.getElementById("addlabel");
  const addContainer = document.querySelector(".addcontainer");

  projectsHeading.classList.add("pageheading");

  projectsTitle.classList.add("pagetitle");
  projectsTitle.textContent = "Projects";

  addLabel.textContent = "Add project";

  content.appendChild(projectsHeading);
  projectsHeading.appendChild(projectsTitle);

  // Call the input function when the add button is clicked
  addContainer.addEventListener("click", () =>
    inputForm("project", projectsLoad),
  );

  // Populate the projects tab with project cards
  if (JSON.parse(localStorage.getItem("projects"))) {
    populateProjects(content, projectsLoad);
  } else {
    alert(`ERROR: Projects array is missing!`);
  }
};

export default projectsLoad;
