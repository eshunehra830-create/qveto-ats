export default function Topbar() {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <input 
          type="text" 
          placeholder="Search candidates, jobs..." 
          className="bg-slate-100 border-none px-4 py-2 rounded-lg text-sm w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}