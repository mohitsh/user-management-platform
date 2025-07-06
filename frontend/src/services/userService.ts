import axios from 'axios';
import type { User, UserCreate } from '../types/User';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userService = {
    async getUsers(): Promise<User[]> {
        try {
            const response = await api.get('/users');
            return response.data.users;
        } catch (error: any) {
            throw new Error(`Failed to fetch users: ${error.response?.status || 'Network error'}`);
        }
    },

    async createUser(userData: UserCreate): Promise<User> {
        try {
            const response = await api.post('/users', userData);
            return response.data.user;
        } catch (error: any) {
            throw new Error(`Failed to create user: ${error.response?.status || 'Network error'}`);
        }
    },

    async updateUser(uuid: string, userData: UserCreate): Promise<User> {
        try {
            const response = await api.put(`/users/${uuid}`, userData);
            return response.data.user;
        } catch (error: any) {
            throw new Error(`Failed to update user: ${error.response?.status || 'Network error'}`);
        }
    }
};