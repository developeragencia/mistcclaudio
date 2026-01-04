import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Consultores.css'

const Consultores = () => {
  const [consultores, setConsultores] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: '',
    status: ''
  })

  useEffect(() => {
    fetchConsultores()
  }, [filtros])

  const fetchConsultores = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filtros.busca) params.append('busca', filtros.busca)
      if (filtros.categoria) params.append('categoria', filtros.categoria)
      if (filtros.status) params.append('status', filtros.status)
      
      const response = await axios.get(`/api/consultores?${params.toString()}`)
      setConsultores(response.data)
    } catch (error) {
      console.error('Erro ao buscar consultores:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container consultores-page">
      <div className="container">
        <div className="page-header">
          <h1>Consultores</h1>
          <p>Encontre o consultor ideal para você</p>
        </div>

        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar por nome ou especialidade..."
            value={filtros.busca}
            onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
            className="filtro-input"
          />
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className="filtro-select"
          >
            <option value="">Todas as categorias</option>
            <option value="Tarot">Tarot</option>
            <option value="Astrologia">Astrologia</option>
            <option value="Numerologia">Numerologia</option>
            <option value="Runas">Runas</option>
            <option value="Cristais">Cristais</option>
          </select>
          <select
            value={filtros.status}
            onChange={(e) => setFiltros({ ...filtros, status: e.target.value })}
            className="filtro-select"
          >
            <option value="">Todos os status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '60px' }}>Carregando...</p>
        ) : consultores.length > 0 ? (
          <div className="consultores-grid">
            {consultores.map((consultor) => (
              <div key={consultor.id} className="consultor-card">
                <div className="consultor-cover" style={{
                  backgroundImage: consultor.imagem_capa 
                    ? `url(http://localhost:5000${consultor.imagem_capa})`
                    : 'linear-gradient(135deg, #7c3aed, #ec4899)'
                }}>
                  <div className="consultor-avatar">
                    <img 
                      src={consultor.foto_perfil ? `http://localhost:5000${consultor.foto_perfil}` : '/avatar-default.png'} 
                      alt={consultor.nome_artistico}
                    />
                    {consultor.status === 'online' && <span className="status-badge online"></span>}
                  </div>
                </div>
                <div className="consultor-info">
                  <h3>{consultor.nome_artistico}</h3>
                  <p className="consultor-especialidade">{consultor.especialidade}</p>
                  <p className="consultor-categoria">{consultor.categoria}</p>
                  <div className="consultor-rating">
                    <span className="stars">★★★★★</span>
                    <span>{consultor.rating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <div className="consultor-price">
                    R$ {consultor.preco_minuto?.toFixed(2) || '0.00'}/min
                  </div>
                  <Link to={`/consultores/${consultor.id}`} className="btn btn-primary">
                    Consultar Agora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '60px', color: 'var(--cor-cinza)' }}>
            Nenhum consultor encontrado.
          </p>
        )}
      </div>
    </div>
  )
}

export default Consultores

