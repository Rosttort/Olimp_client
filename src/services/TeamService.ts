import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import {ITeam} from "../models/ITeam";

export default class TeamService {
    static async registration_team(name: string, trainer: string, members: string[]): Promise<AxiosResponse<ITeam>> {
        return $api.post<ITeam>('/registration_team', { name, trainer, members})
    }

    static fetchUsersTrainer(trainer: string): Promise<AxiosResponse<ITeam[]>> {
        return $api.post<ITeam[]>('/teams', {trainer})
    }

    static fetchUsersMember(member: string): Promise<AxiosResponse<ITeam[]>> {
        return $api.post<ITeam[]>('/teams_member', {member})
    }
}