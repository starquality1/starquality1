'use client';

// ── ROLE MATCHER QUESTIONS ───────────────────────────────────────────────────
export const QS = [
  {
    id: 'strength',
    q: 'Which best describes your strongest skill at work?',
    opts: [
      'Writing clearly and structuring information',
      'Working with data, reports, and numbers',
      'Managing tasks, timelines, and coordination',
      'Communicating with clients or stakeholders',
      'Solving problems and fixing processes',
      'Leading and managing a team',
    ],
  },
  {
    id: 'energy',
    q: 'What type of work genuinely energises you?',
    opts: [
      'Spotting patterns and drawing insights from data',
      'Building relationships and influencing people',
      'Keeping things organised and on track',
      'Writing structured documents and clear communications',
    ],
  },
  {
    id: 'numbers',
    q: 'How comfortable are you working with data and numbers?',
    opts: [
      'Very comfortable, I genuinely enjoy data work',
      'Somewhat comfortable but not my preference',
      'Not my strength, I prefer written or people-focused work',
    ],
  },
  {
    id: 'targets',
    q: 'How do you feel about weekly performance targets?',
    opts: [
      'I like measurable targets, they keep me focused',
      'I am neutral, I can work either way',
      'I do not enjoy being measured by numbers each week',
    ],
  },
  {
    id: 'rejection',
    q: 'How do you handle rejection or long periods of silence?',
    opts: [
      'I recover quickly and move straight to the next thing',
      'It takes time but I always bounce back',
      'It affects me more than I would like',
    ],
  },
  {
    id: 'style',
    q: 'How do you prefer to spend most of your working day?',
    opts: [
      'Working independently on focused tasks',
      'A mix of solo work and collaboration',
      'In conversations, meetings, and direct interaction',
    ],
  },
  {
    id: 'structure',
    q: 'Do you prefer clear structure or flexibility?',
    opts: [
      'Clear structure and defined processes',
      'A balance of both',
      'Flexibility and autonomy to figure things out',
    ],
  },
  {
    id: 'bg',
    q: 'What is your current professional background?',
    opts: [
      'NHS or Healthcare',
      'Education or Teaching',
      'Retail or Sales',
      'Finance or Accounting',
      'Customer Service',
      'Operations or Admin',
      'Other',
    ],
  },
  {
    id: 'priority',
    q: 'What matters most to you in your next role?',
    opts: [
      'Using my existing skills in a new environment',
      'Getting into the industry as fast as possible',
      'High earning potential',
      'A clear long-term career path',
    ],
  },
];

