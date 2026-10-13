export default function PipelineFunnel() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Hiring Pipeline Funnel</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Applied</span><span className="font-bold">1,245</span></div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-indigo-600 h-full w-full"></div></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Shortlisted</span><span className="font-bold">450</span></div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-2/5"></div></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Interviewed</span><span className="font-bold">120</span></div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-indigo-400 h-full w-1/5"></div></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>Hired</span><span className="font-bold">25</span></div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full w-[10%]"></div></div>
        </div>
      </div>
    </div>
  );
}