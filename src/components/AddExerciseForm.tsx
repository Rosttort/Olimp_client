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
    store.add_exercise = false
  }

  return (
    
    <div className="profile_name">
      <p className="profile_name1">{`Назва завдання`}</p>
      <input className="profile_input"
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
      />
      <br></br>
      <p className="profile_name1">{`Автор`}</p>
      <input className="profile_input"
        onChange={e => setAuthor(e.target.value)}
        value={author}
        type="text"
      />
      <br></br>
      <p className="profile_name1">{`Умова`}</p>
      <input className="profile_input2"
        onChange={e => setCondition(e.target.value)}
        value={condition}
        type="text"
      />
      <br></br>
      <p className="profile_name1">{`Відповідь автора`}</p>
      <input className="profile_input2"
        onChange={e => setAnswer(e.target.value)}
        value={answer}
        type="text"
      />
      <br></br>
      <br></br>
      <input className="profile_button" type="submit" value="Добавити ще" onClick={() => {
        store.registration_exercise(name, store.subject, condition, author, answer.trim(), store.olimp);
        store.addexerciseOnOlimp(name, store.olimp);
        setName('');
        setAuthor('');
        setCondition('');
        setAnswer('') }} />
      <br></br>
      <br></br>
      <input className="profile_button" type="submit" value="Далі" onClick={() => {
        store.registration_exercise(name, store.subject, condition, author, answer.trim(), store.olimp);
        store.addexerciseOnOlimp(name, store.olimp);
        store.add_exercise = false;
        store.add_judge = true
        }} />
      <br></br>
      <br></br>
      <input className="profile_button" type="submit" value="Вийти" onClick={AddExerciseForm} />
    </div>
  );
};

export default observer(CreateOlimpForm);
