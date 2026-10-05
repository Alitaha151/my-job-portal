import { createContext, useContext, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, BriefcaseBusiness, Check, Clock3, ExternalLink, Filter, Globe2, MapPin, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

const JobsContext = createContext(null)
const API_URL = 'https://remotive.com/api/remote-jobs?limit=80'

const sampleJobs = [
  { id: 'sample-01', title: 'Senior Product Designer', company: 'Linear', location: 'North America · Remote', type: 'Full-time', category: 'Design', salary: '$145k – $185k', posted: '2026-09-29', description: 'We are looking for a thoughtful product designer to help shape how teams plan and build software.\n\nYou will partner with product and engineering to turn complex workflows into experiences that feel clear and calm.\n\nWhat you will do\n• Lead end-to-end design for core product areas\n• Prototype, test, and refine ideas with customers\n• Raise the bar for craft across the team\n\nWhat we are looking for\n• 5+ years designing thoughtful digital products\n• A strong portfolio and clear communication\n• Comfort working asynchronously with a distributed team', url: 'https://linear.app/careers' },
  { id: 'sample-02', title: 'Frontend Engineer, Growth', company: 'Vercel', location: 'United States · Remote', type: 'Full-time', category: 'Engineering', salary: '$160k – $220k', posted: '2026-09-28', description: 'Help more developers discover the joy of shipping on the web. Build fast, accessible product experiences that make the first moments with Vercel feel effortless.\n\nWhat you will do\n• Build and ship customer-facing features in React and TypeScript\n• Work closely with design, data, and product partners\n• Improve web performance and accessible interactions\n\nWhat we are looking for\n• Strong experience with React and modern frontend development\n• A feel for product details and interaction design\n• Curiosity, ownership, and a collaborative working style', url: 'https://vercel.com/careers' },
  { id: 'sample-03', title: 'People Operations Partner', company: 'Notion', location: 'Americas · Remote', type: 'Full-time', category: 'People & HR', salary: '$105k – $148k', posted: '2026-09-28', description: 'Build the systems and moments that let a growing, global team do its best work.\n\nWhat you will do\n• Support people programs across the employee lifecycle\n• Partner with team leads on thoughtful, practical solutions\n• Make global operations more welcoming\n\nWhat we are looking for\n• Experience in people operations or HR partnership\n• A caring, discreet, and highly organized approach\n• Comfort improving systems as a company grows', url: 'https://www.notion.so/careers' },
  { id: 'sample-04', title: 'Content Marketing Manager', company: 'Webflow', location: 'United States · Remote', type: 'Full-time', category: 'Marketing', salary: '$118k – $154k', posted: '2026-09-27', description: 'Tell stories that help people make better things for the web. Lead content programs that connect our product to the ambitious people who use it.\n\nWhat you will do\n• Develop a clear, distinctive editorial calendar\n• Collaborate across product marketing and creative\n• Learn from performance and improve the work\n\nWhat we are looking for\n• A track record of excellent, audience-aware writing\n• Experience growing content programs at a technology company\n• The ability to make complex ideas easy to understand', url: 'https://webflow.com/careers' },
  { id: 'sample-05', title: 'Customer Success Manager', company: 'Figma', location: 'Europe · Remote', type: 'Full-time', category: 'Customer Support', salary: '$88k – $126k', posted: '2026-09-26', description: 'Help creative teams get more from the tools they use every day. Become a trusted partner to customers and bring their feedback back to the people building our products.\n\nWhat you will do\n• Guide customers through onboarding and adoption\n• Build relationships with creative and technical teams\n• Share product feedback with the right teams\n\nWhat we are looking for\n• Experience working with customers in a SaaS environment\n• Clear, kind communication and a bias for action\n• An interest in design and collaborative software', url: 'https://www.figma.com/careers/' },
  { id: 'sample-06', title: 'Data Analyst', company: 'GitLab', location: 'Worldwide · Remote', type: 'Full-time', category: 'Data & Analytics', salary: '$98k – $139k', posted: '2026-09-25', description: 'Help teams make confident, evidence-led decisions. Turn product and business data into useful answers, then help partners act on what they learn.\n\nWhat you will do\n• Analyze product usage and business performance\n• Build reliable dashboards and share clear findings\n• Partner with teams to shape useful experiments\n\nWhat we are looking for\n• Fluency in SQL and a visualization tool\n• Strong analytical judgment and communication\n• Comfort collaborating across a global organization', url: 'https://about.gitlab.com/jobs/' },
  { id: 'sample-07', title: 'Brand Designer', company: 'Headspace', location: 'North America · Remote', type: 'Contract', category: 'Design', salary: '$75 – $95 / hour', posted: '2026-09-24', description: 'Make a little more room for calm. Create expressive, thoughtful design across campaigns and digital touchpoints.\n\nWhat you will do\n• Create visual systems for campaigns and launches\n• Work with writers and strategists to shape concepts\n• Deliver polished assets across formats\n\nWhat we are looking for\n• A portfolio of strong brand and campaign work\n• Confidence moving between ideas and execution\n• Experience collaborating across creative disciplines', url: 'https://www.headspace.com/careers' },
  { id: 'sample-08', title: 'Engineering Manager, Platform', company: 'Zapier', location: 'Americas · Remote', type: 'Full-time', category: 'Engineering', salary: '$175k – $230k', posted: '2026-09-24', description: 'Lead a team making automation dependable at scale. Support engineers in their growth while helping platform teams deliver durable, developer-friendly systems.\n\nWhat you will do\n• Coach and develop a distributed engineering team\n• Set clear goals with product and engineering partners\n• Help teams improve reliability and delivery\n\nWhat we are looking for\n• Experience leading and developing software engineers\n• A technical background in platform systems\n• Thoughtful communication across time zones', url: 'https://zapier.com/jobs' },
  { id: 'sample-09', title: 'Lifecycle Marketing Specialist', company: 'Airtable', location: 'United States · Remote', type: 'Part-time', category: 'Marketing', salary: '$52 – $68 / hour', posted: '2026-09-23', description: 'Build useful, well-timed conversations with the people who use Airtable. Create lifecycle programs that help customers discover more value at every stage.\n\nWhat you will do\n• Plan and improve email and in-product campaigns\n• Use audience insights to shape relevant experiences\n• Partner with teams across marketing and product\n\nWhat we are looking for\n• Experience with lifecycle or CRM marketing\n• Strong writing and an eye for useful details\n• Comfort measuring and iterating on campaigns', url: 'https://www.airtable.com/careers' },
]

function cleanDescription(description = '') {
  if (typeof window === 'undefined') return description
  const body = new DOMParser().parseFromString(description, 'text/html').body
  body.querySelectorAll('br').forEach((lineBreak) => lineBreak.replaceWith('\n'))
  body.querySelectorAll('li').forEach((item) => item.prepend('• '))
  body.querySelectorAll('p, div, li, h1, h2, h3, h4, section, article').forEach((block) => block.after('\n'))
  return (body.textContent || '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function normalizeJob(job) {
  const rawType = job.job_type || job.jobType || 'Full-time'
  return {
    id: String(job.id),
    title: job.title || 'Untitled role',
    company: job.company_name || job.company || 'Independent company',
    location: job.candidate_required_location || job.location || 'Remote',
    type: String(rawType).replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    category: job.category || 'Other',
    salary: job.salary || 'Compensation not listed',
    posted: job.publication_date || job.posted || '',
    description: cleanDescription(job.description || 'No description was provided for this role.'),
    url: job.url || '',
  }
}

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem('goodwork-saved-jobs') || '[]')
    if (Array.isArray(saved)) {
      return {
        jobs: saved.filter((item) => typeof item === 'object' && item?.id),
        legacyIds: saved.filter((item) => typeof item === 'string'),
      }
    }
    return {
      jobs: Array.isArray(saved.jobs) ? saved.jobs : [],
      legacyIds: Array.isArray(saved.legacyIds) ? saved.legacyIds : [],
    }
  } catch { return { jobs: [], legacyIds: [] } }
}

