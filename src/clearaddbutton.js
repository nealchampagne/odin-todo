const addTodo = document.getElementById('add');

const clearAddButton = () => {
  addTodo.replaceWith(addTodo.cloneNode(true));
}

export default clearAddButton;