import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './BlogPost.css'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`)
      setPost(response.data)
    } catch (error) {
      console.error('Erro ao buscar post:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div style={{ padding: '80px 20px', textAlign: 'center' }}>Carregando...</div>
  if (!post) return <div style={{ padding: '80px 20px', textAlign: 'center' }}>Post não encontrado</div>

  return (
    <div className="blog-post-page">
      {post.imagem_capa && (
        <div className="post-hero" style={{
          backgroundImage: `url(http://localhost:5000${post.imagem_capa})`
        }}></div>
      )}
      <div className="container">
        <article className="post-content">
          <span className="post-categoria">{post.categoria || 'Geral'}</span>
          <h1>{post.titulo}</h1>
          <div className="post-meta">
            <span>{new Date(post.data_publicacao || post.created_at).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.conteudo }} />
        </article>
      </div>
    </div>
  )
}

export default BlogPost

