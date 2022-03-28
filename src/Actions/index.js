import { GET_DATA, FIND_NAME_CITY } from '../Actions/Types';

export const getData = (latitude, longitude) => {
    return {
        type: GET_DATA,
        latitude,
        longitude
    }
}

export const findNameCity = (nameCity) => {
    return {
        type: FIND_NAME_CITY,
        nameCity
    }
}