interface DailyData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weathercode: number[]
}

interface Props {
  weatherData?: {
    daily?: DailyData
  }
  getWeatherImage: (code: number) => string
}

const GetDailyForcast = ({ weatherData, getWeatherImage }: Props) => {
  if (!weatherData?.daily) return <div>Loading daily forecast...</div>

  const daily = weatherData.daily

  return (
    <div className="weekly-forecast">
      {daily.time.slice(0, 7).map((dateString, i) => {
        const date = new Date(dateString)
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
        const maxTemp = daily.temperature_2m_max[i]
        const minTemp = daily.temperature_2m_min[i]
        const weathercode = daily.weathercode[i]

        return (
          <div className="weekly-forecast-card" key={dateString}>
            <div className="day">{weekday}</div>
            <img
              className="forecast-image"
              src={getWeatherImage(weathercode)}
            />
            <div className="temp-range">
              {maxTemp !== undefined ? Math.round(maxTemp) : "--"}° /{" "}
              {minTemp !== undefined ? Math.round(minTemp) : "--"}°
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GetDailyForcast
