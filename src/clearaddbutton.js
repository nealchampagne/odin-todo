const clearAddButton = () => {
  const addContainer = document.querySelector('.addcontainer');
  const newAddContainer = addContainer.cloneNode(true);
  addContainer.parentNode.replaceChild(newAddContainer, addContainer);
}

export default clearAddButton;