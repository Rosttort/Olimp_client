import React, {FC, useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { IReply } from '../models/IReply';
import ReplyService from "../services/ReplyService";

const ResultOlimp: FC = () => {
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
            <div className="profile_name" >
            <p>{`Результати олімпіади: `} {store.olimp}</p>
            </div><br></br><br></br>
            {replys.map(reply => <div className="profile_name" key={reply.member}> 
            Команда: {reply.team}<br></br>
            Результат: {reply.score}%<br></br>
            </div>)}  <br></br><br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={() => {store.member_look_result = false}}/>
            <br></br><br></br>
        </div>
    );
};

export default observer(ResultOlimp);