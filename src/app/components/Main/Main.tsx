import React from 'react'
import LightSwitch from '../Switch/LightSwitch/LightSwitch';
import ChatBox from '../ChatBox/ChatBox'
import WeatherBox from '../Weather/WeatherBox';

interface MainProps {
  mode: string;
  toggleMode: () => void;
}

export default function Main({ mode, toggleMode }: MainProps) {
  return (
    <div className='flex flex-col gap-4 !important items-center justify-center'>
      <WeatherBox />
      <LightSwitch mode={mode} toggleMode={toggleMode}/>
      <ChatBox />
    </div>
  )
} 