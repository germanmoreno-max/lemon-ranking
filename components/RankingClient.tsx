'use client';

import { RankingEntry } from '../types';

// ─── Helper functions ───────────────────────────────────────────────────────

function ini(f: string, l: string): string {
  return ((f || '')[0] || '').toUpperCase() + ((l || '')[0] || '').toUpperCase();
}

// "María Fernanda" + "Rodríguez Pérez" → "María R."
function shortName(f: string, l: string): string {
  const firstName = (f || '').trim().split(/\s+/)[0] || '';
  const lastInitial = ((l || '').trim()[0] || '').toUpperCase();
  return lastInitial ? `${firstName} ${lastInitial}.` : firstName;
}


function fmt(n: number): string {
  return n.toLocaleString('es-CO');
}


// ─── Podium ─────────────────────────────────────────────────────────────────

interface PodiumProps {
  data: RankingEntry[];
}

function Podium({ data }: PodiumProps) {
  const p = data.slice(0, 3);
  const order = [
    { d: p[1], cls: 'second', medal: '🥈', pos: '2° Lugar' },
    { d: p[0], cls: 'first', medal: '🥇', pos: '1° Lugar' },
    { d: p[2], cls: 'third', medal: '🥉', pos: '3° Lugar' },
  ];

  return (
    <div className="podium">
      {order.map(({ d, cls, medal, pos }, idx) => {
        if (!d) return <div key={idx} />;
        return (
          <div key={idx} className={`pod-card ${cls}`}>
            <span className="pod-medal">{medal}</span>
            <div className="pod-pos">{pos}</div>
            <div className="pod-av">{ini(d.first, d.last)}</div>
            <div className="pod-name">{shortName(d.first, d.last)}</div>
            <div className="pod-pts">{fmt(d.total)}</div>
            <div className="pod-pts-lbl">puntos</div>
            <div className="pod-refs"><strong>{d.referrals}</strong> invitados</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Table ──────────────────────────────────────────────────────────────────

interface TableProps {
  data: RankingEntry[];
}

function Table({ data }: TableProps) {
  const max = data[0]?.total || 1;
  const rows = data.slice(3, 50);

  return (
    <div className="tbl-wrap">
      <div className="tbl-head">
        <div>#</div>
        <div>Participante</div>
        <div className="th-stats">
          <span>Referidos</span>
          <span>Puntos</span>
        </div>
      </div>
      <div>
        {rows.map((d, i) => {
          const rank = i + 4;
          const pct = Math.round((d.total / max) * 100);
          const isTop10 = rank <= 10;
          return (
            <div key={d.email + rank} className={`tbl-row${isTop10 ? ' top10' : ''}`}>
              <div className={`c-rank${isTop10 ? ' hi' : ''}`}>{rank}</div>
              <div className="c-user">
                <div className={`av-sm${isTop10 ? ' av-top' : ''}`}>{ini(d.first, d.last)}</div>
                <div className="u-name">{shortName(d.first, d.last)}</div>
              </div>
              <div className="c-stats">
                <div className="c-refs">
                  <span className="c-refs-n">{d.referrals}</span>
                  <span className="c-refs-lbl">invitados</span>
                </div>
                <div className="c-pts-wrap">
                  <div className="c-pts">{fmt(d.total)}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main RankingClient ──────────────────────────────────────────────────────

interface RankingClientProps {
  initialData: RankingEntry[];
  initialTotal: number;
  updatedAt: string;
}

function formatUpdated(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
      timeZone: 'America/Bogota',
    });
  } catch { return ''; }
}

export default function RankingClient({ initialData, initialTotal, updatedAt }: RankingClientProps) {
  const data = initialData;
  const total = initialTotal;

  const leader = data[0];
  const maxRefs = data[0]?.referrals || 0;

  return (
    <>
      {/* Hero stats */}
      <section className="hero">
        <div className="hero-update-wrap">
          {updatedAt ? (
            <div className="hero-tag">
              <div className="dot" />
              Actualizado: {formatUpdated(updatedAt)}
            </div>
          ) : (
            <div className="hero-tag hero-tag-muted">
              <div className="dot" />
              Ranking en vivo
            </div>
          )}
          <div className="update-freq">Se actualiza 1-2 veces al día</div>
        </div>
        <h1>
          La Lemon Card llega a Colombia<br />
          <span className="hero-h1-hook">¿Quién va ganando? 🏆</span>
        </h1>
        <p className="hero-sub">
          Súmate a la lista de espera y sé de los primeros 1.000 en obtener la tarjeta de forma anticipada. Además, los 50 que acumulen más puntos ganarán premios épicos: desde un viaje al debut de Colombia en el Mundial hasta merch exclusivo de Lemon.
          <br /><br />
          Invita a tus amigos, sube posiciones y no te quedes afuera.
        </p>
        <div className="hero-signup">
          <p className="hero-signup-text">¿Aún no te has sumado?</p>
          <a className="hero-signup-btn" href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
            Súmate aquí →
          </a>
        </div>
        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-n">{fmt(total)}</div>
            <div className="stat-l">Participantes</div>
          </div>
          <div className="stat-item">
            <div className="stat-n">{fmt(leader?.total || 0)}</div>
            <div className="stat-l">Puntos del 1er lugar</div>
          </div>
        </div>
      </section>

      {/* Ranking section */}
      <section className="ranking-section">
        <div className="ranking-inner">
          <div className="section-eyebrow-dark">🏆 Clasificación</div>
          <div className="ranking-headline">Ranking<br />Top 50</div>
          <Podium data={data} />
          <Table data={data} />
        </div>
      </section>

    </>
  );
}
