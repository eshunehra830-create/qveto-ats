export default function ApplicationsBarChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Applications Overview</h3>
      <div className="h-48 flex items-end justify-between gap-2 pt-6">
        <div className="w-full bg-indigo-100 h-3/4 rounded-t flex flex-col justify-end items-center pb-2 text-xs font-bold text-indigo-700">Mon</div>
        <div className="w-full bg-indigo-200 h-full rounded-t flex flex-col justify-end items-center pb-2 text-xs font-bold text-indigo-700">Tue</div>
        <div className="w-full bg-indigo-300 h-2/3 rounded-t flex flex-col justify-end items-center pb-2 text-xs font-bold text-indigo-700">Wed</div>
        <div className="w-full bg-indigo-400 h-4/5 rounded-t flex flex-col justify-end items-center pb-2 text-xs font-bold text-white">Thu</div>
        <div className="w-full bg-indigo-600 h-5/6 rounded-t flex flex-col justify-end items-center pb-2 text-xs font-bold text-white">Fri</div>
      </div>
    </div>
  );
}