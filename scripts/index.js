const selectors = {
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  popup: '.popup',
  popupEdit: '#popup-edit',
  popupEditName: '#popup-edit__name',
  popupEditJob: '#popup-edit__job',
  popupEditCloseButton: '#popup-edit__close-button',
  popupEditForm: '#popup-edit__form',
  popupAdd: '#popup-add',
  popupAddPlace: '#popup-add__place',
  popupAddLink: '#popup-add__link',
  popupAddCloseButton: '#popup-add__close-button',
  popupAddForm: '#popup-add__form',
  popupFull: '#popup__fullscreen',
  popupFullImg: '.popup__fullscreen-image',
  popupFullTitle: '.popup__fullscreen-title',
  popupFullClose: '#popup__fullscreen-close',
  template: '.card-template',
  cards: '.cards',
  card: '.card',
  cardTitle: '.card__title',
  cardImage: '.card__image',
  cardDelete: '.card__delete',
  cardLike: '.card__like',
  cardLikeActive: '.card__like_active',
  cardImageBtn: '.card__image-button'
}

//template

const cardTemplate = document.querySelector(selectors.template).content.querySelector(selectors.card);

//profile

const profileAddButton = document.querySelector(selectors.profileAddButton);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const profileName = document.querySelector(selectors.profileName);
const profileJob = document.querySelector(selectors.profileJob);

//cards

const cards = document.querySelector(selectors.cards);

const popup = document.querySelector(selectors.popup);

//popup edit

const popupEdit = document.querySelector(selectors.popupEdit);
const popupEditSubmit = popupEdit.querySelector(selectors.popupEditForm);
const popupEditName = popupEdit.querySelector(selectors.popupEditName);
const popupEditJob = popupEdit.querySelector(selectors.popupEditJob);
const popupEditClose = popupEdit.querySelector(selectors.popupEditCloseButton);

//popup add

const popupAdd = document.querySelector(selectors.popupAdd);
const popupAddSubmit = popupAdd.querySelector(selectors.popupAddForm);
const popupAddPlace = popupAdd.querySelector(selectors.popupAddPlace);
const popupAddLink = popupAdd.querySelector(selectors.popupAddLink);
const popupAddClose = popupAdd.querySelector(selectors.popupAddCloseButton);

//popup fullscreen

const popupFull = document.querySelector(selectors.popupFull);
const popupFullImg = popupFull.querySelector(selectors.popupFullImg);
const popupFullTitle = popupFull.querySelector(selectors.popupFullTitle);
const popupFullClose = popupFull.querySelector(selectors.popupFullClose);

//function open popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (event) => popupCloseByEsc(event, popup));
  popup.addEventListener('click',(event) => popupCloseByOverlay(event, popup));
}

//function close popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//copy info from Edit popup to profile

function copyInfoToProfile (event) {
  event.preventDefault();
  profileName.textContent = popupEditName.value;
  profileJob.textContent = popupEditJob.value;
  closePopup(popupEdit);
}

//copy info from Add popup to card

function copyInfoToCard (event) {
  event.preventDefault();
  const card = createCard(popupAddPlace.value, popupAddLink.value);
  renderCard(card, cards);
  closePopup(popupAdd);
}

//Create card from template

function createCard(name, link){
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector(selectors.cardImage);
  cardImage.src = link;
  cardImage.alt = name;
  const cardName = card.querySelector(selectors.cardTitle);
  cardName.textContent = name;

  const cardButtonDelete = card.querySelector(selectors.cardDelete);
  const cardButtonLike = card.querySelector(selectors.cardLike);
  const cardButtonImage = card.querySelector(selectors.cardImageBtn);

  //card buttons listeners

  cardButtonDelete.addEventListener('click', function () {
    cardButtonDelete.closest(selectors.card);
    card.remove();
  })

  cardButtonImage.addEventListener('click', function ()  {
    popupFullImg.src = cardImage.src;
    popupFullImg.alt = cardName.textContent;
    popupFullTitle.textContent = cardName.textContent;

    openPopup(popupFull);
  })

  cardButtonLike.addEventListener('click', function ()  {
    cardButtonLike.classList.toggle('card__like_active');
  })
  return card;
}

//add card to site

function renderCard(card, container){
  container.prepend(card);
}

//initial default cards

initialCards.forEach(function (item){
  const card = createCard(item.name, item.link);
  renderCard(card, cards);
})

//function close popup by overlay

const popupCloseByOverlay = function (event, popup) {
  if (event.target !== event.currentTarget) {
    return
  }
  closePopup(popup);
}

//function close  popup by "ESC"

function popupCloseByEsc(event, popup) {
  if(event.key === 'Escape') {
    closePopup(popup);
  }
}

//listener on Profile edit-button and open function and copy info from profile to popup

profileEditButton.addEventListener('click', function () {
  popupEditJob.value = profileJob.textContent;
  popupEditName.value = profileName.textContent;
  openPopup(popupEdit);
  enableValidation(formEdit);
});

//listener on Profile add-button and open function with reset form

profileAddButton.addEventListener('click', function () {
  popupAddSubmit.reset();
  openPopup(popupAdd);
  enableValidation(formAdd);
});

//listener on popup Edit close-button and open function close

popupEditClose.addEventListener('click', function () {
  closePopup(popupEdit);
});

//listener on popup Add close-button and open function close

popupAddClose.addEventListener('click', function () {
  closePopup(popupAdd);
});

//listener on popup fullscreen close-button and open function close popup and article

popupFullClose.addEventListener('click', function () {
  closePopup(popupFull);
})

//Listener on submit buttons

popupAddSubmit.addEventListener('submit', copyInfoToCard);
popupEditSubmit.addEventListener('submit', copyInfoToProfile);
