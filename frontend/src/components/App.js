import React from 'react';
import Header from './Header.js'
import Footer from './Footer.js'
import Main from './Main.js'
import EditProfilePopup from './EditProfilePopup.js'
import ImagePopup from './ImagePopup.js'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import CurrentUserContext from '../contexts/CurrentUserContext'
import { api } from "../utils/api";
import { Route, Switch, useHistory, Redirect, } from "react-router-dom";
import * as auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute';


export default function App() {
  const [isEditAvatarPopupOpen, setAvatarIsOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddIsOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditIsOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipIsOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [isBurgerMenuOpened, setBurgerIsOpened] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const initialData = {
    email: '',
    password: ''
  }
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [data, setData] = React.useState(initialData);
  const history = useHistory();

  function handleEditAvatarClick() {
    setAvatarIsOpen(true)
  }

  function handleEditProfileClick() {
    setEditIsOpen(true)
  }

  function handleAddPlaceClick() {
    setAddIsOpen(true)
  }

  function handleBurgerOpen() {
    if (isBurgerMenuOpened === false) {
      setBurgerIsOpened(true)
    } else {
      setBurgerIsOpened(false)
    }
  }

  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link })
  }

  function closeAllPopups() {
    setAvatarIsOpen(false);
    setAddIsOpen(false);
    setEditIsOpen(false);
    setSelectedCard(false);
    setInfoToolTipIsOpen(false);
    //setConfirmIsOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) =>
          c._id === card._id
            ? newCard.data
            : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deletetCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => {
          return c._id !== card._id
        })
        setCards(newCards)
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data)
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res.data)
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((res) => {
          setCurrentUser(res.data)
        })
        .catch((err) => console.log(err));

      api.getInitialCards()
        .then((res) => {
          setCards(res.data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn])

  const tokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (!res || res.statusCode === 400) throw new Error('Токен не передан или передан не в том формате');
          if (!res || res.statusCode === 401) throw new Error('Переданный токен некорректен ');
          if (res) {
            setLoggedIn(true);
            setData({
              email: res.data.email
            })
            history.push('/');
          }
        })
        .catch(() => history.push('/sign-in'));
    }
  }, [history])

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) throw new Error('Не передано одно из полей ');
        if (!res || res.statusCode === 401) throw new Error('Пользователь с таким email не найден');
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setData({ email });
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const handleRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) throw new Error('Некорректно заполнено одно из полей ');
        setSuccess(true);
        setInfoToolTipIsOpen(true);
        history.push('/sign-in');
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        setInfoToolTipIsOpen(true)
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    api.logout();
    setBurgerIsOpened(false);
    history.push('/sign-in');
  }

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            email={data.email}
            onSignOut={handleSignOut}
            isBurgerMenuOpened={isBurgerMenuOpened}
            onBurgerOpen={handleBurgerOpen}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              onSignOut={handleSignOut}
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onClose={closeAllPopups}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <ImagePopup
            name="image-caption"
            isOpen={selectedCard}
            card={selectedCard}
            onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />
          <Footer />
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            success={success}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

