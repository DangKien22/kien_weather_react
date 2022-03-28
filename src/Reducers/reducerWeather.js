import { GET_DATA_SUCCESS, FIND_NAME_CITY_SUCCESS, FIND_NAME_CITY_ERROR } from '../Actions/Types';

const initialState = {
    data: [],
    nameCity: 'Ha Noi',
    error: ''
}

export const reducerWeather = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_SUCCESS:
            return {
                ...state, data: action.data
            }
        case FIND_NAME_CITY_SUCCESS:
            return {
                ...state, data: action.data, nameCity: action.nameCity, error: ''
            }
        case FIND_NAME_CITY_ERROR:
            return {
                ...state, error: 'Not found city'
            }
        default:
            return state
    }

} 