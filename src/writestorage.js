const writeToStorage = (obj) => {
  if (obj.type === 'project') {
    const storedProjects = JSON.parse(localStorage.getItem("projects"));
    storedProjects.push(obj);
  }
};

export default writeToStorage;