"use client";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ControlPanel from "./components/ControlPanel";
import StatsPanel from "./components/StatsPanel";
import Terminal from "./components/Terminal";

export default function Home() {
  const [logs, setLogs] = useState([{ text: "[SYSTEM] Terminal Ready...", type: "info" }]);
  const [running, setRunning] = useState(false);
  const [stats, setStats] = useState({ total: 0, success: 0, error: 0 });
  const intervalRef = useRef(null);

  const addLog = (text, type = "info") => setLogs(prev => [...prev, { text, type }]);

  const getStatusText = code => {
    const map = {
      200: "OK", 301: "Moved Permanently", 302: "Found",
      403: "Forbidden", 404: "Not Found", 500: "Internal Server Error",
      502: "Bad Gateway", 503: "Service Unavailable"
    };
    return map[code] || "Unknown Status";
  };

  const checkServer = async () => {
    try {
      const start = performance.now();
      const response = await fetch("/api/check-jlpt");
      const end = performance.now();
      const data = await response.json();

      const code = data.status;
      const statusText = data.statusText;
      const responseTime = (end - start).toFixed(0);

      setStats(prev => ({
        total: prev.total + 1,
        success: code === 200 ? prev.success + 1 : prev.success,
        error: code !== 200 ? prev.error + 1 : prev.error,
      }));

      addLog(
        `[${new Date().toLocaleTimeString()}] HTTP ${code} - ${statusText} (${responseTime}ms)`,
        code === 200 ? "success" : "error"
      );

      // Show "meaningful" response text in terminal
      if (data.body) {
        addLog(`[RESPONSE] ${data.body}`, "info");
      }

    } catch {
      setStats(prev => ({
        total: prev.total + 1,
        success: prev.success,
        error: prev.error + 1,
      }));
      addLog(`[${new Date().toLocaleTimeString()}] NETWORK ERROR`, "error");
    }
  };

  const startMonitoring = () => {
    if (running) return;
    setRunning(true);
    addLog("[SYSTEM] Monitoring Started...", "success");
    checkServer();
    intervalRef.current = setInterval(checkServer, 3000);
  };

  const stopMonitoring = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    addLog("[SYSTEM] Monitoring Stopped.", "error");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-green-400 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:40px_40px] animate-pulse"></div>
      <div className="relative z-10 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ControlPanel running={running} onStart={startMonitoring} onStop={stopMonitoring} />
          <StatsPanel stats={stats} />
        </div>
        <Terminal logs={logs} />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}