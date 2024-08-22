import "./style.css";
import initializeStorage from "./initializestorage.js";
import clearChildren from "./clearchildren.js";
import homeLoad from "./home.js";
import projectsLoad from "./projects.js";
import clearAddButton from "./clearaddbutton.js";

// Set up storage when the user first loads the page
initializeStorage();

const content = document.getElementById("content");

const homeBtn = document.getElementById("home");
const projectsBtn = document.getElementById("projects");

// Load initial page
homeLoad();

// Set up listeners for tab switching
homeBtn.addEventListener("click", () => {
  clearChildren(content);
  clearAddButton();
  homeLoad();
});

projectsBtn.addEventListener("click", () => {
  clearChildren(content);
  clearAddButton();
  projectsLoad();
});
