'use client';

import { RankingEntry } from '../types';

// ─── Helper functions ───────────────────────────────────────────────────────

function ini(f: string, l: string): string {
  return ((f || '')[0] || '').toUpperCase() + ((l || '')[0] || '').toUpperCase();
}


function fmt(n: number): string {
  return n.toLocaleString('es-CO');
}

function prizeLabel(rank: number): [string, string] | null {
  if (rank <= 3) return null;
  if (rank === 4 || rank === 5) return ['ps-jersey', '🇨🇴 Camiseta + Cash'];
  if (rank <= 50) return ['ps-merch', '🍋 Merch Lemon'];
  return null;
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
            <div className="pod-name">{d.first} {d.last}</div>
            <div className="pod-pts">{fmt(d.total)}</div>
            <div className="pod-pts-lbl">puntos</div>
            <div className="pod-refs"><strong>{d.referrals}</strong> referidos</div>
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
        <div>Referidos</div>
        <div style={{ textAlign: 'right' }}>Puntos</div>
      </div>
      <div>
        {rows.map((d, i) => {
          const rank = i + 4;
          const pct = Math.round((d.total / max) * 100);
          const pl = prizeLabel(rank);
          return (
            <div key={d.email + rank} className="tbl-row">
              <div className={`c-rank${rank <= 10 ? ' hi' : ''}`}>{rank}</div>
              <div className="c-user">
                <div className="av-sm">{ini(d.first, d.last)}</div>
                <div>
                  <div className="u-name">{d.first} {d.last}</div>
                </div>
              </div>
              <div className="c-refs">{d.referrals} refs</div>
              <div className="c-pts-wrap">
                <div className="c-pts">{fmt(d.total)}</div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                {pl && (
                  <div className={`prize-strip ${pl[0]}`}>{pl[1]}</div>
                )}
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
}

export default function RankingClient({ initialData, initialTotal }: RankingClientProps) {
  const data = initialData;
  const total = initialTotal;

  const leader = data[0];
  const maxRefs = data[0]?.referrals || 0;

  return (
    <>
      {/* Hero stats */}
      <section className="hero">
        <div className="hero-tag"><div className="dot" /> Competencia en vivo</div>
        <h1>¿Quién va<br />ganando? 🏆</h1>
        <p className="hero-sub">
          Refiere a tus amigos, sube en el ranking y gana premios épicos. Los mejores puestos ganan
          desde un viaje al debut de Colombia en el Mundial hasta merch exclusivo.
        </p>
        <div className="stats-strip">
          <div className="stat-item">
            <div className="stat-n">{fmt(total)}</div>
            <div className="stat-l">Participantes</div>
          </div>
          <div className="stat-item">
            <div className="stat-n">{fmt(leader?.total || 0)}</div>
            <div className="stat-l">Puntos del líder</div>
          </div>
          <div className="stat-item">
            <div className="stat-n">{fmt(maxRefs)}</div>
            <div className="stat-l">Máx. referidos</div>
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

      {/* Footer date */}
      <footer>
        Lemon Card Colombia · Waiting List Competition
      </footer>
    </>
  );
}
