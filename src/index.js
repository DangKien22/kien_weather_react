import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga';
import rootReducers from './Reducers/root_reducer';

const sagaMiddleware = createSagaMiddleware();// tao 1 middleware saga bo thu vien redux-saga
const store = createStore(
  rootReducers,
  applyMiddleware(sagaMiddleware)
)// de chay saga ta can ket noi store voi middleware thong qua appyMiddleware
sagaMiddleware.run(rootSaga)//chay saga
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

