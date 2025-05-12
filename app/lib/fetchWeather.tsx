"use server";

export default async function fetchWeather() {
  const responseWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=-36.8485&longitude=174.7635&hourly=temperature_2m,relative_humidity_2m,weather_code,windspeed_10m,pressure_msl,visibility`);
  const dataWeather = await responseWeather.json();
  return { dataWeather };
}
