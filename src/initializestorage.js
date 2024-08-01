const initializeStorage = () => {

  const projects = [];
  const tasks = [];

  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

export default initializeStorage;