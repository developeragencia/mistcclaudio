import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './ConsultorDetalhes.css'

const ConsultorDetalhes = () => {
  const { id } = useParams()
  const [consultor, setConsultor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchConsultor()
  }, [id])

  const fetchConsultor = async () => {
    try {
      const response = await axios.get(`/api/consultores/${id}`)
      setConsultor(response.data)
    } catch (error) {
      console.error('Erro ao buscar consultor:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{ padding: '80px 20px', textAlign: 'center' }}>Carregando...</div>
  if (!consultor) return <div style={{ padding: '80px 20px', textAlign: 'center' }}>Consultor não encontrado</div>

  return (
    <div className="consultor-detalhes-page">
      <div className="consultor-hero" style={{
        backgroundImage: consultor.imagem_capa 
          ? `url(http://localhost:5000${consultor.imagem_capa})`
          : 'linear-gradient(135deg, #7c3aed, #ec4899)'
      }}>
        <div className="container">
          <div className="consultor-header">
            <div className="consultor-avatar-large">
              <img src={consultor.foto_perfil ? `http://localhost:5000${consultor.foto_perfil}` : '/avatar-default.png'} alt={consultor.nome_artistico} />
              {consultor.status === 'online' && <span className="status-badge-large online"></span>}
            </div>
            <div className="consultor-header-info">
              <h1>{consultor.nome_artistico}</h1>
              <p className="consultor-status">{consultor.status === 'online' ? '● Online' : '○ Offline'}</p>
              <p className="consultor-especialidade">{consultor.especialidade}</p>
              <p className="consultor-categoria">{consultor.categoria}</p>
              <div className="consultor-rating-large">
                <span className="stars">★★★★★</span>
                <span>{consultor.rating?.toFixed(1) || '0.0'}</span>
                <span>({consultor.total_avaliacoes || 0} avaliações)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="consultor-content">
          <div className="consultor-info-section">
            <h2>Sobre</h2>
            <p>{consultor.biografia}</p>
            
            {consultor.anos_experiencia && (
              <div className="info-item">
                <strong>Anos de Experiência:</strong> {consultor.anos_experiencia}
              </div>
            )}

            <div className="info-item">
              <strong>Preço por Minuto:</strong> R$ {consultor.preco_minuto?.toFixed(2) || '0.00'}
            </div>

            {consultor.metodos && consultor.metodos.length > 0 && (
              <div className="info-item">
                <strong>Métodos de Consulta:</strong>
                <ul>
                  {consultor.metodos.map((metodo, index) => (
                    <li key={index}>{metodo}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="consultor-sidebar">
            <div className="agendamento-card">
              <h3>Agendar Consulta</h3>
              <p>Selecione a duração da consulta</p>
              <div className="duracao-options">
                {[15, 30, 45, 60, 90, 120].map(duracao => (
                  <button key={duracao} className="duracao-btn">
                    {duracao} min
                  </button>
                ))}
              </div>
              <div className="valor-total">
                <strong>Valor Total: R$ 0,00</strong>
              </div>
              <Link to={`/cliente/agendar?consultor=${id}`} className="btn btn-primary">
                Agendar Consulta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultorDetalhes

