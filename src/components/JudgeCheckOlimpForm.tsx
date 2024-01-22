import React, { FC, useContext, useState,useEffect} from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ReplyService from "../services/ReplyService";
import Moment from 'moment';
import { IReply } from "../models/IReply"

const JudgeCheckOlimpForm: FC = () => {
    const { store } = useContext(Context);
    const [replys, setReplys] = useState<IReply[]>([]);

    async function getReplyByOlimp(olimp: string) {
        try {
            const response = await ReplyService.getReplyByOlimp(olimp);
            setReplys(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getReplyByOlimp(store.olimp);
    }, [])

    return (
        <div>
            <div className="profile_name">
                <p>{store.olimp}</p>
            </div>
            <br></br>   
            {replys.map(reply => <div className="profile_name" key={reply.member}> 
            Команда {reply.team}<br></br><br></br>
            <button className="profile_button" onClick={() => {
                store.member = reply.member;
                store.judge_check_olimp = false;
                store.judge_check_member = true;    
                store.i = 0;
            }}>Подивитись</button>
            </div>)}
            <br></br>
            <br></br>
            <button className="profile_button" onClick={() => { store.judge_check_olimp = false; store.i = 0}}>Вийти</button>
        </div>
    );
};

export default observer(JudgeCheckOlimpForm);