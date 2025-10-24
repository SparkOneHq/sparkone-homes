'use client';

import { useMemo, useState } from 'react';

type Task = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tag: 'Focus' | 'Admin' | 'Deep Recharge';
};

type Ritual = {
  id: string;
  title: string;
  description: string;
  cadence: string;
};

const defaultTasks: Task[] = [
  {
    id: 'morning-focus',
    title: 'Deep Work Block',
    detail: '90-minute maker session — close all notifications and ship one meaningful deliverable.',
    time: '09:00',
    tag: 'Focus',
  },
  {
    id: 'alignment-huddle',
    title: 'Alignment Review',
    detail: 'Scan active projects, confirm the single critical outcome for today, and block time for it.',
    time: '11:30',
    tag: 'Admin',
  },
  {
    id: 'learning-loop',
    title: 'Learning Refill',
    detail: 'Read, watch, or listen for insight — capture one idea to apply this week.',
    time: '15:00',
    tag: 'Focus',
  },
  {
    id: 'shutdown',
    title: 'Intentional Shutdown',
    detail: 'Review the day, list tomorrow’s opening tasks, and protect evening recovery.',
    time: '18:00',
    tag: 'Deep Recharge',
  },
];

const rituals: Ritual[] = [
  {
    id: 'weekly-reset',
    title: 'Weekly Reset',
    description:
      'Reflect on the past week, archive completed projects, and line up three wins for the coming week.',
    cadence: 'Fridays — 45 min',
  },
  {
    id: 'relationship-pass',
    title: 'Relationship Pass',
    description: 'Send two thoughtful check-ins to collaborators, mentors, or friends you want to nurture.',
    cadence: 'Twice weekly — 15 min',
  },
  {
    id: 'mind-body-sync',
    title: 'Mind-Body Sync',
    description: 'Movement + breathwork circuit: 10,000 steps or 30 min of training, followed by journaling.',
    cadence: 'Daily — choose the best slot',
  },
];

const focusStacks = [
  {
    id: 'strategy',
    title: 'Strategic Work',
    insight: 'Protect a single high-leverage problem each day. Everything else slots around it.',
  },
  {
    id: 'systems',
    title: 'Systems & Learning',
    insight: 'Document anything repeatable and convert insights into playbooks the moment they click.',
  },
  {
    id: 'wellbeing',
    title: 'Energy & Recovery',
    insight: 'Keep energy resets on the calendar like mission-critical meetings — you can’t pour from empty.',
  },
];

