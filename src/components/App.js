import React from 'react';
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
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/mestoAuth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isLoadingPage, setIsLoadingPage] = React.useState(true);
    const [userData, setUserData] = React.useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = React.useState(false);
    const [isLoginInfoTooltipOpen, setIsLoginInfoTooltipOpen] = React.useState(false);
    const [isRegisterInfoTooltipOpen, setIsRegisterInfoTooltipOpen] = React.useState(false);
    const [selectedCard, setIsSelectedCard] = React.useState ({src: '#', alt: '#', state: false});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen || selectedCard.state;
    const [isLoading, setIsLoading] = React.useState(false);
    const [actualCard, setActualCard] = React.useState({});
    let history = useHistory();

    const userRegister = React.useCallback(async (registrationData) => {
        handleRegisterInfoTooltipOpen(true);
        const res = await auth.register(registrationData);
        if(res.statusCode !== 400) {
                setUserData(res.data)
            }
    }, [])

    const userLogin = React.useCallback(async (registrationData) => {
        try {
            const data = await auth.authorize(registrationData);
            handleLoginInfoTooltipOpen(true);
            if (!data.token) {
                throw new Error('Invalid credentials')
            }
            if (data.token) {
                localStorage.setItem('jwt', data.token);
                setIsLoggedIn(true);
            }
        } finally {
            setIsLoadingPage(false)
        }
    }, []);

    const userLogout = React.useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
    }, [])

    const handleTokenCheck = React.useCallback(async () => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                throw new Error('No token in storage');
            }

            const resUser = await auth.checkToken(jwt)
            // console.log(resUser)
            if (!resUser.data) {
                throw new Error('Invalid user')
            }
           if (resUser.data) {
               // console.log(resUser.data)
               setUserData(resUser.data);
               setIsLoggedIn(true);
           }
        } catch {}
        finally {
            setIsLoadingPage(false);
        }
    }, [localStorage.getItem('jwt')]);

    React.useEffect(() => {
        handleTokenCheck()
            .catch((err) => {
            console.error(err)})
    }, [handleTokenCheck])

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

    function handleLoginInfoTooltipOpen() {
        setIsLoginInfoTooltipOpen(true)
    }

    function handleRegisterInfoTooltipOpen() {
        setIsRegisterInfoTooltipOpen(true)
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
        setIsSelectedCard({src: '#', alt: '#', state: false});
        setIsLoginInfoTooltipOpen(false);
        setIsRegisterInfoTooltipOpen(false);
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

    if(isLoadingPage) {
        return (
            <div className='page__loadingContainer'>
                <span className='page__loading'>Page is loading...</span>
            </div>
        )
    }

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <ProtectedRoute exact path='/' loggedIn={isLoggedIn} component={Main} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} onDeleteButtonClick={handleConfirmationPopupOpen} userData={userData} logout={userLogout}>
                    </ProtectedRoute>
                    <Route path='/sign-up'>
                        <Register isLoggedIn={isLoggedIn} onRegister={userRegister}/>
                    </Route>
                    <Route path='/sign-in'>
                        <Login isLoggedIn={isLoggedIn} onLogin={userLogin} />
                    </Route>
                    <Route>
                        {isLoggedIn ? <Redirect exact to='/'/> : <Redirect to='/sign-in'/>}
                    </Route>
                </Switch>
                <Footer />

                <InfoTooltip loggedIn={isLoggedIn} name='successRegister' isOpen={isRegisterInfoTooltipOpen} infoText='Вы успешно зарегистрировались!' onClose={closeAllPopups} />
                <InfoTooltip loggedIn={isLoggedIn} name='successLogin' isOpen={isLoginInfoTooltipOpen} infoText='Добро пожаловать!' onClose={closeAllPopups} />
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