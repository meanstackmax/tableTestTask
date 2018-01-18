import * as API from "../api/api";

export const GET_TABLE = "GET_TABLE"
export const SAVE_TABLE = "SAVE_TABLE"

export const getTable = () => ({
    type: GET_TABLE,
    payload: API.get('/table')
})

export const saveTable = (data) => ({
    type: SAVE_TABLE,
    payload: API.post('/table', data)
})