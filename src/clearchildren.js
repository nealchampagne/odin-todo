const clearChildren = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

export default clearChildren;