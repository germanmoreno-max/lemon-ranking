export default function PrizesSection() {
  return (
    <section className="prizes-section">
      <div className="prizes-inner">
        <div className="section-eyebrow">🎁 Premios</div>
        <div className="prizes-headline">
          ¿Te gustaría viajar<br />a alentar <span>a La Sele?</span>
        </div>

        {/* Row 1: 1st prize full width */}
        <div className="prize-card first" style={{ marginBottom: '16px' }}>
          <div className="prize-img-wrap">
            <span className="prize-emoji-big">🧳</span>
          </div>
          <div className="prize-content">
            <div className="prize-pos">🥇 1er Puesto</div>
            <div className="prize-title">Viaje al debut de Colombia en el Mundial</div>
            <div className="prize-desc">
              Dos pasajes, hotel y entradas para ver a la Selección Colombia debutar en la Copa Mundial
              FIFA 2026 el <strong>17 de junio</strong> frente a Uzbekistán en la{' '}
              <strong>Ciudad de México</strong>. Una experiencia única para ti y un acompañante.
            </div>
            <div className="prize-tags">
              <span className="prize-tag">✈️ Vuelos incluidos</span>
              <span className="prize-tag">🏨 Hotel</span>
              <span className="prize-tag">🎟️ 2 entradas</span>
              <span className="prize-tag">🇲🇽 Ciudad de México</span>
              <span className="prize-tag">📅 17 Jun 2026</span>
            </div>
          </div>
        </div>

        {/* Row 2: 2nd & 3rd */}
        <div className="prizes-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
          <div className="prize-card second">
            <span className="prize-emoji-big">📱</span>
            <div className="prize-pos">🥈 2do Puesto</div>
            <div className="prize-title">iPhone 17 + USD</div>
            <div className="prize-desc">
              El iPhone más nuevo del mercado más cash prize directo en tu Lemon Card.
            </div>
          </div>
          <div className="prize-card third">
            <span className="prize-emoji-big">📱</span>
            <div className="prize-pos">🥉 3er Puesto</div>
            <div className="prize-title">iPhone 17 + USD</div>
            <div className="prize-desc">
              El iPhone más nuevo del mercado más cash prize directo en tu Lemon Card.
            </div>
          </div>
        </div>

        {/* Row 3: 4th, 5th & merch */}
        <div className="prizes-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="prize-card jersey">
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>👕</span>
            <div className="prize-pos">4° Puesto</div>
            <div className="prize-title">Camiseta oficial + Cash</div>
            <div className="prize-desc">Camiseta oficial de La Sele más cash prize.</div>
          </div>
          <div className="prize-card jersey">
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>👕</span>
            <div className="prize-pos">5° Puesto</div>
            <div className="prize-title">Camiseta oficial + Cash</div>
            <div className="prize-desc">Camiseta oficial de La Sele más cash prize.</div>
          </div>
          <div className="prize-card" style={{ borderColor: '#222' }}>
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>🛍️</span>
            <div className="prize-pos" style={{ color: '#555' }}>Top 6–50</div>
            <div className="prize-title" style={{ fontSize: '18px' }}>Merch Lemon 🍋</div>
            <div className="prize-desc">
              Pack de merch oficial de Lemon Card para todos los del top 50.
            </div>
          </div>
        </div>

        <p className="tc-link">
          ¿Tienes dudas sobre las bases?{' '}
          <a
            href="https://legals.lemon.me/terminos-y-condiciones-waiting-list-colombia/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lee los Términos y Condiciones →
          </a>
        </p>
      </div>
    </section>
  );
}
