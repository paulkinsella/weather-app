import GetHourlyForecast from "../GetHourlyForecast"

interface Props {
	weatherData?: any,
	currentHourIndex: number
}


const HourlyForecast = ({ weatherData, currentHourIndex }: Props) => {

	return (
		<div className="hourly-card">
			<div className="temp-container">
				<div className="hourly-heading">
					<div className="hourly-left">Hourly Forcast</div>
					<div className="forcast-button">
						<button>Today</button>
					</div>
				</div>
				<GetHourlyForecast weatherData={weatherData} currentHourIndex={currentHourIndex} />
			</div>
		</div>
	)
}

export default HourlyForecast