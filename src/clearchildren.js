// Helper function for when I need to wipe a DOM node clean
const clearChildren = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

export default clearChildren;