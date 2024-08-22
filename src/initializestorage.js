const initializeStorage = () => {
  /** Check if a projects and/or tasks array exists in localStorage.
   *  If either doesn't exist, create an empty array */

  if (!Array.isArray(JSON.parse(localStorage.getItem("projects")))) {
    const projects = [];
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  if (!Array.isArray(JSON.parse(localStorage.getItem("tasks")))) {
    const tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // If the showComplete key doesn't exist, initialize it to false

  if (localStorage.getItem("showComplete") === null) {
    localStorage.setItem("showComplete", false);
  }
};

export default initializeStorage;
