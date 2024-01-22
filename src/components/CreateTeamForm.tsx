import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const CreateTeamForm: FC = () => {
  const [name, setName] = useState<string>('')
  const [email1, setEmail1] = useState<string>('')
  const [email2, setEmail2] = useState<string>('')
  const [email3, setEmail3] = useState<string>('')
  const { store } = useContext(Context);

  async function ExitCreateTeam() {
    store.create_team = false
  }

  return (
    <div className='box'>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
        placeholder='Назва команди'
      />
      <input
        onChange={e => setEmail1(e.target.value)}
        value={email1}
        type="text"
        placeholder='Перший учасник'
      />
      <input
        onChange={e => setEmail2(e.target.value)}
        value={email2}
        type="text"
        placeholder='Другий учасник(якщо є)'
      />
      <input
        onChange={e => setEmail3(e.target.value)}
        value={email3}
        type="text"
        placeholder='Третій учасник(якщо є)'
      />
      <input type="submit" value="Створити" onClick={() => {store.registration_team(name, store.user.email, [email1 ,email2, email3]); store.create_team = false}} />
      <input type="submit" value="Вийти назад" onClick={ExitCreateTeam} />
    </div>
  );
};

export default observer(CreateTeamForm);
