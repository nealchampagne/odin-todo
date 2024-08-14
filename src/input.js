import setAttributes from './setattributes.js';
import { v4 as uuidv4 } from 'uuid';
import writeToStorage from './writestorage.js';
import clearChildren from './clearchildren.js';
import moment from 'moment/moment.js';
import clearAddButton from "./clearaddbutton";

const inputForm = (type, func) => {

  // Create DOM elements for input input form
  const container = document.querySelector('.container');
  const addContainer = document.querySelector('.addcontainer');
  const input = document.createElement('div');
  const inputTop = document.createElement('div');
  const formLabel = document.createElement('div');

  const close = document.createElement('button');
  const form = document.createElement('form');

  const name = document.createElement('input');
  const nameLabel = document.createElement('label');

  const parentProject = document.createElement('select');
  const parentLabel = document.createElement('label');
  const noProject = document.createElement('option');

  const dueDate = document.createElement('input');
  const dueLabel = document.createElement('label');

  const desc = document.createElement('textarea');
  const descLabel = document.createElement('label');

  const priority = document.createElement('select');
  const prioLabel = document.createElement('label');
  const prio0 = document.createElement('option');
  const prio1 = document.createElement('option');
  const prio2 = document.createElement('option');
  const prio3 = document.createElement('option');
  const prio4 = document.createElement('option');
  
  // TO IMPLEMENT (PARENT PROJECT FOR TASKS)

  const submit = document.createElement('button');

  // Set attributes on input elements
  setAttributes(input, {'class': `${type}input`});

  inputTop.classList.add('inputtop');
  formLabel.classList.add('formlabel');
  formLabel.textContent = `New ` + type.charAt(0).toUpperCase() + type.slice(1);

  // Close button
  close.classList.add('closebtn');
  close.textContent = '×';

  // Name field
  setAttributes(name, {'class': 'nameinput', 'id': 'name', 'name': 'name', 
    'type': 'text', 'hidden': 'true'});

  setAttributes(nameLabel, {'for': 'name', 'hidden': 'true'});
  nameLabel.textContent = 'Name';

  // Parent project field
  setAttributes(parentProject, {'class': 'select', 'id': 'parentproject', 
    'name': 'parentproject', 'hidden': 'true'});

  setAttributes(parentLabel, {'for': 'parentproject', 'hidden': 'true'});
  parentLabel.textContent = 'Project';

  noProject.textContent = 'None';

  // Due date
  setAttributes(dueDate, {'class': 'dateinput', 'id': 'duedate', 'name': 'duedate', 
    'type': 'date' , 'hidden': 'true'});

  setAttributes(dueLabel, {'for': 'duedate', 'hidden': 'true'});
  dueLabel.textContent = 'Due date';

  // Description
  setAttributes(desc, {'class': 'textarea', 'id': 'desc', 'name': 'desc',
    'rows': '4', 'cols': '45', 'overflow-y': 'scroll', 'hidden': 'true'});

  setAttributes(descLabel, {'for': 'desc', 'hidden': 'true'});
  descLabel.textContent = 'Description';

  // Priority
  setAttributes(priority, {'class': 'select', 'id': 'priority', 
    'name': 'priority', 'hidden': 'true'});

  setAttributes(prioLabel, {'for': 'priority', 'hidden': 'true'});
  prioLabel.textContent = 'Priority';

  prio0.textContent = 'Highest';
  prio0.setAttribute('value', 'highest');
  prio1.textContent = 'High';
  prio1.setAttribute('value', 'high');
  prio2.textContent = 'Medium';
  setAttributes(prio2, {'selected': 'true', 'value': 'medium'});
  prio3.textContent = 'Low';
  prio3.setAttribute('value', 'low');
  prio4.textContent = 'Lowest';
  prio4.setAttribute('value', 'lowest');

  // Submit button
  setAttributes(submit, {'class': 'submitbtn', 'hidden': 'true'});

  submit.textContent = `Submit ${type}`;

  // Append elements to the DOM
  const populateInput = () => {

    container.insertBefore(input, addContainer);

    input.appendChild(inputTop);

    inputTop.appendChild(formLabel);
    inputTop.appendChild(close);

    input.appendChild(form);

    form.appendChild(nameLabel);
    form.appendChild(name);

    form.appendChild(descLabel);
    form.appendChild(desc);

    form.appendChild(dueLabel);
    form.appendChild(dueDate);

    form.appendChild(prioLabel);
    form.appendChild(priority);
    priority.appendChild(prio0);
    priority.appendChild(prio1);
    priority.appendChild(prio2);
    priority.appendChild(prio3);
    priority.appendChild(prio4);

    form.appendChild(parentLabel);
    form.appendChild(parentProject);
    clearChildren(parentProject);

    parentProject.appendChild(noProject);

    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    storedProjects.forEach(element => {

      const projectOption = document.createElement('option');

      projectOption.setAttribute('value', element.id);
      projectOption.textContent = element.name;

      parentProject.appendChild(projectOption);
    });

    input.appendChild(submit);
  }

  if (type === 'task') {

    input.removeAttribute('class');
    input.classList.add('taskinput');

    form.removeAttribute('class');
    form.classList.add('taskform');

    name.removeAttribute('hidden');
    nameLabel.removeAttribute('hidden');

    parentLabel.removeAttribute('hidden');
    parentProject.removeAttribute('hidden');

    dueDate.removeAttribute('hidden');
    dueLabel.removeAttribute('hidden');

    desc.removeAttribute('hidden');
    descLabel.removeAttribute('hidden');

    priority.removeAttribute('hidden');
    prioLabel.removeAttribute('hidden');

    submit.removeAttribute('hidden');
  }
  if (type === 'project') {

    input.removeAttribute('class');
    input.classList.add('projectinput');

    form.removeAttribute('class');
    form.classList.add('projectform');

    name.removeAttribute('hidden');
    nameLabel.removeAttribute('hidden');

    parentLabel.setAttribute('hidden', 'true');
    parentProject.setAttribute('hidden', 'true');

    dueDate.removeAttribute('hidden');
    dueLabel.removeAttribute('hidden');

    desc.removeAttribute('hidden');
    descLabel.removeAttribute('hidden');

    priority.removeAttribute('hidden');
    prioLabel.removeAttribute('hidden');

    submit.removeAttribute('hidden');
  }

  populateInput();

  // Close the input and reset the form
  close.addEventListener('click', () => {
    form.reset();
    input.remove();
  });

  // Submit the To-do, close the input, and reset the form
  submit.addEventListener('click', () => {
    const newTodo = {};
    if (type === 'project') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.type = type;
      if (dueDate.value) {
        newTodo.dueDate = moment(dueDate.value);
      } else {
        newTodo.dueDate = 'None';
      }
      newTodo.description = desc.value;
      newTodo.priority = priority.value;

    } else if (type === 'task') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.parentId = parentProject.value;
      newTodo.type = type;
      if (dueDate.value) {
        newTodo.dueDate = moment(dueDate.value);
      } else {
        newTodo.dueDate = 'None';
      }
      newTodo.description = desc.value;
      newTodo.priority = priority.value;
      newTodo.subTasks = [];
    };
    writeToStorage(newTodo);
    form.reset();
    input.remove();
    clearAddButton();
    func();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};

export default inputForm;