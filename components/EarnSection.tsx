const SIGNUP_URL = 'https://sumatealemon.co';

export default function EarnSection() {
  return (
    <section className="earn-section">
      <div className="earn-inner">
        <div className="section-eyebrow-dark" style={{ color: 'var(--green)' }}>
          ⚡ Cómo ganar puntos
        </div>
        <div className="earn-grid">
          <a className="earn-card earn-highlight earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+20</div>
            <div className="earn-label">por cada amigo que invites</div>
            <div className="earn-sub">La acción que más puntos da y puedes repetir sin límite</div>
          </a>
          <a className="earn-card earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+15</div>
            <div className="earn-label">Califícanos en la app</div>
          </a>
          <a className="earn-card earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+10</div>
            <div className="earn-label">Descarga la app</div>
          </a>
          <a className="earn-card earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+10</div>
            <div className="earn-label">Conoce más de la Lemon Card</div>
          </a>
          <a className="earn-card earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+5</div>
            <div className="earn-label">Síguenos en Instagram</div>
          </a>
          <a className="earn-card earn-link" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <div className="earn-pts">+5</div>
            <div className="earn-label">Síguenos en TikTok</div>
          </a>
        </div>
        <div className="section-cta">
          <p className="section-cta-text">¿Aún no estás en la lista?</p>
          <a className="section-cta-btn" href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            Súmate aquí →
          </a>
        </div>
      </div>
    </section>
  );
}
