import React, { FC, useContext, useState } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AddTeamOnOlimp: FC = () => {
  const [team, setTeam] = useState<string>('')
  const [olimp, setOlimp] = useState<string>('')
  const { store } = useContext(Context);

  async function ExitAddTeam() {
    store.add_team = false
  }

  return (
    <div className='box'>
      <input
        onChange={e => setTeam(e.target.value)}
        value={team}
        type="text"
        placeholder='команда'
      />
      <input
        onChange={e => setOlimp(e.target.value)}
        value={olimp}
        type="text"
        placeholder='олімпіада'
      />
      <input type="submit" value="Зареєструвати" onClick={() => {store.addteamOnOlimp(team, olimp); store.add_team = false}} />
      <input type="submit" value="Вийти назад" onClick={ExitAddTeam} />
    </div>
  );
};

export default observer(AddTeamOnOlimp);
