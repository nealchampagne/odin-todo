// Helper function for when I need to set multiple attributes at once
const setAttributes = (el, attrs) => {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

export default setAttributes;
