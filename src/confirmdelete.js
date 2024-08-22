import deleteFromStorage from "./deletefromstorage";

// Show a confirmation modal in case the user clicked delete by accident
const confirmDelete = (type, id, func, projId = null) => {
  const content = document.querySelector(".container");
  const confirmModal = document.createElement("div");
  const confirmTitle = document.createElement("div");
  const confirmSubtext = document.createElement("div");
  const confirmButtons = document.createElement("div");
  const yesBtn = document.createElement("button");
  const noBtn = document.createElement("button");

  confirmModal.classList.add("confirmdelete");
  confirmTitle.classList.add("confirmtitle");
  confirmSubtext.classList.add("confirmsubtext");
  confirmButtons.classList.add("confbuttoncontainer");
  yesBtn.classList.add("confirmbutton");
  noBtn.classList.add("confirmbutton");

  confirmTitle.textContent = "Are you sure?";
  if (type === "task") {
    confirmSubtext.textContent = `Deleted tasks cannot be recovered.`;
  } else if (type === "project") {
    confirmSubtext.textContent = `This project and all tasks currently
     assigned to it will be permanently deleted.`;
  }

  yesBtn.textContent = "Yes";
  noBtn.textContent = "No";

  yesBtn.addEventListener("click", () => {
    confirmModal.remove();
    if (projId) {
      deleteFromStorage(type, id, func, projId);
    } else {
      deleteFromStorage(type, id, func);
    }
  });
  noBtn.addEventListener("click", () => confirmModal.remove());

  content.appendChild(confirmModal);
  confirmModal.appendChild(confirmTitle);
  confirmModal.appendChild(confirmSubtext);
  confirmModal.appendChild(confirmButtons);
  confirmButtons.appendChild(yesBtn);
  confirmButtons.appendChild(noBtn);
};

export default confirmDelete;
