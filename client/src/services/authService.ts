import axios from "../axiosConfig";
import { AxiosResponse } from "axios";

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export class AuthService {
    static register(credentials: RegisterData): Promise<AxiosResponse> {
        return axios.post("/api/users/register", credentials);
    }

    static login(credentials: LoginData): Promise<AxiosResponse> {
        return axios.post("/api/token/", credentials);
    }

    static checkToken(refresh: string | null): Promise<AxiosResponse> {
        return axios.post("/api/token/refresh/", { refresh });
    }
}