function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState('')
  const [savedState, setSavedState] = useState(readSavedState)
  const [notice, setNotice] = useState('')
  const savedJobs = [
    ...savedState.jobs,
    ...jobs.filter((job) => savedState.legacyIds.includes(job.id) && !savedState.jobs.some((saved) => saved.id === job.id)),
  ]
  const savedIds = [...new Set([...savedJobs.map((job) => job.id), ...savedState.legacyIds])]

  useEffect(() => {
    const controller = new AbortController()
    async function loadJobs() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) throw new Error('Job feed unavailable')
        const data = await response.json()
        if (!Array.isArray(data.jobs) || !data.jobs.length) throw new Error('No jobs returned')
        setJobs(data.jobs.map(normalizeJob))
      } catch (error) {
        if (error.name === 'AbortError') return
        setJobs(sampleJobs)
        setApiError('Live listings are taking a break. Here are a few roles to explore instead.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }
    loadJobs()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    localStorage.setItem('goodwork-saved-jobs', JSON.stringify(savedState))
  }, [savedState])
  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2800)
    return () => window.clearTimeout(timer)
  }, [notice])

  function toggleSaved(job) {
    const wasSaved = savedIds.includes(job.id)
    setSavedState((current) => wasSaved
      ? { jobs: current.jobs.filter((item) => item.id !== job.id), legacyIds: current.legacyIds.filter((id) => id !== job.id) }
      : { jobs: [...current.jobs, job], legacyIds: current.legacyIds.filter((id) => id !== job.id) })
    setNotice(wasSaved ? 'Removed from your saved roles' : 'Saved for later')
  }

  return <JobsContext.Provider value={{ jobs, loading, apiError, savedJobs, savedIds, toggleSaved, notice }}>{children}</JobsContext.Provider>
}

