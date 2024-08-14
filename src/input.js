import setAttributes from './setattributes.js';
import { v4 as uuidv4 } from 'uuid';
import writeToStorage from './writestorage.js';
import clearChildren from './clearchildren.js';
import moment from 'moment/moment.js';

const inputModal = (func) => {

  // Create DOM elements for modal input form
  const content = document.getElementById('content');
  const modal = document.createElement('div');
  const modalTop = document.createElement('div');
  const formLabel = document.createElement('div');

  const close = document.createElement('button');
  const form = document.createElement('form');

  const type = document.createElement('select');
  const typeLabel = document.createElement('label');
  const noType = document.createElement('option');
  const type1 = document.createElement('option');
  const type2 = document.createElement('option');

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

  // Set attributes on modal elements
  setAttributes(modal, {'class': 'tinymodal'});

  modalTop.classList.add('modaltop');
  formLabel.classList.add('formlabel');
  formLabel.textContent = 'New To-Do';

  // Close button
  close.classList.add('closebtn');
  close.textContent = '×';

  // Form
  form.classList.add('tinyform');

  // Type field
  setAttributes(type, {'class': 'select', 'id': 'type', 'name': 'type'});
  typeLabel.setAttribute('for', 'type');
  typeLabel.textContent = 'Type';

  setAttributes(noType, {'disabled': 'true', 'selected': 'true', 'value': 'true', 'hidden': 'true'});
  noType.textContent = '-----';

  setAttributes(type1, {'value': 'task'});
  type1.textContent = 'Task';

  setAttributes(type2, {'value': 'project'});
  type2.textContent = 'Project';

  // Name field
  setAttributes(name, {'class': 'input', 'id': 'name', 'name': 'name', 
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
  setAttributes(dueDate, {'class': 'input', 'id': 'duedate', 'name': 'duedate', 
    'type': 'date' , 'hidden': 'true'});

  setAttributes(dueLabel, {'for': 'duedate', 'hidden': 'true'});
  dueLabel.textContent = 'Due date';

  // Description
  setAttributes(desc, {'class': 'textarea', 'id': 'desc', 'name': 'desc',
    'rows': '4', 'cols': '27', 'overflow-y': 'scroll', 'hidden': 'true'});

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

  submit.textContent = 'Submit';

  // Append elements to the DOM
  const populateModal = () => {

    clearChildren(modal);

    content.appendChild(modal);

    modal.appendChild(modalTop);

    modalTop.appendChild(formLabel);
    modalTop.appendChild(close);

    modal.appendChild(form);

    form.appendChild(typeLabel);
    form.appendChild(type);
    type.append(noType);
    type.appendChild(type1);
    type.appendChild(type2);

    form.appendChild(nameLabel);
    form.appendChild(name);

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

    form.appendChild(dueLabel);
    form.appendChild(dueDate);

    form.appendChild(descLabel);
    form.appendChild(desc);

    form.appendChild(prioLabel);
    form.appendChild(priority);
    priority.appendChild(prio0);
    priority.appendChild(prio1);
    priority.appendChild(prio2);
    priority.appendChild(prio3);
    priority.appendChild(prio4);

    modal.appendChild(submit);
  }

  populateModal();

  // Toggle modal type depending on type selection
  type.addEventListener('change', () => {
    if (type.value === 'task') {

      modal.removeAttribute('class');
      modal.classList.add('taskmodal');

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

      populateModal();
    }
    if (type.value === 'project') {

      modal.removeAttribute('class');
      modal.classList.add('projectmodal');

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

      populateModal();
    }
  });

  // Close the modal and reset the form
  close.addEventListener('click', () => {
    form.reset();
    modal.style.display = 'none';
  });

  // Submit the To-do, close the modal, and reset the form
  submit.addEventListener('click', () => {
    const newTodo = {};
    if (type.value === 'project') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.type = type.value;
      if (dueDate.value) {
        newTodo.dueDate = moment(dueDate.value);
      } else {
        newTodo.dueDate = 'None';
      }
      newTodo.description = desc.value;
      newTodo.priority = priority.value;

    } else if (type.value === 'task') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.parentId = parentProject.value;
      newTodo.type = type.value;
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
    modal.style.display = 'none';
    func();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};

export default inputModal;