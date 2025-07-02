import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Clock from './Clock';

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

export default function WeatherBox() {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!apiKey || !apiUrl) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      }
    );
  }, [apiKey, apiUrl]);

  useEffect(() => {
    if (lat && long && apiKey && apiUrl) {
      fetch(`${apiUrl}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${apiKey}`)
        .then(res => res.ok ? res.json() : null)
        .then((data: WeatherData | null) => {
          if (data && data.main) setWeatherData(data);
        })
        .catch(() => {});
    }
  }, [lat, long, apiKey, apiUrl]);

  return (
    <div className="flex-1 flex gap-y-2 md:gap-y-0 md:gap-x-4 w-full justify-between">
      {/* Clock/Date Box */}
      <div className="px-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow h-11 min-h-0 max-h-[44px] p-0 flex flex-row items-center justify-center min-w-0 overflow-hidden">
        <Clock small />
      </div>
      {/* Weather Box */}
      {weatherData && weatherData.weather && weatherData.main && weatherData.name && (
        <div className="px-2 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow h-11 min-h-0 max-h-[44px] p-0 flex flex-row items-center justify-center min-w-0 overflow-hidden">
          <Weather weatherData={weatherData} />
        </div>
      )}
    </div>
  );
} 