export default function Home() {
  const [tasks, setTasks] = useState(defaultTasks.map((task) => ({ ...task, done: false })));
  const [energy, setEnergy] = useState(4);
  const [reflection, setReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [captureInput, setCaptureInput] = useState('');
  const [captured, setCaptured] = useState<string[]>([
    'Capture ideas immediately in one trusted inbox — no mental tabs.',
    'Batch communication twice a day to protect deep work blocks.',
  ]);

  const energyLabel = useMemo(() => {
    const labels = ['Depleted', 'Low', 'Steady', 'Strong', 'Peak'];
    return labels[energy - 1] ?? 'Steady';
  }, [energy]);

  const progress = useMemo(() => {
    const completed = tasks.filter((task) => task.done).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const addCapture = () => {
    if (!captureInput.trim()) return;
    setCaptured((prev) => [captureInput.trim(), ...prev]);
    setCaptureInput('');
  };

  const saveReflection = () => {
    if (!reflection.trim()) return;
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2000);
  };

  return (
    <main
      style={{
        fontFamily: 'var(--font-geist-sans, ui-sans-serif)',
        maxWidth: 1040,
        margin: '0 auto',
        padding: '56px 20px 120px',
        color: '#0f172a',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -0.3 }}>Personal Velocity</div>
        <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
          <span style={{ padding: '8px 12px', borderRadius: 999, background: '#e0f2fe', color: '#0369a1' }}>
            Peak Focus Toolkit
          </span>
          <span style={{ padding: '8px 12px', borderRadius: 999, background: '#dcfce7', color: '#047857' }}>
            Sustainable Pace
          </span>
        </div>
      </header>

      <section
        style={{
          display: 'grid',
          gap: 24,
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          marginBottom: 40,
          alignItems: 'start',
        }}
      >
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 24, background: '#f8fafc' }}>
          <h1 style={{ fontSize: 36, lineHeight: 1.05, fontWeight: 800, marginBottom: 12 }}>Your productivity command center</h1>
          <p style={{ fontSize: 16, color: '#475569', marginBottom: 18 }}>
            Built to help you protect deep work, stay reflective, and keep energy aligned with ambition. Everything you need to
            plan, execute, and recover — without the noise.
          </p>
          <ul style={{ listStyle: 'disc', paddingLeft: 20, color: '#334155', fontSize: 14, lineHeight: 1.6 }}>
            <li>One-look clarity on today’s critical moves.</li>
            <li>Routines that balance momentum with sustainable pace.</li>
            <li>Space to capture insights before they slip away.</li>
          </ul>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Daily Momentum</h2>
              <p style={{ fontSize: 14, color: '#475569' }}>Track progress on the habits that move the needle.</p>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: '#0ea5e9' }}>{progress}%</div>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            {tasks.map((task) => (
              <label
                key={task.id}
                style={{
                  border: '1px solid #cbd5f5',
                  borderRadius: 14,
                  padding: '12px 16px',
                  display: 'grid',
                  gap: 4,
                  background: task.done ? '#dbeafe' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      style={{ width: 16, height: 16 }}
                    />
                    <strong style={{ fontSize: 15 }}>{task.title}</strong>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: '#e0f2fe',
                      color: '#0369a1',
                      fontWeight: 600,
                    }}
                  >
                    {task.time}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#475569' }}>{task.detail}</p>
                <span style={{ fontSize: 12, color: '#64748b' }}>{task.tag}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 24, display: 'grid', gap: 18 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Energy Check</h2>
            <p style={{ fontSize: 14, color: '#475569' }}>Calibrate the day based on how you actually feel.</p>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <input
              type="range"
              min={1}
              max={5}
              value={energy}
              onChange={(event) => setEnergy(Number(event.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: 14, color: '#0f172a', fontWeight: 600 }}>Current energy: {energyLabel}</div>
            <p style={{ fontSize: 13, color: '#475569' }}>
              Align the intensity of your work blocks with your energy. Shift harder tasks earlier when you&apos;re running hot, and
              lean on templates or collaboration when you&apos;re conserving energy.
            </p>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: 12 }}>
            <p style={{ fontSize: 13, color: '#0369a1', fontWeight: 600 }}>Tip</p>
            <p style={{ fontSize: 13, color: '#475569' }}>
              Low energy? Swap a deep work block for a review or documentation pass. Momentum comes from small wins.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Focus stack</h2>
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {focusStacks.map((stack) => (
            <div key={stack.id} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 20, background: '#ffffff' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{stack.title}</h3>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{stack.insight}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Rituals that keep you grounded</h2>
        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {rituals.map((ritual) => (
            <div key={ritual.id} style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 20, background: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{ritual.title}</h3>
                <span style={{ fontSize: 12, color: '#0369a1', fontWeight: 600 }}>{ritual.cadence}</span>
              </div>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{ritual.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48, display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Quick capture inbox</h2>
          <p style={{ fontSize: 14, color: '#475569', marginBottom: 16 }}>
            Drop ideas, tasks, or notes the moment they show up. Empty this inbox during your daily shutdown.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input
              type="text"
              value={captureInput}
              onChange={(event) => setCaptureInput(event.target.value)}
              placeholder="Capture a thought..."
              style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: '1px solid #cbd5e1' }}
            />
            <button
              type="button"
              onClick={addCapture}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                background: '#0ea5e9',
                color: '#fff',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
          <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
            {captured.map((item, index) => (
              <li
                key={`${item}-${index}`}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: '10px 14px',
                  background: '#ffffff',
                  fontSize: 13,
                  color: '#334155',
                  lineHeight: 1.5,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: 18, padding: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Evening reflection</h2>
          <p style={{ fontSize: 14, color: '#475569', marginBottom: 16 }}>
            Close the loop on the day. What energized you? What needs a reset tomorrow?
          </p>
          <textarea
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            placeholder="Note a win, a challenge, and one micro-adjustment for tomorrow."
            style={{
              width: '100%',
              minHeight: 140,
              borderRadius: 16,
              padding: 16,
              border: '1px solid #cbd5e1',
              fontSize: 14,
              lineHeight: 1.6,
              resize: 'vertical',
            }}
          />
          <button
            type="button"
            onClick={saveReflection}
            style={{
              marginTop: 14,
              padding: '12px 16px',
              borderRadius: 12,
              background: '#22c55e',
              color: '#0f172a',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save check-in
          </button>
          {reflectionSaved && (
            <p style={{ fontSize: 13, color: '#22c55e', marginTop: 10 }}>Saved — revisit during your weekly reset.</p>
          )}
        </div>
      </section>

      <section style={{ border: '1px solid #e2e8f0', borderRadius: 20, padding: 28, background: '#0f172a', color: '#e2e8f0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Operating principles</h2>
        <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Clarity over volume</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>
              Ship what matters, batch everything else. Say no quickly and document why.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Protect recovery</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>
              Rest is a project with deliverables: movement, sunlight, sleep, and being fully off.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Keep learning visible</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6 }}>
              Turn insight into action by logging it immediately inside your systems and reviewing weekly.
            </p>
          </div>
        </div>
      </section>

      <footer style={{ fontSize: 12, color: '#94a3b8', marginTop: 48, textAlign: 'center' }}>
        Build in public, recharge on purpose, and keep iterating. You got this.
      </footer>
    </main>
  );
}
