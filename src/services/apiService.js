import { apiConfig } from '../configs';
import HttpService from './httpService';

const ApiService = {
    async getUserList(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/users`, data);
    },

    async register(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/register`, data);
    },
    
    async login(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/login`, data);
    },
}

export default ApiService;