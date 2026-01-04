import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts/publicos')
      setPosts(response.data)
    } catch (error) {
      console.error('Erro ao buscar posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container blog-page">
      <div className="container">
        <div className="page-header">
          <span className="badge">Conhecimento Espiritual</span>
          <h1>Blog</h1>
          <p>Artigos e conteúdo sobre esoterismo</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '60px' }}>Carregando...</p>
        ) : posts.length > 0 ? (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
                {post.imagem_capa && (
                  <div className="blog-image" style={{
                    backgroundImage: `url(http://localhost:5000${post.imagem_capa})`
                  }}></div>
                )}
                <div className="blog-content">
                  <span className="blog-categoria">{post.categoria || 'Geral'}</span>
                  <h3>{post.titulo}</h3>
                  <p className="blog-resumo">{post.resumo || post.conteudo?.substring(0, 150) + '...'}</p>
                  <div className="blog-meta">
                    <span>{new Date(post.data_publicacao || post.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '60px', color: 'var(--cor-cinza)' }}>
            Nenhum post disponível no momento.
          </p>
        )}
      </div>
    </div>
  )
}

export default Blog

