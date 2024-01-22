import React, { FC, useContext, useEffect, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ExerciseService from "../services/ExerciseService";
import { IExercise } from "../models/IExercise"

type ExerciseProps = {
    exercise: IExercise;
    onAnswerChange: (answer: string)=> void;
    answer: string
}

export const Exercise = ({exercise, onAnswerChange, answer}:ExerciseProps) => {

return(
    <div className="profile_name" key={exercise.name}>
        Завдання:
        <br></br>
        {exercise.condition}
        <p className="profile_name">{`Відповідь:`}</p>
            <input className="profile_input2"
                onChange={e => {onAnswerChange(e.target.value)}}
                type="text"
                value={answer}
            />
        <br></br>
    </div>
)}
