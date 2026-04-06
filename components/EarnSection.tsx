export default function EarnSection() {
  return (
    <section className="earn-section">
      <div className="earn-inner">
        <div className="section-eyebrow-dark" style={{ color: 'var(--green)' }}>
          ⚡ Cómo ganar puntos
        </div>
        <div className="earn-grid">
          <div className="earn-card earn-highlight">
            <div className="earn-pts">+20</div>
            <div className="earn-label">por cada amigo que refieras</div>
            <div className="earn-sub">La acción que más puntos da y puedes repetir sin límite</div>
          </div>
          <div className="earn-card">
            <div className="earn-pts">+15</div>
            <div className="earn-label">Califícanos en la app</div>
          </div>
          <div className="earn-card">
            <div className="earn-pts">+10</div>
            <div className="earn-label">Descarga la app</div>
          </div>
          <div className="earn-card">
            <div className="earn-pts">+10</div>
            <div className="earn-label">Conoce más de la Lemon Card</div>
          </div>
          <div className="earn-card">
            <div className="earn-pts">+5</div>
            <div className="earn-label">Síguenos en Instagram</div>
          </div>
          <div className="earn-card">
            <div className="earn-pts">+5</div>
            <div className="earn-label">Síguenos en TikTok</div>
          </div>
        </div>
        <div className="section-cta">
          <p className="section-cta-text">¿Aún no estás en la lista?</p>
          <a className="section-cta-btn" href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
            Regístrate aquí →
          </a>
        </div>
      </div>
    </section>
  );
}
