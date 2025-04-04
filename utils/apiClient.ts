import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.BASE_URL || 'https://petstore.swagger.io/v2',
    headers: {
        'Content-Type': 'application/json',
    },
});