function useJobs() { return useContext(JobsContext) }

function BrandMark() { return <span className="brand-mark" aria-hidden="true"><span /></span> }

function SiteHeader() {
  const { savedIds } = useJobs()
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" to="/" aria-label="Goodwork home"><BrandMark /><span>goodwork<span className="brand-period">.</span></span></Link>
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink to="/" end>Find a job</NavLink>
      <NavLink to="/saved">Saved roles{savedIds.length > 0 && <span className="nav-count">{savedIds.length}</span>}</NavLink>
    </nav>
    <a className="header-note" href="https://remotive.com/" target="_blank" rel="noreferrer">Work from anywhere <ArrowUpRight size={15} aria-hidden="true" /></a>
  </div></header>
}

function CompanyMark({ company }) {
  const initials = company.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()
  const colors = ['#e1f0c4', '#dce9fb', '#fce5ce', '#e9e0f5', '#cdece4']
  return <span className="company-mark" style={{ '--mark-color': colors[company.charCodeAt(0) % colors.length] }}>{initials}</span>
}

function formatPosted(date) {
  if (!date) return 'Recently posted'
  const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
  if (!Number.isFinite(days) || days < 1) return 'New today'
  if (days === 1) return '1 day ago'
  if (days < 30) return `${days} days ago`
  return 'Over a month ago'
}

function SaveButton({ job, compact = false }) {
  const { savedIds, toggleSaved } = useJobs()
  const saved = savedIds.includes(job.id)
  return <button type="button" className={`save-button${saved ? ' is-saved' : ''}${compact ? ' save-button-compact' : ''}`} aria-label={saved ? `Remove ${job.title} from saved roles` : `Save ${job.title}`} aria-pressed={saved} title={saved ? 'Remove saved role' : 'Save role'} onClick={() => toggleSaved(job)}>
    <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />{!compact && <span>{saved ? 'Saved' : 'Save'}</span>}
  </button>
}

