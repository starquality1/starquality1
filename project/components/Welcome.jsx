'use client';
import { N, G, C2, Btn, Card } from './ui';

export default function Welcome({ role, cv, jd, readiness, onStart }) {
  const done = [role, cv, jd, readiness].filter(Boolean).length;
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(26px, 5vw, 36px)',
            color: N,
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          You do not need to figure
          <br />
          everything out today.
        </div>
        <p style={{ color: '#555', fontSize: 16, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.7 }}>
          This system guides you step by step. From choosing your role to knowing exactly when you are ready to apply.
        </p>
        <Btn onClick={onStart}>{done > 0 ? 'Continue where I left off' : 'Start my plan →'}</Btn>
        {done > 0 && (
          <p style={{ marginTop: 10, fontSize: 13, color: '#aaa' }}>{done} of 4 steps complete</p>
        )}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 14,
        }}
      >
        {[
          { n: '01', t: 'Role Matcher', d: 'Find your best-fit entry-level tech role based on your background and working style.', done: !!role },
          { n: '02', t: 'CV Bullet Translator', d: 'Transform your job responsibilities into tech-aligned, action-driven bullet points.', done: !!cv },
          { n: '03', t: 'JD Analyser', d: 'Paste any job description and get an honest verdict: apply, stretch, or skip.', done: !!jd },
          { n: '04', t: 'Readiness Check', d: 'Get a clear assessment of whether you are ready to start applying right now.', done: !!readiness },
        ].map(({ n, t, d, done: itemDone }) => (
          <Card key={n} style={{ borderColor: itemDone ? G : C2, position: 'relative' }}>
            {itemDone && (
              <div style={{ position: 'absolute', top: 12, right: 12, color: '#2D6A4F', fontSize: 16 }}>✓</div>
            )}
            <div style={{ fontSize: 11, color: G, fontWeight: 700, letterSpacing: 2, marginBottom: 6 }}>{n}</div>
            <div style={{ fontWeight: 700, color: N, fontSize: 15, marginBottom: 6 }}>{t}</div>
            <div style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>{d}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
