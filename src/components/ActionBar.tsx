import { fetchLocationWeather } from "../utils"

interface Props {
	setLocationName: (name: string) => void
	setCountryName: (name: string) => void
	setWeatherData: (data: any) => void
	locationName: string
}

const ActionBar = ({ setLocationName, setCountryName, setWeatherData, locationName }: Props) => {

	return (
		<> <div className="heading">Hows the sky looking today?</div>
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
					fetchLocationWeather(
						setCountryName,
						setWeatherData,
						locationName)
				}}
			>
				Search
			</button></>
	)
}

export default ActionBar