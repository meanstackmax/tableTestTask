import axios from 'axios'
import urlencodeForm from "../services/urlencodeForm";

export const API_URL = 'https://transfer-api.herokuapp.com'


export async function get(url) {
    const response = await axios.get(API_URL + url)
    return response.data
}

export async function post(url, data) {
    const response = await axios.post(API_URL + url, data)
    return response.data
}

export function registerUser(form) {

    form = urlencodeForm(form)

    return new Promise((resolve, reject) => {
        axios.post(API_URL + '/register', form)
            .then(response => {
                resolve(response.data.token)

            }).catch(error => {
            reject(error.response.data)
        })
    })
}

export async function loginUser(form) {

    form = urlencodeForm(form)

    // const data = await post('/login', form)
    //
    // return data.token
    return new Promise((resolve, reject) => {
        axios.post(API_URL + '/login', form)
            .then(response => {
                resolve(response.data.token)

            }).catch(error => {
            reject(error.response.data)
        })
    })
}