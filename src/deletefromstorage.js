// Delete tasks/projects from local storage
const deleteFromStorage = (type, id , func, projId = null) => {

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  if (type === 'task') {

    // Find task by id and splice it out of the tasks array
    const targetTask = storedTasks.find(obj => obj.id === id);
    const targetTaskIndex = storedTasks.indexOf(targetTask);
    storedTasks.splice(targetTaskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    /** Call the page function again to reflect changes
     * Call the correct project if this occurs on a project page */
    if (projId) {
      func(projId);
    } else {
      func();
    }
  } else if (type === 'project') {

    const storedProjects = JSON.parse(localStorage.getItem('projects'));

    // Find the project and splice it out of the project array
    const targetProject = storedProjects.find(obj => obj.id === id);
    const targetProjIndex = storedProjects.indexOf(targetProject);

    storedProjects.splice(targetProjIndex, 1);
  
    localStorage.setItem('projects', JSON.stringify(storedProjects));

    // Then go through and make a new tasks array without the project's tasks
    const trimmedTasks = [];

    storedTasks.forEach(obj => {
      if (obj.parentId !== id) {
        trimmedTasks.push(obj);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(trimmedTasks));
    func();
  }
} 

export default deleteFromStorage;