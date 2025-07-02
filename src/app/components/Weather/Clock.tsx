import React, { useEffect, useState } from 'react';

interface ClockProps {
  small?: boolean;
}

export default function Clock({ small = false }: ClockProps) {
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');
  const [showColon, setShowColon] = useState<boolean>(true);
  const [date, setDate] = useState<string>('date');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      const z = d.getDate().toString().padStart(2, '0') + ' / '
        + (d.getMonth() + 1).toString().padStart(2, '0') + ' / ' + d.getFullYear();
      setDate(z);
      setHours(h.toString().padStart(2, '0'));
      setMinutes(m.toString().padStart(2, '0'));
      setShowColon(c => !c);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Responsive classes
  const timeClass = small
    ? "text-xs font-mono tracking-widest px-1 py-0.5 rounded flex items-center justify-center"
    : "text-base md:text-xl font-mono tracking-widest px-2 md:px-4 py-1 md:py-2 rounded flex items-center justify-center";
  const dateClass = small
    ? "text-[10px] text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap"
    : "text-xs md:text-sm text-gray-500 dark:text-gray-400 ml-3 whitespace-nowrap";

  return (
    <div className="w-full flex flex-row items-center justify-center py-0">
      <span className={timeClass}>
        {hours}
        <span className={showColon ? '' : 'opacity-0'}>:</span>
        {minutes}
      </span>
      <span className={dateClass}>{date}</span>
    </div>
  );
} 