import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NotActivated: FC = () => {
    const { store } = useContext(Context);

    return (
        <div>
            <div className="profile_name" >
                    <p>{`Им’я: ${store.user.name}`}</p>
                    <p>{`Навчальний заклад: ${store.user.educational}`}</p>
                    <p>{`Пошта: ${store.user.email}`}</p>
                    <br></br>
                    <br></br>
                    <p>{`Підтвердьте будь ласка пошту`}</p><p> {`Якщо на пошті Ви не бачите листа, подивіться в спамі`}</p>
            </div><br></br><br></br>

            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(NotActivated);