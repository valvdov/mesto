const popupElement = document.querySelector(".popup");
const popupCloseButton = popupElement.querySelector(".popup__close-button");
const popupOpenButton = document.querySelector(".profile__edit-button");
const popupName = popupElement.querySelector('[name ="popup_name"]');
const popupJob = popupElement.querySelector('[name ="popup_job"]');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupSubmit = popupElement.querySelector(".popup__form");

//Открытие popup
const openPopup = function (event) {
  popupElement.classList.add("popup_opened");
  popupJob.value = profileJob.textContent;
  popupName.value = profileName.textContent;
};

//Закрытие popup
const closePopup = function (event) {
  popupElement.classList.remove("popup_opened");
};

//отправка popup
const submitPopup = function (event) {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  event.preventDefault();
  closePopup();
};

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupSubmit.addEventListener("submit", submitPopup);
