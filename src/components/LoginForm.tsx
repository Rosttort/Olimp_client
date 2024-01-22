import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    async function Reg() {
        store.reg = true
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
            <p className='error'>{store.error_log}</p>
            <input type="submit" value="Увійти" onClick={
                () => {store.login(email, password); store.error_log = 'Неправильний пароль чи логін, спробуйте ще раз'}
                } />
            <input type="submit" value="Реєстрація" onClick={() => {store.reg = true; store.error_log=''} }/>
        </div>
    );
};

export default observer(LoginForm);
