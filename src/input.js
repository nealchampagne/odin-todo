import setAttributes from './setattributes.js';

const inputModal = () => {

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
  const submit = document.createElement('button');

  // 
  setAttributes(modal, {'class': 'modal'});
  close.classList.add('closebtn');
  close.textContent = '×';
  form.setAttribute('id', 'taskform');
  setAttributes(type, {'class': 'select', 'id': 'type', 'name': 'type'});
  typeLabel.setAttribute('for', 'type');
  typeLabel.textContent = 'Type';
  setAttributes(type1, {'value': 'project'});
  type1.textContent = 'Task';
  setAttributes(type2, {'value': 'task'});
  type2.textContent = 'Project';
  setAttributes(name, {'class': 'input', 'id': 'name', 'name': 'name', 'type': 'text'});
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Name';
  setAttributes(dueDate, {'class': 'input', 'id': 'duedate', 'name': 'duedate', 'type': 'date'});
  dueLabel.setAttribute('for', 'duedate');
  dueLabel.textContent = 'Due date';
  setAttributes(desc, {'class': 'textarea', 'id': 'desc', 'name': 'desc', 'rows': '4', 'cols': '30', 'overflow-y': 'scroll'});
  descLabel.setAttribute('for', 'desc');
  descLabel.textContent = 'Description';
  setAttributes(priority, {'class': 'select', 'id': 'priority', 'name': 'priority'});
  prioLabel.setAttribute('for', 'priority');
  prioLabel.textContent = 'priority';
  prioLabel.textContent = 'Priority';
  prio0.textContent = '0';
  prio1.textContent = '1';
  prio2.textContent = '2';
  prio3.textContent = '3';
  prio4.textContent = '4';
  setAttributes(submit, {'class': 'submitbtn', 'type': 'submit', 'form': 'taskform'});
  submit.textContent = 'Submit';

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
  form.appendChild(submit);

  close.addEventListener('click', () => {
    form.reset();
    modal.style.display = 'none';
  })

  submit.addEventListener('submit', (event) => {
    const newTask = {}
    if (type.value = 'project') {
      newTask.name = name.value;
      newTask.dueDate = dueDate.value;
      newTask.description = desc.value;
      newTask.priority = priority.value;
    }
    taskform.reset();
    modal.style.display = 'none';
    event.preventDefault();
  })
}

export default inputModal;