function JobCard({ job }) {
  return <article className="job-card">
    <div className="job-card-top"><CompanyMark company={job.company} /><span className="posted-label"><Clock3 size={13} aria-hidden="true" />{formatPosted(job.posted)}</span><SaveButton job={job} compact /></div>
    <Link className="job-card-link" to={`/jobs/${encodeURIComponent(job.id)}`}><p className="company-name">{job.company}</p><h3>{job.title}</h3><p className="job-card-location"><MapPin size={15} aria-hidden="true" />{job.location}</p></Link>
    <div className="job-card-bottom"><div className="job-tags"><span>{job.type}</span><span>{job.category}</span></div><span className="job-salary">{job.salary}</span></div>
  </article>
}

function FilterSidebar({ jobs, filters, onChange, onReset }) {
  const categories = [...new Set(jobs.map((job) => job.category).filter(Boolean))].sort()
  const jobTypes = [...new Set(jobs.map((job) => job.type).filter(Boolean))].sort()
  const activeCount = [filters.category, filters.type].filter(Boolean).length
  return <aside className="filter-sidebar" aria-label="Job filters">
    <div className="filter-heading"><div><SlidersHorizontal size={17} aria-hidden="true" /><h2>Filters</h2>{activeCount > 0 && <span className="filter-count">{activeCount}</span>}</div><button type="button" className="text-button" onClick={onReset}>Clear all</button></div>
    <label className="filter-label" htmlFor="filter-location">Location</label>
    <div className="filter-select-wrap"><MapPin size={15} aria-hidden="true" /><select className="form-select" id="filter-location" value={filters.location} onChange={(event) => onChange('location', event.target.value)}><option value="">Anywhere</option>{[...new Set(jobs.map((job) => job.location).filter(Boolean))].sort().map((location) => <option value={location} key={location}>{location}</option>)}</select></div>
    <div className="filter-divider" />
    <label className="filter-label" htmlFor="filter-category">Department</label>
    <div className="select-wrap"><select className="form-select" id="filter-category" value={filters.category} onChange={(event) => onChange('category', event.target.value)}><option value="">All departments</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
    <div className="filter-divider" />
    <p className="filter-label">Job type</p>
    <div className="type-options">{jobTypes.map((type) => <label className="checkbox-row" key={type}><input type="radio" name="job-type" checked={filters.type === type} onChange={() => onChange('type', filters.type === type ? '' : type)} /><span className="custom-check"><Check size={12} aria-hidden="true" /></span><span>{type}</span></label>)}{filters.type && <button type="button" className="clear-type" onClick={() => onChange('type', '')}>Clear type</button>}</div>
    <div className="sidebar-note"><Sparkles size={17} aria-hidden="true" /><p>Good work should fit your life, not the other way around.</p></div>
  </aside>
}

function EmptyState({ savedOnly, onReset }) {
  return <div className="empty-state"><span className="empty-icon"><BriefcaseBusiness size={24} aria-hidden="true" /></span><h3>{savedOnly ? 'Your shortlist starts here' : 'No roles found this time'}</h3><p>{savedOnly ? 'Save a role that catches your eye and it will be waiting here.' : 'Try another title or loosen up a filter to see more possibilities.'}</p>{!savedOnly && <button type="button" className="button button-dark" onClick={onReset}>Clear search &amp; filters</button>}{savedOnly && <Link className="button button-dark" to="/">Explore open roles <ArrowRight size={16} aria-hidden="true" /></Link>}</div>
}

