// Single source of truth for the sidebar and the placeholder routes.
export const navigationGroups = [
  {
    heading: 'Overview',
    items: [{ label: 'Dashboard', path: '/', icon: 'home', description: '' }],
  },
  {
    heading: 'Recruitment',
    items: [
      { label: 'Jobs', path: '/jobs', icon: 'briefcase', description: 'Create, edit, publish, close and archive job postings.' },
      { label: 'Applications', path: '/applications', icon: 'file', description: 'Track every application through the hiring pipeline.' },
      { label: 'Interviews', path: '/interviews', icon: 'calendar', description: 'Schedule, reschedule and record interview feedback.' },
      { label: 'Offers', path: '/offers', icon: 'mail', description: 'Generate offer letters and track acceptance.' },
      { label: 'Onboarding', path: '/onboarding', icon: 'check', description: 'Manage onboarding tasks for new hires.' },
    ],
  },
  {
    heading: 'People',
    items: [
      { label: 'Candidates', path: '/candidates', icon: 'users', description: 'Candidate profiles and private resumes.' },
      { label: 'HR Staff', path: '/hr-staff', icon: 'user', description: 'HR staff workspace and assignments.' },
      { label: 'Admin', path: '/admin', icon: 'shield', description: 'User management, roles and audit logs.' },
    ],
  },
  {
    heading: 'Insights',
    items: [
      { label: 'Analytics', path: '/analytics', icon: 'chart', description: 'Hiring KPIs calculated from real data.' },
    ],
  },
]