import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({capital}) => {
    const [weather, setWeather] = useState()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios
                .get(url)
                .catch(error => console.log(error))

                let data = {
                    temp: response.data.main.temp,
                    humidity: response.data.main.humidity,
                    wind: response.data.wind.speed,
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon
                }

            setWeather(data)
            console.log(`OK -- ${capital}'s weather fetched.`)
        }

        fetchData()
    }, [capital, url])

    if (weather && capital !== "Unknown") {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>{weather.description.replace(/^\w/, (c) => c.toUpperCase())}</p>
                <p>Temperature: {weather.temp} Farenheit</p>
                <p>Humidity: {weather.humidity} %</p>
                <p>Wind: {weather.wind} mph</p>
            </div>
    )}
}

export default Weather