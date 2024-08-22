// Keep event listeners from stacking on add button when pages load
const clearAddButton = () => {

  const addContainer = document.querySelector('.addcontainer');

  // Clone the Add Button container to clear event listeners
  const newAddContainer = addContainer.cloneNode(true);
  addContainer.parentNode.replaceChild(newAddContainer, addContainer);
}

export default clearAddButton;