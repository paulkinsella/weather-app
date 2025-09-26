import { useState } from "react"
import "./App.css"
import GetHourlyForecast from "./GetHourlyForecast.tsx"
import GetDailyForcast from "./components/GetDailyForcast.tsx"
import AppHead from "./components/AppHead.tsx"
import ActionBar from "./components/ActionBar.tsx"
import MainForecast from "./components/MainForecast.tsx"
import AdditionalInfo from "./components/AdditionalInfo.tsx"
import { formatDate } from "./utils"

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

  return (
    <>
      <div className="app-container">
        <AppHead />
        <div className="app-body">
          <ActionBar
            setLocationName={setLocationName}
            setCountryName={setCountryName}
            setWeatherData={setWeatherData}
            locationName={locationName}
          />
          <div className="weather-cards">
            <div className="main-card">
              {weatherData === null ? (
                <div>Search a location </div>
              ) : (
                <>
                  <MainForecast
                    locationName={locationName}
                    countryName={countryName}
                    formatDate={formatDate}
                    today={today}
                    weatherData={weatherData}
                    currentHourIndex={currentHourIndex}
                  />
                  <AdditionalInfo
                    weatherData={weatherData}
                    precipitation={precipitation}
                    feelsLike={feelsLike}
                  />
                  <div className="weekly-forcast-heading">Daily Forcast</div>
                  <div className="weekly-forecast">
                    <GetDailyForcast
                      weatherData={weatherData}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="hourly-card">
              <div className="temp-container">
                <div className="hourly-heading">
                  <div className="hourly-left">Hourly Forcast</div>
                  {/* <img src={hourlyForecast} className="hourly-icon" /> */}
                  <div className="forcast-button">
                    <button>Today</button>
                  </div>
                </div>
                <GetHourlyForecast
                  weatherData={weatherData}
                  currentHourIndex={currentHourIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
