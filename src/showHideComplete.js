const showHideComplete = () => {

  const showHideCompleteBtn = document.getElementById('showhide');
  if (JSON.parse(localStorage.getItem('showComplete')) === false) {
    localStorage.setItem('showComplete', true);
  } else {
    localStorage.setItem('showComplete', false);
  }

  const content = document.getElementById('content');
  for (const child of content.children) {
    if (showHideCompleteBtn.classList.contains('showcomplete')) {
      if (child.classList.contains('complete')) {
        child.classList.remove('hidden');
      };
    } else if (showHideCompleteBtn.classList.contains('hidecomplete')) {
      if (child.classList.contains('complete')) {
        child.classList.add('hidden');
      }
    }
  };
};

export default showHideComplete;