'use client';
import { useState } from 'react';

export const N = '#1B2A4A';
export const G = '#C9A84C';
export const C = '#FAF6EF';
export const C2 = '#EDE8DC';

export const Btn = ({ children, onClick, variant = 'primary', disabled, full, sm }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: variant === 'primary' ? N : variant === 'gold' ? G : 'transparent',
      color: variant === 'outline' || variant === 'ghost' ? N : '#fff',
      border: variant === 'outline' ? `2px solid ${N}` : variant === 'ghost' ? `1px solid ${C2}` : 'none',
      borderRadius: 8,
      padding: sm ? '8px 16px' : '13px 26px',
      fontSize: sm ? 12 : 15,
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'inherit',
      width: full ? '100%' : 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: 0.3,
      transition: 'opacity .15s',
    }}
  >
    {children}
  </button>
);

export const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 12,
      border: `1px solid ${C2}`,
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Tag = ({ children, color = N }) => (
  <span
    style={{
      background: color + '18',
      color,
      border: `1px solid ${color}30`,
      borderRadius: 20,
      padding: '3px 10px',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
    }}
  >
    {children}
  </span>
);

export const Callout = ({ children, bg = '#F5E6C0', border = '#C9A84C', style = {} }) => (
  <div
    style={{
      background: bg,
      borderLeft: `3px solid ${border}`,
      borderRadius: '0 6px 6px 0',
      padding: '12px 16px',
      fontSize: 13,
      lineHeight: 1.7,
      color: N,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Spinner = ({ label = 'Working...' }) => (
  <div style={{ textAlign: 'center', padding: '40px 24px' }}>
    <div
      style={{
        width: 32,
        height: 32,
        border: `3px solid ${C2}`,
        borderTop: `3px solid ${N}`,
        borderRadius: '50%',
        animation: 'spin .8s linear infinite',
        margin: '0 auto 14px',
      }}
    />
    <p style={{ color: '#888', fontSize: 14 }}>{label}</p>
  </div>
);

export function CopyBtn({ text }) {
  const [done, set] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        set(true);
        setTimeout(() => set(false), 1500);
      }}
      style={{
        background: 'none',
        border: `1px solid ${C2}`,
        borderRadius: 6,
        padding: '4px 10px',
        fontSize: 11,
        color: done ? '#2D6A4F' : '#888',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontWeight: 600,
      }}
    >
      {done ? 'Copied ✓' : 'Copy'}
    </button>
  );
}

export const StepBar = ({ curIdx, role, cv, jd, readiness }) => {
  const labels = ['Role', 'CV', 'JD', 'Readiness'];
  const done = [role, cv, jd, readiness];
  return (
    <div style={{ background: '#fff', borderBottom: `1px solid ${C2}`, padding: '12px 24px' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        {labels.map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: done[i] ? '#2D6A4F' : i === curIdx ? N : C2,
                  color: done[i] || i === curIdx ? '#fff' : '#bbb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  border: i === curIdx ? `2px solid ${G}` : '2px solid transparent',
                }}
              >
                {done[i] ? '✓' : i + 1}
              </div>
              <span
                style={{
                  fontSize: 9,
                  color: i === curIdx ? N : '#bbb',
                  fontWeight: i === curIdx ? 700 : 400,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                }}
              >
                {s}
              </span>
            </div>
            {i < 3 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: done[i] ? '#2D6A4F' : C2,
                  margin: '0 4px',
                  marginTop: -14,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
