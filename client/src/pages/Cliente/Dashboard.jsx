import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

const ClienteDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/clientes/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container" style={{ padding: '40px 20px', background: 'var(--cor-cinza-claro)', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1>Bem-vindo, {user?.nome}!</h1>
          <Link to="/cliente/agendar" className="btn btn-primary">Nova Consulta</Link>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div className="card">
              <h3>Total de Consultas</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cor-roxo-mistico)' }}>
                {stats.total_consultas || 0}
              </p>
            </div>
            <div className="card">
              <h3>Consultas Pendentes</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cor-roxo-mistico)' }}>
                {stats.consultas_pendentes || 0}
              </p>
            </div>
            <div className="card">
              <h3>Consultas Finalizadas</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cor-roxo-mistico)' }}>
                {stats.consultas_finalizadas || 0}
              </p>
            </div>
            <div className="card">
              <h3>Total Gasto</h3>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cor-roxo-mistico)' }}>
                R$ {(stats.total_gasto || 0).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="card">
          <h2>Saldo Disponível</h2>
          <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'var(--cor-roxo-mistico)', margin: '20px 0' }}>
            R$ {(user?.saldo || 0).toFixed(2)}
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/servicos/creditos" className="btn btn-primary">Adicionar Créditos</Link>
            <Link to="/cliente/carteira" className="btn btn-secondary">Ver Carteira</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClienteDashboard

