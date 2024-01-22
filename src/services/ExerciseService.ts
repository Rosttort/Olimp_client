import $api from "../http";
import { AxiosResponse } from 'axios';
import {IExercise} from "../models/IExercise";

export default class ExerciseService {
    static async registration_exercise(name: string, subject: string, condition: string, author: string, answer: string, olimp: string): Promise<AxiosResponse<IExercise>> {
        return $api.post<IExercise>('/registration_exercise', { name, subject, condition, author, answer, olimp})
    }

    static fetchExerciseByOlimp(olimp: string): Promise<AxiosResponse<IExercise[]>> {
        return $api.post<IExercise[]>('/exercise_olimp', {olimp})
    }
}