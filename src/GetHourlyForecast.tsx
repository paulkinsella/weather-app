import { formatHour, GetWeatherImage } from "./utils"

interface HourlyData {
  time: string[]
  temperature_2m: number[]
  weathercode?: number[]
  relative_humidity_2m?: number[]
  precipitation?: number[]
  apparent_temperature?: number[]
}

interface Props {
  weatherData?: {
    hourly?: HourlyData
  }

  currentHourIndex: number

}

const GetHourlyForecast = ({ weatherData, currentHourIndex }: Props) => {
  return weatherData?.hourly?.time
    .slice(currentHourIndex, currentHourIndex + 8)
    .map((t, i) => (
      <div className="forecast-card" key={t}>
        <img
          className="forecast-image"
          src={GetWeatherImage(weatherData.hourly?.weathercode?.[i], currentHourIndex)}
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

export default GetHourlyForecast