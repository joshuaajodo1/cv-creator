import React from 'react';

/* ─────────────── HELPERS ─────────────── */
const safe = (v) => v || '';

/* ══════════════════════════════════════════
   TEMPLATE 1: EXECUTIVE CLASSIC
   Dark sidebar, serif, timeless
══════════════════════════════════════════ */
export const Template1 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ display:'flex', fontFamily:"'Libre Baskerville', serif", minHeight:'297mm', width:'210mm', background:'#fff' }}>
      {/* Sidebar */}
      <div style={{ width:'68mm', background:'#1a1a2e', color:'white', padding:'2rem 1.4rem', flexShrink:0 }}>
        {personal.photo && <img src={personal.photo} alt="" style={{ width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover', border:'3px solid #c9a84c', marginBottom:'1.2rem', display:'block' }} />}
        {!personal.photo && <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', marginBottom:'1.2rem', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem' }}>👤</div>}
        <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.3rem', fontWeight:700, lineHeight:1.2, marginBottom:'0.3rem', color:'white' }}>{safe(personal.firstName)} {safe(personal.lastName)}</h1>
        <p style={{ fontSize:'0.72rem', color:'#c9a84c', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'1.5rem' }}>{safe(personal.title)}</p>

        <SideSection label="Contact">
          {personal.email && <SideItem icon="✉" text={personal.email} />}
          {personal.phone && <SideItem icon="☎" text={personal.phone} />}
          {personal.location && <SideItem icon="⌖" text={personal.location} />}
          {personal.linkedin && <SideItem icon="in" text={personal.linkedin} />}
          {personal.website && <SideItem icon="⊕" text={personal.website} />}
        </SideSection>

        {skills.length > 0 && <SideSection label="Skills">
          {skills.map((s,i) => (
            <div key={i} style={{ marginBottom:'0.5rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', marginBottom:'2px' }}>
                <span>{s.name}</span>
              </div>
              <div style={{ height:'3px', background:'rgba(255,255,255,0.15)', borderRadius:'2px' }}>
                <div style={{ height:'100%', width:`${(s.level||3)*20}%`, background:'#c9a84c', borderRadius:'2px' }} />
              </div>
            </div>
          ))}
        </SideSection>}

        {languages.length > 0 && <SideSection label="Languages">
          {languages.map((l,i) => <SideItem key={i} icon="◉" text={`${l.name}${l.level ? ' — '+l.level : ''}`} />)}
        </SideSection>}

        {certifications.length > 0 && <SideSection label="Certifications">
          {certifications.map((c,i) => <SideItem key={i} icon="✦" text={c.name} />)}
        </SideSection>}
      </div>

      {/* Main */}
      <div style={{ flex:1, padding:'2rem 1.8rem' }}>
        {summary && <div style={{ marginBottom:'1.5rem' }}>
          <MainHeading>Profile</MainHeading>
          <p style={{ fontSize:'0.82rem', lineHeight:1.7, color:'#444' }}>{summary}</p>
        </div>}

        {experience.length > 0 && <div style={{ marginBottom:'1.5rem' }}>
          <MainHeading>Experience</MainHeading>
          {experience.map((e,i) => (
            <div key={i} style={{ marginBottom:'1.1rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <strong style={{ fontSize:'0.85rem', color:'#1a1a2e' }}>{safe(e.role)}</strong>
                  <p style={{ fontSize:'0.78rem', color:'#c9a84c' }}>{safe(e.company)}{e.location ? ` · ${e.location}` : ''}</p>
                </div>
                <span style={{ fontSize:'0.72rem', color:'#888', whiteSpace:'nowrap' }}>{safe(e.startDate)} – {safe(e.endDate)||'Present'}</span>
              </div>
              {e.description && <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.3rem', lineHeight:1.6 }}>{e.description}</p>}
            </div>
          ))}
        </div>}

        {education.length > 0 && <div style={{ marginBottom:'1.5rem' }}>
          <MainHeading>Education</MainHeading>
          {education.map((e,i) => (
            <div key={i} style={{ marginBottom:'0.9rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div>
                  <strong style={{ fontSize:'0.85rem', color:'#1a1a2e' }}>{safe(e.degree)}</strong>
                  <p style={{ fontSize:'0.78rem', color:'#666' }}>{safe(e.institution)}</p>
                </div>
                <span style={{ fontSize:'0.72rem', color:'#888' }}>{safe(e.year)}</span>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
};
const SideSection = ({ label, children }) => (
  <div style={{ marginBottom:'1.4rem' }}>
    <p style={{ fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:'0.12em', color:'#c9a84c', marginBottom:'0.7rem', borderBottom:'1px solid rgba(201,168,76,0.3)', paddingBottom:'0.3rem' }}>{label}</p>
    {children}
  </div>
);
const SideItem = ({ icon, text }) => (
  <div style={{ display:'flex', gap:'0.5rem', marginBottom:'0.4rem', fontSize:'0.72rem', color:'rgba(255,255,255,0.8)', alignItems:'flex-start' }}>
    <span style={{ color:'#c9a84c', flexShrink:0 }}>{icon}</span>
    <span style={{ wordBreak:'break-all' }}>{text}</span>
  </div>
);
const MainHeading = ({ children }) => (
  <div style={{ borderBottom:'2px solid #1a1a2e', marginBottom:'0.8rem', paddingBottom:'0.3rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
    <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'0.9rem', textTransform:'uppercase', letterSpacing:'0.1em', color:'#1a1a2e' }}>{children}</h2>
  </div>
);


/* ══════════════════════════════════════════
   TEMPLATE 2: MODERN MINIMALIST
   Clean, white, geometric accent line
══════════════════════════════════════════ */
export const Template2 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'DM Sans', sans-serif", width:'210mm', minHeight:'297mm', background:'#fff', padding:'2.5rem 2.2rem' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:'1.5rem', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'3px solid #1a1a2e' }}>
        {personal.photo
          ? <img src={personal.photo} alt="" style={{ width:'85px', height:'85px', borderRadius:'8px', objectFit:'cover', flexShrink:0 }} />
          : <div style={{ width:'85px', height:'85px', borderRadius:'8px', background:'#f0f0f0', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', color:'#ccc' }}>👤</div>
        }
        <div>
          <h1 style={{ fontSize:'2rem', fontWeight:700, color:'#1a1a2e', letterSpacing:'-0.03em', lineHeight:1 }}>{safe(personal.firstName)} <span style={{ color:'#e63946' }}>{safe(personal.lastName)}</span></h1>
          <p style={{ fontSize:'0.9rem', color:'#555', marginTop:'0.3rem', fontWeight:500 }}>{safe(personal.title)}</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'1rem', marginTop:'0.6rem' }}>
            {personal.email && <Chip icon="✉">{personal.email}</Chip>}
            {personal.phone && <Chip icon="☎">{personal.phone}</Chip>}
            {personal.location && <Chip icon="⌖">{personal.location}</Chip>}
          </div>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 0.85fr', gap:'2rem' }}>
        <div>
          {summary && <M2Section title="About Me">
            <p style={{ fontSize:'0.8rem', lineHeight:1.75, color:'#444' }}>{summary}</p>
          </M2Section>}

          {experience.length > 0 && <M2Section title="Work Experience">
            {experience.map((e,i) => (
              <div key={i} style={{ marginBottom:'1rem', paddingLeft:'0.8rem', borderLeft:'2px solid #e63946' }}>
                <strong style={{ fontSize:'0.85rem', color:'#1a1a2e' }}>{safe(e.role)}</strong>
                <p style={{ fontSize:'0.78rem', color:'#e63946', fontWeight:600 }}>{safe(e.company)}</p>
                <p style={{ fontSize:'0.72rem', color:'#888' }}>{safe(e.startDate)} – {safe(e.endDate)||'Present'}</p>
                {e.description && <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.3rem', lineHeight:1.6 }}>{e.description}</p>}
              </div>
            ))}
          </M2Section>}
        </div>

        <div>
          {education.length > 0 && <M2Section title="Education">
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'0.9rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#1a1a2e' }}>{safe(e.degree)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#666' }}>{safe(e.institution)}</p>
                <p style={{ fontSize:'0.72rem', color:'#888' }}>{safe(e.year)}</p>
              </div>
            ))}
          </M2Section>}

          {skills.length > 0 && <M2Section title="Skills">
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
              {skills.map((s,i) => <span key={i} style={{ padding:'0.25rem 0.65rem', background:'#1a1a2e', color:'white', borderRadius:'4px', fontSize:'0.72rem', fontWeight:600 }}>{s.name}</span>)}
            </div>
          </M2Section>}

          {languages.length > 0 && <M2Section title="Languages">
            {languages.map((l,i) => <p key={i} style={{ fontSize:'0.78rem', color:'#444', marginBottom:'0.3rem' }}>{l.name}{l.level ? <span style={{ color:'#888' }}> — {l.level}</span> : ''}</p>)}
          </M2Section>}

          {certifications.length > 0 && <M2Section title="Certifications">
            {certifications.map((c,i) => <p key={i} style={{ fontSize:'0.78rem', color:'#444', marginBottom:'0.3rem' }}>✦ {c.name}</p>)}
          </M2Section>}
        </div>
      </div>
    </div>
  );
};
const Chip = ({ icon, children }) => (
  <span style={{ display:'inline-flex', alignItems:'center', gap:'0.3rem', fontSize:'0.72rem', color:'#555' }}><span style={{ color:'#e63946' }}>{icon}</span>{children}</span>
);
const M2Section = ({ title, children }) => (
  <div style={{ marginBottom:'1.4rem' }}>
    <h3 style={{ fontSize:'0.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#e63946', marginBottom:'0.7rem' }}>{title}</h3>
    {children}
  </div>
);


/* ══════════════════════════════════════════
   TEMPLATE 3: EDITORIAL MAGAZINE
   Bold typography, dramatic header
══════════════════════════════════════════ */
export const Template3 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'Raleway', sans-serif", width:'210mm', minHeight:'297mm', background:'#fff' }}>
      {/* Hero header */}
      <div style={{ background:'#1a1a2e', padding:'2.5rem 2rem 2rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, right:0, width:'120px', height:'120px', borderRadius:'0 0 0 120px', background:'rgba(201,168,76,0.15)' }} />
        <div style={{ position:'absolute', bottom:'-20px', left:'60px', width:'80px', height:'80px', borderRadius:'50%', background:'rgba(201,168,76,0.08)' }} />
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', position:'relative' }}>
          <div>
            <p style={{ fontSize:'0.7rem', letterSpacing:'0.18em', color:'#c9a84c', textTransform:'uppercase', marginBottom:'0.5rem' }}>Curriculum Vitae</p>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'3rem', fontWeight:900, color:'white', lineHeight:1, letterSpacing:'-0.02em' }}>{safe(personal.firstName)}</h1>
            <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'3rem', fontWeight:300, color:'rgba(255,255,255,0.6)', lineHeight:1, letterSpacing:'-0.02em', fontStyle:'italic' }}>{safe(personal.lastName)}</h1>
            <p style={{ fontSize:'0.8rem', color:'#c9a84c', marginTop:'0.7rem', letterSpacing:'0.08em' }}>{safe(personal.title)}</p>
          </div>
          {personal.photo
            ? <img src={personal.photo} alt="" style={{ width:'90px', height:'90px', borderRadius:'50%', objectFit:'cover', border:'3px solid #c9a84c' }} />
            : <div style={{ width:'90px', height:'90px', borderRadius:'50%', border:'2px solid rgba(201,168,76,0.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>👤</div>
          }
        </div>
        <div style={{ display:'flex', gap:'1.5rem', marginTop:'1.5rem', flexWrap:'wrap' }}>
          {[personal.email, personal.phone, personal.location].filter(Boolean).map((v,i) => (
            <span key={i} style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.65)', letterSpacing:'0.04em' }}>{v}</span>
          ))}
        </div>
      </div>

      <div style={{ padding:'1.8rem 2rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
        <div>
          {summary && <><M3Head>Profile</M3Head><p style={{ fontSize:'0.78rem', lineHeight:1.75, color:'#555', marginBottom:'1.5rem' }}>{summary}</p></>}
          {experience.length > 0 && <>
            <M3Head>Experience</M3Head>
            {experience.map((e,i) => (
              <div key={i} style={{ marginBottom:'1.1rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#1a1a2e', display:'block' }}>{safe(e.role)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#c9a84c', fontWeight:700 }}>{safe(e.company)}</p>
                <p style={{ fontSize:'0.7rem', color:'#999' }}>{safe(e.startDate)} – {safe(e.endDate)||'Present'}</p>
                {e.description && <p style={{ fontSize:'0.75rem', color:'#555', marginTop:'0.3rem', lineHeight:1.65 }}>{e.description}</p>}
              </div>
            ))}
          </>}
        </div>
        <div>
          {education.length > 0 && <>
            <M3Head>Education</M3Head>
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'0.9rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#1a1a2e', display:'block' }}>{safe(e.degree)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#666' }}>{safe(e.institution)}</p>
                <p style={{ fontSize:'0.7rem', color:'#999' }}>{safe(e.year)}</p>
              </div>
            ))}
          </>}
          {skills.length > 0 && <>
            <M3Head>Skills</M3Head>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.4rem' }}>
              {skills.map((s,i) => <span key={i} style={{ padding:'0.2rem 0.6rem', border:'1px solid #1a1a2e', borderRadius:'2px', fontSize:'0.7rem', color:'#1a1a2e', fontWeight:700, letterSpacing:'0.05em', textTransform:'uppercase' }}>{s.name}</span>)}
            </div>
          </>}
          {languages.length > 0 && <>
            <M3Head>Languages</M3Head>
            {languages.map((l,i) => <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:'0.78rem', marginBottom:'0.3rem', color:'#444' }}><span>{l.name}</span><span style={{ color:'#c9a84c', fontWeight:700 }}>{l.level}</span></div>)}
          </>}
          {certifications.length > 0 && <>
            <M3Head>Certifications</M3Head>
            {certifications.map((c,i) => <p key={i} style={{ fontSize:'0.75rem', color:'#444', marginBottom:'0.3rem' }}>— {c.name}</p>)}
          </>}
        </div>
      </div>
    </div>
  );
};
const M3Head = ({ children }) => (
  <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'0.95rem', fontWeight:700, color:'#1a1a2e', borderBottom:'1px solid #e8e4dc', paddingBottom:'0.3rem', marginBottom:'0.8rem', textTransform:'uppercase', letterSpacing:'0.06em' }}>{children}</h3>
);


