import { useState } from 'react'
import axios from 'axios'
import './Contato.css'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await axios.post('/api/contatos', formData)
      setMessage({ type: 'success', text: 'Mensagem enviada com sucesso!' })
      setFormData({ nome_completo: '', email: '', telefone: '', assunto: '', mensagem: '' })
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Erro ao enviar mensagem' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container contato-page">
      <div className="container">
        <div className="page-header">
          <span className="badge">Fale Conosco</span>
          <h1>Entre em Contato</h1>
          <p>Estamos aqui para ajudar você</p>
        </div>

        <div className="contato-content">
          <div className="contato-info">
            <div className="info-card">
              <i className="fas fa-envelope"></i>
              <h3>Email</h3>
              <a href="mailto:contato@conselhosesotericos.com">contato@conselhosesotericos.com</a>
            </div>
            <div className="info-card">
              <i className="fas fa-phone"></i>
              <h3>Telefone</h3>
              <p>(00) 0000-0000</p>
            </div>
            <div className="info-card">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Endereço</h3>
              <p>Brasil</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contato-form">
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                type="text"
                name="nome_completo"
                value={formData.nome_completo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Assunto *</label>
              <select name="assunto" value={formData.assunto} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option value="Geral">Geral</option>
                <option value="Suporte Técnico">Suporte Técnico</option>
                <option value="Tornar-se Consultor">Tornar-se Consultor</option>
                <option value="Parcerias">Parcerias</option>
                <option value="Dúvidas sobre Pagamento">Dúvidas sobre Pagamento</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mensagem *</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows="6"
                required
                minLength="10"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contato

