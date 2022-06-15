import axios from 'axios';

const authService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT ? `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/auth` : 'http://localhost:5005/api/auth'
})

export function signUp(userdata) {
    return authService.post('/signup', userdata)
};

export function logIn(userdata) {
    return authService.post('/login', userdata)
};

export function verify(authToken) {
    return authService.post('/verify', { headers: { Authorization: authToken } })
}

