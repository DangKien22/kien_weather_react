import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getData } from './Actions/index';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClmbi40w2m0MfXHZc_0TEXqyyQoFiKn7o",
  authDomain: "weatherapp-7d26a.firebaseapp.com",
  projectId: "weatherapp-7d26a",
  storageBucket: "weatherapp-7d26a.appspot.com",
  messagingSenderId: "620177857335",
  appId: "1:620177857335:web:d4df45922a7bf31b2418b2",
  measurementId: "G-86HBJ6XJWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Today = React.lazy(() => import('./Components/Today'))
const SideBar = React.lazy(() => import('./Components/SideBar'));
const Hour = React.lazy(() => import('./Components/Hour'));
const Week = React.lazy(() => import('./Components/Week'));
function App() {

  const dispatch = useDispatch();
  const error = useSelector(state => state.weathers.error);
  const [mode, setMode] = useState([
    {
      index: 1,
      name: 'Today',
      value: true
    },
    {
      index: 2,
      name: 'Week',
      value: false
    },
    {
      index: 3,
      name: 'Hour',
      value: false
    },
  ])
  // render page theo state
  const handleChangeTab = (el) => {
    setMode(mode.map(item => item.index === el.index ? { ...item, value: true } : { ...item, value: false }))
  }

  useEffect(() => {
    dispatch(getData(21.0245, 105.8412)) //Hanoi
  }, [])

  return (
    <>
      <div className="res container position-absolute overflow-hidden" style={{ height: '90vh' }}>
        <div className="row">
          <div className="col-md-3 col-sm-12 bg-white p-4">
            <Suspense fallback={<div className="text-center my-5">Loading...</div>}>
              <SideBar />
            </Suspense>
          </div>
          <div className=" res col-md-9 col-sm-12 p-4 overflow-auto" style={{ backgroundColor: '#f6f6f8', height: '90vh' }}>
            <div className="wrap">
              {error !== "" &&
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              }
              <div className="d-flex align-item-center justify-content-between">
                <ul className="nav d-flex align-item-center justify-content-start fs-5 fw-bold">
                  {mode.map((el, index) =>
                    <li key={index} role="button" className={`nav-item m-2 ${el.value ? 'border-bottom border-3 border-dark' : 'text-muted'}`} onClick={() => handleChangeTab(el)}>{el.name}</li>
                  )}
                </ul>
                <img className="rounded-circle" src="https://i0.wp.com/i.pinimg.com/originals/89/54/38/895438247efa788551d1919d44f176ca.png" alt="avatar" width='50' />
              </div>
              <Suspense fallback={<div className="text-center my-5"><img src="/img/loading.gif" alt="Loading" /></div>}>
                {mode.map((el, index) =>
                  el.value === true && el.name === 'Week' ? <Week key={index} />
                    : el.value === true && el.name === 'Today' ? <Today key={index} />
                      : el.value === true && el.name === 'Hour' ? <Hour key={index} />
                        : ''
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
