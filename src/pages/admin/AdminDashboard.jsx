import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { icon: '⊞', label: 'Overview',         path: 'overview' },
  { icon: '🎓', label: 'Academic Manager', path: 'academic' },
  { icon: '✓',  label: 'Attendance',       path: 'attendance', badge: 3 },
  { icon: '👥', label: 'Students',         path: 'students' },
  { icon: '📋', label: 'Faculty',          path: 'faculty' },
  { icon: '📊', label: 'Reports',          path: 'reports' },
  { icon: '⚙',  label: 'Settings',         path: 'settings' },
]

const allStudents = [
  { roll: 'CS21001', name: 'Arjun Sharma',   branch: 'CSE', sem: 5, att: 92 },
  { roll: 'CS21002', name: 'Priya Patel',    branch: 'CSE', sem: 5, att: 78 },
  { roll: 'CS21003', name: 'Rahul Mehta',    branch: 'CSE', sem: 5, att: 64 },
  { roll: 'IT21001', name: 'Sneha Kulkarni', branch: 'IT',  sem: 5, att: 88 },
  { roll: 'IT21002', name: 'Dev Joshi',      branch: 'IT',  sem: 5, att: 71 },
  { roll: 'ME21001', name: 'Vikas Reddy',    branch: 'MECH',sem: 3, att: 55 },
  { roll: 'CS21004', name: 'Ananya Nair',    branch: 'CSE', sem: 5, att: 95 },
  { roll: 'IT21003', name: 'Kiran Desai',    branch: 'IT',  sem: 5, att: 83 },
]

const subjects = [
  { code: 'CS501', name: 'Data Structures',   branch: 'CSE', sem: 5, faculty: 'Dr. R. Sharma',  credits: 4 },
  { code: 'CS502', name: 'Operating Systems', branch: 'CSE', sem: 5, faculty: 'Prof. M. Gupta', credits: 4 },
  { code: 'CS503', name: 'Computer Networks', branch: 'CSE', sem: 5, faculty: 'Dr. S. Verma',   credits: 3 },
  { code: 'IT501', name: 'Web Technologies',  branch: 'IT',  sem: 5, faculty: 'Prof. A. Singh', credits: 3 },
  { code: 'ME301', name: 'Fluid Mechanics',   branch: 'MECH',sem: 3, faculty: 'Dr. P. Kumar',   credits: 4 },
]

const days = ['Mon','Tue','Wed','Thu','Fri','Sat']
const times = ['9:00','11:00','2:00']
const timetable = {
  '9:00':  { Mon:{sub:'Data Structures',room:'A101',fac:'Dr. Sharma',color:'blue-slot'}, Tue:{sub:'OS Lab',room:'Lab2',fac:'Prof. Gupta',color:'green-slot'}, Wed:{sub:'Networks',room:'A102',fac:'Dr. Verma',color:'amber-slot'}, Thu:{sub:'Data Structures',room:'A101',fac:'Dr. Sharma',color:'blue-slot'}, Fri:{sub:'Web Tech',room:'B201',fac:'Prof. Singh',color:'purple-slot'}, Sat:{sub:'Maths',room:'A103',fac:'Dr. Iyer',color:'amber-slot'} },
  '11:00': { Mon:{sub:'OS',room:'A102',fac:'Prof. Gupta',color:'green-slot'}, Tue:{sub:'Data Structures',room:'A101',fac:'Dr. Sharma',color:'blue-slot'}, Wed:{sub:'DS Lab',room:'Lab1',fac:'Dr. Sharma',color:'blue-slot'}, Thu:{sub:'Networks',room:'A102',fac:'Dr. Verma',color:'amber-slot'}, Fri:{sub:'OS',room:'A102',fac:'Prof. Gupta',color:'green-slot'}, Sat:{sub:'Networks Lab',room:'Lab3',fac:'Dr. Verma',color:'amber-slot'} },
  '2:00':  { Mon:{sub:'Networks',room:'A102',fac:'Dr. Verma',color:'amber-slot'}, Tue:{sub:'Web Tech',room:'B201',fac:'Prof. Singh',color:'purple-slot'}, Wed:{sub:'OS',room:'A102',fac:'Prof. Gupta',color:'green-slot'}, Thu:{sub:'Web Tech Lab',room:'Lab4',fac:'Prof. Singh',color:'purple-slot'}, Fri:{sub:'Data Structures',room:'A101',fac:'Dr. Sharma',color:'blue-slot'}, Sat:{sub:'',room:'',fac:'',color:''} },
}

