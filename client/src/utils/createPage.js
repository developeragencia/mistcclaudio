// Função auxiliar para criar páginas placeholder
export const createPage = (title, content = null) => {
  return () => (
    <div className="page-container" style={{ minHeight: 'calc(100vh - 200px)', padding: '80px 20px' }}>
      <div className="container">
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>{title}</h1>
        {content || <p style={{ textAlign: 'center', color: 'var(--cor-cinza)' }}>Página em desenvolvimento...</p>}
      </div>
    </div>
  )
}

