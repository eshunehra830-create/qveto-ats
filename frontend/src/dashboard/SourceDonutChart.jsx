export default function SourceDonutChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Candidate Sources</h3>
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-600"></span> LinkedIn</span>
          <span className="font-semibold">45%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-indigo-400"></span> Career Page</span>
          <span className="font-semibold">30%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400"></span> Referrals</span>
          <span className="font-semibold">15%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-300"></span> Job Boards</span>
          <span className="font-semibold">10%</span>
        </div>
      </div>
    </div>
  );
}