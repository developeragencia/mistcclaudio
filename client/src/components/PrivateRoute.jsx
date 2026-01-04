import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = ({ children, requireAdmin = false, requireConsultor = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div>Carregando...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && user.tipo !== 'admin') {
    return <Navigate to="/" replace />
  }

  if (requireConsultor && user.tipo !== 'consultor' && user.tipo !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute

