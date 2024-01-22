import $api from "../http";
import { AxiosResponse } from 'axios';
import {IOlimp} from "../models/IOlimp";

export default class OlimpService {
    static async registration_olimp(name: string, subject: string, coordinator: string, first_date: Date, last_date: Date, judge: string[],exercise: string[], teams: string[]): Promise<AxiosResponse<IOlimp>> {
        return $api.post<IOlimp>('/registration_olimp', { name, subject, coordinator, first_date, last_date, judge, exercise, teams})
    }

    static async addteamOnOlimp(command:string, olimp: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/reg_comand_on_olimp', {command, olimp})
    }

    static async addexerciseOnOlimp(exercise:string, olimp: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/reg_exercise_on_olimp', {exercise, olimp})
    }

    static async addjudgeOnOlimp(judge:string, olimp: string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/reg_judge_on_olimp', {judge, olimp})
    }

    static async getOlympByTeam(team:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/team_olimp', {team})
    }
    
    static async getOlimpByCoordinator(coordinator:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/coordinator_olimp', {coordinator})
    }
    
    static async getOlimpByJudge(judge:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/judge_olimp', {judge})
    }
}
