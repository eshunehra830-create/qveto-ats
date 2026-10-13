const STAGE_STYLES = {
  Applied: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  Screening: 'bg-violet-50 text-violet-700 ring-violet-600/20',
  Interview: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Offer: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Hired: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

export default function StatusBadge({ stage }) {
  const style = STAGE_STYLES[stage] ?? 'bg-slate-50 text-slate-700 ring-slate-600/20'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
      {stage}
    </span>
  )
}