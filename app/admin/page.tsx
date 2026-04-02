'use client';

import { useState, useRef } from 'react';

const LEMON_SVG_PATH =
  'M764.649 281.368v73.222l-226.723.22-.441-251.866h73.221V281.59l153.943-.221zm285.609-.221v73.222l-252.307.442-.44-252.087 252.085-.441v73.222l-178.864.22v16.32l179.085-.22v73.156l-179.085.22v16.321l179.526-.375zm357.728-178.975l.22 252.087h-73.221V247.734l-57.343 107.407h-64.4l-57.783-107.186V354.7h-73.001V102.614h78.074l84.91 157.956 84.47-158.133 78.074-.265zm296.46 126.088v.22c0 69.085-56.848 125.934-125.933 125.934h-23.046c-69.147 0-126.044-56.897-126.044-126.044 0-69.02 56.692-125.862 125.712-126.043h23.334c69.093 0 125.953 56.84 125.977 125.933zm-73.001 0c-.084-29.007-23.925-52.848-52.932-52.932h-22.716c-29.037 0-52.932 23.895-52.932 52.932 0 29.037 23.895 52.932 52.932 52.932h22.496c29.079.013 53.044-23.853 53.152-52.932zm368.491 126.286h-83.147l-119.096-147.547.221 147.767h-73.222l-.44-252.086h83.146l119.095 147.988-.44-147.988h73.221l.662 251.866zM228.505 0C103.117 0-.063 103.18-.063 228.567s103.18 228.568 228.568 228.568c125.387 0 228.568-103.18 228.568-228.568C456.963 103.22 353.852.108 228.505-.001zm119.89 239.206a16.854 16.854 0 0 1-4.888 2.875 25.943 25.943 0 0 1-6.325 1.725c-4.962.767-10.02.67-14.95-.288a97.322 97.322 0 0 1-31.626-12.65 189.903 189.903 0 0 1-28.463-21.563 409.48 409.48 0 0 1-12.938-12.938c-4.025-4.313-8.338-9.2-12.075-14.088-1.541-2.064-4.465-2.573-6.613-1.15-2.326 1.45-3.096 4.525-1.725 6.9 3.45 5.463 7.188 10.638 10.925 15.813 3.738 5.175 8.05 10.063 12.363 14.95a192.674 192.674 0 0 0 28.75 26.451 116.594 116.594 0 0 0 36.227 18.4 102.307 102.307 0 0 0 13.513 2.588 3.35 3.35 0 0 1 3.188 3.333c0 .135-.009.27-.026.405a2.19 2.19 0 0 1-.575 1.437 176.361 176.361 0 0 1-27.025 34.789c-31.914 31.913-72.74 49.451-109.828 49.451a100.129 100.129 0 0 1-44.851-9.775l-3.163-1.438a3.65 3.65 0 0 0-3.45 0l-2.875 2.013a29.221 29.221 0 0 1-15.813 4.888 16.443 16.443 0 0 1-12.65-4.888c-6.038-6.038-6.325-17.538-.287-27.6l1.725-3.163a3.65 3.65 0 0 0 0-3.45l-1.725-3.163c-15.813-29.9-14.663-69.29 1.437-105.803a3.455 3.455 0 0 1 4.6-1.725c.825.25 1.475.9 1.725 1.725a132.023 132.023 0 0 0 12.075 22.713 178.992 178.992 0 0 0 25.014 30.189 154.415 154.415 0 0 0 14.375 12.937 306.813 306.813 0 0 0 15.238 11.788 4.926 4.926 0 0 0 3.019 1.035c2.696 0 4.916-2.22 4.916-4.916 0-1.515-.702-2.95-1.898-3.881-4.6-4.026-9.2-8.338-13.512-12.65-4.313-4.313-8.338-8.914-12.363-13.514a185.283 185.283 0 0 1-20.126-29.613 92.466 92.466 0 0 1-10.637-32.2 43.514 43.514 0 0 1 0-14.951 45.55 45.55 0 0 1 2.012-5.75l1.15-1.725a136.423 136.423 0 0 1 10.638-11.5c46.863-47.152 112.127-62.677 158.129-37.952l3.45 1.725a3.65 3.65 0 0 0 3.45 0l3.162-2.012c10.638-6.9 22.713-7.188 29.326-.575 6.613 6.612 6.325 19.263-1.15 30.188l-2.3 2.875a3.711 3.711 0 0 0-.288 3.45l1.725 3.45c11.788 25.014 12.363 56.064 2.013 86.828z';

