import './WeatherApp.css'
import search_icon from '../assets/search.png';
// import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
// import drizzle_icon from '../assets/drizzle.png';
// import rain_icon from '../assets/rain.png';
// import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import { useState } from 'react';

export const WeatherApp = () => {

    const api_key = "";

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const search = async () => {
        if (!city) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        try {
            const response = await fetch(url)
            const data = await response.json();
            setWeatherData(data)
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data', error)
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={cloud_icon} alt="" />
            </div>
            <div className='weather-temp'>
                {weatherData ? `${weatherData.main.temp}°c` : 'Loading...'}
            </div>
            <div className="weather-location">{weatherData ? `${weatherData.name}` : 'Loading...'}</div>
            <div className="data-container">

                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            {weatherData ? `${weatherData.main.humidity}%` : 'Loading...'}
                        </div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">
                            {weatherData ? `${weatherData.wind.speed} km/h` : 'Loading...'}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
