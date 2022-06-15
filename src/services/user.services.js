import axios from 'axios';

const userService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_ENDPOINT ? `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}/api/users` : 'http://localhost:3000/api/users'
})

export function addFavouriteRestaurant(restaurantId, authToken) {
    return userService.put(`/add/${restaurantId}`, { restaurantId, headers: { Authorization: authToken } })
}
export function removeFavouriteRestaurant(restaurantId, authToken) {
    return userService.put(`/remove/${restaurantId}`, { restaurantId, headers: { Authorization: authToken } })
}

export function checkFavourite(restaurantId, authToken) {
    return userService.post(`/check/${restaurantId}`, { restaurantId, headers: { Authorization: authToken } })
}

export function getFavourites(authToken) {
    return userService.post('/getfavourites', { headers: { Authorization: authToken } })
}