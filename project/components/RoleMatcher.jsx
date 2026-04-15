'use client';
import { useState } from 'react';
import { QS, scoreRole } from '@/lib/logic';
import { N, G, C, C2, Btn, Card, Tag, Spinner } from './ui';

export default function RoleMatcher({ onDone, existing }) {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [result, setResult] = useState(existing || null);
  const [loading, setLoading] = useState(false);

  const generate = (a) => {
    setLoading(true);
    setTimeout(() => {
      setResult(scoreRole(a));
      setLoading(false);
    }, 600);
  };

  const pick = (val) => {
    const a = { ...ans, [QS[step].id]: val };
    setAns(a);
    if (step < QS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 240);
    } else {
      generate(a);
    }
  };

  if (loading) return (
    <div>
      <Tag>Step 1 of 4</Tag>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 24px' }}>
        Find your best-fit role
      </h2>
      <Card>
        <Spinner label="Finding your best-fit role..." />
      </Card>
    </div>
  );

  if (result) return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Tag>Your Result</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Your best-fit role
        </h2>
      </div>

      <Card style={{ borderColor: G, borderWidth: 2, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: G, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>PRIMARY ROLE</div>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: N }}>{result.primary}</div>
          </div>
          <Tag color="#2D6A4F">Best fit</Tag>
        </div>
        <p style={{ marginTop: 12, color: '#444', fontSize: 14, lineHeight: 1.7 }}>{result.primaryReason}</p>
      </Card>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: '#888', fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>SECONDARY OPTION</div>
        <div style={{ fontWeight: 700, color: N, fontSize: 17, marginBottom: 8 }}>{result.secondary}</div>
        <p style={{ color: '#555', fontSize: 13, lineHeight: 1.7 }}>{result.secondaryReason}</p>
      </Card>

      {result.avoid?.length > 0 && (
        <Card style={{ marginBottom: 24, background: '#fafafa' }}>
          <div style={{ fontSize: 11, color: '#bbb', fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>NOT RECOMMENDED</div>
          <div style={{ fontWeight: 600, color: '#ccc', fontSize: 13, marginBottom: 6 }}>{result.avoid.join(', ')}</div>
          <p style={{ color: '#bbb', fontSize: 13, lineHeight: 1.6 }}>{result.avoidReason}</p>
        </Card>
      )}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Btn onClick={() => onDone(result)}>Confirm and continue →</Btn>
        <Btn variant="ghost" sm onClick={() => { setResult(null); setStep(0); setAns({}); }}>Retake</Btn>
      </div>
    </div>
  );

  const allDone = Object.keys(ans).length === QS.length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Tag>Step 1 of 4</Tag>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: N, margin: '12px 0 4px' }}>
          Find your best-fit role
        </h2>
        <p style={{ color: '#666', fontSize: 14 }}>Answer honestly. The result is specific to your background.</p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {QS.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1, height: 4, borderRadius: 2,
              cursor: i < step ? 'pointer' : 'default',
              background: i < step ? N : i === step ? G : C2,
              transition: 'background .2s',
            }}
            onClick={() => i < step && setStep(i)}
          />
        ))}
      </div>

      {!allDone ? (
        <Card>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 12 }}>Question {step + 1} of {QS.length}</div>
          <div style={{ fontWeight: 700, color: N, fontSize: 18, lineHeight: 1.4, marginBottom: 24 }}>{QS[step].q}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QS[step].opts.map(o => (
              <button
                key={o}
                onClick={() => pick(o)}
                style={{
                  background: ans[QS[step].id] === o ? N : C,
                  color: ans[QS[step].id] === o ? '#fff' : N,
                  border: `1px solid ${ans[QS[step].id] === o ? N : C2}`,
                  borderRadius: 8, padding: '12px 16px', textAlign: 'left',
                  fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  fontWeight: 500, transition: 'all .15s',
                }}
              >
                {o}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{ marginTop: 16, background: 'none', border: 'none', color: '#999', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              ← Back
            </button>
          )}
        </Card>
      ) : (
        <Card>
          <Spinner label="Finding your role..." />
        </Card>
      )}
    </div>
  );
}
