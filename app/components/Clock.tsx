import { useState, useEffect } from "react";
import { Playwrite_HU  } from "next/font/google";

const fontPlay = Playwrite_HU({
  variable: "--font-playwrite_hu"
});

export default function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/40 dark:bg-white/5 backdrop-blur flex justify-center items-center border dark:border-white/10 border-black/20 w-full rounded-md">
      <p className={`${fontPlay.className} text-4xl text-center max-[450px]:text-4xl max-[350px]:text-3xl font-semibold py-6`}>{time.toLocaleTimeString(["en-NZ"], {hourCycle: 'h23'})} NZT</p>
    </div>
  );
}