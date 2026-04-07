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
          <span>Invitados</span>
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

  return (
    <section className="ranking-section">
      <div className="ranking-inner">
        <div className="ranking-header">
          <div className="section-eyebrow-dark">🏆 Clasificación</div>
          <div className="ranking-headline">Ranking Top 50</div>
          <div className="ranking-meta">
            <div className="ranking-stats">
              <span><strong>{fmt(total)}</strong> participantes</span>
              <span><strong>{fmt(leader?.total || 0)}</strong> pts · 1er lugar</span>
            </div>
            <div className="ranking-updated">
              <div className="dot" />
              <span>Actualizado: {updatedAt ? formatUpdated(updatedAt) : '—'}</span>
            </div>
          </div>
        </div>
        <Podium data={data} />
        <Table data={data} />
      </div>
    </section>
  );
}
