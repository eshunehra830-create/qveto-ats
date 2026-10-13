export default function StatCard({ title, value, change, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {Icon && <Icon className="w-6 h-6 text-white" />}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className="text-emerald-600 font-semibold">{change}</span>
        <span className="text-slate-400 ml-2">vs last month</span>
      </div>
    </div>
  );
}