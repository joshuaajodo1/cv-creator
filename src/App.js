import React, { useState, useRef } from 'react';
import './index.css';
import { TEMPLATES } from './templates/Templates';

const STEPS = ['Personal Info', 'Experience', 'Education', 'Skills & More', 'Choose Template', 'Preview & Export'];

const defaultData = {
  personal: { firstName:'', lastName:'', title:'', email:'', phone:'', location:'', linkedin:'', website:'', photo: null },
  summary: '',
  experience: [{ role:'', company:'', location:'', startDate:'', endDate:'', description:'' }],
  education: [{ degree:'', institution:'', year:'', grade:'' }],
  skills: [],
  languages: [],
  certifications: [],
};

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(defaultData);
  const [selectedTemplate, setSelectedTemplate] = useState('t2');
  const [skillInput, setSkillInput] = useState('');
  const [langInput, setLangInput] = useState({ name:'', level:'' });
  const [certInput, setCertInput] = useState('');
  const printRef = useRef();

  const progress = ((step) / (STEPS.length - 1)) * 100;

  /* ─── Helpers ─── */
  const setPersonal = (k, v) => setData(d => ({ ...d, personal: { ...d.personal, [k]: v } }));
  const setSummary = v => setData(d => ({ ...d, summary: v }));

  const setExpItem = (i, k, v) => setData(d => {
    const arr = [...d.experience]; arr[i] = { ...arr[i], [k]: v }; return { ...d, experience: arr };
  });
  const addExp = () => setData(d => ({ ...d, experience: [...d.experience, { role:'', company:'', location:'', startDate:'', endDate:'', description:'' }] }));
  const removeExp = i => setData(d => ({ ...d, experience: d.experience.filter((_,j) => j !== i) }));

  const setEduItem = (i, k, v) => setData(d => {
    const arr = [...d.education]; arr[i] = { ...arr[i], [k]: v }; return { ...d, education: arr };
  });
  const addEdu = () => setData(d => ({ ...d, education: [...d.education, { degree:'', institution:'', year:'', grade:'' }] }));
  const removeEdu = i => setData(d => ({ ...d, education: d.education.filter((_,j) => j !== i) }));

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setData(d => ({ ...d, skills: [...d.skills, { name: skillInput.trim(), level: 3 }] }));
    setSkillInput('');
  };
  const removeSkill = i => setData(d => ({ ...d, skills: d.skills.filter((_,j) => j !== i) }));
  const setSkillLevel = (i, v) => setData(d => { const arr=[...d.skills]; arr[i]={...arr[i],level:v}; return {...d,skills:arr}; });

  const addLang = () => {
    if (!langInput.name.trim()) return;
    setData(d => ({ ...d, languages: [...d.languages, { ...langInput }] }));
    setLangInput({ name:'', level:'' });
  };
  const removeLang = i => setData(d => ({ ...d, languages: d.languages.filter((_,j) => j !== i) }));

  const addCert = () => {
    if (!certInput.trim()) return;
    setData(d => ({ ...d, certifications: [...d.certifications, { name: certInput.trim() }] }));
    setCertInput('');
  };
  const removeCert = i => setData(d => ({ ...d, certifications: d.certifications.filter((_,j) => j !== i) }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPersonal('photo', ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePrint = () => window.print();

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-print-area');
    if (!element) return;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().set({
        margin: 0,
        filename: `${data.personal.firstName || 'My'}_${data.personal.lastName || 'CV'}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  };

  const TemplateComp = TEMPLATES.find(t => t.id === selectedTemplate)?.component;

  /* ─── Steps ─── */
  const renderStep = () => {
    switch(step) {
      case 0: return <StepPersonal data={data} setPersonal={setPersonal} setSummary={setSummary} handlePhoto={handlePhoto} />;
      case 1: return <StepExperience experience={data.experience} setExpItem={setExpItem} addExp={addExp} removeExp={removeExp} />;
      case 2: return <StepEducation education={data.education} setEduItem={setEduItem} addEdu={addEdu} removeEdu={removeEdu} />;
      case 3: return <StepSkills
        skills={data.skills} skillInput={skillInput} setSkillInput={setSkillInput} addSkill={addSkill} removeSkill={removeSkill} setSkillLevel={setSkillLevel}
        langInput={langInput} setLangInput={setLangInput} addLang={addLang} removeLang={removeLang} languages={data.languages}
        certInput={certInput} setCertInput={setCertInput} addCert={addCert} removeCert={removeCert} certifications={data.certifications}
      />;
      case 4: return <StepTemplates selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} data={data} />;
      case 5: return <StepPreview data={data} TemplateComp={TemplateComp} handlePrint={handlePrint} handleDownloadPDF={handleDownloadPDF} />;
      default: return null;
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header" style={{ position:'relative' }}>
        <div className="logo">CV<span>Craft</span></div>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px' }}>
          <span className="step-label">{STEPS[step]}</span>
          <div className="header-steps">
            {STEPS.map((_,i) => <div key={i} className={`step-dot ${i===step?'active':i<step?'done':''}`} />)}
          </div>
        </div>
        <div style={{ fontSize:'0.75rem', color:'rgba(255,255,255,0.5)' }}>{step+1} / {STEPS.length}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="main-content">
        {renderStep()}

        {step < 5 && (
          <div className="nav-buttons" style={{ maxWidth: step===4?'1100px':'760px', width:'100%' }}>
            <button className="btn-secondary" onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}>
              ← Back
            </button>
            <button className="btn-primary" onClick={() => setStep(s => Math.min(STEPS.length-1, s+1))}>
              {step===4 ? '✓ Generate CV' : 'Continue'} →
            </button>
          </div>
        )}
        {step===5 && (
          <div className="nav-buttons" style={{ maxWidth:'900px', width:'100%' }}>
            <button className="btn-secondary" onClick={() => setStep(4)}>← Change Template</button>
            <button className="btn-secondary" onClick={() => setStep(0)}>✎ Edit Info</button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ══════════ STEP COMPONENTS ══════════ */

function StepPersonal({ data, setPersonal, setSummary, handlePhoto }) {
  return (
    <div className="form-container">
      <h2 className="section-heading">Personal Information</h2>
      <p className="section-sub">Let's start with the basics — this forms the header of your CV.</p>

      <div className="form-card">
        <h3><span className="card-icon">📷</span>Profile Photo</h3>
        <div className="photo-upload">
          {data.personal.photo
            ? <img src={data.personal.photo} alt="Profile" className="photo-preview" />
            : <div className="photo-placeholder">👤</div>
          }
          <div>
            <label htmlFor="photo-input" className="upload-btn" style={{ cursor:'pointer' }}>Upload Photo</label>
            <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} style={{ display:'none' }} />
            <p style={{ fontSize:'0.78rem', color:'#888', marginTop:'0.5rem' }}>JPG, PNG. Optional but recommended.</p>
            {data.personal.photo && <button onClick={() => setPersonal('photo', null)} style={{ fontSize:'0.75rem', color:'#e63946', background:'none', border:'none', cursor:'pointer', marginTop:'4px' }}>Remove photo</button>}
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3><span className="card-icon">✦</span>Name & Title</h3>
        <div className="form-grid">
          <div className="field">
            <label>First Name *</label>
            <input placeholder="e.g. Amara" value={data.personal.firstName} onChange={e => setPersonal('firstName', e.target.value)} />
          </div>
          <div className="field">
            <label>Last Name *</label>
            <input placeholder="e.g. Okafor" value={data.personal.lastName} onChange={e => setPersonal('lastName', e.target.value)} />
          </div>
          <div className="field span-2">
            <label>Professional Title *</label>
            <input placeholder="e.g. Senior Product Manager" value={data.personal.title} onChange={e => setPersonal('title', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3><span className="card-icon">✉</span>Contact Details</h3>
        <div className="form-grid">
          <div className="field">
            <label>Email *</label>
            <input type="email" placeholder="you@example.com" value={data.personal.email} onChange={e => setPersonal('email', e.target.value)} />
          </div>
          <div className="field">
            <label>Phone</label>
            <input placeholder="+234 800 000 0000" value={data.personal.phone} onChange={e => setPersonal('phone', e.target.value)} />
          </div>
          <div className="field">
            <label>City / Location</label>
            <input placeholder="Lagos, Nigeria" value={data.personal.location} onChange={e => setPersonal('location', e.target.value)} />
          </div>
          <div className="field">
            <label>LinkedIn</label>
            <input placeholder="linkedin.com/in/yourname" value={data.personal.linkedin} onChange={e => setPersonal('linkedin', e.target.value)} />
          </div>
          <div className="field span-2">
            <label>Website / Portfolio</label>
            <input placeholder="www.yourportfolio.com" value={data.personal.website} onChange={e => setPersonal('website', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-card">
        <h3><span className="card-icon">📝</span>Professional Summary</h3>
        <div className="field">
          <label>About You</label>
          <textarea
            placeholder="Write 2-4 sentences about your career background, key strengths, and what you bring to the table..."
            value={data.summary}
            onChange={e => setSummary(e.target.value)}
            style={{ minHeight:'120px' }}
          />
        </div>
      </div>
    </div>
  );
}

function StepExperience({ experience, setExpItem, addExp, removeExp }) {
  return (
    <div className="form-container">
      <h2 className="section-heading">Work Experience</h2>
      <p className="section-sub">Add your work history, starting with the most recent position.</p>

      {experience.map((exp, i) => (
        <div className="form-card" key={i} style={{ position:'relative' }}>
          <h3>
            <span className="card-icon">💼</span>
            Position {i+1}
            {experience.length > 1 && <button className="remove-btn" style={{ position:'static', marginLeft:'auto' }} onClick={() => removeExp(i)}>✕</button>}
          </h3>
          <div className="form-grid">
            <div className="field">
              <label>Job Title *</label>
              <input placeholder="e.g. Marketing Manager" value={exp.role} onChange={e => setExpItem(i,'role',e.target.value)} />
            </div>
            <div className="field">
              <label>Company *</label>
              <input placeholder="e.g. Dangote Group" value={exp.company} onChange={e => setExpItem(i,'company',e.target.value)} />
            </div>
            <div className="field">
              <label>Location</label>
              <input placeholder="Lagos, Nigeria" value={exp.location} onChange={e => setExpItem(i,'location',e.target.value)} />
            </div>
            <div className="field" />
            <div className="field">
              <label>Start Date</label>
              <input placeholder="Jan 2020" value={exp.startDate} onChange={e => setExpItem(i,'startDate',e.target.value)} />
            </div>
            <div className="field">
              <label>End Date</label>
              <input placeholder="Dec 2023 or leave blank for current" value={exp.endDate} onChange={e => setExpItem(i,'endDate',e.target.value)} />
            </div>
            <div className="field span-2">
              <label>Description / Achievements</label>
              <textarea placeholder="Describe your key responsibilities and achievements. Use numbers and action verbs where possible (e.g. 'Increased sales by 35%...')" value={exp.description} onChange={e => setExpItem(i,'description',e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={addExp}>+ Add Another Position</button>
    </div>
  );
}

function StepEducation({ education, setEduItem, addEdu, removeEdu }) {
  return (
    <div className="form-container">
      <h2 className="section-heading">Education</h2>
      <p className="section-sub">List your academic qualifications, most recent first.</p>

      {education.map((edu, i) => (
        <div className="form-card" key={i} style={{ position:'relative' }}>
          <h3>
            <span className="card-icon">🎓</span>
            Qualification {i+1}
            {education.length > 1 && <button className="remove-btn" style={{ position:'static', marginLeft:'auto' }} onClick={() => removeEdu(i)}>✕</button>}
          </h3>
          <div className="form-grid">
            <div className="field span-2">
              <label>Degree / Qualification *</label>
              <input placeholder="e.g. BSc Computer Science, MBA, HND Accounting" value={edu.degree} onChange={e => setEduItem(i,'degree',e.target.value)} />
            </div>
            <div className="field">
              <label>Institution *</label>
              <input placeholder="e.g. University of Lagos" value={edu.institution} onChange={e => setEduItem(i,'institution',e.target.value)} />
            </div>
            <div className="field">
              <label>Year of Graduation</label>
              <input placeholder="e.g. 2019" value={edu.year} onChange={e => setEduItem(i,'year',e.target.value)} />
            </div>
            <div className="field">
              <label>Grade / Class (Optional)</label>
              <input placeholder="e.g. Second Class Upper, 3.8 GPA" value={edu.grade} onChange={e => setEduItem(i,'grade',e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className="add-btn" onClick={addEdu}>+ Add Another Qualification</button>
    </div>
  );
}

function StepSkills({ skills, skillInput, setSkillInput, addSkill, removeSkill, setSkillLevel, langInput, setLangInput, addLang, removeLang, languages, certInput, setCertInput, addCert, removeCert, certifications }) {
  return (
    <div className="form-container">
      <h2 className="section-heading">Skills, Languages & More</h2>
      <p className="section-sub">Highlight your expertise and additional qualifications.</p>

      <div className="form-card">
        <h3><span className="card-icon">⚡</span>Skills</h3>
        <div className="skills-input-row">
          <input
            placeholder="Type a skill (e.g. Project Management, Excel, Python...)"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && addSkill()}
          />
          <button className="tag-btn" onClick={addSkill}>Add</button>
        </div>
        {skills.length > 0 && (
          <div>
            {skills.map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.6rem', background:'#faf9f6', borderRadius:'6px', padding:'0.5rem 0.8rem' }}>
                <span style={{ flex:1, fontSize:'0.85rem', fontWeight:600 }}>{s.name}</span>
                <div className="star-rating">
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className={`star ${n <= (s.level||3) ? 'filled' : ''}`} onClick={() => setSkillLevel(i,n)}>★</span>
                  ))}
                </div>
                <button onClick={() => removeSkill(i)} style={{ background:'none', border:'none', color:'#e63946', cursor:'pointer', fontSize:'1rem' }}>✕</button>
              </div>
            ))}
          </div>
        )}
        {skills.length === 0 && <p style={{ fontSize:'0.8rem', color:'#aaa', textAlign:'center', padding:'1rem' }}>No skills added yet. Type one above and press Add or Enter.</p>}
      </div>

      <div className="form-card">
        <h3><span className="card-icon">🌍</span>Languages</h3>
        <div className="form-grid cols-3" style={{ marginBottom:'0.75rem' }}>
          <div className="field" style={{ gridColumn:'span 2' }}>
            <label>Language</label>
            <input placeholder="e.g. Yoruba, French, Hausa" value={langInput.name} onChange={e => setLangInput(l => ({...l, name: e.target.value}))} onKeyDown={e => e.key==='Enter' && addLang()} />
          </div>
          <div className="field">
            <label>Proficiency</label>
            <select value={langInput.level} onChange={e => setLangInput(l => ({...l, level: e.target.value}))}>
              <option value="">Select...</option>
              <option>Native</option>
              <option>Fluent</option>
              <option>Advanced</option>
              <option>Intermediate</option>
              <option>Basic</option>
            </select>
          </div>
        </div>
        <button className="add-btn" onClick={addLang}>+ Add Language</button>
        {languages.length > 0 && (
          <div className="tags-list" style={{ marginTop:'0.75rem' }}>
            {languages.map((l,i) => (
              <span key={i} className="tag">{l.name}{l.level ? ` (${l.level})` : ''} <button onClick={() => removeLang(i)}>✕</button></span>
            ))}
          </div>
        )}
      </div>

      <div className="form-card">
        <h3><span className="card-icon">🏅</span>Certifications & Awards</h3>
        <div className="skills-input-row">
          <input
            placeholder="e.g. PMP Certification, Google Analytics, ACCA..."
            value={certInput}
            onChange={e => setCertInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && addCert()}
          />
          <button className="tag-btn" onClick={addCert}>Add</button>
        </div>
        {certifications.length > 0 && (
          <div className="tags-list" style={{ marginTop:'0.75rem' }}>
            {certifications.map((c,i) => (
              <span key={i} className="tag">{c.name} <button onClick={() => removeCert(i)}>✕</button></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StepTemplates({ selectedTemplate, setSelectedTemplate, data }) {
  return (
    <div className="template-picker">
      <h2 className="section-heading">Choose Your CV Design</h2>
      <p className="section-sub">Pick a template that matches your industry and personality. You can change it anytime.</p>

      <div className="templates-grid">
        {TEMPLATES.map(t => {
          const Comp = t.component;
          const isSelected = selectedTemplate === t.id;
          return (
            <div key={t.id} className={`template-card ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedTemplate(t.id)}>
              <div className="template-thumb">
                <div className="template-thumb-inner">
                  <Comp data={data} />
                </div>
              </div>
              <div className="template-label">
                <span className="template-name">{t.name}</span>
                <span className={`template-tag ${isSelected ? 'selected-badge' : ''}`}>{isSelected ? '✓ Selected' : t.tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepPreview({ data, TemplateComp, handlePrint, handleDownloadPDF }) {
  return (
    <div className="preview-container">
      <h2 className="section-heading">Your CV is Ready!</h2>
      <p className="section-sub">Review your CV below. Download it as PDF or print directly.</p>

      <div className="preview-actions">
        <button className="btn-gold" onClick={handleDownloadPDF}>
          ⬇ Download PDF
        </button>
        <button className="btn-primary" onClick={handlePrint}>
          🖨 Print CV
        </button>
        <span style={{ fontSize:'0.8rem', color:'#888', marginLeft:'auto' }}>A4 format · Print-ready</span>
      </div>

      <div className="cv-preview-wrapper">
        {TemplateComp && <TemplateComp data={data} />}
      </div>
    </div>
  );
}
