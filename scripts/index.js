const popupElement = document.querySelector(".popup");
const popupCloseButton = popupElement.querySelector(".popup__close-button");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupName = popupElement.querySelector(".popup__name");
const popupJob = popupElement.querySelector(".popup__job");
const popupSubmitButton = popupElement.querySelector(".popup__submit-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
// const likeButton = document.querySelector(".element__like");

const openPopup = function (event) {
  popupElement.classList.add("popup_opened");
  popupJob.value = profileJob.textContent;
  popupName.value = profileName.textContent;
};

const closePopup = function (event) {
  popupElement.classList.remove("popup_opened");
};

const submitPopup = function (event) {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popupElement.classList.remove("popup_opened");
};

const submitPopupByEnter = function (event) {
  if (event.key === "Enter") {
    submitPopup();
  }
};

// const likeEnable = function (event) {
//   likeButton.classList.add("element__like_pressed");
// };

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupSubmitButton.addEventListener("click", submitPopup);
popupElement.addEventListener("keypress", submitPopupByEnter);
// likeButton.addEventListener("click", likeEnable);
