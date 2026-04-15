'use client';
import { useState } from 'react';
import { N, G, C, C2, Btn, Card, Tag, Callout } from './ui';

const MANUAL = [
  {
    id: 'keywords',
    q: 'Have you added keywords from a real job description to your CV?',
    opts: ['Yes, I have matched the language', 'Partially, some keywords added', 'Not yet'],
  },
  {
    id: 'portfolio',
    q: 'Do you have at least one finished portfolio piece?',
    opts: ['Yes, it is complete and polished', 'In progress, nearly done', 'Not yet started'],
  },
  {
    id: 'examples',
    q: 'Have you prepared at least 2 interview examples from your experience?',
    opts: ['Yes, I have structured examples ready', 'Working on it', 'Not yet'],
  },
];

export default function ReadinessCheck({ onDone, role, cv, jd, existing }) {
  const [ans, setAns] = useState({});
  const [result, setResult] = useState(existing || null);

  const good = v => v && (v.startsWith('Yes') || v.startsWith('In progress'));

  const check = () => {
    const autoScore = [!!role, !!(cv?.bullets?.length), !!jd].filter(Boolean).length;
    const manualScore = MANUAL.filter(m => good(ans[m.id])).length;
    const total = autoScore + manualScore;
    const status = total >= 6 ? 'READY' : total >= 4 ? 'ALMOST' : 'NOT_READY';

    const fixes = [];
    if (!role) fixes.push({ issue: 'Target role not selected', fix: 'Complete the Role Matcher. Step 1.' });
    if (!cv?.bullets?.length) fixes.push({ issue: 'CV bullets not translated', fix: 'Complete the CV Bullet Translator before applying.' });
    if (!jd) fixes.push({ issue: 'No job descriptions analysed', fix: 'Use the JD Analyser on at least one real role.' });
    if (!good(ans.keywords)) fixes.push({ issue: 'CV keywords not updated', fix: 'Add keywords from a real job description to your CV opening summary.' });
    if (!good(ans.portfolio)) fixes.push({ issue: 'Portfolio not ready', fix: 'You need at least one finished portfolio piece before applying. Hiring managers will ask about it in screening calls.' });
    if (!good(ans.examples)) fixes.push({ issue: 'No interview examples prepared', fix: 'Prepare at least 2 structured STAR-method examples from your work experience before your first interview.' });

    const r = { status, score: total, maxScore: 6, fixes };
    setResult(r);
    onDone(r);
  };

  if (result) return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Tag>Your Result</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Readiness verdict
        </h2>
      </div>

      <div style={{
        background: result.status === 'READY' ? '#F0FFF4' : result.status === 'ALMOST' ? '#FFFBEB' : '#FFF5F5',
        border: `2px solid ${result.status === 'READY' ? '#6EE7B7' : result.status === 'ALMOST' ? '#FCD34D' : '#FCA5A5'}`,
        borderRadius: 12, padding: 24, marginBottom: 16,
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28,
          color: result.status === 'READY' ? '#1B5E3B' : result.status === 'ALMOST' ? '#92400E' : '#991B1B',
          marginBottom: 8,
        }}>
          {result.status === 'READY' ? 'You are ready to apply.' : result.status === 'ALMOST' ? 'You are almost ready.' : 'Not ready yet.'}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#aaa', marginBottom: 8 }}>
          {result.score}/{result.maxScore} checks passed
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555' }}>
          {result.status === 'READY'
            ? 'Your role is chosen, your CV is updated, and you have analysed live job descriptions. Start with your first 5 applications this week. Track every one from day one.'
            : result.status === 'ALMOST'
            ? 'You are close. Fix the items below before you start applying. Sending applications with gaps in your preparation wastes the opportunity.'
            : 'Complete the items below before applying. Sending applications now is likely to produce silence. Not because of who you are, but because your materials are not yet competitive.'}
        </p>
      </div>

      {result.fixes.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: N, fontSize: 15, marginBottom: 12 }}>What to fix first</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {result.fixes.map((f, i) => (
              <Card key={i} style={{ borderLeft: `3px solid ${G}` }}>
                <div style={{ fontWeight: 600, color: N, fontSize: 14, marginBottom: 4 }}>{f.issue}</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>{f.fix}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {result.status === 'READY' && (
        <Callout style={{ marginBottom: 16 }}>
          <strong>Next step: </strong>Go to LinkedIn, Indeed, and Otta. Set up job alerts for your target titles. Apply to 5 to 8 well-matched roles per week.
        </Callout>
      )}

      <Btn variant="ghost" sm onClick={() => setResult(null)}>Re-check my readiness</Btn>
    </div>
  );

  const allAns = MANUAL.every(m => ans[m.id]);
  const auto = [
    { q: 'Target role chosen', done: !!role, detail: role?.primary },
    { q: 'CV bullets translated', done: !!(cv?.bullets?.length), detail: cv ? cv.bullets.length + ' bullets' : '' },
    { q: 'Job description analysed', done: !!jd, detail: jd ? jd.decision : '' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Tag>Step 4 of 4</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Are you ready to apply?
        </h2>
        <p style={{ color: '#666', fontSize: 14 }}>Six honest questions. This checkpoint prevents wasted applications.</p>
      </div>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 700, color: N, fontSize: 14, marginBottom: 12 }}>Detected from your progress</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {auto.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{a.done ? '✓' : '✗'}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: N }}>{a.q}</div>
                <div style={{ fontSize: 12, color: a.done ? '#2D6A4F' : '#aaa' }}>
                  {a.done ? (a.detail || 'Done') : 'Not yet'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {MANUAL.map(m => (
          <Card key={m.id}>
            <div style={{ fontWeight: 600, color: N, fontSize: 14, marginBottom: 12 }}>{m.q}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {m.opts.map(o => (
                <button
                  key={o}
                  onClick={() => setAns(a => ({ ...a, [m.id]: o }))}
                  style={{
                    background: ans[m.id] === o ? N : C,
                    color: ans[m.id] === o ? '#fff' : N,
                    border: `1px solid ${ans[m.id] === o ? N : C2}`,
                    borderRadius: 8, padding: '10px 14px', textAlign: 'left',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                    fontWeight: 500, transition: 'all .15s',
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Btn onClick={check} full disabled={!allAns}>
        {allAns ? 'Check my readiness' : 'Answer all questions above'}
      </Btn>
    </div>
  );
}
