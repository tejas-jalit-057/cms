import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { icon: '⊞', label: 'Overview',        path: 'overview' },
  { icon: '✓', label: 'Mark Attendance', path: 'attendance', badge: 2 },
  { icon: '📚', label: 'My Subjects',    path: 'subjects' },
  { icon: '🗓', label: 'Timetable',      path: 'timetable' },
  { icon: '📁', label: 'Materials',      path: 'materials' },
  { icon: '📊', label: 'Reports',        path: 'reports' },
]

const students = [
  { roll:'CS21001', name:'Arjun Sharma',   att:92 },
  { roll:'CS21002', name:'Priya Patel',    att:78 },
  { roll:'CS21003', name:'Rahul Mehta',    att:64 },
  { roll:'CS21004', name:'Ananya Nair',    att:95 },
  { roll:'CS21005', name:'Aditya Verma',   att:85 },
  { roll:'CS21006', name:'Meera Joshi',    att:73 },
  { roll:'CS21007', name:'Ravi Nair',      att:68 },
  { roll:'CS21008', name:'Shreya Singh',   att:90 },
  { roll:'CS21009', name:'Karan Malhotra', att:82 },
  { roll:'CS21010', name:'Divya Reddy',    att:77 },
  { roll:'CS21011', name:'Nitin Kulkarni', att:58 },
  { roll:'CS21012', name:'Pooja Mishra',   att:96 },
]

export default function FacultyDashboard() {
  const [section, setSection] = useState('overview')
  return (
    <div className="layout">
      <Sidebar role="faculty" name="Prof. R. Sharma" subtitle="Faculty – CSE" initials="RS" navItems={navItems} activeSection={section} onSectionChange={setSection} />
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <h1>{navItems.find(n => n.path === section)?.label}</h1>
            <p>CSE Department · Data Structures & Algorithms · Sem 5</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-btn">🔔<div className="notif-dot" /></div>
            <div className="topbar-avatar" style={{background:'linear-gradient(135deg,#10d9a0,#059669)'}}>RS</div>
          </div>
        </div>
        <div className="page-content">
          {section === 'overview'   && <Overview onGo={setSection} />}
          {section === 'attendance' && <MarkAttendance />}
          {section === 'subjects'   && <Subjects />}
          {section === 'timetable'  && <Timetable />}
          {section === 'materials'  && <Materials />}
          {section === 'reports'    && <Reports />}
        </div>
      </div>
    </div>
  )
}

