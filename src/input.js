import setAttributes from './setattributes.js';
import { v4 as uuidv4 } from 'uuid';
import writeToStorage from './writestorage.js';

const inputModal = () => {

  // Create DOM elements for modal input form
  const content = document.getElementById('content');
  const modal = document.createElement('div');
  const close = document.createElement('button');
  const form = document.createElement('form');
  const type = document.createElement('select');
  const typeLabel = document.createElement('label');
  const type1 = document.createElement('option');
  const type2 = document.createElement('option');
  const name = document.createElement('input');
  const nameLabel = document.createElement('label');
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
  setAttributes(modal, {'class': 'modal'});

  // Close button
  close.classList.add('closebtn');
  close.textContent = '×';

  // Form
  form.setAttribute('id', 'taskform');

  // Type field
  setAttributes(type, {'class': 'select', 'id': 'type', 'name': 'type'});
  typeLabel.setAttribute('for', 'type');
  typeLabel.textContent = 'Type';
  setAttributes(type1, {'value': 'task'});
  type1.textContent = 'Task';
  setAttributes(type2, {'value': 'project'});
  type2.textContent = 'Project';

  // Name field
  setAttributes(name, {'class': 'input', 'id': 'name', 'name': 'name', 'type': 'text'});
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name';

  // Due date
  setAttributes(dueDate, {'class': 'input', 'id': 'duedate', 'name': 'duedate', 'type': 'date'});
  dueLabel.setAttribute('for', 'duedate');
  dueLabel.textContent = 'Due date';

  // Description
  setAttributes(desc, {'class': 'textarea', 'id': 'desc', 'name': 'desc', 'rows': '4', 'cols': '30', 'overflow-y': 'scroll'});
  descLabel.setAttribute('for', 'desc');
  descLabel.textContent = 'Description';

  // Priority
  setAttributes(priority, {'class': 'select', 'id': 'priority', 'name': 'priority'});
  prioLabel.setAttribute('for', 'priority');
  prioLabel.textContent = 'priority';
  prioLabel.textContent = 'Priority';
  prio0.textContent = '0';
  prio1.textContent = '1';
  prio2.textContent = '2';
  prio3.textContent = '3';
  prio4.textContent = '4';

  // Submit button
  setAttributes(submit, {'class': 'submitbtn'});
  submit.textContent = 'Submit';

  // Append elements to the DOM
  content.appendChild(modal);
  modal.appendChild(close);
  modal.appendChild(form);
  form.appendChild(typeLabel);
  form.appendChild(type);
  type.appendChild(type1);
  type.appendChild(type2);
  form.appendChild(nameLabel);
  form.appendChild(name);
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

  // Close the modal and reset the form
  close.addEventListener('click', () => {
    form.reset();
    modal.style.display = 'none';
  })

  // Submit the To-do, close the modal, and reset the form
  submit.addEventListener('click', () => {
    const newTodo = {};
    if (type.value === 'project') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.type = type.value;
      newTodo.dueDate = dueDate.value;
      newTodo.description = desc.value;
      newTodo.priority = priority.value;

    } else if (type.value === 'task') {
      newTodo.name = name.value;
      newTodo.id = uuidv4();
      newTodo.type = type.value;
      newTodo.dueDate = dueDate.value;
      newTodo.description = desc.value;
      newTodo.priority = priority.value;
      newTodo.subTasks = [];
      // Get parent project by uuid
    }
    writeToStorage(newTodo);
    // !!TEST!!
    console.log(newTodo);

    form.reset();
    modal.style.display = 'none';
  })
}

export default inputModal;