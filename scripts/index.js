const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  page: '.page',
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileEditButton: '.profile__edit-button',
  profileAddButton: '.profile__add-button',
  popup: '#popup',
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
  popupFullArt: '#popup__article',
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
const page = document.querySelector(selectors.page);
//template

const cardTemplate = page.querySelector(selectors.template);

//profile

const profileAddButton = page.querySelector(selectors.profileAddButton);
const profileEditButton = page.querySelector(selectors.profileEditButton);
const profileName = page.querySelector(selectors.profileName);
const profileJob = page.querySelector(selectors.profileJob);

//cards

const cards = page.querySelector(selectors.cards);
//popup

const popup = page.querySelector(selectors.popup);

//popup edit

const popupEdit = popup.querySelector(selectors.popupEdit);
const popupEditSubmit = popupEdit.querySelector(selectors.popupEditForm);
const popupEditName = popupEdit.querySelector(selectors.popupEditName);
const popupEditJob = popupEdit.querySelector(selectors.popupEditJob);
const popupEditClose = popupEdit.querySelector(selectors.popupEditCloseButton);

//popup add

const popupAdd = popup.querySelector(selectors.popupAdd);
const popupAddSubmit = popupAdd.querySelector(selectors.popupAddForm);
const popupAddPlace = popupAdd.querySelector(selectors.popupAddPlace);
const popupAddLink = popupAdd.querySelector(selectors.popupAddLink);
const popupAddClose = popupAdd.querySelector(selectors.popupAddCloseButton);

//popup fullscreen

const popupFull = popup.querySelector(selectors.popupFull);
const popupFullImg = popupFull.querySelector(selectors.popupFullImg);
const popupFullTitle = popupFull.querySelector(selectors.popupFullTitle);
const popupFullClose = popupFull.querySelector(selectors.popupFullClose);
const popupFullArt = popup.querySelector(selectors.popupFullArt);


//open section popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//close section popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//Listener on submit buttons

popupAddSubmit.addEventListener('submit', copyInfoToCard);
popupEditSubmit.addEventListener('submit', copyInfoToProfile);

//copy info from Edit popup to profile

function copyInfoToProfile (event) {
  event.preventDefault();
  profileName.textContent = popupEditName.value;
  profileJob.textContent = popupEditJob.value;
  popupEdit.classList.remove('popup_opened');
  closePopup(popup);
}

//copy info from Add popup to card

function copyInfoToCard (event) {
  event.preventDefault();
  const card = createCard(popupAddPlace.value, popupAddLink.value);
  renderCard(card, cards);
  popupAdd.classList.remove('popup_opened');
  closePopup(popup);
}

//Create card from template

function createCard(name, link){
  const card = cardTemplate.content.querySelector(selectors.card).cloneNode(true);
  const cardImage = card.querySelector(selectors.cardImage);
  cardImage.src = link;
  cardImage.alt = name;
  const cardName = card.querySelector(selectors.cardTitle);
  cardName.textContent = name;

  const cardButtonDelete = card.querySelector(selectors.cardDelete);
  const cardButtonLike = card.querySelector(selectors.cardLike);
  const cardButtonImage = card.querySelector(selectors.cardImageBtn);

  //card buttons

  cardButtonDelete.addEventListener('click', function () {
    const item = cardButtonDelete.closest(selectors.card);
    item.remove();
  })

  cardButtonImage.addEventListener('click', function ()  {
    popupFullImg.src = cardImage.src;
    popupFullImg.alt = cardName.textContent;
    popupFullTitle.textContent = cardName.textContent;

    popupFull.classList.add('popup__fullscreen_opened');
    popupFullArt.classList.add('popup__fullscreen_opened');
    openPopup(popup);
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
//listener on Profile edit-button and open function and copy info from profile to popup

profileEditButton.addEventListener('click', function () {
  popupEditJob.value = profileJob.textContent;
  popupEditName.value = profileName.textContent;
  popupEdit.classList.add('popup_opened');
  openPopup(popup);
});

//listener on Profile add-button and open function with reset form

profileAddButton.addEventListener('click', function () {
  popupAddLink.value = '';
  popupAddPlace.value = '';
  popupAdd.classList.add('popup_opened');
  openPopup(popup);
});

//listener on popup Edit close-button and open function close

popupEditClose.addEventListener('click', function () {
  popupEdit.classList.remove('popup_opened');
  closePopup(popup);
});

//listener on popup Add close-button and open function close

popupAddClose.addEventListener('click', function () {
  popupAdd.classList.remove('popup_opened');
  closePopup(popup);
});

//listener on popup fullscreen close-button and open function close popup and article

popupFullClose.addEventListener('click', function () {
  popupFull.classList.remove('popup__fullscreen_opened');
  popupFullArt.classList.remove('popup__fullscreen_opened');
  closePopup(popup);
})

//initial default cards

initialCards.forEach(function (item){
  const card = createCard(item.name, item.link);
  renderCard(card, cards);
})