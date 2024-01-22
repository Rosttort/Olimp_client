import React, { FC, useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import TeamService from "../services/TeamService";
import OlimpService from "../services/OlimpService";
import ReplyService from "../services/ReplyService";
import { ITeam } from "../models/ITeam"
import { IOlimp } from "../models/IOlimp"
import { IReply } from "../models/IReply"
import Moment from 'moment';
import moment from 'moment';

const LookOlimpMember: FC = () => {
    const { store } = useContext(Context);
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [olimps, setOlimps] = useState<IOlimp[]>([]);
    const [team, setTeam] = useState<string>('')
    const [replys, setReplys] = useState<IReply[]>([]);
        
    useEffect(() => {
        getTeamsByMember();
    }, [])

    async function ExitLookOlimp() {
        store.look_olimp_member = false
    }

    async function Time(d2: string, d3: string) {
        if (moment(d3).isAfter(d2))
            return setTeam('sss')
    }

    async function getTeamsByMember() {
        try {
            const response = await TeamService.fetchUsersMember(store.user.email);
            setTeams(response.data);
        } catch (e) {
            console.log(e);
        }
    }


    
    async function getOlimpByTeam(team: string) {
        try {
            const response = await OlimpService.getOlympByTeam(team);
            setOlimps(response.data);
            store.team_reply = team;
        } catch (e) {
            console.log(e);
        }
    }

    async function getReplyByOlimp(olimp: string) {
        try {
            const response = await ReplyService.getReplyByOlimp(olimp);
            setReplys(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (olimps.length > 0) {
            getReplyByOlimp2(olimps);
        }
    }, [olimps]);
    
    async function getReplyByOlimp2(olimp: IOlimp[]) {
        try {
        const allReplies = await Promise.all(
            olimp.map(async (olimpItem) => {
                const response = await ReplyService.getReplyByOlimp(olimpItem.name);
                return response.data;
            })
        );

        const flattenedReplies = allReplies.flat(); // Flatten the array of arrays

        setReplys(flattenedReplies);

        // Check if there's a reply for the current team
        const hasReplyForTeam = flattenedReplies.some(
            (reply) => reply.team === store.team_reply
        );

        if (hasReplyForTeam) {
            store.done = true;
        }
    } catch (e) {
        console.log(e);
    }
    }

    return (
        <div>
            <br></br>
            <p className="profile_name">Команди</p>
            {teams.map(team => <div className="profile_name" key={team.name}>
             <button className="profile_button" onClick={() => {getOlimpByTeam(team.name)
            }}>{team.name}</button></div>)}
            <br></br>
            {olimps.map(olimp => <div className="profile_name" key={olimp.name}> 
            {olimp.name}<br></br>
            Дисципліна: {olimp.subject}<br></br>
            Початок: {Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')}<br></br>
            Кінець: {Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')}<br></br><br></br>
            <button className="profile_button" 
            onClick={() => {

                if (Moment().isBefore(olimp.first_date)){
                    store.olimp = olimp.name;
                    store.look_olimp_member = false;
                    store.member_before_olimp = true;
                    store.first_date = Moment(olimp.first_date).format('MMMM Do YYYY, h:mm a')
                    store.last_date = Moment(olimp.last_date).format('MMMM Do YYYY, h:mm a')
                    }
                else if(Moment().isAfter(olimp.last_date)){
                    store.olimp = olimp.name;
                    store.look_olimp_member = false;
                    store.member_look_result = true;
                }
                else if(store.done){
                    store.olimp = olimp.name;
                    store.look_olimp_member = false;
                    store.wait = true;
                }
                else{
                    store.olimp = olimp.name;
                    store.look_olimp_member = false;
                    store.member_do_olimp = true;
                }
                
            }}>Подивитися</button>
            </div>)}
            <br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={ExitLookOlimp}/>
            <br></br><br></br>
        </div>
    );
};

export default observer(LookOlimpMember);