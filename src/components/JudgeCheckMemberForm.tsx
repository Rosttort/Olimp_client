import React, { FC, useContext, useState,useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ReplyService from "../services/ReplyService";
import Moment from 'moment';
import { IReply } from "../models/IReply"
import {Reply} from './Reply';

const JudgeCheckMemberForm: FC = () => {
    const { store } = useContext(Context);
    const [replys, setReplys] = useState<IReply[]>([]);

    useEffect(() => {
        getReplyByOlimpMember(store.olimp, store.member);
    }, [])

    async function getReplyByOlimpMember(olimp: string, member: string) {
        try {
            const response = await ReplyService.getReplyByOlimpMember(olimp, member);
            setReplys(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="profile_name">
                <p>{store.olimp}</p>
            </div>
            <br></br>   
            
            {replys.map((reply, index) => <Reply
                 reply = {reply}
                 index = {index}
                 />
                )}
            <br></br>
            <br></br>
            <button className="profile_button" onClick={() => { store.judge_check_member = false; store.i = 0}}>Вийти</button>
        </div>
    );
};

export default observer(JudgeCheckMemberForm);