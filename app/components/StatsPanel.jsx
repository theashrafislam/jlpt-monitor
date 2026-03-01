export default function StatsPanel({ stats }) {
  const successRate = stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-slate-900/60 backdrop-blur-md border border-green-500 rounded-xl p-4 shadow-[0_0_25px_rgba(34,197,94,0.3)] text-xs sm:text-sm">
      <div>Total Hits: {stats.total}</div>
      <div className="text-emerald-400">Success: {stats.success}</div>
      <div className="text-red-400">Errors: {stats.error}</div>
      <div className="mt-2">Success Rate: {successRate}%</div>
    </div>
  );
}