import setAttributes from './setattributes.js';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import writeToStorage from './writestorage.js';
import clearChildren from './clearchildren.js';
import moment from 'moment/moment.js';
import sort from './sort.js';
import initializeStorage from './initializestorage.js';

const inputForm = (type, func, projId = null, node = null, taskId = null, editName = null, editParent = null, editDate = null, editDesc = null, editPrio = null) => {

  // Create DOM elements for input input form
  const content = document.getElementById('content');
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

  const submit = document.createElement('button');

  // Set attributes on input elements
  setAttributes(input, {'class': `${type}input`});

  inputTop.classList.add('inputtop');
  formLabel.classList.add('formlabel');
  if (editName || editPrio) {
    formLabel.textContent = `Edit ` + type.charAt(0).toUpperCase() + type.slice(1);
  } else {
    formLabel.textContent = `New ` + type.charAt(0).toUpperCase() + type.slice(1);
  } 
  // Close button
  close.classList.add('closebtn');
  close.textContent = '×';

  // Name field
  setAttributes(name, {'class': 'nameinput', 'id': 'name', 'name': 'name', 
    'type': 'text', 'hidden': 'true'});
  if (editName) {
    name.setAttribute('value', editName);
  };

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
  if (editDate && editDate !== 'None') {
    dueDate.setAttribute('value', format(editDate, 'yyyy-MM-dd'));
  }

  setAttributes(dueLabel, {'for': 'duedate', 'hidden': 'true'});
  dueLabel.textContent = 'Due date';

  // Description
  setAttributes(desc, {'class': 'textarea', 'id': 'desc', 'name': 'desc',
    'rows': '4', 'cols': '45', 'overflow-y': 'scroll', 'hidden': 'true'});
  
  if (editDesc) {
    if (editDesc === 'None') {
      desc.textContent = '';
    } else {
      desc.textContent = editDesc;
    }
  }

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
  if (!editPrio) {
    setAttributes(prio2, {'selected': 'true', 'value': 'medium'});
  }
  prio3.textContent = 'Low';
  prio3.setAttribute('value', 'low');
  prio4.textContent = 'Lowest';
  prio4.setAttribute('value', 'lowest');

  // Submit button
  setAttributes(submit, {'class': 'submitbtn', 'hidden': 'true'});

  if (node) {
    submit.textContent = 'Save changes';
  } else {
    submit.textContent = `Submit ${type}`;
  };

  // Append elements to the DOM
  const populateInput = () => {

    // If editing a task, insert in that tasks spot in the DOM
    if (node) {
      content.insertBefore(input, node);
      node.style.display = 'none';
    
    // Otherwise, append after all existing todo objects
    } else {
      content.appendChild(input);
    };
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

    // If editing a task, default to the current priority
    if (editPrio) {
      const oldPrio = document.createElement('option');
      setAttributes(oldPrio, {'selected': 'true', 'hidden': 'true', 'disabled': 'true'});
      oldPrio.textContent = editPrio.charAt(0).toUpperCase() + editPrio.slice(1);
      priority.appendChild(oldPrio);
    }
    priority.appendChild(prio0);
    priority.appendChild(prio1);
    priority.appendChild(prio2);
    priority.appendChild(prio3);
    priority.appendChild(prio4);

    form.appendChild(parentLabel);
    form.appendChild(parentProject);

    clearChildren(parentProject);

    const storedProjects = JSON.parse(localStorage.getItem("projects"));

    if (!Array.isArray(storedProjects)) {
      alert('localStorage has been corrupted. Storage must be reset.')
      initializeStorage();
    };

    // If adding/editing a task on a project page show that project as the first option
    if (projId) {
      const pageProjectOption = document.createElement('option');

      const pageProject = storedProjects.find(obj => obj.id === projId);

      setAttributes(pageProjectOption, {'selected': 'true', 'hidden': 'true', 'disabled': 'true', 'value': projId});
        
        pageProjectOption.textContent = pageProject.name.charAt(0).toUpperCase() + pageProject.name.slice(1);

        parentProject.appendChild(pageProjectOption);
    }

    // If editing a task, default to the current parent project
    parentProject.appendChild(noProject);

    if (editParent && editParent !== 'None') {
      const oldParentName = document.createElement('option');

      const oldParent = storedProjects.find(obj => obj.id === editParent);

      setAttributes(oldParentName, {'selected': 'true', 'hidden': 'true', 'disabled': 'true', 'value': editParent});
      
      oldParentName.textContent = oldParent.name.charAt(0).toUpperCase() + oldParent.name.slice(1);

      parentProject.appendChild(oldParentName);
    }

    sort(storedProjects).forEach(element => {

      const projectOption = document.createElement('option');

      projectOption.setAttribute('value', element.id);
      projectOption.textContent = element.name;

      parentProject.appendChild(projectOption);
    });

    input.appendChild(submit);
  }
  // if the input is for a task, show all fields
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

  // If the input is for a project, only show the name field
  if (type === 'project') {

    input.removeAttribute('class');
    input.classList.add('projectinput');

    form.removeAttribute('class');
    form.classList.add('projectform');

    name.removeAttribute('hidden');
    nameLabel.removeAttribute('hidden');

    parentLabel.setAttribute('hidden', 'true');
    parentProject.setAttribute('hidden', 'true');

    dueDate.setAttribute('hidden', 'true');
    dueLabel.setAttribute('hidden', 'true');

    desc.setAttribute('hidden', 'true');
    descLabel.setAttribute('hidden', 'true');

    priority.setAttribute('hidden', 'true');
    prioLabel.setAttribute('hidden', 'true');

    submit.removeAttribute('hidden');
  }

  populateInput();

  /** On submit button click, generate an object with the current input 
   *  information and write it to localStorage */
  const submitTodo = () => {

      const newTodo = {};
      
      if (type === 'project') {

        newTodo.name = name.value;
        
        // If editing a project, use current id
        if (projId) {
          newTodo.id = projId;
        } else {
        
        // Otherwise, generate new id
          newTodo.id = uuidv4();

        };

        newTodo.type = type;
  
      } else if (type === 'task') {
  
        newTodo.name = name.value;

        // If editing a task, use current id
        if (taskId) {
          newTodo.id = taskId;
        } else {
        
        // Otherwise, generate a new id
          newTodo.id = uuidv4();
        }
        
        newTodo.parentId = parentProject.value;
        
        newTodo.type = type;
  
        if (dueDate.value) {
  
          newTodo.dueDate = moment(dueDate.value);
  
        } else {
  
          newTodo.dueDate = 'None';
        }
  
        newTodo.description = desc.value;
        newTodo.priority = priority.value;
        newTodo.complete = false;
      };
  
      writeToStorage(newTodo);
      form.reset();
      input.remove();
      if (projId) {
        func(projId);
      } else {
        func();
      };
  };

  // Close the input and reset the form
  close.addEventListener('click', () => {
    form.reset();
    input.remove();
    if (node) {
      node.style.display = 'grid';
    }
  });

  // Submit the To-do, close the input, and reset the form
  submit.addEventListener('click', () => submitTodo())

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

};

export default inputForm;