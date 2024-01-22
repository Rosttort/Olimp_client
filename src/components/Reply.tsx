import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ExerciseService from "../services/ExerciseService";
import { IReply } from "../models/IReply"

type ReplyProps = {
    reply: IReply;
    index: number;
}

export const Reply = ({reply, index}:ReplyProps) => {

return(
    <div className="profile_name" key={reply.team}> 
        Умовa:<br></br>
        {reply.conditions + ' '}<br></br>
        Відповіді автора:<br></br>
        {reply.author_answers + ' '}<br></br>
        Відповіді учасника:<br></br>
        {reply.answers + ' '}<br></br>
        Оцінка:<br></br>
        {reply.marks + ' '}
    </div>)
}
