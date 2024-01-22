import React, { FC, useContext, useState, useEffect} from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ReplyService from "../services/ReplyService";
import { IOlimp } from "../models/IOlimp"
import Moment from 'moment';
import { IReply } from '../models/IReply';

const CoordinatorForm: FC = () => {
    const { store } = useContext(Context);
    const [replys, setReplys] = useState<IReply[]>([]);
    
    useEffect(() => {
        getReplyByOlimp(store.olimp);
    }, [])

    async function getReplyByOlimp(olimp: string) {
        try {
            const response = await ReplyService.getReplyByOlimp(olimp);
            setReplys(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div>
            <p className="profile_name">{store.olimp}</p><br></br>
            {replys.map(reply => <div className="profile_name" key={reply.member}> 
            Команда: {reply.team}<br></br>
            Результат: {reply.score}%<br></br>
            </div>)}            <br></br><br></br>
            <button className="profile_button" onClick={() => {store.coord_look_reply = false}}>Вийти</button>
            <br></br><br></br>
        </div>

    );
};

export default observer(CoordinatorForm);