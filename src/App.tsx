import { useState } from "react"
import logo from "./assets/logo.svg"
import cog from "./assets/cog.svg"
import "./App.css"
import iconSunny from "./assets/iconSunny.webp"
import iconOvercast from "./assets/iconOvercast.webp"
import iconFog from "./assets/iconFog.webp"
import iconDrizzle from "./assets/iconDrizzle.webp"
import iconRain from "./assets/iconRain.webp"
import iconSnow from "./assets/iconSnow.webp"
import iconStorm from "./assets/iconStorm.webp"
import GetDailyForcast from "./GetDailyForcast"
import ClearNightSky from "./assets/clearNightSky.png"

function App() {
  const [locationName, setLocationName] = useState("")
  const [countryName, setCountryName] = useState("")
  const [weatherData, setWeatherData] = useState<{
    current_weather?: {
      temperature: number
      windspeed: number
      weathercode: number
    }
    hourly?: {
      time: string[]
      temperature_2m: number[]
      weathercode?: number[]
      relative_humidity_2m?: number[]
      precipitation?: number[]
      apparent_temperature?: number[]
    }
    daily?: {
      time: string[]
      temperature_2m_max?: number[]
      temperature_2m_min?: number[]
      precipitation_sum?: number[]
      weathercode?: number[]
    }
  } | null>(null)
  const today = new Date()

  const fetchLocationWeather = async () => {
    try {
      const coordinates = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&format=json`
      )
      const data = await coordinates.json()
      setCountryName(data.results[0].country)
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?longitude=${data.results[0].longitude}&latitude=${data.results[0].latitude}&hourly=temperature_2m,weathercode,apparent_temperature,relative_humidity_2m,precipitation&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode&timezone=Europe/Dublin`
      )
      const weatherData = await weatherResponse.json()
      setWeatherData(weatherData)
    } catch {
      console.error("Error fetching location name")
    }
  }

  function formatHour(timeString: string) {
    const date = new Date(timeString)
    const formatted = date.toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    })
    return formatted
  }

  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, "0")
  const currentHourString = `${now.getFullYear()}-${pad(
    now.getMonth() + 1
  )}-${pad(now.getDate())}T${pad(now.getHours())}:00`

  const timeIndex = weatherData?.hourly?.time.findIndex(
    (t) => t === currentHourString
  )

  const precipitation =
    timeIndex !== undefined && timeIndex !== -1
      ? weatherData?.hourly?.precipitation?.[timeIndex]
      : undefined

  const feelsLike =
    timeIndex !== undefined && timeIndex !== -1
      ? weatherData?.hourly?.apparent_temperature?.[timeIndex]
      : undefined

  const currentHourIndex =
    weatherData?.hourly?.time.findIndex((t) => t === currentHourString) ?? 0

  const getHourlyForecast = () => {
    return weatherData?.hourly?.time
      .slice(currentHourIndex, currentHourIndex + 8)
      .map((t, i) => (
        <div className="forecast-card" key={t}>
          <img
            className="forecast-image"
            src={getWeatherImage(weatherData.hourly?.weathercode?.[i])}
          />
          <div className="h-time-container">
          {formatHour(t)}{" "}
          </div>
          <div className="h-temp-container">
          {weatherData.hourly?.temperature_2m[i] !== undefined
            ? `${Math.round(weatherData.hourly.temperature_2m[i])}°`
            : "--"}
            </div>
        </div>
      ))
  }

  function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  function formatDate(date: Date) {
    const weekday = date.toLocaleString("en-US", { weekday: "long" })
    const day = getOrdinal(date.getDate())
    const month = date.toLocaleString("en-US", { month: "short" })
    const year = date.getFullYear()
    return `${weekday}, ${day} ${month} ${year}`
  }

  const getWeatherImage = (code: number | undefined) => {
    switch (code) {
      case 0:
        if(currentHourIndex > 7){
          return ClearNightSky
        }
        return iconSunny
      case 1:
      case 2:
      case 3:
        return iconOvercast
      case 45:
      case 48:
        return iconFog
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
        return iconDrizzle
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
        return iconRain
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return iconSnow
      case 95:
      case 96:
      case 99:
        return iconStorm
      default:
        return "../src/assets/icon-loading.svg"
    }
  }

  console.log("Weather Data", weatherData)

  return (
    <>
      <div className="app-container">
        <div className="app-head">
          <img src={logo} className="logo" alt="Vite logo" />
          <button className="units">
            <img className="cog" src={cog} />
            Units
          </button>
        </div>
        <div className="app-body">
          <div className="heading">Hows the sky looking today?</div>
          <input
            onChange={(e) => {
              setLocationName(e.target.value)
            }}
            className="search"
            placeholder="Search for a place."
          ></input>
          <button
            className="search-button"
            onClick={() => {
              fetchLocationWeather()
            }}
          >
            Search
          </button>
          <div className="weather-cards">
            <div className="main-card">
              {weatherData === null ? (
                <div>Search a location </div>
              ) : (
                <>
                  <div className="main-forecast">
                    <div className="forcast-left">
                      <h1 className="location-name">
                        {" "}
                        {locationName}, {countryName}{" "}
                      </h1>
                      <h3>{formatDate(today)}</h3>
                    </div>
                    <div className="forcast-right">
                      <div className="weather-icon">
                        <img
                          className="weather-image"
                          src={getWeatherImage(
                            weatherData.current_weather?.weathercode
                          )}
                        />
                      </div>
                      <div className="temperature">
                        {weatherData?.current_weather?.temperature !== undefined
                          ? `${Math.round(
                              weatherData.current_weather.temperature
                            )}°`
                          : "--"}
                      </div>
                    </div>
                  </div>
                  <div className="additional-info">
                    <div className="info-card">
                      <div className="info-card-heading"> Feels like</div>
                      <div className="info-card-value">
                        {feelsLike !== undefined ? Math.round(feelsLike) : "--"}
                        °
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-heading">Humidity</div>
                      <div className="info-card-value">
                        {weatherData?.hourly?.relative_humidity_2m !== undefined
                          ? `${Math.round(
                              weatherData.hourly.relative_humidity_2m[0]
                            )}%`
                          : "--"}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-heading">Wind</div>
                      <div className="info-card-value">
                        {weatherData?.current_weather?.windspeed !== undefined
                          ? `${Math.round(
                              weatherData.current_weather.windspeed
                            )} mph`
                          : "--"}
                      </div>
                    </div>
                    <div className="info-card">
                      <div className="info-card-heading">Precipitation</div>
                      <div className="info-card-value">{precipitation}</div>
                    </div>
                  </div>

                  <div className="weekly-forcast-heading">Daily Forcast</div>
                  <div className="weekly-forecast">
                    <GetDailyForcast
                      weatherData={weatherData}
                      getWeatherImage={getWeatherImage}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="hourly-card">
              <div className="temp-container">
                <div className="hourly-heading">
                  <div className="hourly-left">Main Forcast</div>
                  <div className="forcast-button">
                    <button>Today</button>
                  </div>
                </div>
                {getHourlyForecast()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