/* ══════════════════════════════════════════
   TEMPLATE 4: CREATIVE STUDIO
   Full-color top bar, icon-rich
══════════════════════════════════════════ */
export const Template4 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'DM Sans', sans-serif", width:'210mm', minHeight:'297mm', background:'#faf9f6' }}>
      <div style={{ height:'8px', background:'linear-gradient(90deg, #e63946, #c9a84c, #1a1a2e)' }} />
      <div style={{ padding:'2rem 2.2rem 1.5rem', background:'white', display:'flex', gap:'1.5rem', alignItems:'center', borderBottom:'1px solid #f0ede8' }}>
        {personal.photo
          ? <img src={personal.photo} alt="" style={{ width:'80px', height:'80px', borderRadius:'50%', objectFit:'cover', border:'4px solid #f0ede8', flexShrink:0 }} />
          : <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'linear-gradient(135deg, #1a1a2e, #e63946)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'1.8rem' }}>✦</div>
        }
        <div>
          <h1 style={{ fontSize:'1.8rem', fontWeight:700, color:'#1a1a2e', letterSpacing:'-0.03em' }}>{safe(personal.firstName)} {safe(personal.lastName)}</h1>
          <p style={{ fontSize:'0.85rem', color:'#e63946', fontWeight:600, marginBottom:'0.5rem' }}>{safe(personal.title)}</p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            {personal.email && <span style={{ fontSize:'0.7rem', color:'#666' }}>✉ {personal.email}</span>}
            {personal.phone && <span style={{ fontSize:'0.7rem', color:'#666' }}>☎ {personal.phone}</span>}
            {personal.location && <span style={{ fontSize:'0.7rem', color:'#666' }}>⌖ {personal.location}</span>}
          </div>
        </div>
      </div>

      <div style={{ padding:'1.5rem 2.2rem', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'2rem' }}>
        <div>
          {summary && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem', marginBottom:'1.2rem', borderLeft:'3px solid #e63946' }}>
            <C4Label>About</C4Label>
            <p style={{ fontSize:'0.78rem', lineHeight:1.75, color:'#444' }}>{summary}</p>
          </div>}

          {experience.length > 0 && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem', marginBottom:'1.2rem' }}>
            <C4Label>Experience</C4Label>
            {experience.map((e,i) => (
              <div key={i} style={{ marginBottom:'1rem', paddingBottom:'1rem', borderBottom: i < experience.length-1 ? '1px dashed #f0ede8' : 'none' }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <strong style={{ fontSize:'0.82rem', color:'#1a1a2e' }}>{safe(e.role)}</strong>
                  <span style={{ fontSize:'0.7rem', color:'#999' }}>{safe(e.startDate)}–{safe(e.endDate)||'Now'}</span>
                </div>
                <p style={{ fontSize:'0.75rem', color:'#e63946', fontWeight:600 }}>{safe(e.company)}</p>
                {e.description && <p style={{ fontSize:'0.75rem', color:'#555', marginTop:'0.3rem', lineHeight:1.65 }}>{e.description}</p>}
              </div>
            ))}
          </div>}

          {education.length > 0 && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem' }}>
            <C4Label>Education</C4Label>
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'0.7rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#1a1a2e' }}>{safe(e.degree)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#666' }}>{safe(e.institution)} · {safe(e.year)}</p>
              </div>
            ))}
          </div>}
        </div>

        <div>
          {skills.length > 0 && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem', marginBottom:'1.2rem' }}>
            <C4Label>Skills</C4Label>
            {skills.map((s,i) => (
              <div key={i} style={{ marginBottom:'0.5rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.75rem', marginBottom:'2px', color:'#1a1a2e' }}><span>{s.name}</span></div>
                <div style={{ height:'4px', background:'#f0ede8', borderRadius:'2px' }}>
                  <div style={{ height:'100%', width:`${(s.level||3)*20}%`, background:'linear-gradient(90deg, #e63946, #c9a84c)', borderRadius:'2px' }} />
                </div>
              </div>
            ))}
          </div>}

          {languages.length > 0 && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem', marginBottom:'1.2rem' }}>
            <C4Label>Languages</C4Label>
            {languages.map((l,i) => <div key={i} style={{ fontSize:'0.78rem', color:'#444', marginBottom:'0.4rem' }}><strong>{l.name}</strong>{l.level && <span style={{ color:'#999' }}> · {l.level}</span>}</div>)}
          </div>}

          {certifications.length > 0 && <div style={{ background:'white', borderRadius:'8px', padding:'1rem 1.2rem' }}>
            <C4Label>Certifications</C4Label>
            {certifications.map((c,i) => <p key={i} style={{ fontSize:'0.75rem', color:'#444', marginBottom:'0.4rem' }}>🏅 {c.name}</p>)}
          </div>}
        </div>
      </div>
    </div>
  );
};
const C4Label = ({ children }) => <p style={{ fontSize:'0.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#c9a84c', marginBottom:'0.7rem' }}>{children}</p>;


