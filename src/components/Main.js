import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onDeleteButtonClick}) {
    const userContext = React.useContext(CurrentUserContext);

    return (
        <main className="content page__content">
            <section className="profile" aria-label="Секция с профилем">
                <div className="profile__overlay" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userContext.avatar} alt="Фотография на аватар"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userContext.name}</h1>
                    <button className="profile__edit-button" type="button" aria-label="edit" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{userContext.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="add" onClick={onAddPlace}></button>
            </section>

            <section className="elements" aria-label="Секция с картинками">
                <ul className="elements__list">
                    {
                        cards.map((card) => (<Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onDeleteButtonClick={onDeleteButtonClick} />))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main