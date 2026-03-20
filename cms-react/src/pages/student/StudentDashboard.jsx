import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'

const navItems = [
  { icon: '⊞', label: 'Overview',   path: 'overview' },
  { icon: '✓', label: 'Attendance', path: 'attendance' },
  { icon: '🗓', label: 'Timetable', path: 'timetable' },
  { icon: '📚', label: 'Subjects',  path: 'subjects' },
  { icon: '📁', label: 'Materials', path: 'materials' },
  { icon: '🔔', label: 'Notices',   path: 'notices', badge: 2 },
]

const subjectAtt = [
  { code:'CS501',  name:'Data Structures',   faculty:'Dr. R. Sharma',  held:28, attended:26, color:'#4f7eff' },
  { code:'CS502',  name:'Operating Systems', faculty:'Prof. M. Gupta', held:24, attended:18, color:'#10d9a0' },
  { code:'CS503',  name:'Computer Networks', faculty:'Dr. S. Verma',   held:22, attended:20, color:'#f9a825' },
  { code:'CS504',  name:'Web Technologies',  faculty:'Prof. A. Singh', held:20, attended:17, color:'#a855f7' },
  { code:'CS501L', name:'DS Lab',            faculty:'Dr. R. Sharma',  held:14, attended:14, color:'#10d9a0' },
  { code:'CS502L', name:'OS Lab',            faculty:'Prof. M. Gupta', held:14, attended:10, color:'#ef4444' },
]

const timetableData = {
  Mon:[{sub:'Data Structures',room:'A101',time:'9:00–10:00',color:'#4f7eff'},{sub:'Operating Systems',room:'A102',time:'11:00–12:00',color:'#10d9a0'},{sub:'Computer Networks',room:'A101',time:'2:00–3:00',color:'#f9a825'}],
  Tue:[{sub:'OS Lab',room:'Lab-2',time:'9:00–12:00',color:'#10d9a0'},{sub:'Web Technologies',room:'B201',time:'2:00–3:00',color:'#a855f7'}],
  Wed:[{sub:'Data Structures',room:'A101',time:'9:00–10:00',color:'#4f7eff'},{sub:'DS Lab',room:'Lab-1',time:'11:00–1:00',color:'#4f7eff'},{sub:'Operating Systems',room:'A102',time:'2:00–3:00',color:'#10d9a0'}],
  Thu:[{sub:'Data Structures',room:'A101',time:'9:00–10:00',color:'#4f7eff'},{sub:'Computer Networks',room:'A101',time:'11:00–12:00',color:'#f9a825'}],
  Fri:[{sub:'Web Technologies',room:'B201',time:'9:00–10:00',color:'#a855f7'},{sub:'Operating Systems',room:'A102',time:'11:00–12:00',color:'#10d9a0'},{sub:'Data Structures',room:'A101',time:'2:00–3:00',color:'#4f7eff'}],
}

export default function StudentDashboard() {
  const [section, setSection] = useState('overview')
  return (
    <div className="layout">
      <Sidebar role="student" name="Arjun Sharma" subtitle="CSE Sem 5" initials="AS" navItems={navItems} activeSection={section} onSectionChange={setSection} />
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <h1>{navItems.find(n => n.path === section)?.label}</h1>
            <p>Roll: CS21001 · CSE Branch · Semester 5 · 2024–25</p>
          </div>
          <div className="topbar-right">
            <div className="topbar-btn">🔔<div className="notif-dot" /></div>
            <div className="topbar-avatar" style={{background:'linear-gradient(135deg,#f9a825,#ef6c00)'}}>AS</div>
          </div>
        </div>
        <div className="page-content">
          {section === 'overview'   && <Overview onGo={setSection} />}
          {section === 'attendance' && <Attendance />}
          {section === 'timetable'  && <TimetableView />}
          {section === 'subjects'   && <Subjects />}
          {section === 'materials'  && <Materials />}
          {section === 'notices'    && <Notices />}
        </div>
      </div>
    </div>
  )
}

