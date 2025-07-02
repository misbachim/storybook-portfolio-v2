import React from 'react';
import {
  MdOutlineThunderstorm,
  MdOutlineCloud,
  MdOutlineWbSunny,
  MdOutlineAcUnit,
  MdOutlineGrain,
} from 'react-icons/md';

interface WeatherMain {
  temp: number;
}

interface WeatherWeather {
  main: string;
  description: string;
}

interface WeatherData {
  main: WeatherMain;
  weather: WeatherWeather[];
  name: string;
}

interface WeatherProps {
  weatherData: WeatherData;
}

export default function Weather({ weatherData }: WeatherProps) {
  let weatherIcon = null;

  const iconClass = "text-gray-700 dark:text-gray-100";

  if (weatherData.weather[0].main === 'Thunderstorm') {
    weatherIcon = <MdOutlineThunderstorm className={iconClass} />;
  } else if (weatherData.weather[0].main === 'Drizzle') {
    weatherIcon = <MdOutlineGrain className={iconClass} />;
  } else if (weatherData.weather[0].main === 'Rain') {
    weatherIcon = <MdOutlineGrain className={iconClass} />;
  } else if (weatherData.weather[0].main === 'Snow') {
    weatherIcon = <MdOutlineAcUnit className={iconClass} />;
  } else if (weatherData.weather[0].main === 'Clear') {
    weatherIcon = <MdOutlineWbSunny className={iconClass} />;
  } else if (weatherData.weather[0].main === 'Clouds') {
    weatherIcon = <MdOutlineCloud className={iconClass} />;
  } else {
    weatherIcon = <MdOutlineCloud className={iconClass} />;
  }

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-bold">{weatherData.main.temp.toFixed(0)}°C</span>
      <span className="text-sm">{weatherIcon}</span>
      <span className="capitalize text-xs text-gray-600 dark:text-gray-300 truncate">{weatherData.weather[0].description}</span>
    </div>
  );
} 