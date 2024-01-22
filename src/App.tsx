import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import RegForm from './components/RegForm';
import CreateTeamForm from './components/CreateTeamForm';
import CreateOlimpForm from './components/CreateOlimpForm';
import CoordinatorForm from './components/CoordinatorForm';
import AddTeamOnOlimp from './components/AddTeamOnOlimp';
import AddExerciseForm from './components/AddExerciseForm';
import AddJudgeForm from './components/AddJudgeForm';
import MemberdoOlimp from './components/MemberdoOlimp';
import MemberForm from './components/MemberForm';
import TrainerForm from './components/TrainerForm';
import CoordinatorLookReplyForm from './components/CoordinatorLookReplyForm';
import JudgeForm from './components/JudgeForm';
import AdminForm from './components/AdminForm';
import JudgeCheckOlimpForm from './components/JudgeCheckOlimpForm';
import JudgeCheckMemberForm from './components/JudgeCheckMemberForm';
import LookOlimpMember from './components/LookOlimpMember';
import LookOlimpTrainer from './components/LookOlimpTrainer';
import LookOlimpCoordinator from './components/LookOlimpCoordinator';
import NotActivated from './components/NotActivated';
import BeforeOlimpMember from './components/BeforeOlimpMember';
import BeforeOlimpTrainer from './components/BeforeOlimpTrainer';
import ResultOlimp from './components/ResultOlimp';
import BeforeOlimpCoordinator from './components/BeforeOlimpCoordinator';
import Wait from './components/Wait';


const App: FC = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }
    
    if (store.user.isActivated == false) {
        return (
            <div>
                <NotActivated/>
            </div>
        )
    }

    if (store.wait) {
        return (
            <div>
                <Wait/>
            </div>
        )
    }

    if (store.coord_before_olimp) {
        return (
            <div>
                <BeforeOlimpCoordinator/>
            </div>
        )
    }

    if (store.member_look_result) {
        return (
            <div>
                <ResultOlimp/>
            </div>
        )
    }

    if (store.member_before_olimp) {
        return (
            <div>
                <BeforeOlimpMember/>
            </div>
        )
    }

    if (store.trainer_before_olimp) {
        return (
            <div>
                <BeforeOlimpTrainer/>
            </div>
        )
    }

    if (store.look_olimp_member) { 
        return (
            <div>
                <LookOlimpMember/>
            </div>
        );
    };
    if (store.look_olimp_trainer) { 
        return (
            <div>
                <LookOlimpTrainer/>
            </div>
        );
    };
    if (store.look_olimp_coordinator) { 
        return (
            <div>
                <LookOlimpCoordinator/>
            </div>
        );
    };
    if (store.create_team) { 
        return (
            <div>
                <CreateTeamForm/>
            </div>
        );
    };

    if (store.create_olimp) { 
        return (
            <div>
                <CreateOlimpForm/>
            </div>
        );
    };

    if (store.add_exercise) { 
        return (
            <div>
                <AddExerciseForm/>
            </div>
        );
    };
    
    if (store.add_judge) { 
        return (
            <div>
                <AddJudgeForm/>
            </div>
        );
    };

    if (store.coord_look_reply) { 
        return (
            <div>
                <CoordinatorLookReplyForm/>
            </div>
        );
    };
    
    if (store.judge_check_olimp) { 
        return (
            <div>
                <JudgeCheckOlimpForm/>
            </div>
        );
    };

    if (store.judge_check_member) { 
        return (
            <div>
                <JudgeCheckMemberForm/>
            </div>
        );
    };
    
    if (store.add_team) { 
        return (
            <div>
                <AddTeamOnOlimp/>
            </div>
        );
    };

    if (store.member_do_olimp) { 
        return (
            <div>
                <MemberdoOlimp/>
            </div>
        );
    };

    if (!store.isAuth && store.reg) { 
        return (
            <div>
                <RegForm/>
            </div>
        );
    };

    if (!store.isAuth) { 
       return (
            <div>
                <LoginForm/>
            </div>
        );
    };

    if (store.user.role == "admin"){
    return (
        <div>
            <AdminForm/>
         </div>
    );
    }
    else if (store.user.role == "coordinator") {
    return (
        <div>
            <CoordinatorForm/>
        </div>
    );
    }
    else if (store.user.role == "trainer")
    return (
        <div>
            <TrainerForm/>
        </div>
    );
    else if (store.user.role == "judge")
    return (
        <div>
            <JudgeForm/>
        </div>
    );
    else
    return (
        <div>
            <MemberForm/>
        </div>
    );
};

export default observer(App);
