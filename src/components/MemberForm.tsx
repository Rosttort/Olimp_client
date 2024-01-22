import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ITeam } from "../models/ITeam"
import TeamService from "../services/TeamService";
import { render } from '@testing-library/react';

const MemberForm: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);
    
    async function LookOlimp() {
        store.look_olimp_member = true
    }

    async function getTeamsByMember() {
        try {
            const response = await TeamService.fetchUsersMember(store.user.email);
            setTeams(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTeamsByMember();
    }, [])

    return (
        <div>
            {}
            <div className="profile_name" >
                <p>{`Им’я: ${store.user.name}`}</p>
                <p>{`Навчальний заклад: ${store.user.educational}`}</p>
                <p>{`Пошта: ${store.user.email}`}</p>
            </div>
            {}

            <div className="profile_name1" >
                <p>{`Команди в яких Ви перебуваєте:`}</p>
            </div>
            <br></br>
            {teams.map(team => <div className="profile_name" key={team.name}> {team.name} <br></br> Тренер: {team.trainer}<br></br> Учасники: {team.members[0]} {team.members[1]} {team.members[2]} </div>)}

            <div className="profile_name1" >
                <p>{`Олімпіади в яких Ви берете участь:`}</p>
            </div>  
            <br></br>
            <input className="profile_button" type="submit" value="Подивитися" onClick={LookOlimp}/><br></br><br></br>
            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(MemberForm);