function JobsPage({ savedOnly = false }) {
  const { jobs, loading, apiError, savedJobs } = useJobs()
  const [query, setQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [filters, setFilters] = useState({ location: '', category: '', type: '' })
  const [page, setPage] = useState(1)
  const pageSize = 6
  const visibleJobs = savedOnly ? savedJobs : jobs
  const filteredJobs = visibleJobs.filter((job) => {
    const searchText = `${job.title} ${job.company} ${job.category}`.toLowerCase()
    return (!query || searchText.includes(query.trim().toLowerCase())) && (!locationQuery || job.location.toLowerCase().includes(locationQuery.trim().toLowerCase())) && (!filters.location || job.location === filters.location) && (!filters.category || job.category === filters.category) && (!filters.type || job.type === filters.type)
  })
  const pageCount = Math.max(1, Math.ceil(filteredJobs.length / pageSize))
  const pageJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize)
  function updateFilter(key, value) { setFilters((current) => ({ ...current, [key]: value })); setPage(1) }
  function resetFilters() { setQuery(''); setLocationQuery(''); setFilters({ location: '', category: '', type: '' }); setPage(1) }

  return <>
    {!savedOnly && <section className="search-hero"><div className="search-hero-inner">
      <div className="hero-copy"><span className="eyebrow"><span className="live-dot" />THE GOOD WORK BOARD</span><h1>Find work that<br />feels like <span>you.</span></h1><p>Thoughtful roles, good people, and a little more room to do your best work.</p></div>
      <div className="hero-stamp" aria-hidden="true"><span>GOOD<br />WORK<br /><i>←</i> AHEAD</span><div className="stamp-ring" /></div>
      <div className="search-box" role="search">
        <label className="search-field" htmlFor="job-query"><Search size={19} aria-hidden="true" /><input className="form-control" id="job-query" type="search" placeholder="Job title, company, or keyword" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} /></label><span className="search-divider" />
        <label className="search-field search-location" htmlFor="job-location"><MapPin size={18} aria-hidden="true" /><input className="form-control" id="job-location" type="search" placeholder="Anywhere" value={locationQuery} onChange={(event) => { setLocationQuery(event.target.value); setPage(1) }} /></label>
        <button type="button" className="search-submit" onClick={() => document.getElementById('job-query')?.focus()} aria-label="Focus job search"><Search size={19} aria-hidden="true" /><span>Find a role</span></button>
      </div>
      <div className="hero-foot"><span>Made for your next chapter.</span><span><Globe2 size={14} aria-hidden="true" /> Remote-first opportunities</span></div>
    </div></section>}

    <main className={`content-wrap${savedOnly ? ' saved-page' : ''}`}>
      <div className="listing-heading"><div><span className="section-kicker">{savedOnly ? 'YOUR COLLECTION' : 'A FRESH PLACE TO START'}</span><h2>{savedOnly ? 'Saved roles' : 'Open positions'}<span className="heading-period">.</span></h2></div><div className="results-count">{loading ? 'Gathering roles…' : <><strong>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'role' : 'roles'} to explore</>}</div></div>
      {apiError && !savedOnly && <p className="api-notice" role="status"><Globe2 size={16} aria-hidden="true" />{apiError}</p>}
      <div className="listing-layout">
        {!savedOnly && <FilterSidebar jobs={jobs} filters={filters} onChange={updateFilter} onReset={resetFilters} />}
        <section className="results-column" aria-label={savedOnly ? 'Saved job listings' : 'Job listings'}>
          {!savedOnly && <div className="results-toolbar"><div className="toolbar-title"><Filter size={16} aria-hidden="true" /><span>Browse roles</span></div><span className="results-range">{filteredJobs.length ? `${Math.min((page - 1) * pageSize + 1, filteredJobs.length)}–${Math.min(page * pageSize, filteredJobs.length)} of ${filteredJobs.length}` : '0 roles'}</span></div>}
          {loading ? <div className="job-list">{Array.from({ length: 4 }, (_, index) => <div className="job-skeleton" key={index}><span /><div><i /><i /><i /></div></div>)}</div> : pageJobs.length ? <div className="job-list">{pageJobs.map((job) => <JobCard job={job} key={job.id} />)}</div> : <EmptyState savedOnly={savedOnly} onReset={resetFilters} />}
          {!loading && filteredJobs.length > pageSize && <nav className="pagination-row" aria-label="Job listing pages"><span>Page <strong>{page}</strong> of <strong>{pageCount}</strong></span><div><button type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}><ArrowLeft size={16} aria-hidden="true" /></button><button type="button" aria-label="Next page" disabled={page >= pageCount} onClick={() => setPage((current) => current + 1)}><ArrowRight size={16} aria-hidden="true" /></button></div></nav>}
        </section>
      </div>
    </main>
  </>
}

