import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import PrivateRoute from './components/PrivateRoute'

// Páginas públicas
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Sobre from './pages/Sobre'
import ComoFunciona from './pages/ComoFunciona'
import Contato from './pages/Contato'
import FAQ from './pages/FAQ'
import Consultores from './pages/Consultores'
import ConsultorDetalhes from './pages/ConsultorDetalhes'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Servicos from './pages/Servicos'
import NotFound from './pages/NotFound'

// Painéis
import ClienteDashboard from './pages/Cliente/Dashboard'
import ClienteAgendar from './pages/Cliente/Agendar'
import ClienteConsultas from './pages/Cliente/Consultas'
import ClienteConsultaDetalhes from './pages/Cliente/ConsultaDetalhes'
import ClienteCarteira from './pages/Cliente/Carteira'
import ClientePerfil from './pages/Cliente/Perfil'
import ClientePagamentos from './pages/Cliente/Pagamentos'

import ConsultorDashboard from './pages/Consultor/Dashboard'
import ConsultorConsultas from './pages/Consultor/Consultas'
import ConsultorPerfil from './pages/Consultor/Perfil'
import ConsultorPix from './pages/Consultor/Pix'

import AdminDashboard from './pages/Admin/Dashboard'
import AdminConsultores from './pages/Admin/Consultores'
import AdminUsuarios from './pages/Admin/Usuarios'
import AdminConsultas from './pages/Admin/Consultas'
import AdminPagamentos from './pages/Admin/Pagamentos'
import AdminBanners from './pages/Admin/Banners'
import AdminPosts from './pages/Admin/Posts'
import AdminConfiguracoes from './pages/Admin/Configuracoes'
import AdminContatos from './pages/Admin/Contatos'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/consultores" element={<Consultores />} />
              <Route path="/consultores/:id" element={<ConsultorDetalhes />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/servicos/:tipo" element={<Servicos />} />
              
              {/* Painel Cliente */}
              <Route path="/cliente" element={<PrivateRoute><ClienteDashboard /></PrivateRoute>} />
              <Route path="/cliente/agendar" element={<PrivateRoute><ClienteAgendar /></PrivateRoute>} />
              <Route path="/cliente/consultas" element={<PrivateRoute><ClienteConsultas /></PrivateRoute>} />
              <Route path="/cliente/consulta/:id" element={<PrivateRoute><ClienteConsultaDetalhes /></PrivateRoute>} />
              <Route path="/cliente/carteira" element={<PrivateRoute><ClienteCarteira /></PrivateRoute>} />
              <Route path="/cliente/perfil" element={<PrivateRoute><ClientePerfil /></PrivateRoute>} />
              <Route path="/cliente/pagamentos" element={<PrivateRoute><ClientePagamentos /></PrivateRoute>} />
              
              {/* Painel Consultor */}
              <Route path="/consultor" element={<PrivateRoute requireConsultor><ConsultorDashboard /></PrivateRoute>} />
              <Route path="/consultor/consultas" element={<PrivateRoute requireConsultor><ConsultorConsultas /></PrivateRoute>} />
              <Route path="/consultor/perfil" element={<PrivateRoute requireConsultor><ConsultorPerfil /></PrivateRoute>} />
              <Route path="/consultor/pix" element={<PrivateRoute requireConsultor><ConsultorPix /></PrivateRoute>} />
              
              {/* Painel Admin */}
              <Route path="/admin" element={<PrivateRoute requireAdmin><AdminDashboard /></PrivateRoute>} />
              <Route path="/admin/consultores" element={<PrivateRoute requireAdmin><AdminConsultores /></PrivateRoute>} />
              <Route path="/admin/usuarios" element={<PrivateRoute requireAdmin><AdminUsuarios /></PrivateRoute>} />
              <Route path="/admin/consultas" element={<PrivateRoute requireAdmin><AdminConsultas /></PrivateRoute>} />
              <Route path="/admin/pagamentos" element={<PrivateRoute requireAdmin><AdminPagamentos /></PrivateRoute>} />
              <Route path="/admin/banners" element={<PrivateRoute requireAdmin><AdminBanners /></PrivateRoute>} />
              <Route path="/admin/posts" element={<PrivateRoute requireAdmin><AdminPosts /></PrivateRoute>} />
              <Route path="/admin/contatos" element={<PrivateRoute requireAdmin><AdminContatos /></PrivateRoute>} />
              <Route path="/admin/configuracoes" element={<PrivateRoute requireAdmin><AdminConfiguracoes /></PrivateRoute>} />
              
              {/* 404 */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

