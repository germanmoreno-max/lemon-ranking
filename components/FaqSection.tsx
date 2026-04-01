'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: '¿Cómo acumulo más puntos?',
    a: (
      <>
        La forma más poderosa es referir amigos: cada persona que se registre con tu enlace te suma{' '}
        <strong>+20 puntos</strong> y no tiene límite. También puedes ganar puntos completando
        acciones como calificarnos en la app (+15), descargarla (+10), conocer más de la Lemon Card
        (+10), seguirnos en Instagram (+5) y en TikTok (+5).
      </>
    ),
  },
  {
    q: '¿Dónde encuentro mi enlace de referido?',
    a: (
      <>
        Tu enlace personalizado te llegó al correo cuando te registraste en{' '}
        <a href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
          sumatealemon.co
        </a>
        . También puedes encontrarlo iniciando sesión en la página de la competencia.
      </>
    ),
  },
  {
    q: '¿Cuándo termina la competencia y cuándo se entregan los premios?',
    a: (
      <>
        Las fechas exactas de cierre y entrega de premios están detalladas en los{' '}
        <a
          href="https://legals.lemon.me/terminos-y-condiciones-waiting-list-colombia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Términos y Condiciones
        </a>
        . El ranking se actualiza periódicamente con los datos más recientes de ViralSweep.
      </>
    ),
  },
  {
    q: '¿Quién puede participar?',
    a: (
      <>
        La competencia es exclusiva para residentes en Colombia mayores de 18 años que se hayan
        registrado en la lista de espera de Lemon Card. Consulta los{' '}
        <a
          href="https://legals.lemon.me/terminos-y-condiciones-waiting-list-colombia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Términos y Condiciones
        </a>{' '}
        para conocer todos los requisitos.
      </>
    ),
  },
  {
    q: '¿Qué pasa si dos personas tienen el mismo puntaje?',
    a: 'En caso de empate, se prioriza quien alcanzó el puntaje primero según la fecha y hora de registro de sus entradas en el sistema.',
  },
  {
    q: '¿Qué es la Lemon Card?',
    a: (
      <>
        Lemon Card es la tarjeta Visa de Lemon, diseñada para colombianos que quieren una forma
        simple y moderna de manejar su dinero. Regístrate en{' '}
        <a href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
          sumatealemon.co
        </a>{' '}
        para ser de los primeros en tenerla.
      </>
    ),
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="section-eyebrow-dark" style={{ color: 'var(--green)' }}>
          ❓ Preguntas frecuentes
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className={`faq-item${openIndex === idx ? ' open' : ''}`}>
              <button className="faq-q" onClick={() => toggle(idx)}>
                {item.q}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
