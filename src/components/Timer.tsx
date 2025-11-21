import { useEffect, useState } from "react";

interface TimerProps {
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer = ({ onTimeUp, isActive }: TimerProps) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!isActive) {
      setSeconds(30);
      return;
    }

    if (seconds === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp, isActive]);

  return (
    <div className="flex items-center justify-center">
      <div
        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-2xl font-bold ${
          seconds <= 10
            ? "border-red-500 text-red-500 animate-pulse"
            : "border-kbc-gold text-kbc-gold"
        }`}
      >
        {seconds}
      </div>
    </div>
  );
};
