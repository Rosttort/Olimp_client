import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import TeamService from "../services/TeamService";
import OlimpService from "../services/OlimpService";
import ReplyService from "../services/ReplyService";
import ExerciseService from "../services/ExerciseService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    subject = '';
    olimp='';
    member='';
    isAuth = false;
    isLoading = false;
    reg = false;
    create_team = false;
    create_olimp = false;
    add_team = false;
    add_exercise = false;
    add_judge = false;
    look_olimp_member = false;
    look_olimp_trainer = false;
    look_olimp_coordinator = false;
    member_do_olimp = false;
    judge_check_olimp = false;
    judge_check_member = false;
    coord_look_reply = false;
    member_before_olimp = false;
    member_look_result = false;
    trainer_before_olimp = false;
    reply_conditions: string[] = [];
    reply_author_answers: string[] = [];
    reply_answers: string[] = [];
    arr_conditions : string[] = [];
    arr_autoranswers : string[] = [];
    i = 0;
    error_log = '';
    error_reg = '';
    сount = 0
    arr_memberlook: string[] = [];
    first_date: string = ''
    last_date: string = ''
    answers: string[] = []; 
    coord_before_olimp = false;
    team_reply = ''
    done = false
    wait = false

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
            
        }
    }

    async registration(email: string, password: string, role: string, name: string, educational: string) {
        try {
            const response = await AuthService.registration(email, password, role, name, educational);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            this.login(email,password);
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
           console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    async registration_team(name: string, trainer: string, members: string[]) {
        try {
            const response = await TeamService.registration_team(name, trainer, members);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async registration_olimp(name: string, subject: string, coordinator: string, first_date: Date, last_date: Date, judge: string[], exercise: string[], teams: string[]) {
        try {
            const response = await OlimpService.registration_olimp(name, subject, coordinator, first_date, last_date, judge, exercise, teams);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async registration_exercise(name: string, subject: string, condition: string, author: string, answer: string, olimp: string) {
        try {
            const response = await ExerciseService.registration_exercise(name, subject, condition, author, answer, olimp);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
    
    async registration_reply(member: string, olimp: string, conditions: string[], author_answers: string[], answers: string[], marks: number[], score: number, team: string) {
        try {
            const response = await ReplyService.registration_reply(member, olimp, conditions, author_answers, answers, marks, score, team);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async addteamOnOlimp(team: string, olimp: string) {
        try {
            const response = await OlimpService.addteamOnOlimp(team, olimp);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async addexerciseOnOlimp(exercise: string, olimp: string) {
        try {
            const response = await OlimpService.addexerciseOnOlimp(exercise, olimp);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
    
    async addMarkOnReply(mark: string, olimp: string, member: string) {
        try {
            const response = await ReplyService.addMarkOnReply(mark, olimp, member);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
    
    async checkReply(olimp: string, member: string) {
        try {
            const response = await ReplyService.checkReply(olimp, member);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async addjudgeOnOlimp(judge: string, olimp: string) {
        try {
            const response = await OlimpService.addjudgeOnOlimp(judge, olimp);
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
    
}
