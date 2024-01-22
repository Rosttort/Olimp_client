import $api from "../http";
import { AxiosResponse } from 'axios';
import {IReply} from "../models/IReply";

export default class ReplyService {
    static async registration_reply(member: string, olimp: string, conditions: string[], author_answers: string[], answers: string[], marks: number[], score: number, team: string): Promise<AxiosResponse<IReply>> {
        return $api.post<IReply>('/registration_reply', { member, olimp, conditions, author_answers, answers, marks, score, team})
    }

    static async getReplyByOlimp(olimp:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/olimp_reply', {olimp})
    }
    
    static async getReplyByOlimpMember(olimp:string, member:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/olimp_member_reply', {olimp,member})
    }

    static async addMarkOnReply(mark: string, olimp:string, member:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/add_mark_on_reply', {mark,olimp,member})
    }
    
    static async checkReply(olimp:string, member:string): Promise<AxiosResponse<any>> {
        return $api.post<any>('/check_reply', {olimp,member})
    }
}