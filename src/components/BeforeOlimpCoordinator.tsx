import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const BeforeOlimpCoordinator: FC = () => {
    const { store } = useContext(Context);

    return (
        <div>
            <div className="profile_name" >
            <p>{`Олімпіада `} {store.olimp} {` ще не закінчилась`}</p>
            <p> {`Кінець: `} {store.last_date}</p>
            </div><br></br><br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={() => {store.coord_before_olimp = false}}/>
            
        </div>
    );
};

export default observer(BeforeOlimpCoordinator);