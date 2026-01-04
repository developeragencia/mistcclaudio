import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Header.css'

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const getDashboardLink = () => {
    if (user?.tipo === 'admin') return '/admin'
    if (user?.tipo === 'consultor') return '/consultor'
    if (user?.tipo === 'cliente') return '/cliente'
    return '/'
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="Conselhos Esotéricos" className="logo-img" />
            <span className="logo-text">Conselhos Esotéricos</span>
          </Link>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/consultores" onClick={() => setMenuOpen(false)}>Consultores</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
            <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>

            {isAuthenticated ? (
              <>
                <Link to={getDashboardLink()} onClick={() => setMenuOpen(false)} className="btn-dashboard">
                  Painel
                </Link>
                <button onClick={handleLogout} className="btn-logout">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-login">
                  Entrar
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-register">
                  Cadastrar
                </Link>
              </>
            )}
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

