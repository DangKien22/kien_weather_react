import React from 'react'
// import { timeFormat } from '../Time/TimeFormat'
import { findNameCity } from '../Actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
export default function SideBar() {
    const data = useSelector(state => state.weathers.data);//truyen vao 1 ham , nhan vao 1 state 
    // console.log(data);
    const nameCity = useSelector(state => state.weathers.nameCity);
    // console.log(nameCity);
    const dispatch = useDispatch();

    const icons = ["Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"]


    const [value, setValue] = useState('');

    const handleTextChange = (e) => {
        setValue(e.target.value)
    }


    const filterImg = icons.includes(data?.current?.weather[0]?.main)// lay du lieu tu field weather voi element dau tien la 0
        ? data?.current?.weather[0]?.main
        : 'atmosphere'

    return (
        <div className="wrap">
            <form className="mb-3">
                <input type="text" value={value} className="form-control" placeholder="Search" data-toggle="tooltip" data-placement="top" title="Press city name then Enter" autoFocus
                    onChange={handleTextChange}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            dispatch(findNameCity(value))
                            setValue('')
                            event.preventDefault()
                            console.log(value)
                        }
                    }}
                />
            </form>
            <img src={require(`../img/${filterImg}.png`)} alt="icon" className="img-fluid" />
            <div className="fs-2 fw-bold lh-sm text-dack">
                {nameCity}
            </div>
            <div className="fs-1 fw-bold">
                {Math.round(data?.current?.temp)} °C
            </div>
            <div className="fs-5 lh-lg">
                {moment.unix(data?.current?.dt).format('dddd, h:mm a')}
            </div>
            <div className="fs-6 lh-base text-capitalize text-muted mb-3">
                {data?.current?.weather[0]?.description} <br />
                {data?.current?.weather[0]?.main} {`${data?.current?.clouds}%`}
            </div>
            <div className="position-relative d-flex justify-content-center align-items-center">
                <div className="position-absolute">
                    <div className="fs-3 fw-bold text-white">{nameCity}</div>
                </div>
                <img src="https://us.123rf.com/450wm/macrovector/macrovector1805/macrovector180500152/100615959-weather-forecast-web-page-with-heavy-rain-on-dark-cloudy-day-with-people-under-umbrellas-vector-illu.jpg?ver=6" alt="" className="img-fluid rounded " />
            </div>
        </div>
    )

}