function DetailPage() {
  const { id } = useParams()
  const { jobs, savedJobs, loading } = useJobs()
  const job = jobs.find((item) => item.id === id) || savedJobs.find((item) => item.id === id)
  if (loading) return <main className="page-message"><span className="loading-spinner" /><p>Finding the details…</p></main>
  if (!job) return <main className="page-message"><h1>That role has moved on.</h1><Link className="button button-dark" to="/">Browse open roles <ArrowRight size={16} /></Link></main>
  return <main className="detail-wrap">
    <Link className="back-link" to="/"><ArrowLeft size={16} aria-hidden="true" /> All open roles</Link>
    <div className="detail-grid"><article className="detail-main">
      <div className="detail-company"><CompanyMark company={job.company} /><span>{job.company}<small>is looking for a</small></span></div>
      <p className="section-kicker">{job.category} <span className="detail-dot">·</span> {job.type}</p><h1>{job.title}</h1>
      <div className="detail-meta"><span><MapPin size={16} aria-hidden="true" />{job.location}</span><span><Clock3 size={16} aria-hidden="true" />{formatPosted(job.posted)}</span></div>
      <div className="detail-rule" /><section className="description-section"><h2>A little about the role</h2><p className="description-copy">{job.description}</p></section>
    </article><aside className="detail-aside"><div className="apply-panel"><span className="panel-label">THE DETAILS</span>
      <div className="detail-salary"><span>Compensation</span><strong>{job.salary}</strong></div><div className="detail-salary"><span>Work style</span><strong>{job.location}</strong></div><div className="detail-salary"><span>Employment</span><strong>{job.type}</strong></div>
      <Link className="button button-green apply-link" to={`/apply/${encodeURIComponent(job.id)}`}>Apply for this role <ArrowUpRight size={17} aria-hidden="true" /></Link><SaveButton job={job} />
      {job.url && <a className="company-site-link" href={job.url} target="_blank" rel="noreferrer">View company listing <ExternalLink size={14} aria-hidden="true" /></a>}
    </div><p className="detail-aside-note"><Sparkles size={15} aria-hidden="true" /> Good work starts with a good fit.</p></aside></div>
  </main>
}

