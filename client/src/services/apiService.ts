import axios from "../axiosConfig";
import { AxiosResponse } from "axios";

export class ApiService {
    headers: object;

    constructor(token: string | null = null) {
        this.headers = this.getHeaders(token);
    }

    get(path: string): Promise<AxiosResponse> {
        return axios.get(path, { headers: this.headers });
    }

    post(path: string, data: any = {}): Promise<AxiosResponse> {
        return axios.post(path, data, { headers: this.headers });
    }

    getHeaders(access: string | null): object {
        return access ? { Authorization: `JWT ${access}` } : {};
    }
}
