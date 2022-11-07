import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [selectedCard, setIsSelectedCard] = React.useState ({src: '#', alt: '#', state: false});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen || selectedCard.state;
    const [isLoading, setIsLoading] = React.useState(false);
    const [actualCard, setActualCard] = React.useState({})

    React.useEffect(() => {
        api.getUserInfoByRequest()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
            console.error(err)
        });
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch((err) => {
                console.error(err)
            });
    }, []);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleConfirmationPopupOpen(card) {
        setIsConfirmationPopupOpen(true);
        setActualCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) =>
                state.map((c) => (c._id === card._id ? newCard : c))
            );
        })
            .catch((err) => {
                console.error(err)
            });
    }

    function handleCardDelete(card) {
        setIsLoading(true);

        api.deleteCard(card._id)
            .then(() => {
            setCards((state) =>
                state.filter((item) =>
                    item._id !== card._id));
                closeAllPopups()
        })
            .catch((err) => {
                console.error(err)})
            .finally(() => {
                setIsLoading(false)
            })
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setIsSelectedCard({src: '#', alt: '#', state: false})
    }

  React.useEffect(() => {
      function closeByEsc(evt) {
          if (evt.key === 'Escape') {
              closeAllPopups()
          }
      }
      if (isOpen) {
          document.addEventListener('keydown', closeByEsc);
          return () => {
              document.removeEventListener('keydown', closeByEsc)
          }
      }
  }, [isOpen])

    function handleCardClick(props) {
        setIsSelectedCard({
            alt: props.name,
            src: props.link,
            state: true
        })
    }

    function handleUpdateUser(userInfo) {
        setIsLoading(true);

        api.patchProfileInfo(userInfo)
            .then((res) => {
            setCurrentUser(res);
            closeAllPopups()
        })
            .catch((err) => {
                console.error(err)})
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleAddPlaceSubmit(newPhoto) {
        setIsLoading(true);

        api.postNewPhoto(newPhoto)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.error(err)})
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleUpdateAvatar(newAvatar) {
        setIsLoading(true);

        api.patchProfileAvatar(newAvatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups()
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
    <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
            <Header />
            {/*<Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} onDeleteButtonClick={handleConfirmationPopupOpen} />*/}
            <Register />
            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isLoading={isLoading} />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
            <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} actualCard={actualCard} isLoading={isLoading} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;