function ApplicationPage() {
  const { id } = useParams()
  const { jobs, savedJobs } = useJobs()
  const navigate = useNavigate()
  const job = jobs.find((item) => item.id === id) || savedJobs.find((item) => item.id === id)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', portfolio: '', note: '' })
  if (!job) return <main className="page-message"><h1>We couldn’t find that role.</h1><Link className="button button-dark" to="/">Back to open roles</Link></main>

  function updateForm(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setError('') }
  function submitApplication(event) {
    event.preventDefault()
    if (form.name.trim().length < 2) { setError('Please enter your full name.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError('Please enter a valid email address.'); return }
    if (form.portfolio && !/^https?:\/\//i.test(form.portfolio.trim())) { setError('Please enter a complete portfolio URL beginning with https://.'); return }
    if (form.note.trim().length < 30) { setError('A few more details, please. Your note needs at least 30 characters.'); return }
    try {
      const applications = JSON.parse(localStorage.getItem('goodwork-applications') || '[]')
      applications.push({ ...form, jobId: job.id, jobTitle: job.title, company: job.company, submittedAt: new Date().toISOString() })
      localStorage.setItem('goodwork-applications', JSON.stringify(applications))
      setSubmitted(true)
    } catch { setError('We couldn’t save your application in this browser. Please try again.') }
  }
  if (submitted) return <main className="success-page"><div className="success-mark"><Check size={30} aria-hidden="true" /></div><span className="section-kicker">APPLICATION SAVED</span><h1>You’re on your way.</h1><p>Your application for <strong>{job.title}</strong> at {job.company} has been saved in this browser.</p><button type="button" className="button button-dark" onClick={() => navigate('/')}>Back to open roles <ArrowRight size={16} aria-hidden="true" /></button></main>

  return <main className="application-wrap"><Link className="back-link" to={`/jobs/${encodeURIComponent(job.id)}`}><ArrowLeft size={16} aria-hidden="true" /> Back to role</Link>
    <div className="application-grid"><section className="application-intro"><span className="section-kicker">ONE SMALL STEP</span><h1>Let them meet<br />the real <span>you.</span></h1><p>Introduce yourself to {job.company}. Your application stays in this browser for this demo.</p><div className="applying-for"><CompanyMark company={job.company} /><span><small>APPLYING FOR</small><strong>{job.title}</strong><span>{job.company} · {job.location}</span></span></div></section>
      <form className="application-form" onSubmit={submitApplication} noValidate>
        <label htmlFor="applicant-name">Your name <span>*</span></label><input className="form-control" id="applicant-name" name="name" autoComplete="name" placeholder="Alex Morgan" value={form.name} onChange={updateForm} required minLength={2} />
        <label htmlFor="applicant-email">Email address <span>*</span></label><input className="form-control" id="applicant-email" name="email" type="email" autoComplete="email" placeholder="alex@example.com" value={form.email} onChange={updateForm} required />
        <label htmlFor="applicant-portfolio">Portfolio or LinkedIn <span className="optional-label">OPTIONAL</span></label><input className="form-control" id="applicant-portfolio" name="portfolio" type="url" placeholder="https://" value={form.portfolio} onChange={updateForm} />
        <label htmlFor="applicant-note">A note about you <span>*</span><small>At least 30 characters</small></label><textarea className="form-control" id="applicant-note" name="note" rows="5" placeholder="What about this role feels like a good fit?" value={form.note} onChange={updateForm} required minLength={30} />
        {error && <p className="form-error" role="alert"><X size={15} aria-hidden="true" />{error}</p>}
        <button type="submit" className="button button-green submit-application">Send your application <ArrowUpRight size={17} aria-hidden="true" /></button><p className="form-footnote">Your details are saved locally for this project demo. Nothing is sent to the employer.</p>
      </form>
    </div>
  </main>
}

function NotFoundPage() { return <main className="page-message"><h1>Looks like a wrong turn.</h1><p>Let’s get you back to the good stuff.</p><Link className="button button-dark" to="/">Find open roles <ArrowRight size={16} /></Link></main> }
function SiteFooter() { return <footer className="site-footer"><Link className="brand footer-brand" to="/"><BrandMark /><span>goodwork<span className="brand-period">.</span></span></Link><span>A little more room to do your best work.</span><span>Thoughtfully found, wherever you are.</span></footer> }
function ToastNotice() { const { notice } = useJobs(); return notice ? <div className="toast-notice" role="status"><Check size={16} aria-hidden="true" />{notice}</div> : null }

function App() {
  return <JobsProvider><div className="app-shell"><SiteHeader /><Routes>
    <Route path="/" element={<JobsPage />} /><Route path="/saved" element={<JobsPage savedOnly />} /><Route path="/jobs/:id" element={<DetailPage />} /><Route path="/apply/:id" element={<ApplicationPage />} /><Route path="*" element={<NotFoundPage />} />
  </Routes><SiteFooter /><ToastNotice /></div></JobsProvider>
}

export default App
