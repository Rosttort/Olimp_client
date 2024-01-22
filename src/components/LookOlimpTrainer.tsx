import React, { FC, useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import TeamService from "../services/TeamService";
import OlimpService from "../services/OlimpService";
import { ITeam } from "../models/ITeam"
import { IOlimp } from "../models/IOlimp"
import Moment from 'moment';

const LookOlimpMember: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);
    const [team, setTeam] = useState<string>('')

    useEffect(() => {
        getTeamsByTrainer();
    }, [])
    
    async function ExitLookOlimp() {
        store.look_olimp_trainer = false
    }

    async function getTeamsByTrainer() {
        try {
            const response = await TeamService.fetchUsersTrainer(store.user.email);
            setTeams(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async function getOlimpByTeam(team: string) {
        try {
            const response = await OlimpService.getOlympByTeam(team);
            setOlimps(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <br></br>
            <p className="profile_name">Команди:</p>
            {teams.map(team => <div className="profile_name" key={team.name}>
             <button className="profile_button" onClick={() => {getOlimpByTeam(team.name)
            }}>{team.name}</button></div>)}
            <br></br><br></br>
            {olimps.map(olimp => <div className="profile_name" key={olimp.name}> 
            {olimp.name}<br></br>
            Дисципліна: {olimp.subject}<br></br>
            Початок: {Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            Кінець: {Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            <br></br>
            <button className="profile_button" 
            onClick={() => {
                if (Moment().isBefore(olimp.last_date)){
                    store.olimp = olimp.name;
                    store.look_olimp_trainer = false;
                    store.trainer_before_olimp = true;
                    store.first_date = Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')
                    store.last_date = Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')
                    }
                else{
                    store.olimp = olimp.name;
                    store.look_olimp_trainer = false;
                    store.member_look_result = true;
                }
                
            }}>Подивитися</button>
            </div>)}
            <br></br><br></br>
            
            <input type="submit" className="profile_button" value="Вийти назад" onClick={ExitLookOlimp} /><br></br><br></br>
        </div>
    );
};

export default observer(LookOlimpMember);