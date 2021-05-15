import { apiConfig } from '../configs';
import HttpService from './httpService';

const ApiService = {
    async system() {
        return HttpService.get(`${apiConfig.baseUrl}/api/public/system`);
    },
    async initSystem(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/system/init`, data);
    },

    async getUserList(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/users`, data);
    },
    
    async updateUserInfo(data) {
        return HttpService.put(`${apiConfig.baseUrl}/api/users/info`, data);
    },

    async register(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/register`, data);
    },

    async login(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/public/login`, data);
    },

    // 发布内容
    async createPost(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/posts`, data);
    },

    async getPosts(data) {
        return HttpService.get(`${apiConfig.baseUrl}/api/posts`, data);
    },

    async createStore(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/stores`, data);
    },

    async deleteStore(id) {
        return HttpService.delete(`${apiConfig.baseUrl}/api/stores/${id}`);
    },

    async getStore() {
        return HttpService.get(`${apiConfig.baseUrl}/api/stores`);
    },

    async createProduct(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/products`, data);
    },

    async deleteProduct(id) {
        return HttpService.delete(`${apiConfig.baseUrl}/api/products/${id}`);
    },

    async getProduct() {
        return HttpService.get(`${apiConfig.baseUrl}/api/products`);
    },

    async uploadImage(data) {
        return HttpService.upload(`${apiConfig.baseUrl}/api/upload/image`, data);
    },

    async createRole(data) {
        return HttpService.post(`${apiConfig.baseUrl}/api/roles`, data);
    },

    async deleteRole(id) {
        return HttpService.delete(`${apiConfig.baseUrl}/api/roles/${id}`);
    },

    async getRoles() {
        return HttpService.get(`${apiConfig.baseUrl}/api/roles`);
    },
}

export default ApiService;