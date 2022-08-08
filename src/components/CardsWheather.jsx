import axios from 'axios'
import React from 'react'
import './CardsWheather.css'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import img from '../assets/images.js'
export const CardsWheather = ({ lat, lon }) => {
    //estados
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setIsCelsius] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    //efects
    useEffect(() => {
        if (lat) {
            const APIkey = 'c4ba03025b9568ee223764d87f370d6a'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
            axios.get(URL)
                .then(response => {
                    setWeather(response.data)
                    const tem = {
                        celsius: `${Math.floor(response.data.main.temp - 273.15)} °C`,
                        farheinget: `${(Math.floor(response.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
                    }

                    setTemperature(tem)
                    setIsLoading(false)
                })
                .catch(error => console.log(error.message))
        }
    }, [lat, lon])
    const change = () => {
        setIsCelsius(!isCelsius)
    }
    let date = new Date().toDateString();
    const obj = {
        backgroundImage: `url(${img[weather?.weather[0].icon]})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
    }
    // jsx
    if (isLoading) {
        return (<Loader />)
    } else {
        return (
            <div className="content" style={obj}>
                <div className='Card'>
                    <h2>Weather App</h2>
                    <h5>{`City: ${weather?.name} ${weather?.sys.country}`}</h5>
                    <h6>{date}</h6>
                    <div className='body'>
                        <div className='img'>
                            <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                            <h2>
                                {isCelsius ? temperature?.celsius : temperature?.farheinget}
                            </h2>
                        </div>
                        <div className='info'>
                            <h5>
                                {weather?.weather[0].description}
                            </h5>

                            <li><span>Wind speed:</span> {weather?.wind.speed}m/s</li>
                            <li><span>Clouds:</span> {weather?.clouds.all}%</li>
                            <li><span>Pressure:</span> {weather?.main.pressure}vPa</li>

                        </div>
                    </div>
                    <div className='btn'>
                        <button onClick={change}> {isCelsius ? 'Change to Fahrenheit' : 'Change to Celsius'}</button>
                          
                    </div>
                   
                </div>
                <h3 className='name'>from Pablo V</h3>
            </div>

        )
    }

}
