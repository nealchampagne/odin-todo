import clearChildren from './clearchildren.js';
import dateSort from './sort.js';

const populateToDos = (node, arr) => {

  dateSort(arr).forEach(todo => {

    const toDoCard = document.createElement('div');
    const name = document.createElement('div');
    const dueDate = document.createElement('div');
    const desc = document.createElement('div');
    const priority = document.createElement('div');
    
    toDoCard.classList.add('card');
    toDoCard.classList.add(`priority${todo.priority}`);

    name.classList.add('name');
    name.textContent = todo.name;

    dueDate.classList.add('duedate');
    dueDate.textContent = todo.dueDate;

    desc.classList.add('desc');
    desc.textContent = todo.description;

    priority.classList.add('priority');
    priority.textContent = todo.priority;

    node.appendChild(toDoCard);

    toDoCard.appendChild(name);

    if (todo.type === 'task') {

      const parentProject = document.createElement('div');

      parentProject.classList.add('parentproject');

      if (todo.parentId === 'None') {

        parentProject.textContent = `Project: ${todo.parentId}`

      } else {

        const storedProjects = JSON.parse(localStorage.getItem("projects"));

        storedProjects.forEach(proj => {

          if (proj.id === todo.parentId) {

            parentProject.textContent = `Project: ${proj.name}`;
          }
        })
      }
      toDoCard.appendChild(parentProject);
    };

    toDoCard.appendChild(dueDate)
    toDoCard.appendChild(desc);
    toDoCard.appendChild(priority);
  })
};

export default populateToDos;