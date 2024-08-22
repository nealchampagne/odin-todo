import sort from './sort.js';
import { compareAsc, differenceInCalendarDays, endOfToday, format, startOfToday } from 'date-fns';
import writeToStorage from './writestorage.js';
import inputForm from './input.js';
import confirmDelete from './confirmdelete.js';

// Create task cards for all tasks in a given array of task objects
const populateTasks = (node, arr, func) => {

  const showHideCompleteBtn = document.getElementById('showhide');

  // Sort the array
  sort(arr).forEach(task => {

    const taskCard = document.createElement('div');
    const leftContainer = document.createElement('div');
    const rightContainer = document.createElement('div');
    const checkBox = document.createElement('div');
    const name = document.createElement('div');
    const dueDateContainer = document.createElement('div');
    const dueDate = document.createElement('div');
    const dueFlag = document.createElement('div');
    const desc = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const parentProject = document.createElement('div');
    
    taskCard.setAttribute('id', task.id);

    taskCard.classList.add('taskcard');

    checkBox.classList.add('checkbox');

    leftContainer.classList.add('leftcontainer');

    rightContainer.classList.add('rightcontainer');

    // Populate task information from the array object
    name.classList.add('taskname');
    name.textContent = task.name;

    // Add a task completion checkbox color-coded by priority
    checkBox.classList.add(`${task.priority}`.toLowerCase() + `priority`);

    checkBox.addEventListener('mouseover', () => {
      checkBox.textContent = 'check';
    });

    checkBox.addEventListener('mouseout', () => {
      if (!task.complete) {
      checkBox.textContent = '';
      }
    });
    
    // Toggle complete status when checkbox is clicked
    checkBox.addEventListener('click', () => {
      if (!task.complete) {
        task.complete = true;
        if (showHideCompleteBtn.classList.contains('hidecomplete')) {
          taskCard.classList.add('hidden');
        };
        taskCard.classList.add('complete');
        checkBox.textContent = 'check';
      } else {
        task.complete = false;
        taskCard.classList.remove('hidden');
        taskCard.classList.remove('complete');
        checkBox.textContent = '';
      }
      // Save changes to the object's complete property
      writeToStorage(task);
    })

    if (task.complete) {
      taskCard.classList.add('complete');
      if (showHideCompleteBtn.classList.contains('hidecomplete')) {
        taskCard.classList.add('hidden');
      }
      checkBox.textContent = 'check';
    }

    // Format due date and add a flag which alerts the user to time remaining
    dueDateContainer.classList.add('duedatecontainer');

    dueDate.classList.add('taskduedate');

    dueFlag.classList.add('duedateflag');

    // If no date assigned, don't add the time remaining flag
    if (task.dueDate === 'None') {

      dueDate.textContent = `N/A`;
      dueFlag.style.display = 'none';
    } else {

      dueDate.textContent = `${format(task.dueDate, 'MMM d, y')}`;

      /** Calculate whole days remaining and mark task overdue if due date
       *  is in the past */
      if (compareAsc(task.dueDate, startOfToday()) === -1) {
        dueFlag.classList.add('overdue');
        dueFlag.textContent = `Overdue`;
      } else if (differenceInCalendarDays(task.dueDate, endOfToday()) === 0) {
        dueFlag.classList.add('duetoday');
        dueFlag.textContent = `Due today`;
      } else if (differenceInCalendarDays(task.dueDate, endOfToday()) === 1) {
        dueFlag.classList.add('duetomorrow');
        dueFlag.textContent = `Due tomorrow`;
      } else {
        dueFlag.classList.add('plentyoftime');
        dueFlag.textContent = `Due in ${differenceInCalendarDays(task.dueDate, endOfToday())} days.`
      };
    };
   
    desc.classList.add('taskdesc');
    desc.textContent = `${task.description}`;

    // If no description provided, add a class that removes empty space
    if (desc.textContent === '') {
      desc.setAttribute('hidden', 'true');
      taskCard.classList.add('nodesc');
    }

    buttonContainer.classList.add('buttoncontainer');

    editBtn.classList.add('editbutton');
    editBtn.textContent = 'Edit';

    // Open the input form prepopulated with task info on edit button click
    editBtn.addEventListener('click', () => {
      inputForm('task', func, task.id, taskCard, task.name, task.parentId,
        task.dueDate, task.description, task.priority);
    })

    deleteBtn.classList.add('deletebutton');
    deleteBtn.textContent = 'Delete';

    // Open confirmation modal on delete button click
    deleteBtn.addEventListener('click', () => {
      confirmDelete('task', task.id, func);
    });

    // Find parent project by parentId property and add project name to card
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
    taskCard.appendChild(leftContainer);
    leftContainer.appendChild(name);
    leftContainer.appendChild(desc);
    leftContainer.appendChild(dueDateContainer);
    dueDateContainer.appendChild(dueDate);
    dueDateContainer.appendChild(dueFlag);
    taskCard.appendChild(rightContainer);
    rightContainer.appendChild(buttonContainer);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);
    rightContainer.appendChild(parentProject);
  })
};

export default populateTasks;