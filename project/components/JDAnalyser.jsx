'use client';
import { useState } from 'react';
import { analyseJD } from '@/lib/logic';
import { N, G, C, C2, Btn, Card, Tag, Callout, Spinner } from './ui';

export default function JDAnalyser({ onDone, role, existing }) {
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(existing || null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const analyse = () => {
    if (jd.trim().length < 80) { setErr('Please paste the full job description.'); return; }
    setErr(null);
    setLoading(true);
    setTimeout(() => {
      const r = analyseJD(jd, role?.primary || 'Business Analyst', role?.background || 'non-tech professional');
      setResult(r);
      setLoading(false);
    }, 800);
  };

  const vc = d => d === 'APPLY' ? '#1B5E3B' : d === 'STRETCH' ? '#92400E' : '#991B1B';
  const vbg = d => d === 'APPLY' ? '#F0FFF4' : d === 'STRETCH' ? '#FFFBEB' : '#FFF5F5';
  const vbd = d => d === 'APPLY' ? '#6EE7B7' : d === 'STRETCH' ? '#FCD34D' : '#FCA5A5';

  if (result) return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Tag>Your Result</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Application verdict
        </h2>
      </div>

      <div style={{ background: vbg(result.decision), border: `2px solid ${vbd(result.decision)}`, borderRadius: 12, padding: 24, marginBottom: 14 }}>
        <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 30, color: vc(result.decision), marginBottom: 8 }}>
          {result.decision === 'APPLY' ? 'Apply to this role.' : result.decision === 'STRETCH' ? 'Treat this as a stretch.' : 'Skip this one.'}
        </div>
        <p style={{ color: vc(result.decision), fontSize: 14, lineHeight: 1.7, opacity: 0.85 }}>{result.decisionReason}</p>
      </div>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 18 }}>{result.isEntry ? '✓' : '⚠'}</span>
          <span style={{ fontWeight: 700, color: N, fontSize: 14 }}>
            {result.isEntry ? 'Looks genuinely entry-level' : 'May not be entry-level'}
          </span>
        </div>
        <p style={{ color: '#555', fontSize: 13, lineHeight: 1.6 }}>{result.entryLevelNote}</p>
      </Card>

      {result.mustHave?.length > 0 && (
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 700, color: N, fontSize: 14, marginBottom: 10 }}>Key requirements found</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {result.mustHave.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: N, flexShrink: 0 }}>›</span>
                <span style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {result.niceToHave?.length > 0 && (
        <Card style={{ marginBottom: 12, background: '#fafafa' }}>
          <div style={{ fontWeight: 700, color: '#aaa', fontSize: 12, marginBottom: 8 }}>NICE TO HAVE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {result.niceToHave.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#ccc', flexShrink: 0 }}>›</span>
                <span style={{ fontSize: 13, color: '#aaa', lineHeight: 1.5 }}>{r}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Callout style={{ marginBottom: 20 }}>
        <strong style={{ display: 'block', marginBottom: 4 }}>How to position your application</strong>
        {result.positioningTip}
      </Callout>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Btn onClick={() => onDone(result)}>Confirm and continue →</Btn>
        <Btn variant="ghost" sm onClick={() => setResult(null)}>Analyse another JD</Btn>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Tag>Step 3 of 4</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Analyse a job description
        </h2>
        <p style={{ color: '#666', fontSize: 14, lineHeight: 1.6 }}>
          Paste the full job description. Get an honest verdict: apply, stretch, or skip.
        </p>
      </div>

      {role && (
        <div style={{ marginBottom: 14, padding: '10px 14px', background: C, borderRadius: 8, border: `1px solid ${C2}`, fontSize: 13, color: '#555' }}>
          Analysing for: <strong style={{ color: N }}>{role.primary}</strong>
        </div>
      )}

      <Card style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 600, color: N, fontSize: 14, marginBottom: 8 }}>
          Paste the job description here
        </label>
        <textarea
          value={jd}
          onChange={e => setJd(e.target.value)}
          rows={12}
          placeholder="Paste the full job description, including the requirements section..."
          style={{ width: '100%', padding: '12px', border: `1px solid ${C2}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
        />
        <div style={{ marginTop: 6, fontSize: 11, color: '#ccc' }}>{jd.length} characters</div>
      </Card>

      {loading ? (
        <Card><Spinner label="Analysing this role..." /></Card>
      ) : (
        <Btn onClick={analyse} full>Analyse this job</Btn>
      )}
      {err && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: 8, padding: 14, marginTop: 12, color: '#c00', fontSize: 13 }}>
          {err}
        </div>
      )}
    </div>
  );
}
