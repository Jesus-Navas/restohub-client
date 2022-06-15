import axios from 'axios';

const restaurantService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT ? `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/restaurants` : 'http://localhost:5005/api/restaurants'
})


export function getAll() {
    return restaurantService.get('/')
}

export function getOneRestaurant(id) {
    return restaurantService.get(`/${id}`)
};

export function createRestaurant(restaurant) {
    return restaurantService.post('/', restaurant)
}

export function updateRestaurant(id, restaurant) {
    return restaurantService.put(`/${id}`, restaurant)
}

export function deleteRestaurant(id, restaurant) {
    return restaurantService.delete(`/${id}`, restaurant)
}