export default function AdminDashboard() {
  const [section, setSection] = useState('overview')
  return (
    <div className="layout">
      <Sidebar role="admin" name="Dr. Amit Joshi" subtitle="Super Admin" initials="AJ" navItems={navItems} activeSection={section} onSectionChange={setSection} />
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <h1>{navItems.find(n => n.path === section)?.label}</h1>
            <p>VIT Engineering College · Semester 5 · 2024–25</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-btn">🔍</div>
            <div className="topbar-btn">🔔<div className="notif-dot" /></div>
            <div className="topbar-avatar">AJ</div>
          </div>
        </div>
        <div className="page-content">
          {section === 'overview'   && <Overview />}
          {section === 'academic'   && <Academic />}
          {section === 'attendance' && <AttendanceView />}
          {section === 'students'   && <Students />}
          {section === 'faculty'    && <Faculty />}
          {section === 'reports'    && <Reports />}
          {section === 'settings'   && <Settings />}
        </div>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <>
      <div className="stats-grid">
        {[
          { label:'Total Students', value:'1,248', change:'+24 this sem', up:true,  icon:'👥', color:'blue'  },
          { label:'Faculty Members',value:'86',    change:'+3 new',       up:true,  icon:'📋', color:'green' },
          { label:'Avg Attendance', value:'81%',   change:'-2% vs last',  up:false, icon:'✓',  color:'amber' },
          { label:'Defaulters',     value:'34',    change:'Below 75%',    up:false, icon:'⚠',  color:'red'   },
        ].map((s,i) => (
          <div key={s.label} className={`stat-card ${s.color} delay-${i+1}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up?'up':'down'}`}>{s.up?'↑':'↓'} {s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-6040">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Branch-wise Attendance</div><div className="card-subtitle">Current semester</div></div>
            <span className="card-action">View all</span>
          </div>
          {[
            {branch:'CSE – Sem 5',pct:84,color:'#4f7eff'},{branch:'IT – Sem 5',pct:79,color:'#10d9a0'},
            {branch:'MECH – Sem 3',pct:76,color:'#f9a825'},{branch:'CIVIL – Sem 5',pct:88,color:'#a855f7'},
            {branch:'ETC – Sem 3',pct:71,color:'#ef4444'},
          ].map(b => (
            <div key={b.branch} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:13}}>
                <span style={{color:'var(--text2)'}}>{b.branch}</span>
                <span style={{color:b.pct>=75?'var(--green)':'var(--red)',fontWeight:600}}>{b.pct}%</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${b.pct}%`,background:b.color}} /></div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><div><div className="card-title">Today's Summary</div><div className="card-subtitle">March 19, 2026</div></div></div>
          {[
            {label:'Classes scheduled',val:'42',color:'var(--accent)'},{label:'Conducted',val:'38',color:'var(--green)'},
            {label:'Cancelled',val:'4',color:'var(--red)'},{label:'Attendance marked',val:'36',color:'var(--amber)'},
          ].map(s => (
            <div key={s.label} style={{display:'flex',justifyContent:'space-between',padding:'10px 12px',background:'var(--bg3)',borderRadius:8,marginBottom:8}}>
              <span style={{fontSize:13,color:'var(--text2)'}}>{s.label}</span>
              <span style={{fontSize:15,fontWeight:700,color:s.color,fontFamily:'Syne,sans-serif'}}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{marginBottom:14}}>
        <div className="card-header"><div><div className="card-title">Attendance Defaulters</div><div className="card-subtitle">Students below 75%</div></div><span className="card-action">Export</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Roll No</th><th>Student</th><th>Branch</th><th>Attendance</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[{roll:'CS21003',name:'Rahul Mehta',branch:'CSE',att:64},{roll:'ME21001',name:'Vikas Reddy',branch:'MECH',att:55},{roll:'IT21002',name:'Dev Joshi',branch:'IT',att:71}].map(s => (
                <tr key={s.roll}>
                  <td style={{color:'var(--text3)',fontSize:12}}>{s.roll}</td>
                  <td className="primary">{s.name}</td>
                  <td><span className="pill blue">{s.branch}</span></td>
                  <td><span style={{color:s.att<65?'var(--red)':'var(--amber)',fontWeight:600}}>{s.att}%</span></td>
                  <td><span className={`pill ${s.att<65?'red':'amber'}`}>{s.att<65?'Critical':'Warning'}</span></td>
                  <td><span className="card-action" style={{fontSize:11}}>Notify</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Announcements</div><span className="card-action">+ New</span></div>
        {[
          {title:'Mid-semester exams scheduled for April 5–12',by:'Admin Office',time:'2 hrs ago',tag:'Exam'},
          {title:'Faculty meeting on March 22 at 3:00 PM — Hall A',by:'Principal',time:'Yesterday',tag:'Meeting'},
          {title:'Submission of internal marks by March 25',by:'Exam Cell',time:'2 days ago',tag:'Deadline'},
        ].map(a => (
          <div key={a.title} className="announcement-item">
            <div className="ann-title">{a.title}</div>
            <div className="ann-meta">
              <span className={`pill ${a.tag==='Exam'?'red':a.tag==='Deadline'?'amber':'blue'}`} style={{fontSize:10}}>{a.tag}</span>
              <div className="ann-dot"/><span>{a.by}</span><div className="ann-dot"/><span>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Academic() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Subject</button>
      </div>
      {showForm && (
        <div className="card" style={{marginBottom:16,borderColor:'var(--border2)'}}>
          <div className="card-title" style={{marginBottom:16}}>Add New Subject</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:12}}>
            {['Subject Code','Subject Name','Credits','Branch','Semester','Assign Faculty'].map(p => (
              <input key={p} className="input-field" placeholder={p} />
            ))}
          </div>
          <div style={{display:'flex',gap:10}}>
            <button className="btn-primary">Save Subject</button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-header"><div><div className="card-title">Timetable — CSE Sem 5</div><div className="card-subtitle">Current week</div></div><span className="card-action">Edit</span></div>
        <div className="timetable-grid">
          <div className="tt-header">Time</div>
          {days.map(d => <div key={d} className="tt-header">{d}</div>)}
          {times.map(t => (
            <>
              <div key={`time-${t}`} className="tt-time">{t}</div>
              {days.map(d => {
                const slot = timetable[t]?.[d]
                return (
                  <div key={`${t}-${d}`} className={`tt-slot ${slot?.color||''} ${slot?.sub?'filled':''}`}>
                    {slot?.sub && <><div className="sub-name">{slot.sub}</div><div className="sub-fac">{slot.fac}</div><div className="sub-room">{slot.room}</div></>}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">All Subjects</div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Code</th><th>Subject</th><th>Branch</th><th>Sem</th><th>Faculty</th><th>Credits</th><th></th></tr></thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.code}>
                  <td style={{fontSize:12,color:'var(--accent)',fontWeight:600}}>{s.code}</td>
                  <td className="primary">{s.name}</td>
                  <td><span className="pill blue">{s.branch}</span></td>
                  <td style={{color:'var(--text2)'}}>{s.sem}</td>
                  <td style={{color:'var(--text2)'}}>{s.faculty}</td>
                  <td><span className="pill green">{s.credits} cr</span></td>
                  <td><span className="card-action" style={{fontSize:11}}>Edit</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function AttendanceView() {
  return (
    <>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {[{label:'Overall Average',value:'81%',color:'blue'},{label:'Defaulters',value:'34',color:'red'},{label:'Perfect Attendance',value:'12',color:'green'}].map(s => (
          <div key={s.label} className={`stat-card ${s.color}`}><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div></div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><div className="card-title">Student Attendance Overview</div><span className="card-action">Export CSV</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Roll No</th><th>Student</th><th>Branch</th><th>Sem</th><th>Attendance</th><th>Status</th></tr></thead>
            <tbody>
              {allStudents.map(s => (
                <tr key={s.roll}>
                  <td style={{fontSize:12,color:'var(--text3)'}}>{s.roll}</td>
                  <td className="primary">{s.name}</td>
                  <td><span className="pill blue">{s.branch}</span></td>
                  <td style={{color:'var(--text2)'}}>{s.sem}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div className="progress-bar" style={{width:70}}>
                        <div className="progress-fill" style={{width:`${s.att}%`,background:s.att>=75?'var(--green)':'var(--red)'}} />
                      </div>
                      <span style={{fontWeight:600,color:s.att>=75?'var(--green)':'var(--red)',fontSize:13}}>{s.att}%</span>
                    </div>
                  </td>
                  <td><span className={`pill ${s.att>=80?'green':s.att>=75?'amber':'red'}`}>{s.att>=80?'Good':s.att>=75?'Warning':'Low'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Students() {
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">All Students</div><button className="btn-primary">+ Enrol Student</button></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Roll No</th><th>Name</th><th>Branch</th><th>Sem</th><th>Attendance</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {allStudents.map(s => (
              <tr key={s.roll}>
                <td style={{fontSize:12,color:'var(--text3)'}}>{s.roll}</td>
                <td className="primary">{s.name}</td>
                <td><span className="pill blue">{s.branch}</span></td>
                <td style={{color:'var(--text2)'}}>{s.sem}</td>
                <td style={{color:s.att>=75?'var(--green)':'var(--red)',fontWeight:600}}>{s.att}%</td>
                <td><span className={`pill ${s.att>=80?'green':s.att>=75?'amber':'red'}`}>{s.att>=80?'Good':s.att>=75?'At Risk':'Low'}</span></td>
                <td><span className="card-action" style={{fontSize:11}}>View</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Faculty() {
  const faculty = [
    {id:'F001',name:'Dr. R. Sharma', dept:'CSE',subjects:'Data Structures, Algorithms',load:14},
    {id:'F002',name:'Prof. M. Gupta',dept:'CSE',subjects:'Operating Systems',load:10},
    {id:'F003',name:'Dr. S. Verma',  dept:'CSE',subjects:'Computer Networks, CN Lab',load:12},
    {id:'F004',name:'Prof. A. Singh',dept:'IT', subjects:'Web Technologies, Web Lab',load:12},
    {id:'F005',name:'Dr. P. Kumar',  dept:'MECH',subjects:'Fluid Mechanics',load:10},
  ]
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Faculty Directory</div><button className="btn-primary">+ Add Faculty</button></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Name</th><th>Dept</th><th>Subjects</th><th>Weekly Load</th><th></th></tr></thead>
          <tbody>
            {faculty.map(f => (
              <tr key={f.id}>
                <td style={{fontSize:12,color:'var(--accent)',fontWeight:600}}>{f.id}</td>
                <td className="primary">{f.name}</td>
                <td><span className="pill blue">{f.dept}</span></td>
                <td style={{color:'var(--text2)',fontSize:12}}>{f.subjects}</td>
                <td><span className="pill green">{f.load} hrs</span></td>
                <td><span className="card-action" style={{fontSize:11}}>View</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Reports() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      {[
        {title:'Attendance Report',desc:'Branch-wise, semester-wise attendance summary',icon:'📊',color:'blue'},
        {title:'Defaulter List',   desc:'Students below 75% attendance threshold',       icon:'⚠', color:'red'},
        {title:'Subject Analysis', desc:'Per-subject attendance and performance',         icon:'📋',color:'green'},
        {title:'Faculty Report',   desc:'Classes conducted vs scheduled per faculty',     icon:'👥',color:'amber'},
      ].map(r => (
        <div key={r.title} className={`stat-card ${r.color}`} style={{cursor:'pointer'}}>
          <div className={`stat-icon ${r.color}`} style={{fontSize:20}}>{r.icon}</div>
          <div className="card-title" style={{marginBottom:6}}>{r.title}</div>
          <div style={{fontSize:13,color:'var(--text2)'}}>{r.desc}</div>
          <div style={{marginTop:14}}><span className="card-action">Generate →</span></div>
        </div>
      ))}
    </div>
  )
}

function Settings() {
  return (
    <div className="card">
      <div className="card-title" style={{marginBottom:20}}>System Settings</div>
      <div style={{display:'flex',flexDirection:'column',gap:16,maxWidth:500}}>
        {[
          {label:'College Name',val:'VIT Engineering College, Nagpur'},
          {label:'Academic Year',val:'2024–25'},
          {label:'Minimum Attendance %',val:'75'},
          {label:'Current Semester',val:'5 (Odd)'},
        ].map(s => (
          <div key={s.label}>
            <div style={{fontSize:12,color:'var(--text3)',marginBottom:6,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>{s.label}</div>
            <input className="input-field" defaultValue={s.val} />
          </div>
        ))}
        <button className="btn-primary" style={{marginTop:8,alignSelf:'flex-start'}}>Save Settings</button>
      </div>
    </div>
  )
}
