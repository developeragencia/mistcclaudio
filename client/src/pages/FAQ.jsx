import { useState } from 'react'
import './FAQ.css'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      pergunta: 'Como funciona o sistema de créditos?',
      resposta: 'Você pode adicionar créditos à sua conta através de pagamentos PIX ou cartão. Os créditos podem ser usados para agendar consultas com qualquer consultor da plataforma.'
    },
    {
      pergunta: 'Como escolho um consultor?',
      resposta: 'Na página de consultores, você pode filtrar por categoria, ver avaliações, preços e especialidades. Escolha o consultor que mais se identifica com você.'
    },
    {
      pergunta: 'As consultas são online?',
      resposta: 'Sim, todas as consultas são realizadas online através da nossa plataforma. Você pode escolher entre chat, áudio, vídeo ou outros métodos oferecidos pelo consultor.'
    },
    {
      pergunta: 'Como posso me tornar consultor?',
      resposta: 'Faça seu cadastro como consultor, preencha todas as informações do perfil profissional e aguarde a aprovação da nossa equipe. Após aprovado, você já pode receber consultas.'
    },
    {
      pergunta: 'Como funciona o pagamento?',
      resposta: 'Os pagamentos podem ser feitos via PIX ou cartão de crédito/débito. Para consultores, o pagamento é intermediado pela plataforma e repassado após a finalização da consulta.'
    }
  ]

  return (
    <div className="page-container faq-page">
      <div className="container">
        <div className="page-header">
          <span className="badge">Dúvidas Frequentes</span>
          <h1>FAQ</h1>
          <p>Tire suas dúvidas</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span>{faq.pergunta}</span>
                <i className={`fas fa-chevron-${openIndex === index ? 'up' : 'down'}`}></i>
              </button>
              <div className="faq-answer">
                <p>{faq.resposta}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <p>Ainda tem dúvidas?</p>
          <a href="/contato" className="btn btn-primary">Entre em Contato</a>
        </div>
      </div>
    </div>
  )
}

export default FAQ

