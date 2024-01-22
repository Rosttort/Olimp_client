import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ITeam } from "../models/ITeam"
import TeamService from "../services/TeamService";

const TrainerForm: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);

    async function CreateTeam() {
        store.create_team = true
    }

    async function AddTeam() {
        store.add_team = true
    }

    async function LookOlimp() {
        store.look_olimp_trainer = true
    }

    async function getTeamsByTrainer() {
        try {
            const response = await TeamService.fetchUsersTrainer(store.user.email);
            setTeams(response.data);
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

            <div className="profile_name1" >
                <p>{`Cворити команду:`}</p>
            </div>

            <input type="submit" className="profile_button" value="Cворити команду" onClick={CreateTeam} />


            <p className="profile_name1" >{`Створені команди:`}</p>
            <div>
                <button className="profile_button" onClick={getTeamsByTrainer}>Подивитись</button>
            </div>
            {teams.map(team => <div className="profile_name" key={team.name}> {team.name} <br></br>Учасники: {team.members[0]} {team.members[1]} {team.members[2]}</div>)}
            
            <p className="profile_name1">{`Зареєструвати команду на олімпіаду:`}</p>
            <input className="profile_button" type="submit" value="Добавити" onClick={AddTeam} />
            <div className="profile_name1" >
                <p>{`Олімпіади, в яких ваша команда бере участь:`}</p>
            </div>
            <input className="profile_button" type="submit" value="Подивитись" onClick={LookOlimp} /><br></br><br></br>
            <button className="profile_button" onClick={() => store.logout()}>Вийти</button>
        </div>
    );
};

export default observer(TrainerForm);