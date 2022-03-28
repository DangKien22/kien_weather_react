import { combineReducers } from "@reduxjs/toolkit";
import { reducerWeather } from "./reducerWeather";

const rootReducers = combineReducers({
    weathers: reducerWeather,
}
);

export default rootReducers;