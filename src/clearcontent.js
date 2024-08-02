const content = document.getElementById('content');

const clearContent = () => {
  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }
}

export default clearContent;