import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { IUser } from "../models/IUser"
import UserService from "../services/UserService";

const AdminForm: FC = () => {
    const { store } = useContext(Context);
    const [email, setEmail] = useState<string>('')
    const [role, setRole] = useState<string>('')

    async function settRole(email: string, role: string) {
        try {
            await UserService.settRole(email, role);
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div>
            <div className="news-name" >
                <p>{`Дати роль:`}</p>
            </div>
            <input className="profile_input"
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <br></br><br></br>
            <select className="profile_select" onChange={e => setRole(e.target.value)} value={role}>
                <option value="member">Учасник</option>
                <option value="trainer">Тренер</option>
                <option value="judge">Суддя</option>
                <option value="coordinator">Координатор</option>
            </select>
            <br></br><br></br>
            <div>
                <button className="profile_button" onClick={() => settRole(email, role)}>Видати роль</button>
            </div>
            <br></br>
            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(AdminForm);