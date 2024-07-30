const inboxLoad = () => {

  const content = document.getElementById('content');
  const main = document.createElement('div');

  main.classList.add('main');

  main.textContent = 'Hello ToDo!';

  content.appendChild(main);

};

export default inboxLoad;