function Overview({ onGo }) {
  const overall = Math.round(subjectAtt.reduce((a,s) => a + (s.attended/s.held*100), 0) / subjectAtt.length)
  const todayClasses = [
    {time:'9:00 AM', sub:'Data Structures',  room:'A101',faculty:'Dr. R. Sharma', color:'#4f7eff'},
    {time:'11:00 AM',sub:'Computer Networks',room:'A101',faculty:'Dr. S. Verma',  color:'#f9a825'},
  ]
  return (
    <>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
        {[
          {label:'Overall Attendance',value:`${overall}%`,color:overall>=75?'green':'red',icon:'✓'},
          {label:'Subjects Enrolled', value:'6',           color:'blue',  icon:'📚'},
          {label:'Classes Today',     value:'2',           color:'amber', icon:'🗓'},
          {label:'Low Attendance',    value:'1',           color:'red',   icon:'⚠'},
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
            <div><div className="card-title">Attendance by Subject</div><div className="card-subtitle">Sem 5 · 2024–25</div></div>
            <span className="card-action" onClick={() => onGo('attendance')}>Details →</span>
          </div>
          {subjectAtt.map(s => {
            const pct = Math.round(s.attended/s.held*100)
            return (
              <div key={s.code} className="sub-progress-item">
                <div className="sub-progress-header">
                  <div className="sub-progress-name">{s.name}</div>
                  <span style={{fontWeight:600,color:pct>=75?'var(--green)':'var(--red)'}}>{pct}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`,background:s.color}} /></div>
                <div style={{fontSize:11,color:'var(--text3)',marginTop:4}}>{s.attended}/{s.held} classes</div>
              </div>
            )
          })}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card" style={{textAlign:'center'}}>
            <div className="card-title" style={{marginBottom:14}}>Overall</div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:12}}>
              <div className="att-ring">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg4)" strokeWidth="9" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke={overall>=75?'#10d9a0':'#ff4d6d'}
                    strokeWidth="9" strokeDasharray={`${2*Math.PI*40*overall/100} ${2*Math.PI*40}`} strokeLinecap="round" />
                </svg>
                <div className="att-ring-val"><div className="att-ring-pct">{overall}%</div><div className="att-ring-lbl">attended</div></div>
              </div>
            </div>
            <div style={{fontSize:12,color:overall>=75?'var(--green)':'var(--red)',fontWeight:500}}>
              {overall>=75?'✓ Above minimum threshold':'⚠ Below 75% minimum'}
            </div>
          </div>
          <div className="card">
            <div className="card-title" style={{marginBottom:12}}>Today – Thu Mar 19</div>
            {todayClasses.map(c => (
              <div key={c.time} className="schedule-item">
                <div className="schedule-time">{c.time}</div>
                <div className="schedule-dot" style={{background:c.color}} />
                <div className="schedule-info"><div className="schedule-sub">{c.sub}</div><div className="schedule-room">{c.faculty} · {c.room}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="card-title">Recent Notices</div><span className="card-action" onClick={() => onGo('notices')}>All →</span></div>
        {[
          {title:'Mid-semester exams – April 5–12',time:'2 hrs ago',tag:'Exam',read:false},
          {title:'Unit 2 notes uploaded – Data Structures',time:'Today',tag:'Material',read:false},
          {title:'Holiday on March 25 – Holi',time:'Yesterday',tag:'Holiday',read:true},
        ].map(n => (
          <div key={n.title} className="announcement-item">
            <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
              {!n.read && <div style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)',marginTop:5,flexShrink:0}} />}
              <div style={{marginLeft:n.read?16:0}}>
                <div className="ann-title">{n.title}</div>
                <div className="ann-meta">
                  <span className={`pill ${n.tag==='Exam'?'red':n.tag==='Material'?'green':'amber'}`} style={{fontSize:10}}>{n.tag}</span>
                  <div className="ann-dot"/><span>{n.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Attendance() {
  const overall = Math.round(subjectAtt.reduce((a,s) => a+(s.attended/s.held*100),0)/subjectAtt.length)
  return (
    <>
      <div className="stats-grid" style={{gridTemplateColumns:'repeat(3,1fr)',marginBottom:16}}>
        <div className={`stat-card ${overall>=75?'green':'red'}`}><div className="stat-value">{overall}%</div><div className="stat-label">Overall Attendance</div></div>
        <div className="stat-card blue"><div className="stat-value">{subjectAtt.reduce((a,s)=>a+s.held,0)}</div><div className="stat-label">Total Classes Held</div></div>
        <div className="stat-card amber"><div className="stat-value">{subjectAtt.reduce((a,s)=>a+s.attended,0)}</div><div className="stat-label">Classes Attended</div></div>
      </div>
      {subjectAtt.map(s => {
        const pct = Math.round(s.attended/s.held*100)
        const needed75 = Math.max(0, Math.ceil((0.75*s.held - s.attended)/0.25))
        const safe = Math.floor(s.attended - 0.75*s.held)
        return (
          <div key={s.code} className="card" style={{marginBottom:12,borderLeft:`3px solid ${s.color}`}}>
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <div>
                    <span style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:15,color:'var(--text)'}}>{s.name}</span>
                    <span style={{fontSize:11,color:'var(--text3)',marginLeft:8}}>{s.code}</span>
                  </div>
                  <span style={{fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:20,color:pct>=75?'var(--green)':'var(--red)'}}>{pct}%</span>
                </div>
                <div style={{fontSize:12,color:'var(--text2)',marginBottom:8}}>{s.faculty}</div>
                <div className="progress-bar" style={{height:6,marginBottom:8}}><div className="progress-fill" style={{width:`${pct}%`,background:s.color}} /></div>
                <div style={{display:'flex',gap:20,fontSize:12}}>
                  <span style={{color:'var(--text2)'}}>Attended: <strong style={{color:'var(--text)'}}>{s.attended}/{s.held}</strong></span>
                  {pct < 75
                    ? <span style={{color:'var(--red)'}}>Need <strong>{needed75}</strong> more to reach 75%</span>
                    : <span style={{color:'var(--green)'}}>Can miss <strong>{safe}</strong> more class{safe!==1?'es':''}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

function TimetableView() {
  const days = ['Mon','Tue','Wed','Thu','Fri']
  const today = 'Thu'
  return (
    <div className="card">
      <div className="card-header"><div className="card-title">Weekly Timetable – CSE Sem 5</div><span className="pill amber">Today: Thursday</span></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>
        {days.map(day => (
          <div key={day} style={{background:day===today?'rgba(79,126,255,0.05)':'var(--bg3)',border:`1px solid ${day===today?'rgba(79,126,255,0.25)':'var(--border)'}`,borderRadius:12,overflow:'hidden'}}>
            <div style={{padding:'10px 12px',borderBottom:'1px solid var(--border)',fontSize:12,fontWeight:600,color:day===today?'var(--accent)':'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',background:day===today?'rgba(79,126,255,0.08)':'transparent'}}>{day}</div>
            <div style={{padding:8}}>
              {(timetableData[day]||[]).map(c => (
                <div key={c.time} style={{background:`${c.color}14`,border:`1px solid ${c.color}33`,borderRadius:8,padding:8,marginBottom:6}}>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--text)',marginBottom:2}}>{c.sub}</div>
                  <div style={{fontSize:10,color:'var(--text3)'}}>{c.time}</div>
                  <div style={{fontSize:10,color:'var(--text3)'}}>{c.room}</div>
                </div>
              ))}
              {!timetableData[day]?.length && <div style={{textAlign:'center',padding:'20px 0',fontSize:12,color:'var(--text3)'}}>No classes</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Subjects() {
  return (
    <div className="grid-2">
      {subjectAtt.map(s => {
        const pct = Math.round(s.attended/s.held*100)
        return (
          <div key={s.code} className="card" style={{borderTop:`3px solid ${s.color}`}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <span style={{fontSize:11,color:'var(--text3)',fontWeight:600}}>{s.code}</span>
              <span className={`pill ${pct>=75?'green':'red'}`}>{pct}%</span>
            </div>
            <div style={{fontFamily:'Syne,sans-serif',fontSize:16,fontWeight:700,color:'var(--text)',marginBottom:4}}>{s.name}</div>
            <div style={{fontSize:12,color:'var(--text2)',marginBottom:12}}>{s.faculty}</div>
            <div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`,background:s.color}} /></div>
            <div style={{fontSize:11,color:'var(--text3)',marginTop:6}}>{s.attended} of {s.held} classes attended</div>
          </div>
        )
      })}
    </div>
  )
}

