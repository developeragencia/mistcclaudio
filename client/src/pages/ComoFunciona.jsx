import { Link } from 'react-router-dom'
import './ComoFunciona.css'

const ComoFunciona = () => {
  return (
    <div className="page-container como-funciona-page">
      <div className="container">
        <div className="page-header">
          <h1>Como Funciona</h1>
          <p>Simples e rápido em 3 passos</p>
        </div>

        <div className="passos-container">
          <div className="passo-item">
            <div className="passo-numero">1</div>
            <h2>Escolha seu Consultor</h2>
            <p>Explore nosso catálogo completo de consultores especializados e escolha aquele que mais se identifica com você.</p>
          </div>

          <div className="passo-item">
            <div className="passo-numero">2</div>
            <h2>Agende sua Consulta</h2>
            <p>Selecione a duração da consulta e confirme seu agendamento. Você pode usar créditos ou pagar diretamente.</p>
          </div>

          <div className="passo-item">
            <div className="passo-numero">3</div>
            <h2>Realize sua Consulta</h2>
            <p>Realize sua consulta online através da plataforma e receba a orientação espiritual que você precisa.</p>
          </div>
        </div>

        <div className="info-sections">
          <div className="info-box">
            <h3>Para Clientes</h3>
            <ul>
              <li>✓ Cadastro gratuito e rápido</li>
              <li>✓ Escolha entre diversos consultores</li>
              <li>✓ Agendamento simples e flexível</li>
              <li>✓ Consultas online seguras</li>
              <li>✓ Sistema de avaliações</li>
              <li>✓ Histórico completo de consultas</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>Para Consultores</h3>
            <ul>
              <li>✓ Perfil personalizado</li>
              <li>✓ Receba consultas de clientes</li>
              <li>✓ Defina seus próprios preços</li>
              <li>✓ Histórico financeiro completo</li>
              <li>✓ Sistema de avaliações</li>
              <li>✓ Suporte dedicado</li>
            </ul>
          </div>
        </div>

        <div className="cta-box">
          <h3>Pronto para começar?</h3>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Cadastre-se Grátis</Link>
            <Link to="/consultores" className="btn btn-secondary">Ver Consultores</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComoFunciona

