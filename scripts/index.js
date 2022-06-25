const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupName = popupElement.querySelector('.popup__name');
const popupJob = popupElement.querySelector('.popup__job');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const openPopup = function(event) {
  popupElement.classList.add('popup__open');
  popupJob.value = profileJob.textContent;
  popupName.value = profileName.textContent;
};

const closePopup = function(event) {
  popupElement.classList.remove('popup__open');
};

const submitPopup = function(event) {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popupElement.classList.remove('popup__open');
};

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', submitPopup);