/* ══════════════════════════════════════════
   TEMPLATE 5: TECH PROFESSIONAL
   Monospace accents, terminal-inspired
══════════════════════════════════════════ */
export const Template5 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'DM Sans', sans-serif", width:'210mm', minHeight:'297mm', background:'#0d1117', color:'#e6edf3' }}>
      <div style={{ padding:'2rem 2.2rem 1.5rem', borderBottom:'1px solid #21262d' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <p style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.7rem', color:'#58a6ff', marginBottom:'0.5rem' }}>{'>'} profile.json</p>
            <h1 style={{ fontSize:'2rem', fontWeight:700, letterSpacing:'-0.03em', color:'#e6edf3', lineHeight:1 }}>{safe(personal.firstName)} {safe(personal.lastName)}</h1>
            <p style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.78rem', color:'#3fb950', marginTop:'0.4rem' }}>{safe(personal.title)}</p>
          </div>
          {personal.photo
            ? <img src={personal.photo} alt="" style={{ width:'75px', height:'75px', borderRadius:'6px', objectFit:'cover', border:'2px solid #21262d' }} />
            : <div style={{ width:'75px', height:'75px', borderRadius:'6px', background:'#161b22', border:'2px solid #21262d', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Space Mono', monospace", fontSize:'0.6rem', color:'#58a6ff' }}>{'<dev/>'}</div>
          }
        </div>
        <div style={{ display:'flex', gap:'1.5rem', marginTop:'1rem', fontFamily:"'Space Mono', monospace", fontSize:'0.65rem' }}>
          {personal.email && <span style={{ color:'#8b949e' }}>✉ {personal.email}</span>}
          {personal.phone && <span style={{ color:'#8b949e' }}>☎ {personal.phone}</span>}
          {personal.location && <span style={{ color:'#8b949e' }}>📍 {personal.location}</span>}
        </div>
      </div>

      <div style={{ padding:'1.5rem 2.2rem', display:'grid', gridTemplateColumns:'2fr 1fr', gap:'2rem' }}>
        <div>
          {summary && <T5Block label="// about">
            <p style={{ fontSize:'0.78rem', lineHeight:1.75, color:'#8b949e' }}>{summary}</p>
          </T5Block>}

          {experience.length > 0 && <T5Block label="// experience">
            {experience.map((e,i) => (
              <div key={i} style={{ marginBottom:'1.1rem', paddingLeft:'0.8rem', borderLeft:'2px solid #21262d' }}>
                <strong style={{ fontSize:'0.82rem', color:'#e6edf3' }}>{safe(e.role)}</strong>
                <p style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.68rem', color:'#3fb950' }}>{safe(e.company)}</p>
                <p style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.65rem', color:'#8b949e' }}>{safe(e.startDate)} → {safe(e.endDate)||'present'}</p>
                {e.description && <p style={{ fontSize:'0.75rem', color:'#8b949e', marginTop:'0.3rem', lineHeight:1.6 }}>{e.description}</p>}
              </div>
            ))}
          </T5Block>}

          {education.length > 0 && <T5Block label="// education">
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'0.8rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#e6edf3' }}>{safe(e.degree)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#8b949e' }}>{safe(e.institution)} · {safe(e.year)}</p>
              </div>
            ))}
          </T5Block>}
        </div>

        <div>
          {skills.length > 0 && <T5Block label="// stack">
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
              {skills.map((s,i) => <span key={i} style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.65rem', padding:'0.2rem 0.5rem', background:'#21262d', color:'#58a6ff', borderRadius:'4px', border:'1px solid #30363d' }}>{s.name}</span>)}
            </div>
          </T5Block>}

          {languages.length > 0 && <T5Block label="// languages">
            {languages.map((l,i) => <div key={i} style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.7rem', color:'#8b949e', marginBottom:'0.3rem' }}><span style={{ color:'#e6edf3' }}>{l.name}</span>{l.level && <span>{' // '}{l.level}</span>}</div>)}
          </T5Block>}

          {certifications.length > 0 && <T5Block label="// certs">
            {certifications.map((c,i) => <p key={i} style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.68rem', color:'#3fb950', marginBottom:'0.3rem' }}>✓ {c.name}</p>)}
          </T5Block>}
        </div>
      </div>
    </div>
  );
};
const T5Block = ({ label, children }) => (
  <div style={{ marginBottom:'1.4rem' }}>
    <p style={{ fontFamily:"'Space Mono', monospace", fontSize:'0.68rem', color:'#58a6ff', marginBottom:'0.7rem' }}>{label}</p>
    {children}
  </div>
);


/* ══════════════════════════════════════════
   TEMPLATE 6: ELEGANT FEMININE
   Pastel, script accent, soft
══════════════════════════════════════════ */
export const Template6 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'Cormorant Garamond', serif", width:'210mm', minHeight:'297mm', background:'#fdfaf7' }}>
      {/* Decorative top */}
      <div style={{ background:'#2d2d52', padding:'2rem 2.5rem', display:'flex', gap:'1.5rem', alignItems:'center' }}>
        {personal.photo
          ? <img src={personal.photo} alt="" style={{ width:'88px', height:'88px', borderRadius:'50%', objectFit:'cover', border:'3px solid #e8d5a3', flexShrink:0 }} />
          : <div style={{ width:'88px', height:'88px', borderRadius:'50%', background:'rgba(232,213,163,0.15)', border:'2px solid rgba(232,213,163,0.4)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem' }}>✦</div>
        }
        <div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'2.2rem', fontWeight:400, fontStyle:'italic', color:'white', lineHeight:1.1 }}>{safe(personal.firstName)} {safe(personal.lastName)}</h1>
          <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem', color:'#e8d5a3', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:'0.4rem' }}>{safe(personal.title)}</p>
          <div style={{ display:'flex', gap:'1.2rem', marginTop:'0.8rem', flexWrap:'wrap' }}>
            {[personal.email, personal.phone, personal.location].filter(Boolean).map((v,i) => <span key={i} style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.68rem', color:'rgba(255,255,255,0.6)' }}>{v}</span>)}
          </div>
        </div>
      </div>

      <div style={{ padding:'1.8rem 2.5rem', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'2.5rem' }}>
        <div>
          {summary && <><E6Head>Profile</E6Head><p style={{ fontSize:'0.88rem', lineHeight:1.85, color:'#555', marginBottom:'1.5rem' }}>{summary}</p></>}

          {experience.length > 0 && <>
            <E6Head>Experience</E6Head>
            {experience.map((e,i) => (
              <div key={i} style={{ marginBottom:'1.1rem', paddingLeft:'1rem', position:'relative' }}>
                <div style={{ position:'absolute', left:0, top:'5px', width:'5px', height:'5px', borderRadius:'50%', background:'#c9a84c' }} />
                <strong style={{ fontSize:'0.9rem', color:'#2d2d52', fontStyle:'italic' }}>{safe(e.role)}</strong>
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.73rem', color:'#c9a84c', fontWeight:600, letterSpacing:'0.05em' }}>{safe(e.company)}</p>
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.68rem', color:'#999' }}>{safe(e.startDate)} – {safe(e.endDate)||'Present'}</p>
                {e.description && <p style={{ fontSize:'0.82rem', color:'#555', marginTop:'0.3rem', lineHeight:1.7 }}>{e.description}</p>}
              </div>
            ))}
          </>}
        </div>

        <div>
          {education.length > 0 && <>
            <E6Head>Education</E6Head>
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'1rem' }}>
                <strong style={{ fontSize:'0.9rem', color:'#2d2d52', fontStyle:'italic' }}>{safe(e.degree)}</strong>
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.73rem', color:'#666' }}>{safe(e.institution)}</p>
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.68rem', color:'#999' }}>{safe(e.year)}</p>
              </div>
            ))}
          </>}

          {skills.length > 0 && <>
            <E6Head>Skills</E6Head>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.4rem' }}>
              {skills.map((s,i) => <span key={i} style={{ fontFamily:"'DM Sans', sans-serif", padding:'0.2rem 0.7rem', border:'1px solid #e8d5a3', borderRadius:'20px', fontSize:'0.7rem', color:'#2d2d52', background:'rgba(232,213,163,0.2)' }}>{s.name}</span>)}
            </div>
          </>}

          {languages.length > 0 && <>
            <E6Head>Languages</E6Head>
            {languages.map((l,i) => <p key={i} style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.78rem', color:'#555', marginBottom:'0.3rem' }}>{l.name}{l.level && <span style={{ color:'#c9a84c' }}> — {l.level}</span>}</p>)}
          </>}

          {certifications.length > 0 && <>
            <E6Head>Certifications</E6Head>
            {certifications.map((c,i) => <p key={i} style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.75rem', color:'#555', marginBottom:'0.3rem' }}>✦ {c.name}</p>)}
          </>}
        </div>
      </div>
    </div>
  );
};
const E6Head = ({ children }) => (
  <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize:'1.05rem', fontWeight:700, color:'#2d2d52', borderBottom:'1px solid #e8d5a3', paddingBottom:'0.25rem', marginBottom:'0.9rem' }}>{children}</h3>
);


