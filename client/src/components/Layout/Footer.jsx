import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Conselhos Esotéricos</h3>
            <p>Plataforma de consultas esotéricas online conectando você aos melhores consultores.</p>
          </div>

          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><Link to="/sobre">Sobre Nós</Link></li>
              <li><Link to="/como-funciona">Como Funciona</Link></li>
              <li><Link to="/consultores">Consultores</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contato">Contato</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Serviços</h4>
            <ul>
              <li><Link to="/servicos/consultas-avulsas">Consultas</Link></li>
              <li><Link to="/servicos/pacotes">Pacotes</Link></li>
              <li><Link to="/servicos/creditos">Créditos</Link></li>
              <li><Link to="/servicos/planos-mensais">Planos</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Conselhos Esotéricos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

