'use client';
import { useState } from 'react';
import { transformBullets } from '@/lib/logic';
import { N, G, C, C2, Btn, Card, Tag, Callout, CopyBtn, Spinner } from './ui';

export default function CVTranslator({ onDone, role, existing }) {
  const [jobTitle, setJobTitle] = useState('');
  const [resps, setResps] = useState(['', '', '']);
  const [achievements, setAchievements] = useState('');
  const [result, setResult] = useState(existing || null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const updResp = (i, v) => {
    const a = [...resps];
    a[i] = v;
    setResps(a);
  };

  const translate = () => {
    const filled = resps.filter(r => r.trim().length > 5);
    if (!filled.length) { setErr('Please enter at least one responsibility.'); return; }
    setErr(null);
    setLoading(true);
    setTimeout(() => {
      const bullets = transformBullets(filled, role?.primary || 'Business Analyst');
      setResult({ bullets });
      setLoading(false);
    }, 800);
  };

  if (result) return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Tag>Your Result</Tag>
          <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
            Your translated CV bullets
          </h2>
          {role && <p style={{ color: '#666', fontSize: 13 }}>Tailored for: <strong>{role.primary}</strong></p>}
        </div>
        <Btn variant="ghost" sm onClick={() => setResult(null)}>Translate more</Btn>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
        {result.bullets?.map((b, i) => (
          <Card key={i}>
            <div style={{ marginBottom: 10 }}><Tag color="#999">Before</Tag></div>
            <p style={{ color: '#aaa', fontSize: 13, lineHeight: 1.6, marginBottom: 14, fontStyle: 'italic' }}>{b.before}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Tag color="#2D6A4F">After</Tag>
              <CopyBtn text={b.after} />
            </div>
            <p style={{ color: N, fontSize: 14, lineHeight: 1.7, fontWeight: 500, marginBottom: 10 }}>{b.after}</p>
            <div style={{ borderTop: `1px solid ${C2}`, paddingTop: 8 }}>
              <span style={{ fontSize: 11, color: '#aaa' }}>Demonstrates: </span>
              <Tag color={G}>{b.skill}</Tag>
            </div>
          </Card>
        ))}
      </div>

      <Callout style={{ marginBottom: 16 }}>
        Copy the After versions onto your CV. Add your specific numbers where possible. Volume, team size, accuracy rates. Numbers make bullets significantly stronger.
      </Callout>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Btn onClick={() => onDone(result)}>Confirm and continue →</Btn>
        <Btn variant="ghost" sm onClick={() => setResult(null)}>Translate more bullets</Btn>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Tag>Step 2 of 4</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Translate your experience
        </h2>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          Type what you actually do at work. We will rewrite it for {role?.primary || 'your target role'}.
        </p>
      </div>

      {role && (
        <div style={{ marginBottom: 14, padding: '10px 14px', background: C, borderRadius: 8, border: `1px solid ${C2}`, fontSize: 13, color: '#555' }}>
          Tailoring for: <strong style={{ color: N }}>{role.primary}</strong>
        </div>
      )}

      <Card style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontWeight: 600, color: N, fontSize: 14, marginBottom: 8 }}>
          Your current job title
        </label>
        <input
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
          placeholder="e.g. NHS Admin Coordinator, Retail Team Leader"
          style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C2}`, borderRadius: 8, fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
        />
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontWeight: 600, color: N, fontSize: 14, marginBottom: 4 }}>Your responsibilities</label>
        <p style={{ fontSize: 12, color: '#aaa', marginBottom: 12 }}>Type each one plainly. One per box.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {resps.map((r, i) => (
            <textarea
              key={i}
              value={r}
              onChange={e => updResp(i, e.target.value)}
              rows={2}
              placeholder={`Responsibility ${i + 1}`}
              style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.5 }}
            />
          ))}
        </div>
        {resps.length < 6 && (
          <button
            onClick={() => setResps([...resps, ''])}
            style={{ marginTop: 10, background: 'none', border: `1px dashed ${C2}`, borderRadius: 8, padding: '8px', fontSize: 13, color: '#aaa', cursor: 'pointer', width: '100%', fontFamily: 'inherit' }}
          >
            + Add another responsibility
          </button>
        )}
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: N, fontSize: 14, marginBottom: 4 }}>
          Achievements or results{' '}
          <span style={{ fontWeight: 400, color: '#aaa' }}>(optional)</span>
        </label>
        <p style={{ fontSize: 12, color: '#aaa', marginBottom: 8 }}>Numbers, percentages, team sizes. These get woven into your bullets.</p>
        <textarea
          value={achievements}
          onChange={e => setAchievements(e.target.value)}
          rows={2}
          placeholder='e.g. "Reduced wait times by 30%" or "Managed a team of 8"'
          style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}
        />
      </Card>

      {loading ? (
        <Card><Spinner label="Translating your experience..." /></Card>
      ) : (
        <Btn onClick={translate} full>Translate my experience</Btn>
      )}
      {err && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: 14, marginTop: 12, color: '#c00', fontSize: 13 }}>
          {err}
        </div>
      )}
    </div>
  );
}