function Materials() {
  return (
    <div className="card">
      <div className="card-title" style={{marginBottom:14}}>Study Materials</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {[
          {name:'Unit 1 – Arrays & Linked Lists',sub:'Data Structures', type:'PDF', size:'2.4 MB',date:'Mar 10',color:'#4f7eff'},
          {name:'Unit 2 – Stacks & Queues',      sub:'Data Structures', type:'PDF', size:'1.8 MB',date:'Mar 14',color:'#4f7eff'},
          {name:'Sorting Algorithms – Slides',   sub:'Algorithms',      type:'PPTX',size:'5.1 MB',date:'Mar 16',color:'#a855f7'},
          {name:'OS Unit 1 Notes',               sub:'Operating Systems',type:'PDF', size:'3.2 MB',date:'Mar 8', color:'#10d9a0'},
          {name:'DS Lab Manual 2024',            sub:'DS Lab',          type:'PDF', size:'1.1 MB',date:'Mar 1', color:'#f9a825'},
        ].map(m => (
          <div key={m.name} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 14px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:10,cursor:'pointer'}}>
            <div style={{width:36,height:36,borderRadius:8,background:`${m.color}18`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>📄</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:2}}>{m.name}</div>
              <div style={{fontSize:11,color:'var(--text3)'}}>{m.sub} · {m.type} · {m.size}</div>
            </div>
            <div style={{fontSize:11,color:'var(--text3)'}}>{m.date}</div>
            <span className="card-action" style={{fontSize:11}}>↓ Download</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Notices() {
  return (
    <div className="card">
      <div className="card-title" style={{marginBottom:14}}>Notices & Announcements</div>
      {[
        {title:'Mid-semester exams – April 5–12',body:'Exams will be held from April 5 to 12. Check your timetable for exact slot details.',time:'2 hrs ago',tag:'Exam',read:false},
        {title:'Unit 2 notes uploaded – Data Structures',body:'Dr. R. Sharma has uploaded Unit 2 study material. Download from the Materials section.',time:'Today, 10:30 AM',tag:'Material',read:false},
        {title:'Holiday on March 25 – Holi',body:'The college will remain closed on March 25 on account of the Holi festival.',time:'Yesterday',tag:'Holiday',read:true},
        {title:'Internal marks submission – March 25 deadline',body:'Faculty are requested to submit Unit Test 1 marks by March 25. Results will be published shortly.',time:'2 days ago',tag:'General',read:true},
      ].map(n => (
        <div key={n.title} className="announcement-item" style={{paddingTop:14,paddingBottom:14}}>
          <div style={{display:'flex',gap:10}}>
            {!n.read && <div style={{width:7,height:7,borderRadius:'50%',background:'var(--accent)',marginTop:5,flexShrink:0}} />}
            <div style={{marginLeft:n.read?17:0}}>
              <div className="ann-title" style={{marginBottom:6}}>{n.title}</div>
              <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.5,marginBottom:8}}>{n.body}</div>
              <div className="ann-meta">
                <span className={`pill ${n.tag==='Exam'?'red':n.tag==='Material'?'green':n.tag==='Holiday'?'amber':'blue'}`} style={{fontSize:10}}>{n.tag}</span>
                <div className="ann-dot"/><span>{n.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
