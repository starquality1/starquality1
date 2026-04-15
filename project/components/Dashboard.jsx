'use client';
import { N, G, C2, Btn, Card, Callout } from './ui';

export default function Dashboard({ role, cv, jd, readiness, onGoTo, onRestart }) {
  const steps = [
    { label: 'Role', done: !!role, detail: role?.primary, screen: 'role' },
    { label: 'CV', done: !!(cv?.bullets?.length), detail: cv ? cv.bullets.length + ' bullets' : '', screen: 'cv' },
    { label: 'JD', done: !!jd, detail: jd ? jd.decision : '', screen: 'jd' },
    { label: 'Readiness', done: !!readiness, detail: readiness ? readiness.score + '/6' : '', screen: 'readiness' },
  ];
  const next = steps.find(s => !s.done);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, marginBottom: 4 }}>
          Your career system
        </div>
        <p style={{ color: '#aaa', fontSize: 14 }}>{steps.filter(s => s.done).length} of 4 steps complete</p>
      </div>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <div key={s.label} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: s.done ? '#2D6A4F' : C2,
                  color: s.done ? '#fff' : '#aaa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>
                  {s.done ? '✓' : i + 1}
                </div>
                <span style={{
                  fontSize: 9, color: s.done ? '#2D6A4F' : '#aaa',
                  fontWeight: s.done ? 600 : 400,
                  textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.3,
                }}>
                  {s.label}
                </span>
                {s.detail && <span style={{ fontSize: 9, color: G, fontWeight: 700 }}>{s.detail}</span>}
              </div>
              {i < 3 && (
                <div style={{ flex: 1, height: 2, background: s.done ? '#2D6A4F' : C2, margin: '0 4px', marginTop: -16 }} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {role && (
        <Card style={{ marginBottom: 12, borderColor: G }}>
          <div style={{ fontSize: 11, color: G, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>YOUR ROLE</div>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: N, marginBottom: 4 }}>{role.primary}</div>
          {role.secondary && <div style={{ fontSize: 13, color: '#aaa' }}>Secondary option: {role.secondary}</div>}
        </Card>
      )}

      {readiness && (
        <Card style={{
          marginBottom: 12,
          borderColor: readiness.status === 'READY' ? '#6EE7B7' : readiness.status === 'ALMOST' ? '#FCD34D' : '#FCA5A5',
        }}>
          <div style={{
            fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20,
            color: readiness.status === 'READY' ? '#1B5E3B' : readiness.status === 'ALMOST' ? '#92400E' : '#991B1B',
            marginBottom: 4,
          }}>
            {readiness.status === 'READY' ? 'Ready to apply' : readiness.status === 'ALMOST' ? 'Almost ready' : 'Not ready yet'}
          </div>
          <div style={{ fontSize: 13, color: '#aaa' }}>{readiness.score}/{readiness.maxScore} checks passed</div>
        </Card>
      )}

      {next ? (
        <Callout style={{ marginBottom: 20 }}>
          <strong>Next action: </strong>
          {next.screen === 'role' && 'Complete the Role Matcher. Step 1.'}
          {next.screen === 'cv' && 'Use the CV Bullet Translator to rewrite your experience in tech language.'}
          {next.screen === 'jd' && 'Paste a real job description into the JD Analyser.'}
          {next.screen === 'readiness' && 'Complete the Readiness Check to know if you are ready to apply.'}
          <button
            onClick={() => onGoTo(next.screen)}
            style={{ display: 'block', marginTop: 8, background: 'none', border: 'none', color: N, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, textDecoration: 'underline', padding: 0 }}
          >
            Go there now →
          </button>
        </Callout>
      ) : (
        <Callout bg="#F0FFF4" border="#6EE7B7" style={{ marginBottom: 20 }}>
          <strong>All steps complete.</strong> Start with your first 5 applications this week. Set up job alerts on LinkedIn, Indeed, and Otta for your target role titles.
        </Callout>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {steps.map(s => (
          <Btn key={s.screen} variant="outline" sm onClick={() => onGoTo(s.screen)}>{s.label}</Btn>
        ))}
        <Btn variant="ghost" sm onClick={onRestart}>Start over</Btn>
      </div>
    </div>
  );
}
