import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Select from 'react-select';
import { Label } from '@material-ui/icons';
import { optionCSS } from 'react-select/dist/declarations/src/components/Option';
import {universities} from "../text/Universities";

type OptionType = {
    value: string;
    label: string;
};

const RegForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [name, setName] = useState<string>('')
    const {store} = useContext(Context);
    const [educational, setEducational] = useState<OptionType>(universities[0]);

    async function Log() {
        store.reg = false
    }

    return (

        <div className='box'>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Им’я'
            />
            
            <Select 
                options={universities} 
                onChange={(selectedOption) => setEducational(selectedOption as OptionType)}
                value={educational}
            />
            <br></br>
            <p className="error"> {store.error_reg}</p>
            
            <input type="submit" value="Реєстрація" onClick={() => {
                store.error_reg = 'Ви ввели некоректні дані, спробуйте ще раз';
                store.registration(email, password, 'member' , name, educational.value);
                }} />
            <input type="submit" value="Акаунт вже є" onClick={() => {store.reg = false; store.error_reg=''} } />
        </div>
    );
};

export default observer(RegForm);