function Overview({ onGo }) {
  const today = [
    {time:'9:00 AM', sub:'Data Structures',    room:'A101',branch:'CSE Sem 5',color:'#4f7eff',marked:true},
    {time:'11:00 AM',sub:'Algorithms',          room:'A102',branch:'CSE Sem 6',color:'#10d9a0',marked:false},
    {time:'2:00 PM', sub:'Data Structures Lab', room:'Lab-1',branch:'CSE Sem 5',color:'#f9a825',marked:false},
  ]
  return (
    <>
      <div className="stats-grid">
        {[
          {label:'My Subjects',  value:'3',   icon:'📚',color:'blue'},
          {label:'Students',     value:'120',  icon:'👥',color:'green'},
          {label:'Classes Today',value:'3',   icon:'🗓',color:'amber'},
          {label:'At-Risk (DS)', value:'4',   icon:'⚠', color:'red'},
        ].map((s,i) => (
          <div key={s.label} className={`stat-card ${s.color} delay-${i+1}`}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid-6040">
        <div className="card">
          <div className="card-header">
            <div><div className="card-title">Today's Classes</div><div className="card-subtitle">Thursday, March 19</div></div>
            <span className="card-action" onClick={() => onGo('attendance')}>Mark All →</span>
          </div>
          {today.map(c => (
            <div key={c.time} className="schedule-item">
              <div className="schedule-time">{c.time}</div>
              <div className="schedule-dot" style={{background:c.color}} />
              <div className="schedule-info"><div className="schedule-sub">{c.sub}</div><div className="schedule-room">{c.branch} · {c.room}</div></div>
              <span className={`pill ${c.marked?'green':'amber'}`}>{c.marked?'✓ Marked':'Pending'}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><div><div className="card-title">DS Attendance</div><div className="card-subtitle">Data Structures – CSE 5</div></div></div>
          <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
            <div className="att-ring">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg4)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#4f7eff" strokeWidth="8"
                  strokeDasharray={`${2*Math.PI*40*0.82} ${2*Math.PI*40}`} strokeLinecap="round" />
              </svg>
              <div className="att-ring-val"><div className="att-ring-pct">82%</div><div className="att-ring-lbl">avg</div></div>
            </div>
          </div>
          {[{label:'Classes held',val:'28'},{label:'Avg present',val:'24'},{label:'Below 75%',val:'4',hl:true}].map(r => (
            <div key={r.label} style={{display:'flex',justifyContent:'space-between',fontSize:13,padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
              <span style={{color:'var(--text2)'}}>{r.label}</span>
              <span style={{fontWeight:600,color:r.hl?'var(--red)':'var(--text)'}}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="card-title" style={{marginBottom:14}}>Quick Actions</div>
        <div className="quick-actions">
          {[
            {icon:'✓',label:'Mark Attendance',color:'#10d9a0',bg:'rgba(16,217,160,0.1)',action:'attendance'},
            {icon:'📁',label:'Upload Notes',  color:'#4f7eff',bg:'rgba(79,126,255,0.1)',action:'materials'},
            {icon:'📊',label:'View Report',   color:'#f9a825',bg:'rgba(249,168,37,0.1)',action:'reports'},
            {icon:'📚',label:'My Subjects',   color:'#a855f7',bg:'rgba(168,85,247,0.1)',action:'subjects'},
          ].map(a => (
            <div key={a.label} className="qa-btn" onClick={() => onGo(a.action)}>
              <div className="qa-icon" style={{background:a.bg,color:a.color,fontSize:20}}>{a.icon}</div>
              <div className="qa-label">{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function MarkAttendance() {
  const [statuses, setStatuses] = useState(() => Object.fromEntries(students.map(s => [s.roll, null])))
  const [submitted, setSubmitted] = useState(false)

  const presentCount = Object.values(statuses).filter(v => v === 'present').length
  const absentCount  = Object.values(statuses).filter(v => v === 'absent').length
  const total = students.length

  const toggle = (roll, val) => setStatuses(prev => ({...prev, [roll]: prev[roll] === val ? null : val}))
  const markAll = val => setStatuses(Object.fromEntries(students.map(s => [s.roll, val])))

  return (
    <div className="card">
      <div className="card-header">
        <div><div className="card-title">Mark Attendance</div><div className="card-subtitle">Thursday, March 19 · 9:00 AM</div></div>
        <select className="input-field" style={{width:220}}>
          <option>CS501 – Data Structures</option>
          <option>CS601 – Algorithms</option>
          <option>CS501L – DS Lab</option>
        </select>
      </div>

      <div style={{display:'flex',gap:12,marginBottom:16,padding:12,background:'var(--bg3)',borderRadius:10}}>
        {[{l:'Total',v:total,c:'var(--text)'},{l:'Present',v:presentCount,c:'var(--green)'},{l:'Absent',v:absentCount,c:'var(--red)'},{l:'Unmarked',v:total-presentCount-absentCount,c:'var(--text2)'}].map(s => (
          <div key={s.l} style={{flex:1,textAlign:'center'}}>
            <div style={{fontFamily:'Syne,sans-serif',fontSize:22,fontWeight:700,color:s.c}}>{s.v}</div>
            <div style={{fontSize:11,color:'var(--text3)'}}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,marginBottom:14}}>
        <button onClick={() => markAll('present')} style={{padding:'7px 14px',fontSize:12,fontWeight:600,background:'rgba(16,217,160,0.1)',border:'1px solid rgba(16,217,160,0.3)',borderRadius:8,color:'var(--green)',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>✓ All Present</button>
        <button onClick={() => markAll('absent')}  style={{padding:'7px 14px',fontSize:12,fontWeight:600,background:'rgba(255,77,109,0.1)', border:'1px solid rgba(255,77,109,0.3)', borderRadius:8,color:'var(--red)',  cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>✗ All Absent</button>
        <button onClick={() => markAll(null)}      style={{padding:'7px 14px',fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,color:'var(--text2)',cursor:'pointer',fontFamily:'DM Sans,sans-serif'}}>Reset</button>
      </div>

      <div className="att-mark-grid">
        {students.map(s => {
          const st = statuses[s.roll]
          return (
            <div key={s.roll} className={`att-mark-card ${st==='present'?'present':st==='absent'?'absent':''}`}>
              <div style={{width:32,height:32,borderRadius:'50%',background:'var(--bg4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,color:'var(--text2)',flexShrink:0}}>
                {s.name.split(' ').map(w => w[0]).join('').slice(0,2)}
              </div>
              <div><div className="att-mark-name">{s.name}</div><div className="att-mark-roll">{s.roll}</div></div>
              <div className="att-toggle">
                <button className={`att-t-btn ${st==='present'?'p-active':''}`} onClick={() => toggle(s.roll,'present')}>P</button>
                <button className={`att-t-btn ${st==='absent'?'a-active':''}`}  onClick={() => toggle(s.roll,'absent')}>A</button>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{marginTop:20,display:'flex',gap:10,alignItems:'center'}}>
        <button className="btn-primary" onClick={() => setSubmitted(true)}>{submitted?'✓ Submitted':'Submit Attendance'}</button>
        {submitted && <span style={{fontSize:13,color:'var(--green)'}}>Saved successfully</span>}
      </div>
    </div>
  )
}

function Subjects() {
  return (
    <div className="grid-3">
      {[
        {code:'CS501', name:'Data Structures',students:62,classes:28,att:'82%',color:'#4f7eff',branch:'CSE Sem 5'},
        {code:'CS601', name:'Algorithms',      students:58,classes:24,att:'79%',color:'#10d9a0',branch:'CSE Sem 6'},
        {code:'CS501L',name:'DS Lab',          students:32,classes:14,att:'87%',color:'#f9a825',branch:'CSE Sem 5'},
      ].map(s => (
        <div key={s.code} className="card" style={{borderTop:`3px solid ${s.color}`}}>
          <div style={{fontSize:11,color:'var(--text3)',fontWeight:600,marginBottom:4}}>{s.code}</div>
          <div style={{fontFamily:'Syne,sans-serif',fontSize:17,fontWeight:700,color:'var(--text)',marginBottom:4}}>{s.name}</div>
          <div style={{fontSize:12,color:'var(--text2)',marginBottom:16}}>{s.branch}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,textAlign:'center'}}>
            {[{l:'Students',v:s.students},{l:'Classes',v:s.classes},{l:'Avg Att',v:s.att}].map(r => (
              <div key={r.l} style={{background:'var(--bg3)',borderRadius:8,padding:'8px 4px'}}>
                <div style={{fontFamily:'Syne,sans-serif',fontSize:16,fontWeight:700,color:s.color}}>{r.v}</div>
                <div style={{fontSize:10,color:'var(--text3)'}}>{r.l}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Timetable() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat']
  const schedule = {
    Mon:['Data Structures – A101','','Algorithms – A102',''],
    Tue:['','Algorithms – A102','','DS Lab – Lab1'],
    Wed:['Data Structures – A101','','','DS Lab – Lab1'],
    Thu:['Data Structures – A101','Algorithms – A102','',''],
    Fri:['','Data Structures – A101','Algorithms – A102',''],
    Sat:['','','',''],
  }
  const times = ['9:00 AM','11:00 AM','2:00 PM','4:00 PM']
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">My Weekly Timetable</div><span className="pill green">Mar 18–23</span></div>
      <div style={{display:'grid',gridTemplateColumns:'80px repeat(6,1fr)',gap:6}}>
        <div />
        {days.map(d => <div key={d} style={{textAlign:'center',fontSize:11,fontWeight:600,color:'var(--text3)',padding:6,textTransform:'uppercase',letterSpacing:'0.06em'}}>{d}</div>)}
        {times.map((t,ti) => (
          <>
            <div key={`t-${t}`} style={{fontSize:11,color:'var(--text3)',display:'flex',alignItems:'center',justifyContent:'flex-end',paddingRight:8}}>{t}</div>
            {days.map(d => {
              const cell = schedule[d]?.[ti] || ''
              const [sub,room] = cell.split(' – ')
              return (
                <div key={`${t}-${d}`} className={`tt-slot ${cell?'blue-slot':''}`} style={{minHeight:55}}>
                  {cell && <><div className="sub-name">{sub}</div><div className="sub-room">{room}</div></>}
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}

function Materials() {
  return (
    <>
      <div className="card" style={{marginBottom:14}}>
        <div className="card-title" style={{marginBottom:14}}>Upload Study Material</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
          <select className="input-field"><option>CS501 – Data Structures</option><option>CS601 – Algorithms</option></select>
          <input className="input-field" placeholder="Title / Chapter name" />
          <input className="input-field" placeholder="Description (optional)" style={{gridColumn:'1 / -1'}} />
        </div>
        <div style={{border:'2px dashed var(--border2)',borderRadius:10,padding:28,textAlign:'center',marginBottom:12,cursor:'pointer'}}>
          <div style={{fontSize:28,marginBottom:8}}>📎</div>
          <div style={{fontSize:13,color:'var(--text2)'}}>Drop files here or click to upload</div>
          <div style={{fontSize:11,color:'var(--text3)',marginTop:4}}>PDF, DOCX, PPTX up to 50MB</div>
        </div>
        <button className="btn-primary">Upload Material</button>
      </div>
      <div className="card">
        <div className="card-title" style={{marginBottom:14}}>Uploaded Materials</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Subject</th><th>Type</th><th>Date</th><th></th></tr></thead>
            <tbody>
              {[
                {title:'Unit 1 – Arrays & Linked Lists',sub:'Data Structures',type:'PDF',date:'Mar 10'},
                {title:'Unit 2 – Stacks & Queues',      sub:'Data Structures',type:'PDF',date:'Mar 14'},
                {title:'Sorting Algorithms – Slides',   sub:'Algorithms',     type:'PPTX',date:'Mar 16'},
                {title:'DS Lab Manual 2024',            sub:'DS Lab',         type:'PDF',date:'Mar 1'},
              ].map(m => (
                <tr key={m.title}>
                  <td className="primary">📄 {m.title}</td>
                  <td style={{color:'var(--text2)',fontSize:12}}>{m.sub}</td>
                  <td><span className="pill blue">{m.type}</span></td>
                  <td style={{color:'var(--text3)',fontSize:12}}>{m.date}</td>
                  <td><span className="card-action" style={{fontSize:11}}>Delete</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Reports() {
  return (
    <div className="card">
      <div className="card-header"><div><div className="card-title">Data Structures – Attendance Report</div><div className="card-subtitle">CSE Sem 5 · 28 classes</div></div><span className="card-action">Export CSV</span></div>
      <div className="att-mark-grid">
        {students.map(s => (
          <div key={s.roll} className="att-mark-card">
            <div style={{width:32,height:32,borderRadius:'50%',background:s.att>=75?'rgba(16,217,160,0.15)':'rgba(255,77,109,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,color:s.att>=75?'var(--green)':'var(--red)',flexShrink:0}}>
              {s.name.split(' ').map(w => w[0]).join('').slice(0,2)}
            </div>
            <div style={{flex:1}}>
              <div className="att-mark-name">{s.name}</div>
              <div className="att-mark-roll">{s.roll}</div>
              <div className="progress-bar" style={{marginTop:5}}>
                <div className="progress-fill" style={{width:`${s.att}%`,background:s.att>=75?'var(--green)':'var(--red)'}} />
              </div>
            </div>
            <div style={{fontFamily:'Syne,sans-serif',fontSize:16,fontWeight:700,color:s.att>=75?'var(--green)':'var(--red)'}}>{s.att}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
