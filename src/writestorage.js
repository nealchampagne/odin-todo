import initializeStorage from "./initializestorage";

const writeToStorage = (obj) => {
  if (obj.type === "project") {
    // Grab project array from localStorage
    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    if (!Array.isArray(storedProjects)) {
      alert("localStorage has been corrupted. Storage must be reset.");
      initializeStorage();
    }

    // If a project with that id already exists, overwrite it
    storedProjects.forEach((element) => {
      if (element.id === obj.id) {
        storedProjects.splice(storedProjects.indexOf(element), 1, obj);
      }
    });

    // Now, if that project still doesn't exist in the array, push it in
    if (!storedProjects.includes(obj)) {
      storedProjects.push(obj);
    }

    // Write the updated array back to localStorage
    localStorage.setItem("projects", JSON.stringify(storedProjects));
  }

  if (obj.type === "task") {
    // Grab task array from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (!Array.isArray(storedTasks)) {
      alert("localStorage has been corrupted. Storage must be reset.");
      initializeStorage();
    }

    // If a task with that id already exists, overwrite it
    storedTasks.forEach((element) => {
      if (element.id === obj.id) {
        storedTasks.splice(storedTasks.indexOf(element), 1, obj);
      }
    });

    // Now, if that task still doesn't exist in the array, push it in
    if (!storedTasks.includes(obj)) {
      storedTasks.push(obj);
    }

    // Write the updated array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }
};

export default writeToStorage;
