import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Home.css'

const Home = () => {
  const [banners, setBanners] = useState([])
  const [currentBanner, setCurrentBanner] = useState(0)
  const [consultores, setConsultores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
    fetchConsultores()
  }, [])

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [banners])

  const fetchBanners = async () => {
    try {
      const response = await axios.get('/api/banners/ativos')
      setBanners(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar banners:', error)
      setLoading(false)
    }
  }

  const fetchConsultores = async () => {
    try {
      const response = await axios.get('/api/consultores/destaque/home')
      setConsultores(response.data)
    } catch (error) {
      console.error('Erro ao buscar consultores:', error)
    }
  }

  return (
    <div className="home">
      {/* Banner Rotativo */}
      <section className="banner-section">
        {banners.length > 0 ? (
          <div className="banner-carousel">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`banner-slide ${index === currentBanner ? 'active' : ''}`}
                style={{ backgroundImage: `url(http://localhost:5000${banner.imagem})` }}
              >
                <div className="banner-overlay"></div>
                <div className="banner-content">
                  <h1>{banner.titulo}</h1>
                  {banner.subtitulo && <p>{banner.subtitulo}</p>}
                  <div className="banner-actions">
                    {banner.link && (
                      <Link to={banner.link} className="btn btn-primary">
                        Começar Agora
                      </Link>
                    )}
                    <Link to="/register" className="btn btn-secondary">
                      Cadastre-se Grátis
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div className="banner-indicators">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={index === currentBanner ? 'active' : ''}
                  onClick={() => setCurrentBanner(index)}
                ></button>
              ))}
            </div>
          </div>
        ) : (
          <div className="banner-default">
            <div className="banner-overlay"></div>
            <div className="banner-content">
              <h1>Conselhos Esotéricos</h1>
              <p>Conecte-se com os melhores consultores esotéricos online</p>
              <div className="banner-actions">
                <Link to="/consultores" className="btn btn-primary">
                  Começar Agora
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Cadastre-se Grátis
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Consultores em Destaque */}
      <section className="section consultores-destaque">
        <div className="container">
          <div className="section-header">
            <h2>Consultores em Destaque</h2>
            <p>Conheça nossos consultores mais avaliados</p>
          </div>
          {consultores.length > 0 ? (
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
            <p className="empty-state">Nenhum consultor disponível no momento.</p>
          )}
          {consultores.length > 0 && (
            <div className="text-center" style={{ marginTop: '40px' }}>
              <Link to="/consultores" className="btn btn-outline">
                Ver Todos os Consultores
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Seção de Serviços */}
      <section className="section servicos-section">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Serviços</h2>
            <p>Escolha a melhor opção para você</p>
          </div>
          <div className="servicos-grid">
            <Link to="/servicos/consultas-avulsas" className="servico-card">
              <div className="servico-icon consultas">
                <i className="fas fa-star"></i>
              </div>
              <h3>Consultas</h3>
              <p>Agende consultas individuais com nossos consultores</p>
            </Link>
            <Link to="/servicos/pacotes" className="servico-card">
              <div className="servico-icon pacotes">
                <i className="fas fa-box"></i>
              </div>
              <h3>Pacotes</h3>
              <p>Pacotes especiais com desconto</p>
            </Link>
            <Link to="/servicos/creditos" className="servico-card">
              <div className="servico-icon creditos">
                <i className="fas fa-wallet"></i>
              </div>
              <h3>Créditos</h3>
              <p>Adicione créditos para usar quando quiser</p>
            </Link>
            <Link to="/servicos/planos-mensais" className="servico-card">
              <div className="servico-icon planos">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Planos</h3>
              <p>Planos mensais com benefícios exclusivos</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="section como-funciona">
        <div className="container">
          <div className="section-header">
            <h2>Como Funciona</h2>
            <p>Simples e rápido em 3 passos</p>
          </div>
          <div className="passos-grid">
            <div className="passo-card">
              <div className="passo-number">1</div>
              <h3>Escolha seu Consultor</h3>
              <p>Explore nosso catálogo e encontre o consultor ideal para você</p>
            </div>
            <div className="passo-card">
              <div className="passo-number">2</div>
              <h3>Agende sua Consulta</h3>
              <p>Selecione a duração e confirme seu agendamento</p>
            </div>
            <div className="passo-card">
              <div className="passo-number">3</div>
              <h3>Receba Orientação</h3>
              <p>Realize sua consulta e receba a orientação que precisa</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para começar sua jornada espiritual?</h2>
            <p>Junte-se a milhares de pessoas que já encontraram respostas</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary">
                Cadastre-se Grátis
              </Link>
              <Link to="/consultores" className="btn btn-secondary">
                Ver Consultores
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

