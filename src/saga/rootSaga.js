import { all } from 'redux-saga/effects';
import { watchGetData, watchFindCity } from './handleWeather'

export default function* rootSaga() {
    yield all([
        watchGetData(),
        watchFindCity(),

    ]);
}