'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true);
    try {
      const r = await fetch('/api/lead', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ email })
      });
      if (r.ok) setOk(true);
    } finally { setBusy(false); }
  };

  const checkout = async () => {
    setBusy(true);
    const r = await fetch('/api/checkout', { method:'POST' });
    const { url } = await r.json();
    window.location.href = url;
  };

  return (
    <main style={{fontFamily:'ui-sans-serif, system-ui', maxWidth:980, margin:'0 auto', padding:'48px 20px'}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
        <div style={{fontWeight:900, letterSpacing:-0.4}}>SparkOne</div>
        <nav style={{display:'flex', gap:16}}>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#cta" style={{padding:'8px 12px', border:'1px solid #111', borderRadius:8}}>Get started</a>
        </nav>
      </header>

      <section style={{marginBottom:24}}>
        <h1 style={{fontSize:44, lineHeight:1.05, fontWeight:900, marginBottom:10}}>
          SparkOne Homes — feel the listing.
        </h1>
        <p style={{fontSize:18, color:'#444', maxWidth:680}}>
          We turn static photos into cinematic AI “future-life” reels. Buyers don’t just see the house — they see their life in it.
        </p>
      </section>

      <section id="cta" style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:28}}>
        {ok ? (
          <p style={{color:'#0a0'}}>Thanks! You’re on the list. We’ll send onboarding shortly.</p>
        ) : (
          <form onSubmit={submitLead} style={{display:'flex', gap:12, flexWrap:'wrap'}}>
            <input
              required
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              style={{flex:'1 1 280px', padding:12, border:'1px solid #ddd', borderRadius:8}}
            />
            <button disabled={busy} type="submit" style={{padding:'12px 16px', background:'#111', color:'#fff', borderRadius:8}}>
              {busy ? '…' : 'Join pilot'}
            </button>
            <button disabled={busy} type="button" onClick={checkout} style={{padding:'12px 16px', border:'1px solid #111', borderRadius:8}}>
              {busy ? '…' : 'Go Pro — $19/mo'}
            </button>
          </form>
        )}
        <p style={{fontSize:12, color:'#666', marginTop:8}}>Pilot users lock pricing for life.</p>
      </section>

      <section id="how" style={{border:'1px solid #eee', borderRadius:12, padding:20, marginBottom:24}}>
        <h2 style={{marginTop:0}}>How it works</h2>
        <ol>
          <li>Send MLS link or 8–12 photos.</li>
          <li>We generate 6 Sora shots (10s each) + a 40s reel.</li>
          <li>Use on Zillow, IG, TikTok, YouTube, and open houses.</li>
        </ol>
      </section>

      <section id="pricing" style={{display:'grid', gap:16, gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', marginBottom:24}}>
        <div style={{border:'1px solid #eee', borderRadius:12, padding:20}}>
          <h3>Pilot (per listing)</h3>
          <div style={{fontSize:28, fontWeight:800}}>$99</div>
          <p>1× 40s reel + 6 clips (48–72h)</p>
        </div>
        <div style={{border:'2px solid #111', borderRadius:12, padding:20, background:'#fafafa'}}>
          <h3>Agent Unlimited</h3>
          <div style={{fontSize:28, fontWeight:800}}>$199/mo</div>
          <p>Unlimited listings + priority 24–48h</p>
        </div>
      </section>

      <footer style={{fontSize:12, color:'#666', marginTop:24}}>
        © {new Date().getFullYear()} SparkOne — Business Made Easy.
      </footer>
    </main>
  );
}