// ── ROLE SCORER ─────────────────────────────────────────────────────────────
export function scoreRole(a) {
  const sc = {
    'Business Analyst': 0,
    'Data Analyst': 0,
    'Tech Sales (SDR/BDR)': 0,
    'Project Coordinator': 0,
    'Project Manager': 0,
  };
  const add = (r, n) => { sc[r] = (sc[r] || 0) + n; };

  if (a.strength === 'Writing clearly and structuring information')    { add('Business Analyst', 4); }
  if (a.strength === 'Working with data, reports, and numbers')        { add('Data Analyst', 4); }
  if (a.strength === 'Managing tasks, timelines, and coordination')    { add('Project Coordinator', 4); }
  if (a.strength === 'Communicating with clients or stakeholders')     { add('Tech Sales (SDR/BDR)', 3); add('Business Analyst', 1); }
  if (a.strength === 'Solving problems and fixing processes')          { add('Business Analyst', 3); add('Project Coordinator', 1); add('Project Manager', 1); }
  if (a.strength === 'Leading and managing a team')                    { add('Project Coordinator', 3); add('Project Manager', 3); }

  if (a.energy === 'Spotting patterns and drawing insights from data') { add('Data Analyst', 3); }
  if (a.energy === 'Building relationships and influencing people')    { add('Tech Sales (SDR/BDR)', 3); }
  if (a.energy === 'Keeping things organised and on track')            { add('Project Coordinator', 3); add('Project Manager', 2); }
  if (a.energy === 'Writing structured documents and clear communications') { add('Business Analyst', 3); }

  if (a.numbers === 'Very comfortable, I genuinely enjoy data work')   { add('Data Analyst', 2); }
  if (a.numbers === 'Not my strength, I prefer written or people-focused work') { add('Data Analyst', -2); add('Business Analyst', 1); }

  if (a.targets === 'I like measurable targets, they keep me focused') { add('Tech Sales (SDR/BDR)', 2); }
  if (a.targets === 'I do not enjoy being measured by numbers each week') { add('Tech Sales (SDR/BDR)', -3); add('Data Analyst', -1); }

  if (a.rejection === 'I recover quickly and move straight to the next thing') { add('Tech Sales (SDR/BDR)', 2); }
  if (a.rejection === 'It affects me more than I would like')          { add('Tech Sales (SDR/BDR)', -3); }
  if (a.rejection === 'It takes time but I always bounce back')        { add('Project Manager', 1); }

  if (a.style === 'In conversations, meetings, and direct interaction') { add('Tech Sales (SDR/BDR)', 2); add('Business Analyst', 1); }
  if (a.style === 'Working independently on focused tasks')             { add('Data Analyst', 1); }
  if (a.style === 'A mix of solo work and collaboration')               { add('Project Manager', 1); }

  if (a.structure === 'Clear structure and defined processes')          { add('Project Coordinator', 1); add('Business Analyst', 1); add('Project Manager', 1); }

  if (a.priority === 'A clear long-term career path')                  { add('Project Manager', 1); }

  const sorted = Object.entries(sc).sort((x, y) => y[1] - x[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];
  const avoid = sorted.slice(2).map(([r]) => r);

  const reasons = {
    'Business Analyst': 'Your strength in writing, structuring information, and working with stakeholders maps directly to what BAs do every day. The role translates business problems into clear requirements. Your answers show you already think this way.',
    'Data Analyst': 'Your comfort with numbers and drive to find patterns in information are the two strongest indicators for a DA path. The day-to-day is finding meaning in data and communicating it to people who cannot read the raw numbers.',
    'Tech Sales (SDR/BDR)': 'You recover from rejection quickly, respond well to targets, and are energised by direct interaction with people. These three factors together are the strongest predictors of performance in a tech sales role.',
    'Project Coordinator': 'Your natural strength is organising tasks, managing timelines, and keeping things on track. Project coordinator roles reward exactly that. No deep technical skills required, just the ability to keep delivery structured and moving.',
    'Project Manager': 'You show a natural drive to lead delivery end-to-end, owning outcomes rather than just coordinating tasks. Project Managers hold accountability for scope, timeline, and stakeholder satisfaction. Your answers show the combination of structure, leadership instinct, and resilience that entry-level PM roles look for.',
  };

  const avoidNote = {
    'Business Analyst': 'requires heavy written output and stakeholder coordination as daily core activities.',
    'Data Analyst': 'requires genuine comfort with numbers as a daily core activity.',
    'Tech Sales (SDR/BDR)': 'requires high tolerance for rejection and weekly measurable performance targets.',
    'Project Coordinator': 'rewards organisational preference and breadth over specialisation.',
    'Project Manager': 'requires direct ownership of delivery and the ability to manage stakeholders at all levels. Start with Project Coordinator if you have no prior project experience.',
  };

  return {
    primary,
    primaryReason: reasons[primary],
    secondary,
    secondaryReason: reasons[secondary],
    avoid,
    avoidReason: avoid.map(r => r + ' ' + avoidNote[r]).join('. '),
  };
}

// ── CV BULLET TRANSFORMER ────────────────────────────────────────────────────
export function transformBullets(responsibilities, targetRole) {
  const verbMap = [
    ['kept', 'Maintained'],
    ['helped', 'Supported'],
    ['was responsible for', 'Took ownership of'],
    ['worked on', 'Delivered'],
    ['dealt with', 'Resolved'],
    ['looked after', 'Managed'],
    ['answered', 'Managed and responded to'],
    ['handled', 'Processed and managed'],
    ['sorted', 'Resolved'],
    ['organised', 'Coordinated'],
    ['sent', 'Distributed'],
    ['checked', 'Verified'],
    ['inputted', 'Accurately recorded'],
    ['entered', 'Maintained records of'],
    ['updated', 'Maintained and updated'],
    ['wrote', 'Produced'],
    ['called', 'Managed communication with'],
    ['emailed', 'Coordinated written communication with'],
    ['chased', 'Followed up on and managed'],
    ['tracked', 'Monitored and tracked'],
    ['filed', 'Organised and maintained'],
    ['booked', 'Coordinated and scheduled'],
    ['scheduled', 'Coordinated scheduling for'],
    ['processed', 'Processed and managed'],
    ['liaised', 'Coordinated directly with'],
    ['reported', 'Produced regular reports on'],
    ['monitored', 'Tracked and monitored performance of'],
    ['reviewed', 'Reviewed and quality-checked'],
    ['resolved', 'Identified and resolved'],
    ['trained', 'Delivered structured training on'],
    ['assisted', 'Supported'],
    ['covered', 'Provided cover for and maintained'],
    ['managed', 'Managed'],
    ['led', 'Led'],
    ['created', 'Designed and produced'],
    ['prepared', 'Prepared and delivered'],
    ['produced', 'Produced and distributed'],
    ['analysed', 'Analysed and reported on'],
    ['reduced', 'Identified and reduced'],
    ['increased', 'Drove measurable increase in'],
    ['improved', 'Implemented improvements to'],
  ];

  const outcomes = {
    'Business Analyst': [
      'ensuring accurate documentation and stakeholder alignment',
      'supporting cross-departmental process efficiency and compliance',
      'enabling structured decision-making and operational visibility',
      'maintaining consistent records to support reporting and analysis',
      'coordinating information flow across teams and departments',
    ],
    'Data Analyst': [
      'enabling data-driven reporting and performance oversight',
      'supporting accurate analysis and operational tracking',
      'maintaining data quality to ensure reliable downstream reporting',
      'contributing to weekly performance metrics and management reporting',
      'ensuring consistency across datasets and reporting systems',
    ],
    'Tech Sales (SDR/BDR)': [
      'maintaining professional relationships and consistent communication',
      'supporting pipeline development and client engagement targets',
      'ensuring structured follow-through across all prospect interactions',
      'contributing to team activity metrics and outreach performance',
      'building trust through reliable and direct professional communication',
    ],
    'Project Coordinator': [
      'maintaining delivery timelines and stakeholder visibility',
      'supporting structured coordination across multiple workstreams',
      'ensuring cross-team alignment and clear written communication',
      'contributing to on-time delivery and risk identification',
      'maintaining accurate project records and action tracking',
    ],
    'Project Manager': [
      'maintaining delivery timelines and stakeholder visibility',
      'supporting structured coordination across multiple workstreams',
      'ensuring cross-team alignment and clear written communication',
      'contributing to on-time delivery and risk identification',
      'maintaining accurate project records and action tracking',
    ],
  };

  const skills = {
    'Business Analyst': ['Process documentation', 'Stakeholder management', 'Cross-departmental coordination', 'Data accuracy', 'Requirements gathering', 'Structured communication'],
    'Data Analyst': ['Data management', 'Performance reporting', 'Analytical thinking', 'Data accuracy', 'Operational tracking', 'Reporting'],
    'Tech Sales (SDR/BDR)': ['Client communication', 'Relationship management', 'Consistent follow-through', 'Pipeline awareness', 'Professional outreach', 'Target delivery'],
    'Project Coordinator': ['Project coordination', 'Stakeholder communication', 'Timeline management', 'Documentation', 'Risk awareness', 'Cross-team coordination'],
    'Project Manager': ['Project ownership', 'Stakeholder management', 'Delivery accountability', 'Risk management', 'Stakeholder communication', 'Programme planning'],
  };

  const outs = outcomes[targetRole] || outcomes['Business Analyst'];
  const sks = skills[targetRole] || skills['Business Analyst'];

  return responsibilities.map((resp, i) => {
    let t = resp.trim();
    const lo = t.toLowerCase();
    let replaced = false;

    for (const [weak, strong] of verbMap) {
      if (lo.startsWith(weak + ' ') || lo.startsWith(weak + ',')) {
        let remainder = t.substring(weak.length).trimStart();
        if (strong.toLowerCase().endsWith(' with') && remainder.toLowerCase().startsWith('with ')) remainder = remainder.substring(5);
        if (strong.toLowerCase().endsWith(' to') && remainder.toLowerCase().startsWith('to ')) remainder = remainder.substring(3);
        if (strong.toLowerCase().endsWith(' on') && remainder.toLowerCase().startsWith('on ')) remainder = remainder.substring(3);
        t = strong + ' ' + remainder;
        replaced = true;
        break;
      }
    }

    if (!replaced) t = t.charAt(0).toUpperCase() + t.slice(1);
    t = t.replace(/\.$/, '').trimEnd() + ', ' + outs[i % outs.length] + '.';
    return { before: resp.trim(), after: t.charAt(0).toUpperCase() + t.slice(1), skill: sks[i % sks.length] };
  });
}

// ── JD ANALYSER ─────────────────────────────────────────────────────────────
export function analyseJD(jdText, targetRole, background) {
  const text = jdText.toLowerCase();

  const entrySignals = [
    'junior', 'graduate', 'entry level', 'entry-level', 'no experience required',
    '0-1 year', '0-2 year', 'up to 1 year', 'up to 2 year', 'no previous experience',
    'will train', 'training provided', 'preferred not required', 'desirable not essential',
    'suitable for career changers', 'suited to career changers',
  ];
  const seniorSignals = [
    'senior', 'lead', 'principal', 'head of', 'director', '3+ years',
    "3 years' experience", '4+ years', '5+ years', '5 years', '7+ years',
    '10+ years', 'extensive experience', 'proven track record of', 'significant experience',
  ];

  const yearsMatches = jdText.match(/(\d+)\+?\s*years?\s*(of\s+)?(experience|exp)/gi) || [];
  const maxYears = yearsMatches.length > 0
    ? Math.max(...yearsMatches.map(m => { const n = m.match(/(\d+)/); return n ? parseInt(n[1]) : 0; }))
    : 0;

  const entryScore = entrySignals.filter(s => text.includes(s)).length;
  const seniorScore = seniorSignals.filter(s => text.includes(s)).length;
  const isEntry = entryScore > 0 || (seniorScore === 0 && maxYears <= 2);

  let decision, decisionReason;

  if (seniorScore >= 3 || maxYears >= 5) {
    decision = 'SKIP';
    decisionReason = 'This role requires significant prior experience' +
      (maxYears >= 5 ? ` (${maxYears}+ years stated)` : '') +
      '. Applying now would likely result in an automatic rejection. Return to this type of role after 2 to 3 years in a junior position.';
  } else if (seniorScore >= 1 || maxYears >= 3) {
    decision = 'STRETCH';
    decisionReason = 'This role has seniority indicators' +
      (maxYears >= 3 ? ` (${maxYears} years mentioned)` : '') +
      '. A very strong application with a tailored CV and completed portfolio could be considered. Address the experience gap directly in your cover note.';
  } else {
    decision = 'APPLY';
    decisionReason = 'This role looks genuinely accessible' +
      (entryScore > 0 ? `, with ${entryScore} entry-level signal${entryScore > 1 ? 's' : ''}` : '') +
      '. Your ' + (background || 'professional') +
      ' background gives you relevant transferable experience. Tailor your CV to mirror the exact language used in the requirements section.';
  }

  const lines = jdText.split(/[\n\r]/g)
    .map(l => l.replace(/^[•\-\*]\s*/, '').trim())
    .filter(l => l.length > 20 && l.length < 250);

  const mustKw = ['must', 'required', 'essential', 'you will have', 'you must', 'minimum', 'need to have'];
  const niceKw = ['preferred', 'desirable', 'ideally', 'advantageous', 'bonus', 'nice to have', 'beneficial'];

  let mustHave = lines.filter(l => mustKw.some(k => l.toLowerCase().includes(k))).slice(0, 4);
  const niceToHave = lines.filter(l => niceKw.some(k => l.toLowerCase().includes(k))).slice(0, 3);
  if (mustHave.length === 0) mustHave = lines.slice(0, 4);

  const tips = {
    'Business Analyst': 'Lead your cover note with your process documentation and stakeholder communication experience. Reference your portfolio project by name. If Agile or JIRA is mentioned, note any exposure you have had, even informal.',
    'Data Analyst': 'Lead with any data or reporting work from your current role, even spreadsheet-based analysis counts. Mention your portfolio dataset and the specific business question you answered.',
    'Tech Sales (SDR/BDR)': 'Lead with your ability to handle rejection and your track record of hitting targets in any previous role. Retail, customer service, and any measurable-output role is directly relevant.',
    'Project Coordinator': 'Lead with any coordination work, even informal. Event planning, rota management, and system rollouts all count. Highlight your ability to manage competing priorities across teams.',
    'Project Manager': 'Lead with any delivery ownership, even informal project management. Emphasise scope, timeline, and stakeholder management experience from any context. Frame yourself as someone who takes accountability for outcomes.',
  };

  const entryNote = entryScore > 0
    ? `${entryScore} entry-level indicator${entryScore > 1 ? 's' : ''} detected`
    : 'No senior language found';
  const yearsNote = maxYears > 0
    ? `. Up to ${maxYears} years of experience mentioned`
    : '. Years of experience not specified';
  const seniorNote = `${seniorScore} seniority indicator${seniorScore !== 1 ? 's' : ''} detected${maxYears > 0 ? `. ${maxYears}+ years of experience mentioned` : ''}`;

  return {
    isEntry,
    decision,
    decisionReason,
    entryLevelNote: isEntry ? entryNote + yearsNote + '.' : seniorNote + '.',
    mustHave: mustHave.length > 0 ? mustHave : ['Review the full job description manually. Requirements were not structured as a clear list.'],
    niceToHave,
    positioningTip: tips[targetRole] || tips['Business Analyst'],
  };
}
