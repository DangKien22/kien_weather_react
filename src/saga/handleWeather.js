import { call, put, takeEvery } from 'redux-saga/effects';

import { GET_DATA, GET_DATA_SUCCESS, FIND_NAME_CITY, FIND_NAME_CITY_SUCCESS, FIND_NAME_CITY_ERROR } from '../Actions/Types'
import { fetchData, findCity } from '../API/api'


function* handleGetData(action) {
    const data = yield call(fetchData, action.latitude, action.longitude);
    yield put({ type: GET_DATA_SUCCESS, data });//put: dispatch action

}

function* handleFindCity(action) {
    try {
        const city = yield call(findCity, action.nameCity);//call 1 function.neu return ve 1 promise thi se tam ngung saga  cho den khi promise dc giai quyet
        const nameCity = city.name;
        const data = yield call(fetchData, city?.coord.lat, city?.coord.lon);
        yield put({ type: FIND_NAME_CITY_SUCCESS, data, nameCity });
    }
    catch (error) {
        yield put({ type: FIND_NAME_CITY_ERROR });// lang nghe function khi co loi xay ra
    }
}


export function* watchGetData() {
    yield takeEvery(GET_DATA, handleGetData)// dung takeEvery de lang nghe hanh dong moi khi gui va chay(thuc thi va tra la ket qua khi action dc goi)
}
/* Generator function watchGetData se tam dung cho den khi action GET_DATA duoc thuc thi va moi khi action GET_DATA thuc thi no 
 se goi toi funtion handleGetData*/
export function* watchFindCity() {
    yield takeEvery(FIND_NAME_CITY, handleFindCity)
}