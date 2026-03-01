import { useState, useEffect } from "react";

export default function ControlPanel({ running, onStart, onStop }) {
  const [bdTime, setBdTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setBdTime(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-green-500 rounded-xl p-4 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={onStart}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-md transition active:scale-95"
        >
          ▶ START
        </button>
        <button
          onClick={onStop}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-md transition active:scale-95"
        >
          ⛔ STOP
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <div className={`w-3 h-3 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-red-500"}`}></div>
          <span className="text-xs sm:text-sm">{running ? "LIVE" : "OFFLINE"}</span>
        </div>
      </div>
      <div className="mt-4 text-xs sm:text-sm text-green-400">
        BD Time: <span className="text-green-300">{bdTime}</span>
      </div>
    </div>
  );
}