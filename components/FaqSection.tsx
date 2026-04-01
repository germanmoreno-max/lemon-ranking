'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: '¿Qué es la Lemon Card?',
    a: (
      <>
        Lemon Card es una tarjeta prepaga VISA diseñada para colombianos que quieren una forma simple
        y moderna de manejar su dinero, con cashback en cripto por cada compra. Regístrate en{' '}
        <a href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
          sumatealemon.co
        </a>{' '}
        para ser de los primeros en tenerla.
      </>
    ),
  },
  {
    q: '¿Necesito ser usuario de Lemon para unirme a la lista de espera?',
    a: (
      <>
        No. Cualquier persona puede inscribirse en{' '}
        <a href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
          sumatealemon.co
        </a>{' '}
        aunque todavía no tenga cuenta en Lemon. Solo debes ser mayor de 18 años y residir en Colombia.
      </>
    ),
  },
  {
    q: '¿Para qué sirve la lista de espera si no soy usuario?',
    a: 'La lista de espera te permite reservar tu lugar para ser de los primeros en recibir la Lemon Card cuando llegue a Colombia y, en el proceso, participar por premios mientras esperas. Es la forma de entrar antes que el resto.',
  },
  {
    q: '¿Quién puede participar en la competencia?',
    a: (
      <>
        La competencia es para personas mayores de 18 años que residan en Colombia y se hayan
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
    q: '¿Qué tengo que hacer para sumar puntos?',
    a: (
      <>
        Hay seis formas de acumular puntos:
        <ul style={{ marginTop: '10px', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li><strong>+20 pts</strong> — Invitar amigos a la lista de espera (sin límite)</li>
          <li><strong>+15 pts</strong> — Calificar la app en App Store o Play Store</li>
          <li><strong>+10 pts</strong> — Descargar la aplicación</li>
          <li><strong>+10 pts</strong> — Conocer más de la Lemon Card (ver video)</li>
          <li><strong>+5 pts</strong> — Seguir a @lemoncash_co en Instagram</li>
          <li><strong>+5 pts</strong> — Seguir a @lemonapp.col en TikTok</li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Cómo invito amigos a la lista de espera?',
    a: (
      <>
        Luego de registrarte en{' '}
        <a href="https://sumatealemon.co" target="_blank" rel="noopener noreferrer">
          sumatealemon.co
        </a>
        , recibirás un enlace personalizado por correo. Compártelo con tus amigos y por cada uno que
        se registre ganarás <strong>+20 puntos</strong>. No hay límite de referidos.
      </>
    ),
  },
  {
    q: '¿Tengo que descargar la app para participar?',
    a: (
      <>
        No es obligatorio para inscribirte, pero descargar la app suma{' '}
        <strong>+10 puntos</strong> automáticamente. Además, cuando recibas tu Lemon Card necesitarás
        tener la cuenta activa en la app para poder activarla y usarla.
      </>
    ),
  },
  {
    q: '¿Por qué bajé de puesto en el ranking si referí a más personas?',
    a: 'El ranking es competitivo: aunque hayas referido nuevas personas, tu posición puede bajar si otros participantes acumularon más puntos que tú en el mismo período. También puede ocurrir que tus referidos aún no hayan completado su registro. ¡Sigue refiriendo! No hay límite de puntos.',
  },
  {
    q: '¿Cuándo anuncian a los ganadores?',
    a: (
      <>
        La campaña va del <strong>12 de marzo al 6 de abril de 2026</strong> a las 23:59 h. Los
        ganadores se anuncian el <strong>7 de abril de 2026</strong> en las redes sociales de Lemon.
        Si resultás ganador, tendrás <strong>72 horas</strong> para confirmar tus datos; de lo
        contrario, el premio pasa al siguiente en la lista.
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
        . Si no lo encuentras, revisa tu carpeta de spam o escribe a{' '}
        <a href="mailto:soporte@lemon.me">soporte@lemon.me</a>.
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
        <p className="tc-link">
          ¿Tienes más dudas?{' '}
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
