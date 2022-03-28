import axios from "axios";

const API_CALL1 = 'https://api.openweathermap.org/data/2.5/onecall';
const API_CALL2 = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e5f1e0e91073e047bfd37039ad433153';

export const fetchData = async (latitude, longitude) => {
    const { data } = await axios.get(API_CALL1, {
        params: {
            lat: latitude,
            lon: longitude,
            units: 'metric',
            APPID: API_KEY
        }
    });
    console.log(data);
    return data;
}

export const findCity = async (nameCity) => {
    const { data } = await axios.get(API_CALL2, {
        params: {
            q: nameCity,
            units: 'metric',
            APPID: API_KEY
        }
    });
    return data;
}