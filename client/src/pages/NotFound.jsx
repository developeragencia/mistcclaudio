import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe.</p>
        <Link to="/" className="btn btn-primary">
          Voltar para Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound

