import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Register.css'

const Register = () => {
  const [etapa, setEtapa] = useState(1)
  const [tipo, setTipo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome_completo: '',
    cpf: '',
    email: '',
    senha: '',
    nome_artistico: '',
    especialidade: '',
    categoria: '',
    preco_minuto: '',
    biografia: '',
    anos_experiencia: '',
    foto_perfil: '',
    imagem_capa: '',
    metodos: []
  })

  const handleTipoSelect = (selectedTipo) => {
    setTipo(selectedTipo)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      setFormData({ ...formData, cpf: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const data = tipo === 'cliente' 
      ? {
          nome_completo: formData.nome_completo,
          cpf: formData.cpf,
          email: formData.email,
          senha: formData.senha
        }
      : {
          nome_completo: formData.nome_completo,
          cpf: formData.cpf,
          email: formData.email,
          senha: formData.senha,
          nome_artistico: formData.nome_artistico,
          especialidade: formData.especialidade,
          categoria: formData.categoria,
          preco_minuto: parseFloat(formData.preco_minuto),
          biografia: formData.biografia,
          anos_experiencia: formData.anos_experiencia || null,
          foto_perfil: formData.foto_perfil,
          imagem_capa: formData.imagem_capa || null,
          metodos: formData.metodos
        }

    const result = await register(data, tipo)
    
    if (result.success) {
      if (result.user.tipo === 'consultor') {
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
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          {etapa === 1 ? (
            <>
              <div className="register-header">
                <h1>Cadastro</h1>
                <p>Escolha o tipo de conta</p>
              </div>

              <div className="progress-bar">
                <div className="progress" style={{ width: '50%' }}></div>
              </div>

              <div className="tipo-selection">
                <div
                  className={`tipo-card ${tipo === 'cliente' ? 'selected' : ''}`}
                  onClick={() => handleTipoSelect('cliente')}
                >
                  <div className="tipo-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <h3>Cliente</h3>
                  <ul>
                    <li>Agendar consultas online</li>
                    <li>Acessar créditos e histórico</li>
                    <li>Avaliar consultores</li>
                  </ul>
                </div>

                <div
                  className={`tipo-card ${tipo === 'consultor' ? 'selected' : ''}`}
                  onClick={() => handleTipoSelect('consultor')}
                >
                  <div className="tipo-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3>Consultor</h3>
                  <ul>
                    <li>Gerenciar perfil profissional</li>
                    <li>Receber consultas de clientes</li>
                    <li>Ganhar com suas consultas</li>
                  </ul>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => tipo && setEtapa(2)}
                disabled={!tipo}
              >
                Continuar
              </button>

              <div className="register-footer">
                <p>
                  Já tem conta? <Link to="/login">Faça login</Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="register-header">
                <h1>Cadastro - {tipo === 'cliente' ? 'Cliente' : 'Consultor'}</h1>
                <button
                  className="btn-back"
                  onClick={() => setEtapa(1)}
                >
                  ← Voltar
                </button>
              </div>

              <div className="progress-bar">
                <div className="progress" style={{ width: '100%' }}></div>
              </div>

              {error && (
                <div className="alert alert-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-section">
                  <h3>Informações Básicas</h3>
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
                    <label>CPF *</label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleCPFChange}
                      placeholder="000.000.000-00"
                      required
                      maxLength="14"
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
                    <label>Senha *</label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                    <small>Mínimo 6 caracteres</small>
                  </div>
                </div>

                {tipo === 'consultor' && (
                  <div className="form-section">
                    <h3>Informações Profissionais</h3>
                    <div className="form-group">
                      <label>Nome Artístico *</label>
                      <input
                        type="text"
                        name="nome_artistico"
                        value={formData.nome_artistico}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Especialidade *</label>
                      <input
                        type="text"
                        name="especialidade"
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Categoria *</label>
                      <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="Tarot">Tarot</option>
                        <option value="Astrologia">Astrologia</option>
                        <option value="Numerologia">Numerologia</option>
                        <option value="Runas">Runas</option>
                        <option value="Cristais">Cristais</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Preço por Minuto (R$) *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="preco_minuto"
                        value={formData.preco_minuto}
                        onChange={handleChange}
                        required
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Biografia *</label>
                      <textarea
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleChange}
                        rows="4"
                        required
                        minLength="50"
                      />
                      <small>Mínimo 50 caracteres</small>
                    </div>

                    <div className="form-group">
                      <label>Anos de Experiência</label>
                      <input
                        type="number"
                        name="anos_experiencia"
                        value={formData.anos_experiencia}
                        onChange={handleChange}
                        min="0"
                      />
                    </div>

                    <div className="form-group">
                      <label>Foto de Perfil (URL) *</label>
                      <input
                        type="text"
                        name="foto_perfil"
                        value={formData.foto_perfil}
                        onChange={handleChange}
                        placeholder="https://..."
                        required
                      />
                      <small>Por enquanto, use uma URL de imagem</small>
                    </div>

                    <div className="form-group">
                      <label>Imagem de Capa (URL)</label>
                      <input
                        type="text"
                        name="imagem_capa"
                        value={formData.imagem_capa}
                        onChange={handleChange}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>

              <div className="register-footer">
                <p>
                  Já tem conta? <Link to="/login">Faça login</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Register

