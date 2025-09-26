import iconSunny from "./assets/iconSunny.webp"
import iconOvercast from "./assets/iconOvercast.webp"
import iconFog from "./assets/iconFog.webp"
import iconDrizzle from "./assets/iconDrizzle.webp"
import iconRain from "./assets/iconRain.webp"
import iconSnow from "./assets/iconSnow.webp"
import iconStorm from "./assets/iconStorm.webp"
import ClearNightSky from "./assets/clearNightSky.png"

export function formatHour(timeString: string) {
  const date = new Date(timeString)
  const formatted = date.toLocaleTimeString([], {
    hour: "numeric",
    hour12: true,
  })
  return formatted
}

export const GetWeatherImage = (code: number | undefined, currentHourIndex: number) => {
  switch (code) {
    case 0:
      if (currentHourIndex > 7) {
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

export const fetchLocationWeather = async (setCountryName: any, setWeatherData: any, locationName: string) => {
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

 function getOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

 export function formatDate(date: Date) {
    const weekday = date.toLocaleString("en-US", { weekday: "long" })
    const day = getOrdinal(date.getDate())
    const month = date.toLocaleString("en-US", { month: "short" })
    const year = date.getFullYear()
    return `${weekday}, ${day} ${month} ${year}`
  }