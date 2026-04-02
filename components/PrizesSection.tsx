export default function PrizesSection() {
  return (
    <section className="prizes-section">
      <div className="prizes-inner">
        <div className="section-eyebrow">🎁 Premios</div>
        <div className="prizes-headline">
          Compite y gana<br /><span>premios épicos</span>
        </div>

        {/* Top 3 — podio */}
        <div className="prizes-podium" style={{ marginBottom: '16px' }}>

          {/* 2nd — izquierda */}
          <div className="pp-card pp-2nd">
            <div className="pp-emoji">📱</div>
            <div className="pp-medal">🥈</div>
            <div className="pp-rank">2do Puesto</div>
            <div className="pp-title">iPhone 17<br />+ 500 USD</div>
            <div className="pp-step pp-step-2">2</div>
          </div>

          {/* 1st — centro */}
          <div className="pp-card pp-1st">
            <div className="pp-emoji pp-emoji-big">🏆<br/>⚽🇨🇴</div>
            <div className="pp-medal">🥇</div>
            <div className="pp-rank">1er Puesto</div>
            <div className="pp-title">Viaje al<br />Mundial 2026</div>
            <div className="pp-desc">
              Colombia vs Uzbekistán · 17 Jun · Ciudad de México
            </div>
            <div className="pp-tags">
              <span className="pp-tag">✈️ Vuelos</span>
              <span className="pp-tag">🏨 Hotel</span>
              <span className="pp-tag">🎟️ 2 entradas</span>
            </div>
            <div className="pp-step pp-step-1">1</div>
          </div>

          {/* 3rd — derecha */}
          <div className="pp-card pp-3rd">
            <div className="pp-emoji">📱</div>
            <div className="pp-medal">🥉</div>
            <div className="pp-rank">3er Puesto</div>
            <div className="pp-title">iPhone 17<br />+ 250 USD</div>
            <div className="pp-step pp-step-3">3</div>
          </div>

        </div>

        {/* 4th & 5th */}
        <div className="prizes-grid prizes-2col" style={{ marginBottom: '16px' }}>
          <div className="prize-card jersey">
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>👕</span>
            <div className="prize-pos">4° y 5° Puesto · 2 ganadores</div>
            <div className="prize-title">Camiseta Colombia + 100 USD</div>
          </div>

          {/* 6–20 */}
          <div className="prize-card" style={{ borderColor: '#222' }}>
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>🛍️</span>
            <div className="prize-pos" style={{ color: '#888' }}>6° al 20° Puesto · 15 ganadores</div>
            <div className="prize-title" style={{ fontSize: '18px' }}>Kit Completo</div>
          </div>
        </div>

        {/* 21–50 */}
        <div className="prize-card merch">
          <span style={{ fontSize: '40px', flexShrink: 0 }}>🍋</span>
          <div>
            <div className="prize-pos" style={{ color: '#555' }}>21° al 50° Puesto · 30 ganadores</div>
            <div className="prize-title" style={{ fontSize: '18px', color: '#fff' }}>Mini Kit</div>
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