type UploadResult = {
  ok: boolean;
  total?: number;
  top?: { first: string; last: string; total: number };
  error?: string;
  skipped?: Array<{ email: string; rawTotal: string; rawCols: string[] }>;
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Password is verified server-side on upload; here we just store it
    if (!password.trim()) { setLoginError('Ingresa la contraseña'); return; }
    setAuthed(true);
    setLoginError('');
  }

  async function handleUpload(f: File) {
    setUploading(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append('csv', f);
      // Use the file's own creation timestamp (when ViralSweep exported it)
      const fileCreatedAt = new Date(f.lastModified).toISOString();
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'x-downloaded-at': fileCreatedAt },
        body: fd,
      });
      const json: UploadResult = await res.json();
      if (res.status === 401) {
        setAuthed(false);
        setLoginError('Contraseña incorrecta');
        return;
      }
      setResult(json);
    } catch {
      setResult({ ok: false, error: 'Error de conexión' });
    } finally {
      setUploading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) { setFile(f); handleUpload(f); }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.endsWith('.csv')) { setFile(f); handleUpload(f); }
  }

  // ── LOGIN ──────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={S.page}>
        <div style={S.loginCard}>
          <svg style={S.logo} viewBox="0 0 2000 458" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
            <path d={LEMON_SVG_PATH} fill="#00f068" fillRule="nonzero" />
          </svg>
          <p style={S.loginSub}>Panel de administración</p>
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={S.input}
              autoFocus
            />
            {loginError && <p style={S.error}>{loginError}</p>}
            <button type="submit" style={S.btn}>Ingresar →</button>
          </form>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ──────────────────────────────────────────────
  return (
    <div style={S.page}>
      <div style={S.dashboard}>

        {/* Header */}
        <div style={S.header}>
          <svg style={{ height: 24, width: 'auto' }} viewBox="0 0 2000 458" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
            <path d={LEMON_SVG_PATH} fill="#00f068" fillRule="nonzero" />
          </svg>
          <span style={S.badge}>Admin</span>
          <button onClick={() => setAuthed(false)} style={S.logoutBtn}>Cerrar sesión</button>
        </div>

        <h1 style={S.title}>Actualizar Ranking</h1>
        <p style={S.subtitle}>Exporta el CSV desde ViralSweep y súbelo aquí. El ranking público se actualiza al instante.</p>

        {/* Drop zone */}
        <div
          style={{ ...S.dropzone, ...(dragging ? S.dropzoneDrag : {}) }}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={onFileChange} />
          <div style={S.dropIcon}>{uploading ? '⏳' : '📂'}</div>
          <div style={S.dropTitle}>
            {uploading ? 'Procesando CSV...' : file ? file.name : 'Arrastra el CSV aquí o haz clic para seleccionar'}
          </div>
          {!uploading && <div style={S.dropSub}>Export de ViralSweep · formato .csv</div>}
        </div>

        {/* Result */}
        {result && (
          <>
            <div style={{ ...S.resultBox, ...(result.ok ? S.resultOk : S.resultErr) }}>
              {result.ok ? (
                <>
                  <span style={S.resultIcon}>✅</span>
                  <div>
                    <strong>Ranking actualizado correctamente</strong>
                    <p style={{ margin: '4px 0 0', fontSize: 14, opacity: 0.8 }}>
                      {result.total?.toLocaleString('es-CO')} participantes · Líder: {result.top?.first} {result.top?.last} ({result.top?.total?.toLocaleString('es-CO')} pts)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span style={S.resultIcon}>❌</span>
                  <div><strong>Error:</strong> {result.error}</div>
                </>
              )}
            </div>
            {result.skipped && result.skipped.length > 0 && (
              <div style={S.skippedBox}>
                <p style={S.skippedTitle}>⚠️ {result.skipped.length} entrada(s) con puntos = 0 (posible error de parseo)</p>
                {result.skipped.map((s, i) => (
                  <div key={i} style={S.skippedRow}>
                    <span style={S.skippedEmail}>{s.email}</span>
                    <span style={S.skippedMeta}>c[9]=&quot;{s.rawTotal}&quot; · cols[7-12]: [{s.rawCols.slice(7, 13).map(v => `"${v}"`).join(', ')}]</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Instructions */}
        <div style={S.instructions}>
          <p style={S.instrTitle}>¿Cómo exportar el CSV?</p>
          <ol style={S.instrList}>
            <li>Entra a <strong>app.viralsweep.com</strong> → tu campaña</li>
            <li>Ve a <strong>Entries → Export</strong></li>
            <li>Descarga el archivo <code>.csv</code></li>
            <li>Súbelo aquí arriba</li>
          </ol>
        </div>

        <a href="/" style={S.viewLink}>← Ver ranking público</a>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh', background: '#0a0a0a',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24, fontFamily: 'system-ui, sans-serif',
  },
  loginCard: {
    background: '#141414', borderRadius: 20, padding: '48px 40px',
    width: '100%', maxWidth: 400, display: 'flex',
    flexDirection: 'column', alignItems: 'center', gap: 8,
    border: '1px solid #2a2a2a',
  },
  logo: { height: 32, width: 'auto', marginBottom: 8 },
  loginSub: { color: '#666', fontSize: 13, margin: '0 0 24px' },
  input: {
    width: '100%', background: '#1e1e1e', border: '1px solid #333',
    borderRadius: 10, padding: '14px 16px', color: '#fff',
    fontSize: 15, marginBottom: 8, boxSizing: 'border-box',
    outline: 'none',
  },
  error: { color: '#ff5555', fontSize: 13, margin: '0 0 8px' },
  btn: {
    width: '100%', background: '#00f068', color: '#000',
    border: 'none', borderRadius: 10, padding: '14px',
    fontSize: 15, fontWeight: 800, cursor: 'pointer',
  },
  dashboard: {
    background: '#141414', borderRadius: 20, padding: '40px',
    width: '100%', maxWidth: 600, border: '1px solid #2a2a2a',
  },
  header: {
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
  },
  badge: {
    background: 'rgba(0,240,104,0.15)', color: '#00f068',
    borderRadius: 100, padding: '3px 10px', fontSize: 12, fontWeight: 700,
  },
  logoutBtn: {
    marginLeft: 'auto', background: 'transparent', border: '1px solid #333',
    color: '#666', borderRadius: 8, padding: '6px 14px',
    fontSize: 13, cursor: 'pointer',
  },
  title: { color: '#fff', fontSize: 26, fontWeight: 900, margin: '0 0 8px', letterSpacing: -0.5 },
  subtitle: { color: '#666', fontSize: 14, margin: '0 0 28px', lineHeight: 1.5 },
  dropzone: {
    border: '2px dashed #2a2a2a', borderRadius: 16, padding: '40px 24px',
    textAlign: 'center', cursor: 'pointer', transition: 'all .2s',
    background: '#1a1a1a', marginBottom: 20,
  },
  dropzoneDrag: { borderColor: '#00f068', background: 'rgba(0,240,104,0.05)' },
  dropIcon: { fontSize: 40, marginBottom: 12 },
  dropTitle: { color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 6 },
  dropSub: { color: '#555', fontSize: 13 },
  resultBox: {
    borderRadius: 12, padding: '16px 20px', marginBottom: 20,
    display: 'flex', alignItems: 'flex-start', gap: 12,
  },
  resultOk: { background: 'rgba(0,240,104,0.1)', border: '1px solid rgba(0,240,104,0.3)', color: '#fff' },
  resultErr: { background: 'rgba(255,85,85,0.1)', border: '1px solid rgba(255,85,85,0.3)', color: '#fff' },
  resultIcon: { fontSize: 20, flexShrink: 0 },
  instructions: {
    background: '#1a1a1a', borderRadius: 12, padding: '20px 24px', marginBottom: 24,
  },
  instrTitle: { color: '#fff', fontWeight: 700, fontSize: 14, margin: '0 0 12px' },
  instrList: { color: '#888', fontSize: 13, lineHeight: 2, margin: 0, paddingLeft: 20 },
  viewLink: {
    display: 'block', textAlign: 'center', color: '#00f068',
    textDecoration: 'none', fontSize: 14, fontWeight: 600,
  },
  skippedBox: {
    background: 'rgba(255,200,0,0.08)', border: '1px solid rgba(255,200,0,0.3)',
    borderRadius: 12, padding: '16px 20px', marginBottom: 20,
  },
  skippedTitle: { color: '#ffc800', fontWeight: 700, fontSize: 13, margin: '0 0 10px' },
  skippedRow: { display: 'flex', flexDirection: 'column' as const, gap: 2, marginBottom: 8 },
  skippedEmail: { color: '#fff', fontSize: 13, fontWeight: 600 },
  skippedMeta: { color: '#888', fontSize: 11, fontFamily: 'monospace', wordBreak: 'break-all' as const },
};
