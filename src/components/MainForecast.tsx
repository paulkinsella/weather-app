import { GetWeatherImage } from "../utils"

interface Props {
	locationName: string
	countryName: string
	weatherData?: {
		current_weather?: {
			temperature: number
			windspeed: number
			weathercode: number
		}
	}
	currentHourIndex: number
	today: Date
	formatDate: (date: Date) => string
}

const MainForecast = ({ locationName, countryName, formatDate, today, weatherData, currentHourIndex }: Props) => {
	return (
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
						src={GetWeatherImage(
							weatherData?.current_weather?.weathercode,
							currentHourIndex
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
	)
}

export default MainForecast