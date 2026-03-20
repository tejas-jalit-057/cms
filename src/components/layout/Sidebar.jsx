import { useNavigate } from 'react-router-dom'

const roleColors = {
  admin:   { color: '#4f7eff', bg: 'rgba(79,126,255,0.15)' },
  faculty: { color: '#10d9a0', bg: 'rgba(16,217,160,0.15)' },
  student: { color: '#f9a825', bg: 'rgba(249,168,37,0.15)' },
}

export default function Sidebar({ role, name, subtitle, initials, navItems, activeSection, onSectionChange }) {
  const navigate = useNavigate()
  const { color, bg } = roleColors[role]

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">E</div>
          <div>
            <div className="logo-text">EduSmart</div>
            <div className="logo-sub">CMS Portal</div>
          </div>
        </div>
      </div>

      <div className="role-badge">
        <div className="role-avatar" style={{ background: bg, color }}>
          {initials}
        </div>
        <div>
          <div className="role-name">{name}</div>
          <div className="role-label" style={{ color }}>{subtitle}</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-section-label">Navigation</div>
        {navItems.map(item => (
          <div
            key={item.path}
            className={`nav-item ${activeSection === item.path ? 'active' : ''}`}
            onClick={() => onSectionChange(item.path)}
          >
            <span style={{ fontSize: 16, width: 18, textAlign: 'center' }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="logout-btn" onClick={() => navigate('/')}>
          <span style={{ fontSize: 16 }}>⎋</span>
          <span>Switch Role</span>
        </div>
      </div>
    </div>
  )
}
