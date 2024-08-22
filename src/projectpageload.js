import clearChildren from "./clearchildren";
import clearAddButton from "./clearaddbutton";
import inputForm from "./input";
import populateTasks from "./populatetasks";
import showHideComplete from "./showhidecomplete";
import initializeStorage from "./initializestorage";

// Load the page for an individual project
const projectPageLoad = (projId) => {
  const content = document.getElementById("content");

  clearChildren(content);
  clearAddButton();

  const storedProjects = JSON.parse(localStorage.getItem("projects"));

  if (!Array.isArray(storedProjects)) {
    alert("localStorage has been corrupted. Storage must be reset.");
    initializeStorage();
  }

  const project = storedProjects.find((obj) => obj.id === projId);
  const projectHeading = document.createElement("div");
  const projectTitle = document.createElement("div");
  const showHideCompleteBtn = document.createElement("button");
  const addLabel = document.getElementById("addlabel");
  const addContainer = document.querySelector(".addcontainer");

  projectHeading.classList.add("pageheading");

  projectTitle.classList.add("pagetitle");
  projectTitle.textContent = project.name;

  showHideCompleteBtn.setAttribute("id", "showhide");

  // Check the value of showComplete and show/hide elements as appropriate
  if (JSON.parse(localStorage.getItem("showComplete")) === false) {
    showHideCompleteBtn.classList.add("hidecomplete");
    showHideCompleteBtn.textContent = "Show completed tasks";
  } else {
    showHideCompleteBtn.classList.add("showcomplete");
    showHideCompleteBtn.textContent = "Hide completed tasks";
  }

  addLabel.textContent = "Add task";

  content.appendChild(projectHeading);
  projectHeading.appendChild(projectTitle);
  projectHeading.appendChild(showHideCompleteBtn);

  addContainer.addEventListener("click", () =>
    inputForm("task", projectPageLoad, projId),
  );

  // Wire up the show/hide button and call the showHideComplete function
  showHideCompleteBtn.addEventListener("click", () => {
    if (showHideCompleteBtn.textContent === "Show completed tasks") {
      showHideCompleteBtn.textContent = "Hide completed tasks";
      showHideCompleteBtn.classList.remove("hidecomplete");
      showHideCompleteBtn.classList.add("showcomplete");
      showHideComplete();
    } else {
      showHideCompleteBtn.textContent = "Show completed tasks";
      showHideCompleteBtn.classList.remove("showcomplete");
      showHideCompleteBtn.classList.add("hidecomplete");
      showHideComplete();
    }
  });

  // Populate the page with the given project's tasks
  const projTaskArray = [];

  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (!Array.isArray(storedTasks)) {
    alert("localStorage has been corrupted. Storage must be reset.");
    initializeStorage();
  }

  if (storedTasks) {
    JSON.parse(localStorage.getItem("tasks")).forEach((obj) => {
      if (obj.parentId === projId) {
        projTaskArray.push(obj);
      }
    });
    populateTasks(content, projTaskArray, projectPageLoad, projId);
  } else {
    alert(`ERROR: Tasks array is missing!`);
  }
};

export default projectPageLoad;
