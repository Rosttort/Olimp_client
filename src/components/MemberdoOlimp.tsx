import React, { FC, useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ExerciseService from "../services/ExerciseService";
import { IExercise } from "../models/IExercise"
import {Exercise} from './Exercise';

const MemberdoOlimp: FC = () => {
    const { store } = useContext(Context);
    const [exercises, setExercises] = useState<IExercise[]>([]);
    let answers: string[] = [];
    let arr_autoranswers: string[] = [];
    let arr_conditions: string[] = [];

    useEffect(() => {
        getExerciseByOlimp();
    }, [])

    async function ExitMemberDoOlimp() {
        store.member_do_olimp = false
    }

    async function getExerciseByOlimp() {
        try {
            const response = await ExerciseService.fetchExerciseByOlimp(store.olimp);
            setExercises(response.data);
            answers = new Array(response.data.length)
            arr_autoranswers = new Array(response.data.length)
            arr_conditions = new Array(response.data.length)
        } catch (e) {
            console.log(e);
        }
    }

    function AddConditionAndAnswer(theObject1: string, theObject2:string) {
        arr_conditions.push(theObject1);
        arr_autoranswers.push(theObject2);
    }

    function handleclick(){
        const evalnum =  CheckAnswers();
        const avg = evalnum.reduce((value, acc)=> acc + value,0) / evalnum.length;
        store.registration_reply(store.user.email, store.olimp, arr_conditions, arr_autoranswers, answers, evalnum, avg, store.team_reply); 
        store.member_do_olimp = false;
    }

    function CheckAnswers():number[]{
        return exercises.map((exercise, index) =>{
            return exercise.answer.trim() === answers[index].trim()?100:0;
        }
        )
    }

    return (
        <div>
            <div className="profile_name">
                <p>{store.olimp}</p>
            </div>
            <br></br>
            {
                exercises.map((exercise, index) => <Exercise
                 exercise = {exercise}
                 onAnswerChange={(answer)=> answers[index]=answer}
                 answer={answers[index]}
                 />
                )
            }
            {exercises.map(exercise => {AddConditionAndAnswer(exercise.condition,exercise.answer)})}
            <br></br>
            <br></br>
            <input className="profile_button" type="submit" value="Відправити відповіді" onClick={handleclick} />
            <br></br>
            <br></br>
            <input className="profile_button" type="submit" value="Вийти назад" onClick={ExitMemberDoOlimp} />
            <br></br>
            <br></br>
        </div>
    );
};

export default observer(MemberdoOlimp);