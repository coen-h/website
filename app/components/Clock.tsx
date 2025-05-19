import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center border-x-1 border-y-2 dark:border-white/10 border-black/20 w-full rounded-lg">
      <p className="text-5xl max-[450px]:text-4xl max-[350px]:text-3xl max-[300px]:text-2xl font-extrabold p-6">{time.toLocaleTimeString(["en-NZ"], {hourCycle: 'h23'})} NZT</p>
    </div>
  );
}