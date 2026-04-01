'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { RankingEntry } from '../types';

// ─── Helper functions ───────────────────────────────────────────────────────

function ini(f: string, l: string): string {
  return ((f || '')[0] || '').toUpperCase() + ((l || '')[0] || '').toUpperCase();
}

function flag(loc: string): string {
  const l = (loc || '').toLowerCase();
  if (l.includes('colombia') || l === 'co') return '🇨🇴 ';
  if (l.includes('argentina')) return '🇦🇷 ';
  if (l.includes('brasil') || l.includes('brazil')) return '🇧🇷 ';
  return '🌎 ';
}

function cleanLoc(l: string): string {
  if (!l || l.trim() === 'CO') return 'Colombia';
  return l.replace(/\s+/g, ' ').trim();
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

// ─── CSV parser — handles ViralSweep column-shift bug ──────────────────────

function parseLine(line: string): string[] {
  const cols: string[] = [];
  let cur = '';
  let inq = false;
  for (const c of line) {
    if (c === '"') {
      inq = !inq;
    } else if (c === ',' && !inq) {
      cols.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  cols.push(cur);
  return cols;
}

function parseCSV(text: string): RankingEntry[] {
  const lines = text.split('\n').filter((l) => l.trim());
  const rows: RankingEntry[] = [];
  for (let i = 1; i < lines.length; i++) {
    const c = parseLine(lines[i]);
    if (c.length < 10) continue;
    const shifted = c[12].trim() === '' && (c[13] || '').toLowerCase().includes('full page');
    const ri = shifted ? 14 : 13;
    const fe = (s: string) => {
      try {
        return decodeURIComponent(escape(s || ''));
      } catch {
        return s || '';
      }
    };
    const email = (c[0] || '').trim();
    if (!email) continue;
    rows.push({
      email,
      first: fe((c[10] || '').trim()),
      last: fe((c[11] || '').trim()),
      location: fe((c[2] || '').trim()),
      total: parseInt(c[9] || '0') || 0,
      referrals: parseInt(c[ri] || '0') || 0,
    });
  }
  return rows.sort((a, b) => b.total - a.total);
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
        const loc = cleanLoc(d.location);
        return (
          <div key={idx} className={`pod-card ${cls}`}>
            <span className="pod-medal">{medal}</span>
            <div className="pod-pos">{pos}</div>
            <div className="pod-av">{ini(d.first, d.last)}</div>
            <div className="pod-name">{d.first} {d.last}</div>
            <div className="pod-loc">{flag(loc)}{loc}</div>
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
        <div>Ubicación</div>
        <div>Referidos</div>
        <div style={{ textAlign: 'right' }}>Puntos</div>
      </div>
      <div>
        {rows.map((d, i) => {
          const rank = i + 4;
          const loc = cleanLoc(d.location);
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
              <div className="c-loc">{flag(loc)}{loc}</div>
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
  const [data, setData] = useState<RankingEntry[]>(initialData);
  const [total, setTotal] = useState<number>(initialTotal);
  const [fdate, setFdate] = useState<string>('27 Mar 2026');
  const [dropVisible, setDropVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSVLoaded = useCallback((text: string, encoding: string = 'ISO-8859-1') => {
    const rows = parseCSV(text);
    const now = new Date().toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    setFdate(now);
    setData(rows);
    setTotal(rows.length);
  }, []);

  const loadCSV = useCallback((input: HTMLInputElement) => {
    const f = input.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (e) => {
      handleCSVLoaded(e.target?.result as string);
    };
    r.readAsText(f, 'ISO-8859-1');
  }, [handleCSVLoaded]);

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setDropVisible(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      if (!e.relatedTarget) setDropVisible(false);
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setDropVisible(false);
      const f = e.dataTransfer?.files[0];
      if (f?.name.endsWith('.csv')) {
        const r = new FileReader();
        r.onload = (ev) => {
          handleCSVLoaded(ev.target?.result as string);
        };
        r.readAsText(f, 'ISO-8859-1');
      }
    };

    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, [handleCSVLoaded]);

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

      {/* FAB */}
      <button
        className="fab"
        onClick={() => fileInputRef.current?.click()}
      >
        ↑ Actualizar datos
      </button>
      <input
        type="file"
        id="csv-in"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => loadCSV(e.target)}
      />

      {/* Drop overlay */}
      <div className={`drop-ov${dropVisible ? ' on' : ''}`}>
        <div className="drop-box">
          <div style={{ fontSize: '52px' }}>📂</div>
          <div className="drop-t">Soltá el CSV acá</div>
          <div className="drop-s">Export de ViralSweep · el ranking se actualiza al instante</div>
        </div>
      </div>

      {/* Footer date */}
      <footer>
        Lemon Card Colombia · Waiting List Competition · Actualizado: <span id="fdate">{fdate}</span>
      </footer>
    </>
  );
}
