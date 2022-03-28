import React from 'react';
import { useSelector } from 'react-redux'
import { useState } from 'react';
import moment from 'moment';

function Week() {

    const data = useSelector(state => state.weathers.data);
    const [item, setItem] = useState(data && data.daily[0]);

    const handleShowDetail = (timeEl, index) => {
        setItem(timeEl);
    }


    return (
        <>
            <div className="row">
                <div className="d-flex flex-wrap">
                    {data?.daily.map((timeEl, index) =>
                        <div key={index} className="col-xs-12 col-md-3 col-sm-6 p-1" style={{ cursor: 'pointer' }} onClick={() => handleShowDetail(timeEl, index)}>
                            <div className={`${timeEl.dt === item.dt ? 'bg-info' : 'bg-white'} p-2 rounded-3 h-100`}>
                                <p className="fs-6 text-black-50">{moment.unix(timeEl.dt).format('ddd, DD/MM')}</p>
                                <div className="text-center">
                                    <img src={`https://openweathermap.org/img/w/${timeEl.weather[0]?.icon}.png`} alt="icon" className="img-fluid" />
                                    <p className="fs-6 text-muted fw-bold">{Math.round(timeEl.temp.min)}° - {Math.round(timeEl.temp.max)}°</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white my-5 p-2 rounded-3 h-100">
                <p className="fs-5 text-muted">{moment.unix(item.dt).format('ddd, DD/MM')}</p>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <p className="fs-6 text-muted">Temp current : {Math.round(item && item.temp.day)} °C</p>
                        <p className="fs-6 text-muted">Temp :  {item && item.temp && item.temp.min} °C - {item && item.temp && item.temp.max} - °C</p>
                        <p className="fs-6 text-muted">Humidity : {item && item.humidity}  %</p>
                        <p className="fs-6 text-muted">Wind speed : {item && item.wind_speed} km/h</p>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <p className="fs-6 text-muted">Sunrise : {moment.unix(item && item.sunrise).format('h:mm a')} </p>
                        <p className="fs-6 text-muted">Sunset :  {moment.unix(item && item.sunset).format('h:mm a')} </p>
                        <p className="fs-6 text-muted">Description : {item && item.weather[0] && item.weather[0].description} </p>
                        <p className="fs-6 text-muted">Atmospheric pressure : {item && item.pressure} hPa</p>
                    </div>
                </div>

            </div>
        </>

    )
}

export default Week;
