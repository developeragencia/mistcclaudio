import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email, senha)
    
    if (result.success) {
      // Redirecionar conforme tipo de usuário
      if (result.user.tipo === 'admin') {
        navigate('/admin')
      } else if (result.user.tipo === 'consultor') {
        navigate('/consultor')
      } else {
        navigate('/cliente')
      }
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Entrar</h1>
            <p>Faça login para acessar sua conta</p>
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Sua senha"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta? <Link to="/register">Cadastre-se</Link>
            </p>
            <p>
              <Link to="/">Esqueceu sua senha?</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

