const initializeStorage = () => {

  /** Check if a projects and/or tasks array exists in localStorage.
   *  If either doesn't exist, create an empty array */
  if (!localStorage.getItem('projects')) {
    const projects = [];
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  if (!localStorage.getItem('tasks')) {
    const tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export default initializeStorage;