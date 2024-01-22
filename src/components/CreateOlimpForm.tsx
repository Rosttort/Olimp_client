import React, { FC, useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import "react-datepicker/dist/react-datepicker.css";
const CreateOlimpForm: FC = () => {
  const [name, setName] = useState<string>('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [subject, setSubject] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const { store } = useContext(Context);
  async function ExitCreateOlimp() {
    store.create_olimp = false
  }

  return (
    
    <div className='box'>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
        placeholder='Назва олімпіади'
      />
      <input
        onChange={e => setSubject(e.target.value)}
        value={subject}
        type="text"
        placeholder='Дисципліна'
      />
      <DatePicker placeholderText={'Please select a date'} showTimeSelect timeFormat="HH:mm" timeIntervals={30} selected={startDate} onChange={(date: Date) => setStartDate(date)} />
      <DatePicker showTimeSelect timeFormat="HH:mm" timeIntervals={30} selected={endDate} onChange={(date: Date) => setEndDate(date)} />
      <input type="submit" value="Далі" onClick={() => {store.registration_olimp(name, subject, store.user.email ,startDate, endDate,[], [], []); store.create_olimp = false; store.add_exercise = true;store.olimp = name ;store.subject=subject}} />
      <input type="submit" value="Вийти назад" onClick={ExitCreateOlimp} />
    </div>
  );
};

export default observer(CreateOlimpForm);
