export default function PrizesSection() {
  return (
    <section className="prizes-section">
      <div className="prizes-inner">
        <div className="section-eyebrow">🎁 Premios</div>
        <div className="prizes-headline">
          Compite y gana<br /><span>premios épicos</span>
        </div>

        {/* 1st prize — full width */}
        <div className="prize-card first" style={{ marginBottom: '16px' }}>
          <div className="prize-img-wrap">
            <span className="prize-emoji-big">🧳</span>
          </div>
          <div className="prize-content">
            <div className="prize-pos">🥇 1er Puesto · 1 ganador</div>
            <div className="prize-title">Lemon Card + Viaje al Mundial 2026</div>
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

        {/* 2nd & 3rd — side by side */}
        <div className="prizes-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
          <div className="prize-card second">
            <span className="prize-emoji-big">📱</span>
            <div className="prize-pos">🥈 2do Puesto · 1 ganador</div>
            <div className="prize-title">Lemon Card + iPhone 17 + 500 USD</div>
            <div className="prize-desc">
              Gift Card en Falabella Colombia por el valor de un iPhone 17 al momento de la entrega,
              más <strong>500 USD en USDT</strong> directo en tu Lemon Card.
            </div>
          </div>
          <div className="prize-card third">
            <span className="prize-emoji-big">📱</span>
            <div className="prize-pos">🥉 3er Puesto · 1 ganador</div>
            <div className="prize-title">Lemon Card + iPhone 17 + 250 USD</div>
            <div className="prize-desc">
              Gift Card en Falabella Colombia por el valor de un iPhone 17 al momento de la entrega,
              más <strong>250 USD en USDT</strong> directo en tu Lemon Card.
            </div>
          </div>
        </div>

        {/* 4th & 5th */}
        <div className="prizes-grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '16px' }}>
          <div className="prize-card jersey">
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>👕</span>
            <div className="prize-pos">4° y 5° Puesto · 2 ganadores</div>
            <div className="prize-title">Lemon Card + Camiseta Colombia + 100 USD</div>
            <div className="prize-desc">
              Camiseta oficial titular de la Selección Colombia (talle L)
              más <strong>100 USD en USDT</strong>.
            </div>
          </div>

          {/* 6–20 */}
          <div className="prize-card" style={{ borderColor: '#222' }}>
            <span className="prize-emoji-big" style={{ fontSize: '52px' }}>🛍️</span>
            <div className="prize-pos" style={{ color: '#888' }}>6° al 20° Puesto · 15 ganadores</div>
            <div className="prize-title" style={{ fontSize: '18px' }}>Lemon Card + Kit Completo</div>
            <div className="prize-desc">
              Kit completo de merchandising oficial:<br />
              <strong>remera, totebag, gorra y medias</strong>.
            </div>
          </div>
        </div>

        {/* 21–50 */}
        <div className="prize-card merch">
          <span style={{ fontSize: '40px', flexShrink: 0 }}>🍋</span>
          <div>
            <div className="prize-pos" style={{ color: '#555' }}>21° al 50° Puesto · 30 ganadores</div>
            <div className="prize-title" style={{ fontSize: '18px', color: '#fff' }}>Lemon Card + Mini Kit</div>
            <div className="prize-desc" style={{ margin: 0 }}>
              Mini kit oficial de Lemon Card: <strong>remera y gorra</strong>.
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
