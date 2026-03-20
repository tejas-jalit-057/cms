import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const roles = [
  {
    key: 'admin', label: 'Super Admin', desc: 'HOD / Principal',
    icon: '⬡', color: '#4f7eff', bg: 'rgba(79,126,255,0.1)', border: 'rgba(79,126,255,0.3)', path: '/admin',
    features: ['Manage branches & subjects', 'View all attendance', 'Generate reports', 'Manage faculty & students'],
  },
  {
    key: 'faculty', label: 'Faculty', desc: 'Professor / Lecturer',
    icon: '◈', color: '#10d9a0', bg: 'rgba(16,217,160,0.1)', border: 'rgba(16,217,160,0.3)', path: '/faculty',
    features: ['Mark class attendance', 'Manage subjects', 'Upload study material', 'View student reports'],
  },
  {
    key: 'student', label: 'Student', desc: 'Enrolled student',
    icon: '◇', color: '#f9a825', bg: 'rgba(249,168,37,0.1)', border: 'rgba(249,168,37,0.3)', path: '/student',
    features: ['View attendance %', 'Check timetable', 'Download materials', 'See subject-wise status'],
  },
]

export default function Landing() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(79,126,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '52px', animation: 'fadeUp 0.5s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, #4f7eff, #6366f1)',
            borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: 'white',
          }}>E</div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 26, color: 'var(--text)' }}>EduSmart CMS</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
              Engineering College Management System
            </div>
          </div>
        </div>
        <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 420, lineHeight: 1.6 }}>
          Select your role to enter your personalized dashboard
        </p>
      </div>

      {/* Role cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 16 }}>
        {roles.map((role, i) => (
          <div
            key={role.key}
            onClick={() => navigate(role.path)}
            onMouseEnter={() => setHovered(role.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === role.key ? role.bg : 'var(--card)',
              border: `1px solid ${hovered === role.key ? role.border : 'var(--border)'}`,
              borderRadius: 18, padding: 28, cursor: 'pointer',
              transition: 'all 0.25s',
              transform: hovered === role.key ? 'translateY(-4px)' : 'none',
              animation: `fadeUp 0.4s ease ${i * 0.1}s both`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, background: role.bg,
                border: `1px solid ${role.border}`, borderRadius: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, color: role.color,
              }}>{role.icon}</div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>{role.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{role.desc}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
              {role.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: role.color, flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: hovered === role.key ? role.bg : 'var(--bg3)',
              border: `1px solid ${hovered === role.key ? role.border : 'var(--border)'}`,
              borderRadius: 10, padding: '10px 14px', transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 13, color: hovered === role.key ? role.color : 'var(--text2)', fontWeight: 500 }}>
                Enter as {role.label}
              </span>
              <span style={{ color: role.color, fontSize: 18 }}>→</span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 36, fontSize: 12, color: 'var(--text3)', animation: 'fadeUp 0.4s ease 0.4s both' }}>
        Demo mode — click any role to explore the dashboard
      </p>
    </div>
  )
}
