import sort from './sort.js';
import { format } from 'date-fns';

const populateTasks = (node, arr) => {

  sort(arr).forEach(task => {

    const taskCard = document.createElement('div');
    const taskContent = document.createElement('div');
    const checkBox = document.createElement('div');
    const name = document.createElement('div');
    const dueDate = document.createElement('div');
    const desc = document.createElement('div');
    const parentProject = document.createElement('div');
    
    taskCard.setAttribute('id', task.id);

    taskCard.classList.add('taskcard');

    checkBox.classList.add('checkbox');

    taskContent.classList.add('taskcontent');

    name.classList.add('taskname');
    name.textContent = task.name;

    checkBox.classList.add(`${task.priority}`.toLowerCase() + `priority`);

    checkBox.addEventListener('mouseover', () => {
      checkBox.textContent = 'check';
    });

    checkBox.addEventListener('mouseout', () => {
      checkBox.textContent = '';
    });

    dueDate.classList.add('taskduedate');

    if (task.dueDate === 'None') {
      dueDate.textContent = `N/A`;
    } else {
      dueDate.textContent = `${format(task.dueDate, 'MMM d, y')}`;
    }
   
    desc.classList.add('taskdesc');
    desc.textContent = `${task.description}`;

    if (desc.textContent === '') {
      desc.setAttribute('hidden', 'true');
      taskCard.classList.add('nodesc');
    }

    parentProject.classList.add('parentproject');

    if (task.parentId === 'None') {

      parentProject.textContent = `Project: ${task.parentId}`

    } else {

      const storedProjects = JSON.parse(localStorage.getItem("projects"));

      storedProjects.forEach(proj => {

        if (proj.id === task.parentId) {

          parentProject.textContent = `Project: ${proj.name}`;
        }
      })
    }

    node.appendChild(taskCard);
    taskCard.appendChild(checkBox);
    taskCard.appendChild(taskContent);
    taskContent.appendChild(name);
    taskContent.appendChild(desc);
    taskContent.appendChild(dueDate);
    taskCard.appendChild(parentProject);
  })
};

export default populateTasks;