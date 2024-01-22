import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Wait: FC = () => {
    const { store } = useContext(Context);

    return (
        <div>
            <div className="profile_name" >
            <p>{`Почекайте. `} {store.olimp} {` ще не закінчилась`}</p>
            </div><br></br><br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={() => {store.wait = false}}/>
            
        </div>
    );
};

export default observer(Wait);