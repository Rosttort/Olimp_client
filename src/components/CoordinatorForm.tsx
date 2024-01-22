import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import OlimpService from "../services/OlimpService";
import { IOlimp } from "../models/IOlimp"
import Moment from 'moment';

const CoordinatorForm: FC = () => {
    const { store } = useContext(Context);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);

    async function CreateOlimp() {
        store.create_olimp = true
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
            <div className="profile_name" >
                <p>{`Им’я: ${store.user.name}`}</p>
                <p>{`Навчальний заклад: ${store.user.educational}`}</p>
                <p>{`Пошта: ${store.user.email}`}</p>
            </div>

            <p className="profile_name1">{`Створити олімпіаду`}</p>
            <input className="profile_button" type="submit" value="Створити олімпіаду" onClick={CreateOlimp} />
            <div className="profile_name1" >
                <p>{`Ваші олімпіади:`}</p>
            </div>
            <input className="profile_button" type="submit" value="Подивитись" onClick={() => getOlimpByCoordinator()} />
            {olimps.map(olimp => <div className="profile_name" key={olimp.name}> 
            {olimp.name}<br></br>
            Дисципліна: {olimp.subject}<br></br>
            Початок: {Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            Кінець: {Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
            <button className="profile_button" onClick={() => {
                if (Moment().isBefore(olimp.last_date)){
                    store.olimp = olimp.name;
                    store.coord_before_olimp = true;
                    store.first_date = Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')
                    store.last_date = Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')
                    }
                else{
                    store.olimp = olimp.name;
                    store.coord_look_reply = true;
                }
            }}>Подивитись результати</button>
            </div>)}            <br></br><br></br>
            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>

    );
};

export default observer(CoordinatorForm);