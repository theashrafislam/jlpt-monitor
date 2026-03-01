import { useRef, useEffect } from "react";

export default function Terminal({ logs }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [logs]);

  return (
    <div
      ref={terminalRef}
      className="bg-black/80 backdrop-blur-md border border-green-500 rounded-xl p-4 h-[300px] sm:h-[400px] lg:h-[500px] overflow-y-auto shadow-[0_0_40px_rgba(34,197,94,0.2)] text-xs sm:text-sm"
    >
      {logs.map((log, i) => (
        <p
          key={i}
          className={
            log.type === "error" ? "text-red-400" : log.type === "success" ? "text-emerald-400" : "text-green-400"
          }
        >
          {log.text}
        </p>
      ))}
    </div>
  );
}