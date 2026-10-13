// Synthetic demo data for Phase 1 (frontend only). All names are fictional.
// In Phase 5 these numbers will be calculated from the real database.

export const statCards = [
  { id: 'jobs', label: 'Open Jobs', value: 14, change: '+3 this month', trend: 'up', icon: 'briefcase' },
  { id: 'applicants', label: 'Total Applicants', value: 482, change: '+12.4% vs last month', trend: 'up', icon: 'users' },
  { id: 'interviews', label: 'Interviews This Week', value: 23, change: '5 scheduled today', trend: 'neutral', icon: 'calendar' },
  { id: 'offers', label: 'Offers Accepted', value: 9, change: '+2 this month', trend: 'up', icon: 'check' },
]

export const recentApplications = [
  { id: 1, candidate: 'Aarav Mehta', role: 'Frontend Developer', stage: 'Interview', appliedOn: '10 Oct 2026', score: 86 },
  { id: 2, candidate: 'Ananya Iyer', role: 'Backend Engineer', stage: 'Screening', appliedOn: '10 Oct 2026', score: 78 },
  { id: 3, candidate: 'Rohan Verma', role: 'UI/UX Designer', stage: 'Applied', appliedOn: '09 Oct 2026', score: 71 },
  { id: 4, candidate: 'Sneha Kapoor', role: 'QA Engineer', stage: 'Offer', appliedOn: '08 Oct 2026', score: 91 },
  { id: 5, candidate: 'Vikram Singh', role: 'DevOps Engineer', stage: 'Interview', appliedOn: '07 Oct 2026', score: 83 },
  { id: 6, candidate: 'Isha Malhotra', role: 'Data Analyst', stage: 'Hired', appliedOn: '05 Oct 2026', score: 94 },
  { id: 7, candidate: 'Karan Joshi', role: 'Full Stack Developer', stage: 'Rejected', appliedOn: '04 Oct 2026', score: 52 },
  { id: 8, candidate: 'Meera Nair', role: 'Product Manager', stage: 'Screening', appliedOn: '03 Oct 2026', score: 80 },
]

export const pipelineStages = [
  { stage: 'Applied', count: 182, color: '#6366f1' },
  { stage: 'Screening', count: 96, color: '#8b5cf6' },
  { stage: 'Interview', count: 54, color: '#0ea5e9' },
  { stage: 'Offer', count: 18, color: '#f59e0b' },
  { stage: 'Hired', count: 9, color: '#10b981' },
]

export const monthlyApplications = [
  { month: 'May', count: 48 },
  { month: 'Jun', count: 63 },
  { month: 'Jul', count: 57 },
  { month: 'Aug', count: 81 },
  { month: 'Sep', count: 96 },
  { month: 'Oct', count: 74 },
]

export const hiringSources = [
  { source: 'LinkedIn', count: 168, color: '#0ea5e9' },
  { source: 'Company Website', count: 112, color: '#6366f1' },
  { source: 'Referrals', count: 94, color: '#10b981' },
  { source: 'Job Portals', count: 71, color: '#f59e0b' },
  { source: 'Campus', count: 37, color: '#ec4899' },
]