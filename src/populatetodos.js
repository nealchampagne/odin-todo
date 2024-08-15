import dateSort from './sort.js';
import { format } from 'date-fns';

const populateToDos = (node, arr) => {

  dateSort(arr).forEach(todo => {

    const toDoCard = document.createElement('div');
    const toDoContent = document.createElement('div');
    const id = todo.id;
    const name = document.createElement('div');
    
    toDoCard.setAttribute('id', todo.id);

    toDoCard.classList.add(`${todo.type}card`);
    toDoCard.classList.add(`${todo.priority}priority`);

    toDoContent.classList.add(`${todo.type}content`);

    name.classList.add('todoname');
    name.textContent = todo.name;

    node.appendChild(toDoCard);
    toDoCard.appendChild(toDoContent);
    toDoContent.appendChild(name);

    if (todo.type === 'task') {
      
      const dueDate = document.createElement('div');
      const desc = document.createElement('div');
      const parentProject = document.createElement('div');

      dueDate.classList.add('tododuedate');
      if (todo.dueDate === 'None') {
        dueDate.textContent = `N/A`;
      } else {
        dueDate.textContent = `${format(todo.dueDate, 'MMM d, y')}`;
      }
  
      desc.classList.add('tododesc');
      desc.textContent = `${todo.description}`;
      if (desc.textContent === '') {
        desc.setAttribute('hidden', 'true');
        toDoCard.classList.add('nodesc');
      }

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

      toDoContent.appendChild(desc);
      toDoContent.appendChild(dueDate);
      toDoCard.appendChild(parentProject);
    };
  })
};

export default populateToDos;