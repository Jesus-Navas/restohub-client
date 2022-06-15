import axios from 'axios';

const uploadService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT ? `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api` : 'http://localhost:5005/api'
})

export function uploadImage(image) {
    return uploadService.post('/uploads', image)
}