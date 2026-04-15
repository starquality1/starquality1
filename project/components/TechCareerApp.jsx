'use client';
import { useState } from 'react';
import { N, G, C2, StepBar } from './ui';
import Welcome from './Welcome';
import RoleMatcher from './RoleMatcher';
import CVTranslator from './CVTranslator';
import JDAnalyser from './JDAnalyser';
import ReadinessCheck from './ReadinessCheck';
import Dashboard from './Dashboard';

const FLOW = ['role', 'cv', 'jd', 'readiness', 'done'];
const STEP_IDX = { role: 0, cv: 1, jd: 2, readiness: 3 };

export default function TechCareerApp() {
  const [screen, setScreen] = useState('welcome');
  const [role, setRole] = useState(null);
  const [cv, setCV] = useState(null);
  const [jd, setJD] = useState(null);
  const [readiness, setReadiness] = useState(null);

  const next = cur => {
    const i = FLOW.indexOf(cur);
    if (i < FLOW.length - 1) setScreen(FLOW[i + 1]);
  };

  const cur = STEP_IDX[screen] ?? -1;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#F5F3EF', minHeight: '100vh' }}>

      {/* Navigation */}
      <div style={{
        background: N,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: G, fontWeight: 700, fontSize: 13, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Esther Speaks
          </span>
          <span style={{ color: '#444', fontSize: 11 }}>|</span>
          <span style={{ color: '#888', fontSize: 12 }}>Get Into Tech Companion</span>
        </div>
        {screen !== 'welcome' && (
          <button
            onClick={() => setScreen('done')}
            style={{
              background: 'none',
              border: '1px solid #ffffff22',
              color: '#ccc',
              borderRadius: 6,
              padding: '5px 12px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Step indicator */}
      {cur >= 0 && screen !== 'done' && (
        <StepBar curIdx={cur} role={role} cv={cv} jd={jd} readiness={readiness} />
      )}

      {/* Main content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px 80px' }}>
        {screen === 'welcome' && (
          <Welcome
            role={role} cv={cv} jd={jd} readiness={readiness}
            onStart={() => setScreen(role ? 'done' : 'role')}
          />
        )}
        {screen === 'role' && (
          <RoleMatcher existing={role} onDone={r => { setRole(r); next('role'); }} />
        )}
        {screen === 'cv' && (
          <CVTranslator role={role} existing={cv} onDone={r => { setCV(r); next('cv'); }} />
        )}
        {screen === 'jd' && (
          <JDAnalyser role={role} existing={jd} onDone={r => { setJD(r); next('jd'); }} />
        )}
        {screen === 'readiness' && (
          <ReadinessCheck
            role={role} cv={cv} jd={jd} existing={readiness}
            onDone={r => { setReadiness(r); next('readiness'); }}
          />
        )}
        {screen === 'done' && (
          <Dashboard
            role={role} cv={cv} jd={jd} readiness={readiness}
            onGoTo={setScreen}
            onRestart={() => {
              setRole(null); setCV(null); setJD(null); setReadiness(null);
              setScreen('welcome');
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#ccc',
        fontSize: 11,
        borderTop: `1px solid ${C2}`,
        background: '#fff',
      }}>
        © Esther Speaks | estherspeaksofficial.com
      </div>
    </div>
  );
}
