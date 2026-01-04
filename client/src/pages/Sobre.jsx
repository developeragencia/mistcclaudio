import './Sobre.css'

const Sobre = () => {
  return (
    <div className="page-container sobre-page">
      <div className="container">
        <div className="page-header">
          <h1>Sobre Nós</h1>
          <p>Conheça nossa missão e valores</p>
        </div>
        
        <div className="sobre-content">
          <section className="sobre-section">
            <h2>Missão</h2>
            <p>Conectar pessoas em busca de orientação espiritual com consultores qualificados, oferecendo uma plataforma segura, confiável e acessível para consultas esotéricas online.</p>
          </section>

          <section className="sobre-section">
            <h2>Visão</h2>
            <p>Ser a principal plataforma de consultas esotéricas online, reconhecida pela qualidade dos serviços e pelo compromisso com o bem-estar espiritual dos nossos clientes.</p>
          </section>

          <section className="sobre-section valores">
            <h2>Valores</h2>
            <div className="valores-grid">
              <div className="valor-card">
                <h3>Transparência</h3>
                <p>Agimos com honestidade e clareza em todas as nossas relações.</p>
              </div>
              <div className="valor-card">
                <h3>Qualidade</h3>
                <p>Buscamos excelência em todos os nossos serviços.</p>
              </div>
              <div className="valor-card">
                <h3>Respeito</h3>
                <p>Respeitamos a diversidade e as crenças de cada pessoa.</p>
              </div>
              <div className="valor-card">
                <h3>Confiança</h3>
                <p>Construímos relações baseadas na confiança mútua.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Sobre

