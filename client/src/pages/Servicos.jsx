import { useParams } from 'react-router-dom'
import './Servicos.css'

const Servicos = () => {
  const { tipo } = useParams()

  return (
    <div className="page-container servicos-page">
      <div className="container">
        <div className="page-header">
          <h1>Serviços</h1>
          <p>Conheça nossos serviços disponíveis</p>
        </div>
        <div className="servico-content">
          <p>Tipo de serviço: {tipo}</p>
          <p>Página em desenvolvimento...</p>
        </div>
      </div>
    </div>
  )
}

export default Servicos

