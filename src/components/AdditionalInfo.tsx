interface Props {
	weatherData?: {
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
	}
	precipitation?: number
	feelsLike?: number
}

const AdditionalInfo = ({ weatherData, precipitation, feelsLike }: Props) => {

	return (
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
	)
}

export default AdditionalInfo