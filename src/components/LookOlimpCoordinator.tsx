import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Moment from 'moment';
import { IOlimp } from "../models/IOlimp"
import OlimpService from "../services/OlimpService";

const LookOlimpCoordinator: FC = () => {
    const { store } = useContext(Context);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);
    async function ExitLookOlimp() {
        store.look_olimp_coordinator = false
    }

    async function getOlimpByCoordinator() {
        try {
            const response = await OlimpService.getOlimpByCoordinator(store.user.email);
            setOlimps(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <input type="submit" value="Вийти назад" onClick={ExitLookOlimp} />
            <div>
                <button onClick={() => getOlimpByCoordinator()}>Ваши олимпиады</button>
            </div>
            {olimps.map(olimp => <div key={olimp.name}> {olimp.name}{olimp.exercise} {Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')}</div>)}
        </div>
    );
};

export default observer(LookOlimpCoordinator);