import { useEffect, useState } from "react";
import Image from "next/image";
import fetchWeather from "../lib/fetchWeather";
import weatherCodesJson from "../assets/weathercodes.json";

const weatherCodes = weatherCodesJson as { [key: string]: WeatherCodeEntry };

interface WeatherData {
  weather_code: number[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  pressure_msl: number[];
  visibility: number[];
  windspeed_10m: number[];
}

interface WeatherCodeEntry {
  day: { description: string; image: string };
  night: { description: string; image: string };
}

export default function WeatherCard() {
  const d = new Date();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather().then((data) => {
      console.log(data);
      setWeather(data.dataWeather.hourly);
    });
  }, []);

  const hour = d.getHours();

  return (
    <div className="flex flex-col relative min-h-51 w-[400px] p-2 border-x-1 border-y-2 dark:border-white/10 border-black/20 rounded-lg overflow-hidden max-[1200px]:hidden">
      {weather ? (
        <>
          <Image
            src={!weather ? "default_image.svg" : (() => { const currentHour = hour % 24; const isNight = currentHour >= 18 || currentHour < 6; const weatherData = weatherCodes[weather.weather_code[currentHour]] || { day: { image: "default_image.svg" }, night: { image: "default_image.svg" }, }; return isNight ? weatherData.night.image : weatherData.day.image;})()}            
            alt="Weather icon"
            className="absolute -top-14 -right-14"
            width={240}
            height={240}
            unoptimized
          />
          <h1 className="text-xl ">Auckland</h1>
          <p className="text-black/60 dark:text-white/60">{new Date().toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
          <p className="text-7xl">
            {Math.floor(weather.temperature_2m[hour])}°C
          </p>
          <div className="flex justify-evenly items-center pt-4">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
                className="fill-black dark:fill-white"
                height="20px"
              >
                <path d="M205.2 22.1c-7.9-28.8-49.4-30.1-58.4 0C100 179.9 0 222.7 0 333.9 0 432.4 78.7 512 176 512s176-79.7 176-178.1c0-111.8-99.8-153.3-146.8-311.8zM176 448c-61.8 0-112-50.3-112-112 0-8.8 7.2-16 16-16s16 7.2 16 16c0 44.1 35.9 80 80 80 8.8 0 16 7.2 16 16s-7.2 16-16 16z" />
              </svg>
              <p className="text-black/60 dark:text-white/60">
                {weather.relative_humidity_2m[hour]}%
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-black dark:fill-white"
                height="20px"
              >
                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3L280 88c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 204.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
              <p className="text-black/60 dark:text-white/60">
                {weather.pressure_msl[hour].toString().slice(0, 4)}hPa
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="fill-black dark:fill-white"
                height="20px"
              >
                <path d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM639.9 431.9c0 44.2-35.8 80-80 80l-271.9 0c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" />
              </svg>
              <p className="text-black/60 dark:text-white/60">
                {weather.visibility[hour].toString().slice(0, 2)}km
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-black dark:fill-white"
                height="20px"
              >
                <path d="M288 32c0 17.7 14.3 32 32 32l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l320 0c53 0 96-43 96-96s-43-96-96-96L320 0c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32l32 0c53 0 96-43 96-96s-43-96-96-96L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32zM128 512l32 0c53 0 96-43 96-96s-43-96-96-96L32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32z" />
              </svg>
              <p className="text-black/60 dark:text-white/60">{weather.windspeed_10m[hour]}km/h</p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Loading weather data...</div>
      )}
    </div>
  );
}