/* ══════════════════════════════════════════
   TEMPLATE 7: CORPORATE CLEAN
   Simple, ATS-friendly, professional
══════════════════════════════════════════ */
export const Template7 = ({ data }) => {
  const { personal={}, experience=[], education=[], skills=[], languages=[], certifications=[], summary='' } = data;
  return (
    <div id="cv-print-area" style={{ fontFamily:"'DM Sans', sans-serif", width:'210mm', minHeight:'297mm', background:'#fff', padding:'2.2rem 2.5rem' }}>
      {/* Header strip */}
      <div style={{ borderBottom:'4px solid #1a1a2e', paddingBottom:'1.2rem', marginBottom:'1.5rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', gap:'1.2rem', alignItems:'center' }}>
            {personal.photo && <img src={personal.photo} alt="" style={{ width:'70px', height:'70px', borderRadius:'4px', objectFit:'cover' }} />}
            <div>
              <h1 style={{ fontSize:'1.8rem', fontWeight:700, color:'#1a1a2e', letterSpacing:'-0.02em' }}>{safe(personal.firstName)} {safe(personal.lastName)}</h1>
              <p style={{ fontSize:'0.85rem', color:'#1a1a2e', fontWeight:600, marginTop:'0.2rem' }}>{safe(personal.title)}</p>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            {personal.email && <p style={{ fontSize:'0.75rem', color:'#555' }}>{personal.email}</p>}
            {personal.phone && <p style={{ fontSize:'0.75rem', color:'#555' }}>{personal.phone}</p>}
            {personal.location && <p style={{ fontSize:'0.75rem', color:'#555' }}>{personal.location}</p>}
            {personal.linkedin && <p style={{ fontSize:'0.75rem', color:'#555' }}>{personal.linkedin}</p>}
          </div>
        </div>
      </div>

      {summary && <C7Block title="Professional Summary">
        <p style={{ fontSize:'0.8rem', lineHeight:1.75, color:'#333' }}>{summary}</p>
      </C7Block>}

      {experience.length > 0 && <C7Block title="Professional Experience">
        {experience.map((e,i) => (
          <div key={i} style={{ marginBottom:'1.1rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <strong style={{ fontSize:'0.85rem', color:'#1a1a2e' }}>{safe(e.role)}</strong>
              <span style={{ fontSize:'0.72rem', color:'#777' }}>{safe(e.startDate)} – {safe(e.endDate)||'Present'}</span>
            </div>
            <p style={{ fontSize:'0.78rem', color:'#444', fontWeight:600 }}>{safe(e.company)}{e.location && ` | ${e.location}`}</p>
            {e.description && <p style={{ fontSize:'0.78rem', color:'#555', marginTop:'0.3rem', lineHeight:1.65 }}>{e.description}</p>}
          </div>
        ))}
      </C7Block>}

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
        <div>
          {education.length > 0 && <C7Block title="Education">
            {education.map((e,i) => (
              <div key={i} style={{ marginBottom:'0.8rem' }}>
                <strong style={{ fontSize:'0.82rem', color:'#1a1a2e' }}>{safe(e.degree)}</strong>
                <p style={{ fontSize:'0.75rem', color:'#555' }}>{safe(e.institution)}</p>
                <p style={{ fontSize:'0.72rem', color:'#888' }}>{safe(e.year)}</p>
              </div>
            ))}
          </C7Block>}

          {certifications.length > 0 && <C7Block title="Certifications">
            {certifications.map((c,i) => <p key={i} style={{ fontSize:'0.78rem', color:'#333', marginBottom:'0.3rem' }}>• {c.name}</p>)}
          </C7Block>}
        </div>

        <div>
          {skills.length > 0 && <C7Block title="Core Skills">
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
              {skills.map((s,i) => <span key={i} style={{ padding:'0.2rem 0.6rem', background:'#f0ede8', borderRadius:'3px', fontSize:'0.72rem', color:'#1a1a2e', fontWeight:600 }}>{s.name}</span>)}
            </div>
          </C7Block>}

          {languages.length > 0 && <C7Block title="Languages">
            {languages.map((l,i) => <p key={i} style={{ fontSize:'0.78rem', color:'#444', marginBottom:'0.3rem' }}>• {l.name}{l.level && ` (${l.level})`}</p>)}
          </C7Block>}
        </div>
      </div>
    </div>
  );
};
const C7Block = ({ title, children }) => (
  <div style={{ marginBottom:'1.4rem' }}>
    <h3 style={{ fontSize:'0.75rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#1a1a2e', borderBottom:'1.5px solid #e8e4dc', paddingBottom:'0.25rem', marginBottom:'0.7rem' }}>{title}</h3>
    {children}
  </div>
);

export const TEMPLATES = [
  { id:'t1', name:'Executive Classic', tag:'Corporate', component: Template1 },
  { id:'t2', name:'Modern Minimalist', tag:'Popular', component: Template2 },
  { id:'t3', name:'Editorial Bold', tag:'Creative', component: Template3 },
  { id:'t4', name:'Studio Creative', tag:'Design', component: Template4 },
  { id:'t5', name:'Tech Professional', tag:'Developer', component: Template5 },
  { id:'t6', name:'Elegant Serif', tag:'Classic', component: Template6 },
  { id:'t7', name:'Corporate Clean', tag:'ATS-Safe', component: Template7 },
];
