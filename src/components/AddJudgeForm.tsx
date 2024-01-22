import React, { FC, useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";

const CreateOlimpForm: FC = () => {
    const [name, setName] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [condition, setCondition] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const { store } = useContext(Context);
    async function AddExerciseForm() {
      store.add_judge = false
    }
  
    return (
      
      <div className="profile_name">
        <p className="profile_name1">{`Додайте суддю`}</p>
        <input className="profile_input"
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
        />
        <br></br>
        <br></br>
        <input className="profile_button" type="submit" value="Добавити ще" onClick={() => {
          store.addjudgeOnOlimp(name, store.olimp);
          setName('')
          }} />
        <br></br>
        <br></br>
        <input className="profile_button" type="submit" value="Створити олімпіаду" onClick={() => {
          store.addjudgeOnOlimp(name, store.olimp);
          store.add_judge = false;
          store.olimp = '';
          store.subject = '';
          }} />
        <br></br>
        <br></br>
        <input className="profile_button" type="submit" value="Вийти" onClick={AddExerciseForm} />
      </div>
    );
  };
  
  export default observer(CreateOlimpForm);
  