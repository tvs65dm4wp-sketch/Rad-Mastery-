
function deepInteractiveFor(lesson){
 const t=lesson.title;
 if(t==='Bremsstrahlung production') return `<section class="science-lab"><div class="lab-title"><span>Atomic Interaction Lab</span><h3>Bremsstrahlung: change the impact parameter</h3><p>Move the projectile electron closer to or farther from the tungsten nucleus. The model shows relative deflection and energy transfer—not literal atomic scale.</p></div><div class="atom-stage" id="bremStage"><div class="nucleus">W<span>+</span></div><div class="electron projectile" id="bremElectron">e−</div><div class="photon" id="bremPhoton">X-ray photon ⇢</div><svg viewBox="0 0 600 180" preserveAspectRatio="none"><path id="bremPath" d="M20 120 Q300 120 570 120"/></svg></div><label>Closest approach to nucleus <input id="impactSlider" type="range" min="1" max="100" value="55"></label><div class="lab-readout"><b id="bremDeflect">Moderate deflection</b><span id="bremEnergy">Moderate photon energy</span></div><button class="btn lab-run" id="runBrem">Run interaction</button></section>`;
 if(t==='Characteristic radiation production') return `<section class="science-lab"><div class="lab-title"><span>Atomic Interaction Lab</span><h3>Characteristic radiation: create and fill a K-shell vacancy</h3><p>Set projectile energy. Tungsten K-shell ionization requires roughly 69.5 keV. When the threshold is met, watch the vacancy and shell transition.</p></div><div class="shell-stage"><div class="shell s1"><i class="bound k">e−</i></div><div class="shell s2"><i class="bound l">e−</i></div><div class="nucleus center">W</div><div class="projectile-char">e− →</div><div class="char-photon">X-ray ⇢</div></div><label>Projectile energy <input id="charEnergy" type="range" min="40" max="120" value="70"> <b id="charEnergyOut">70 keV</b></label><button class="btn" id="runChar">Run interaction</button><p id="charResult" class="lab-readout">Set the energy, predict whether K-shell ionization can occur, then run it.</p></section>`;
 if(t==='Inverse square law and exposure relationships') return `<section class="science-lab"><div class="lab-title"><span>Distance Lab</span><h3>Move away from the source</h3></div><div class="distance-stage"><div class="source-dot">X-ray<br>source</div><div class="meter" id="distanceMeter">100%</div></div><label>Distance <input id="distanceSlider" type="range" min="1" max="4" step=".1" value="1"> <b id="distanceOut">1.0×</b></label><p id="intensityOut" class="lab-readout">Relative intensity: 100%</p></section>`;
 if(t==='Filtration, HVL, and beam hardening') return `<section class="science-lab"><div class="lab-title"><span>Beam Quality Lab</span><h3>Stack half-value layers</h3></div><label>Number of HVLs <input id="hvlSlider" type="range" min="0" max="6" value="0"> <b id="hvlCount">0</b></label><div class="beam-meter"><i id="beamRemain" style="width:100%"></i></div><p id="hvlResult" class="lab-readout">100% remains</p></section>`;
 if(t==='Transformers and turns ratio') return `<section class="science-lab"><div class="lab-title"><span>Circuit Lab</span><h3>Build a transformer ratio</h3></div><div class="two-controls"><label>Primary turns <input id="pTurns" type="range" min="100" max="1000" step="100" value="500"></label><label>Secondary turns <input id="sTurns" type="range" min="100" max="5000" step="100" value="2000"></label></div><p id="transformOut" class="lab-readout">Turns ratio 4.0:1 → secondary voltage is 4.0× primary.</p></section>`;
 if(t==='Thermionic emission and space charge') return `<section class="science-lab"><div class="lab-title"><span>Cathode Lab</span><h3>Heat the filament</h3><p>Increase filament heating and watch relative electron availability rise. This represents thermionic emission, not x-ray production.</p></div><label>Filament heating <input id="filamentHeat" type="range" min="0" max="100" value="25"></label><div class="electron-cloud" id="electronCloud"></div><p id="filamentOut" class="lab-readout">Low electron availability</p></section>`;
 if(t==='Photoelectric, Compton, and coherent interactions') return `<section class="science-lab"><div class="lab-title"><span>Matter Interaction Lab</span><h3>Compare photon interactions</h3></div><div class="interaction-tabs"><button data-mode="pe">Photoelectric</button><button data-mode="compton">Compton</button><button data-mode="coherent">Coherent</button></div><div id="interactionDemo" class="interaction-demo">Choose an interaction to trace photon energy and electron behavior.</div></section>`;
 return "";
}
function wireDeepInteractive(lesson){
 const $id=x=>document.getElementById(x);
 if($id('impactSlider')){const upd=()=>{let v=+$id('impactSlider').value, close=101-v; $id('bremDeflect').textContent=close>70?'Strong deflection':close>35?'Moderate deflection':'Small deflection';$id('bremEnergy').textContent=close>70?'Potentially higher-energy photon':close>35?'Moderate energy transfer':'Typically smaller energy transfer';let y=35+v*.9;$id('bremPath').setAttribute('d',`M20 120 Q300 ${y} 570 ${Math.min(160,y+20)}`)}; $id('impactSlider').oninput=upd;upd();$id('runBrem').onclick=()=>{$id('bremElectron').classList.remove('fly');$id('bremPhoton').classList.remove('emit');void $id('bremElectron').offsetWidth;$id('bremElectron').classList.add('fly');setTimeout(()=>$id('bremPhoton').classList.add('emit'),650)}}
 if($id('charEnergy')){const upd=()=>{$id('charEnergyOut').textContent=$id('charEnergy').value+' keV'};$id('charEnergy').oninput=upd;upd();$id('runChar').onclick=()=>{let e=+$id('charEnergy').value;if(e<69.5){$id('charResult').textContent='Below ~69.5 keV: insufficient projectile energy to eject a tungsten K-shell electron. No K-characteristic event.';return}$id('charResult').textContent='Threshold exceeded: K-shell ionization is possible. An outer-shell electron can fill the vacancy and emit a discrete characteristic photon.';document.querySelector('.shell-stage').classList.remove('animate');void document.querySelector('.shell-stage').offsetWidth;document.querySelector('.shell-stage').classList.add('animate')}}
 if($id('distanceSlider')){const upd=()=>{let d=+$id('distanceSlider').value,i=100/(d*d);$id('distanceOut').textContent=d.toFixed(1)+'×';$id('intensityOut').textContent='Relative intensity: '+i.toFixed(1)+'%';$id('distanceMeter').style.opacity=Math.max(.15,i/100)};$id('distanceSlider').oninput=upd;upd()}
 if($id('hvlSlider')){const upd=()=>{let n=+$id('hvlSlider').value,r=100/Math.pow(2,n);$id('hvlCount').textContent=n;$id('beamRemain').style.width=r+'%';$id('hvlResult').textContent=r.toFixed(2)+'% remains after '+n+' HVL'+(n===1?'':'s')};$id('hvlSlider').oninput=upd;upd()}
 if($id('pTurns')){const upd=()=>{let r=+$id('sTurns').value/+$id('pTurns').value;$id('transformOut').textContent=`Turns ratio ${r.toFixed(2)}:1 → secondary voltage is ${r.toFixed(2)}× primary.`};$id('pTurns').oninput=upd;$id('sTurns').oninput=upd;upd()}
 if($id('filamentHeat')){const upd=()=>{let v=+$id('filamentHeat').value,n=Math.round(v/5);$id('electronCloud').innerHTML=Array.from({length:n},(_,i)=>`<i style="left:${8+(i*37)%88}%;top:${12+(i*29)%70}%">−</i>`).join('');$id('filamentOut').textContent=v<35?'Low electron availability':v<70?'Increasing thermionic emission':'High relative electron availability'};$id('filamentHeat').oninput=upd;upd()}
 document.querySelectorAll('.interaction-tabs button').forEach(b=>b.onclick=()=>{let m=b.dataset.mode,txt=m==='pe'?'Photon is completely absorbed. A bound electron is ejected with kinetic energy equal to photon energy minus binding energy.':m==='compton'?'Photon transfers part of its energy to an outer electron. A recoil electron and lower-energy scattered photon leave the interaction.':'Photon changes direction with essentially no energy loss and no ionization.';$id('interactionDemo').textContent=txt});
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const state = JSON.parse(localStorage.getItem("rrm-state") || "{}");
state.completedLessons ||= [];
state.bookmarks ||= [];
state.missed ||= [];
state.answered ||= 12;
state.correct ||= 10;
state.masteryScores ||= {};
state.preferredSpeed ||= 0.9;

function saveState() {
  localStorage.setItem("rrm-state", JSON.stringify(state));
  updateOverview();
}
function applyTheme() {
  document.body.classList.toggle("dark", localStorage.getItem("rrm-theme") === "dark");
}
applyTheme();

$("#dashboardTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("rrm-theme", document.body.classList.contains("dark") ? "dark" : "light");
});
$("#menuToggle").addEventListener("click", () => $("#sidebar").classList.toggle("open"));

const titles = {overview:"Overview",lessons:"Lessons",questions:"Question Bank",flashcards:"Flashcards",exam:"Mock Exam",downloads:"Downloads",community:"Student Hub"};
function showView(view) {
  $$(".dashboard-view").forEach(v => v.classList.remove("active"));
  $(`#${view}View`).classList.add("active");
  $$(".side-link[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  $("#viewTitle").textContent = titles[view];
  $("#sidebar").classList.remove("open");
}
$$(".side-link[data-view]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
$$(".jump-view").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.target)));

const allLessons = courseData.flatMap(module => module.lessons.map(lesson => ({...lesson,module:module.module})));

function updateOverview() {
  const pct = Math.round((state.completedLessons.length / allLessons.length) * 100);
  $("#overallPercent").textContent = `${pct}%`;
  $("#overallRing").style.setProperty("--progress", pct);
  $("#answeredCount").textContent = state.answered;
  $("#averageScore").textContent = state.answered ? `${Math.round((state.correct/state.answered)*100)}%` : "0%";
  const modules = courseData.map(module => {
    const done = module.lessons.filter(l => state.completedLessons.includes(l.id)).length;
    const mpct = Math.round((done / module.lessons.length) * 100);
    return `<div class="module-progress"><span>${module.module}</span><strong>${done}/${module.lessons.length}</strong><div class="bar"><i style="width:${mpct}%"></i></div></div>`;
  }).join("");
  $("#overviewModules").innerHTML = modules;
}
updateOverview();

function renderLessonList(filter="") {
  const f = filter.toLowerCase().trim();
  const modules = courseData.map(module => {
    const lessons = module.lessons.filter(l => `${l.title} ${l.category||""} ${module.module} ${l.summary}`.toLowerCase().includes(f));
    if (!lessons.length) return "";
    const doneCount = lessons.filter(l => state.completedLessons.includes(l.id)).length;
    const byCategory = lessons.reduce((acc,l)=>{const c=l.category||"Core Concepts";(acc[c]||=[]).push(l);return acc;},{});
    const categories = Object.entries(byCategory).map(([category,items]) => {
      const cDone=items.filter(l=>state.completedLessons.includes(l.id)).length;
      return `<details class="category-group" ${f ? "open" : ""}><summary><span>${category}</span><small>${cDone}/${items.length}</small></summary>${items.map(l => `
        <button type="button" class="lesson-item lesson-link" data-id="${l.id}" aria-label="Open lesson: ${l.title}">
          <small>${l.duration} · ${window.V20_AUDIO?.[l.id] ? "🔊 Instructor audio" : "Interactive study"} ${l.check?.length ? "· 5Q review" : ""}</small>
          <h3>${state.completedLessons.includes(l.id) ? "✓ " : ""}${l.title}</h3>
          <p>${l.summary}</p>
          <span class="open-lesson-link">Open this topic →</span>
        </button>`).join("")}</details>`;
    }).join("");
    return `<details class="module-group" ${f ? "open" : ""}><summary><span>${module.module}</span><small>${doneCount}/${lessons.length} complete</small></summary><div class="category-stack">${categories}</div></details>`;
  }).join("");
  $("#lessonList").innerHTML = modules || `<p class="empty-state">No lessons match that search.</p>`;
  $$(".lesson-item").forEach(item => item.addEventListener("click", () => openLesson(item.dataset.id)));
}
function lessonMastery(lesson){
  const qs=(lesson.check||[]).slice(0,5);
  if(!qs.length) return "";
  return `<section class="mastery-check" data-lesson="${lesson.id}"><p class="eyebrow">5-question lesson check</p><h3>Apply the concept</h3><p>This is practice, not a gate. Answer what you can and review every rationale.</p>${qs.map((q,qi)=>`<div class="mastery-q" data-q="${qi}"><strong>${qi+1}. ${q.q}</strong><div class="mastery-options">${q.options.map((o,oi)=>`<button class="mastery-option" type="button" data-answer="${oi}">${o}</button>`).join("")}</div><div class="mastery-rationale">${q.rationale}</div></div>`).join("")}<div class="mastery-score">0 of 5 answered</div></section>`;
}
function bindMastery(lesson){
 const box=document.querySelector(`.mastery-check[data-lesson="${lesson.id}"]`); if(!box)return; let answered=0,correct=0;
 const nextBtn=document.getElementById('nextLesson');
 if(nextBtn && state.masteryScores[lesson.id] != null){ nextBtn.disabled=false; }
 box.querySelectorAll('.mastery-q').forEach((row,qi)=>row.querySelectorAll('.mastery-option').forEach(btn=>btn.addEventListener('click',()=>{
   if(row.dataset.done)return; row.dataset.done='1'; answered++; const ai=Number(btn.dataset.answer), q=lesson.check[qi];
   row.querySelectorAll('.mastery-option').forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add('correct')});
   if(ai===q.answer)correct++; else btn.classList.add('incorrect'); row.querySelector('.mastery-rationale').classList.add('show');
   const scoreEl=box.querySelector('.mastery-score');
   scoreEl.textContent=answered<5?`${answered} of 5 answered · ${correct} correct`:`${correct}/5 · ${correct>=4?'Mastered — ready to continue':'Review recommended — you can continue after reading the rationales'}`;
   if(answered===5){
     state.masteryScores[lesson.id]=correct;
     saveState();
     box.classList.toggle('mastered',correct>=4);
     box.classList.toggle('review-recommended',correct<4);
   }
 })));
}

function lessonAnimation(lesson){
  const atomic = lesson.animation && ["atomic","thermionic","brems","characteristic"].includes(lesson.animation);
  const scene = atomic ? `<div class="atomic-lab ${lesson.animation}">
    <div class="atom-nucleus"><b>W</b><span>74p</span></div>
    <div class="orbit k-shell"><i class="bound-electron e-k1">e−</i><i class="bound-electron e-k2">e−</i></div>
    <div class="orbit l-shell"><i class="bound-electron e-l1">e−</i><i class="bound-electron e-l2">e−</i></div>
    <div class="projectile-electron">e−</div><div class="xray-photon">X-ray photon</div>
    <div class="atomic-caption">${lesson.animation==='brems'?'Projectile electron is deflected and decelerated in the nuclear electric field; lost kinetic energy leaves as a bremsstrahlung photon.':lesson.animation==='characteristic'?'Projectile electron ejects an inner-shell electron. An outer-shell electron fills the vacancy; the binding-energy difference leaves as a characteristic photon.':lesson.animation==='thermionic'?'Thermal energy allows filament electrons to escape the tungsten surface and form a space-charge cloud near the cathode.':'Track charge, energy, and particle type. Electrons carry charge; x-ray photons are electromagnetic radiation with no charge.'}</div>
  </div>` : `<div class="concept-stage"><div class="concept-pulse"></div><strong>${lesson.title}</strong><span>Follow the changed variable → mechanism → detector/image/dose consequence.</span></div>`;
  const hasAudio=!!window.V20_AUDIO?.[lesson.id];
  return `<section class="animated-lesson"><div class="animation-topline"><span class="premium-label">Interactive lesson</span>${hasAudio?`<button class="btn btn-secondary lesson-play" type="button">▶ Play instructor audio</button>`:`<span class="media-status">Visual lesson</span>`}</div>${scene}<div class="lesson-audio-status" aria-live="polite"></div></section>`;
}

function bindMediaPace(lesson){
  document.querySelectorAll('.lesson-play').forEach(btn=>btn.addEventListener('click',()=>{
    const url=window.V20_AUDIO?.[lesson.id]; const status=document.querySelector('.lesson-audio-status');
    if(!url){status.textContent='Instructor audio for this lesson is still being produced. The robotic browser voice has been removed.';return;}
    window.__rrmAudio?.pause(); const a=new Audio(url); window.__rrmAudio=a; status.textContent='Playing instructor audio…'; a.play().catch(()=>status.textContent='Audio could not start. Tap again after the page finishes loading.'); a.onended=()=>status.textContent='Audio complete.';
  }));
}

function v21SubjectStudio(lesson){
  const subject=lesson.v21Subject||lesson.module||'';
  const map={
    'Radiation Physics':'Particle path → interaction → energy transfer',
    'Image Production':'Technique factor → beam/receptor change → image consequence',
    'Digital Imaging':'X-ray absorption → conversion → signal → processing → pixel',
    'Fluoroscopy':'Tube → patient → detector → display, with geometry and scatter',
    'Radiation Safety':'Source → distance/shielding → exposure consequence',
    'Positioning & Procedures':'Patient/part position → central ray → resulting anatomy',
    'Patient Care & Clinical':'Clinical cue → safe action → reassessment',
    'Registry Strategy':'Stem variable → mechanism → eliminate distractors'
  };
  return `<section class="v21-media"><span class="premium-label">V21 ANIMATED LEARNING STUDIO</span><h3>${subject}</h3><p>${map[subject]||'Mechanism → demonstration → clinical application'}</p><div class="v21-subject-strip"><span>① Watch mechanism</span><span>② Manipulate variable</span><span>③ Explain consequence</span><span>④ Challenge question</span></div></section>`;
}
function v21XrayProduction(){return `<section class="v21-media"><span class="premium-label">LIVE MECHANISM ANIMATION</span><h3>Electron → target → x-ray photon</h3><p>Conceptual, not to scale. Purple particles are electrons; green rays represent emitted x-ray photon paths.</p><div class="v21-stage"><img src="assets/v21-electron-photon-storyboard.png" alt="Electron and photon storyboard reference"><div class="v21-tube"></div><div class="v21-filament"></div><div class="v21-target"></div><i class="v21-e"></i><i class="v21-e"></i><i class="v21-e"></i><i class="v21-e"></i><i class="v21-photon"></i><i class="v21-photon p2"></i><i class="v21-photon p3"></i><span class="v21-label v21-lc">Cathode: thermionic emission</span><span class="v21-label v21-la">Tungsten target</span><span class="v21-label v21-lb">X-ray photons</span></div><div class="v21-controls"><button type="button" data-v21mode="tube">Tube view</button><button type="button" data-v21mode="brems">Bremsstrahlung</button><button type="button" data-v21mode="characteristic">Characteristic</button><button type="button" data-v21mode="patient">Photon interactions</button></div><div class="v21-detail" id="v21MechanismDetail">Electrons leave the heated cathode and accelerate toward the positive anode. At the tungsten target, kinetic energy is converted mostly to heat and partly to x-rays.</div></section>`}
function v21Circuit(){return `<section class="v21-media"><span class="premium-label">FULL CIRCUIT LAYOUT</span><h3>Trace the actual x-ray generator pathways</h3><p>Purple = primary/high-voltage pathway. Orange = filament pathway. Tap components to study their job and the next step.</p><svg class="v21-circuit-svg" viewBox="0 0 900 360" role="img" aria-label="X-ray circuit with high-voltage and filament branches"><path class="v21-flow-wire" d="M70 95 H180 H300 H420 H560 H690 H810"/><path class="v21-fil-wire" d="M300 110 V270 H480 H650"/><g class="v21-flow-node" data-circuit="Incoming AC and line compensation stabilize supply before technique selection."><rect x="20" y="65" width="110" height="60" rx="12"/><text x="75" y="90" text-anchor="middle">AC SOURCE</text><text x="75" y="108" text-anchor="middle">+ LINE COMP</text></g><g class="v21-flow-node" data-circuit="Autotransformer provides selectable voltage on the primary side and is associated with kVp selection."><rect x="150" y="65" width="120" height="60" rx="12"/><text x="210" y="100" text-anchor="middle">AUTOTRANSFORMER</text></g><g class="v21-flow-node" data-circuit="Exposure timing/control determines when and how long the exposure circuit is energized."><rect x="290" y="65" width="110" height="60" rx="12"/><text x="345" y="91" text-anchor="middle">TIMER /</text><text x="345" y="108" text-anchor="middle">CONTROL</text></g><g class="v21-flow-node" data-circuit="High-voltage transformer steps voltage up to the kilovoltage range needed across the tube."><rect x="420" y="65" width="130" height="60" rx="12"/><text x="485" y="90" text-anchor="middle">STEP-UP HV</text><text x="485" y="108" text-anchor="middle">TRANSFORMER</text></g><g class="v21-flow-node" data-circuit="Rectification maintains proper polarity so tube current flows cathode to anode."><rect x="570" y="65" width="100" height="60" rx="12"/><text x="620" y="100" text-anchor="middle">RECTIFIERS</text></g><g class="v21-flow-node" data-circuit="The x-ray tube accelerates electrons from cathode to anode and converts their kinetic energy mostly to heat and partly to x-rays."><rect x="690" y="65" width="160" height="60" rx="12"/><text x="770" y="91" text-anchor="middle">X-RAY TUBE</text><text x="770" y="108" text-anchor="middle">CATHODE → ANODE</text></g><g class="v21-flow-node" data-circuit="The filament branch uses low voltage and high current to heat the tungsten filament for thermionic emission."><rect x="330" y="240" width="150" height="60" rx="12"/><text x="405" y="265" text-anchor="middle">STEP-DOWN</text><text x="405" y="283" text-anchor="middle">FILAMENT XFMR</text></g><g class="v21-flow-node" data-circuit="Heated filament releases electrons by thermionic emission; the focusing cup directs the cloud toward the focal spot."><rect x="520" y="240" width="160" height="60" rx="12"/><text x="600" y="265" text-anchor="middle">FILAMENT +</text><text x="600" y="283" text-anchor="middle">FOCUSING CUP</text></g><text x="45" y="35" fill="#a78bfa">HIGH-VOLTAGE / PRIMARY PATH</text><text x="330" y="225" fill="#ff9b55">FILAMENT PATH</text></svg><div class="v21-detail" id="v21CircuitDetail">Tap any component to see exactly what it does.</div></section>`}
function lessonInteractive(lesson) {
  if (lesson.interactive === "v21-circuit") return v21Circuit();
  if (lesson.interactive === "v21-xray-production") return v21XrayProduction();
  if (lesson.interactive === "xray-production") {
    return `<section class="tech-interactive">
      <div class="interactive-head"><span class="premium-label">Interactive physics</span><h3>X-ray production inside the tube</h3><p>Electrons are released at the cathode, accelerated across the tube, and interact with the tungsten target. Most energy becomes heat; a small fraction becomes x-rays.</p></div>
      <div class="tube-sim" aria-label="Animated x-ray tube showing electron flow from cathode to anode and x-ray emission">
        <div class="tube-glass"></div>
        <div class="tube-cathode"><span>Filament</span><i></i></div>
        <div class="electron-track">
          <b class="electron e1"></b><b class="electron e2"></b><b class="electron e3"></b><b class="electron e4"></b><b class="electron e5"></b>
        </div>
        <div class="tube-target"><span>Tungsten target</span></div>
        <div class="heat-core"></div>
        <div class="xray-fan"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="tube-label label-cathode">Cathode (−)</div><div class="tube-label label-anode">Anode (+)</div><div class="tube-label label-beam">Useful x-ray beam</div>
      </div>
      <div class="interactive-key"><span><i class="key-electron"></i> Electron flow</span><span><i class="key-heat"></i> Heat at target</span><span><i class="key-xray"></i> X-ray photons</span></div>
    </section>`;
  }
  if (lesson.interactive === "circuit-builder") {
    return `<section class="tech-interactive circuit-builder"><div class="interactive-head"><span class="premium-label">Interactive circuit lab</span><h3>Trace and label the x-ray circuit</h3><p>Tap each component in order. The explanation tells you what that component does and where electrical energy goes next.</p></div><div class="circuit-flow" id="circuitFlow"><button data-step="0">Line compensator</button><i>→</i><button data-step="1">Autotransformer</button><i>→</i><button data-step="2">Exposure timer</button><i>→</i><button data-step="3">High-voltage transformer</button><i>→</i><button data-step="4">Rectifiers</button><i>→</i><button data-step="5">X-ray tube</button></div><div class="circuit-detail" id="circuitDetail">Start at the line compensator.</div><div class="circuit-label-quiz"><b>Sequence challenge:</b> What component directly establishes the large potential difference across the tube? <button type="button" data-cq="filament">Filament transformer</button><button type="button" data-cq="hv">High-voltage transformer</button><button type="button" data-cq="stator">Stator</button><span id="circuitQuizFeedback"></span></div></section>`;
  }
  if (lesson.interactive === "kvp-mas") {
    return `<section class="tech-interactive"><div class="interactive-head"><span class="premium-label">Technique simulator</span><h3>kVp + mAs: see the acquisition change</h3><p>Use the PA hand radiograph as a teaching model. This simulation emphasizes detector exposure/noise and penetration; real digital systems may normalize displayed brightness.</p></div>
    <div class="hand-tech-sim"><div class="sim-controls"><label>kVp <strong id="kvpValue">70</strong><input id="kvpSlider" type="range" min="45" max="100" value="70"></label><label>mAs <strong id="masValue">5</strong><input id="masSlider" type="range" min="1" max="20" step=".5" value="5"></label><button class="btn btn-secondary" id="resetTechnique" type="button">Reset technique</button></div>
    <figure class="hand-preview"><div class="xray-frame"><img id="handXray" src="assets/verified_real/hand-pa-cc0.jpg" alt="PA hand radiograph used for technique simulation"><div id="noiseOverlay" class="noise-overlay"></div></div><figcaption id="techniqueInterpretation"></figcaption></figure></div>
    <div class="sim-meters"><div><span>Penetration / beam quality</span><div class="meter"><i id="energyMeter"></i></div><strong id="energyText"></strong></div><div><span>Relative receptor exposure</span><div class="meter"><i id="quantityMeter"></i></div><strong id="quantityText"></strong></div></div>
    <div class="lesson-callout"><strong>Digital imaging nuance:</strong> mAs primarily changes photon quantity and receptor exposure; low mAs increases quantum noise. kVp strongly affects photon energy/penetration and also affects receptor exposure and subject contrast. Display processing can mask brightness changes, so do not judge exposure from brightness alone.</div></section>`;
  }
  return "";
}

function bindLessonInteractive(lesson) {
  document.querySelectorAll(".v21-flow-node").forEach(n=>n.addEventListener("click",()=>{document.querySelectorAll(".v21-flow-node").forEach(x=>x.classList.remove("active"));n.classList.add("active");const d=document.getElementById("v21CircuitDetail");if(d)d.textContent=n.dataset.circuit;}));
  document.querySelectorAll("[data-v21mode]").forEach(b=>b.addEventListener("click",()=>{const d=document.getElementById("v21MechanismDetail");if(!d)return;const m=b.dataset.v21mode;d.textContent=m==="brems"?"Bremsstrahlung: an energetic projectile electron is deflected/decelerated in the nuclear Coulomb field; its lost kinetic energy is emitted as an x-ray photon.":m==="characteristic"?"Characteristic: a projectile electron ejects an inner-shell electron; an outer-shell electron fills the vacancy and the binding-energy difference is emitted as a discrete x-ray photon.":m==="patient"?"After leaving the tube, photons may be transmitted, photoelectrically absorbed, or Compton scattered before the remnant beam reaches the detector.":"Electrons leave the heated cathode, accelerate across the tube, and strike the tungsten target.";}));
  if (lesson.interactive === "circuit-builder") {
    const details=[
      'Line compensator: stabilizes incoming line voltage before technique selection. Next → autotransformer.',
      'Autotransformer: provides selectable primary voltage associated with kVp selection. Next → exposure-control section.',
      'Exposure timer/control: determines how long the exposure circuit is energized. Next → high-voltage transformer.',
      'High-voltage transformer: steps voltage up to the kilovoltage range while secondary current decreases. Next → rectification.',
      'Rectifiers: enforce correct polarity so tube current flows cathode to anode. Next → x-ray tube.',
      'X-ray tube: electrons accelerate from cathode to anode and their kinetic energy is converted mostly to heat and partly to x-rays.'
    ]; let expected=0; document.querySelectorAll('#circuitFlow button').forEach(b=>b.onclick=()=>{const n=+b.dataset.step;if(n===expected){b.classList.add('correct');document.getElementById('circuitDetail').textContent=details[n];expected=Math.min(5,expected+1)}else{b.classList.add('incorrect');document.getElementById('circuitDetail').textContent='Trace the circuit in order. Start at the highlighted first uncompleted component.'}}); document.querySelectorAll('[data-cq]').forEach(b=>b.onclick=()=>{document.getElementById('circuitQuizFeedback').textContent=b.dataset.cq==='hv'?' Correct. The high-voltage transformer establishes the large potential difference.':' Not this component. Think about which transformer steps voltage up to the kV range.'});
  }
  if (lesson.interactive === "kvp-mas") {
    const kvp=document.getElementById("kvpSlider"), mas=document.getElementById("masSlider"), img=document.getElementById('handXray'), noise=document.getElementById('noiseOverlay');
    const update=()=>{const k=+kvp.value,m=+mas.value;document.getElementById('kvpValue').textContent=k;document.getElementById('masValue').textContent=m;
      const kNorm=(k-45)/55, mNorm=(m-1)/19; const receptor=Math.min(1,(m/5)*Math.pow(k/70,2));
      document.getElementById('energyMeter').style.width=`${Math.max(4,kNorm*100)}%`;document.getElementById('quantityMeter').style.width=`${Math.max(4,Math.min(100,receptor*55))}%`;
      document.getElementById('energyText').textContent=k<60?'Low penetration':k>82?'High penetration':'Diagnostic range'; document.getElementById('quantityText').textContent=receptor<.55?'Low / noisy':receptor>1.55?'High exposure':'Near reference';
      const brightness=.72+Math.min(1.35,receptor)*.22+kNorm*.12, contrast=1.45-kNorm*.55; img.style.filter=`brightness(${brightness}) contrast(${contrast})`; noise.style.opacity=String(Math.max(0,Math.min(.72,.62-receptor*.42)));
      const msg=k<60?'Low kVp: reduced penetration; anatomy may be inadequately penetrated and receptor exposure may fall.':k>82?'High kVp: greater penetration and typically lower subject contrast, with potential dose/exposure consequences if mAs is not adjusted.':receptor<.55?'mAs/receptor exposure is low: expect increased quantum noise even if processing rescales brightness.':receptor>1.55?'Receptor exposure is high: the image may still look acceptable digitally, but exposure creep and unnecessary patient dose are concerns.':'Technique is near the simulator reference range.';document.getElementById('techniqueInterpretation').textContent=msg;
    }; kvp?.addEventListener('input',update);mas?.addEventListener('input',update);document.getElementById('resetTechnique')?.addEventListener('click',()=>{kvp.value=70;mas.value=5;update()});update();
  }
}

function openLesson(id) {
  window.scrollTo({top:0,behavior:"smooth"});
  const lesson = allLessons.find(l => l.id === id);
  $$(".lesson-item").forEach(i => i.classList.toggle("active", i.dataset.id === id));
  const done = state.completedLessons.includes(id);
  $("#lessonReader").innerHTML = `
    <div class="lesson-nav-top">
      <button type="button" class="text-btn" id="prevLessonTop">← Previous lesson</button>
      <span>${allLessons.findIndex(l=>l.id===id)+1} of ${allLessons.length}</span>
      <button type="button" class="text-btn next-lesson-cta" id="nextLessonTop">Next lesson →</button>
    </div>
    <p class="eyebrow">${lesson.module} · ${lesson.category||"Course lesson"} · ${lesson.duration}</p>
    <h2>${lesson.title}</h2>
    <p><strong>Lesson overview:</strong> ${lesson.summary}</p>
    ${window.v24LessonMedia ? window.v24LessonMedia(lesson) : ''}
    ${lesson.video ? `<div class="video-lesson"><div class="video-heading"><span class="premium-label">▶ Guided video lesson</span><small>Slow-paced by default · captions · transcript</small></div><video controls playsinline preload="metadata" ${lesson.poster ? `poster="${lesson.poster}"` : ""} src="${lesson.video}">${lesson.captions ? `<track kind="captions" src="${lesson.captions}" srclang="en" label="English" default>` : ''}Your browser does not support HTML5 video.</video><label class="video-speed-label">Playback speed <select class="media-speed"><option value="0.75">0.75×</option><option value="0.9" selected>0.9×</option><option value="1">1.0×</option><option value="1.25">1.25×</option></select></label>${lesson.diagram ? `<figure class="lesson-diagram"><img src="${lesson.diagram}" alt="Teaching diagram for ${lesson.title}"><figcaption>Use the diagram with the narration to follow the process step by step.</figcaption></figure>` : ''}</div>` : ''}
    ${lessonAnimation(lesson)}
    ${window.v22Studio ? window.v22Studio(lesson) : ''}
    ${lessonInteractive(lesson)}
    ${window.v22Interactive ? window.v22Interactive(lesson.interactive) : ''}
    ${v21SubjectStudio(lesson)}
    ${lesson.transcript ? `<details class="lesson-transcript" data-transcript="${lesson.transcript}"><summary>Read full narration transcript</summary><div class="transcript-body">Loading transcript…</div></details>` : ''}
    ${lesson.content}${deepInteractiveFor(lesson)}${window.v19TechniqueLab?window.v19TechniqueLab(lesson):""}${window.v19Studio?window.v19Studio(lesson):""}
    ${lessonMastery(lesson)}
    <div class="lesson-footer">
      <button class="btn btn-secondary" id="markLesson">${done ? "Reviewed ✓" : "Mark topic reviewed"}</button>
      <button class="btn" id="nextLesson">Next Lesson</button>
    </div>`;
  bindLessonInteractive(lesson);
  window.bindV22?.(lesson);
  window.bindV24?.(lesson);
  bindMediaPace(lesson);
  bindMastery(lesson);
  window.wireV19Studio?.(lesson); window.wireV19Technique?.();
  document.querySelectorAll(".lesson-transcript[data-transcript]").forEach(async el => {
    try {
      const r = await fetch(el.dataset.transcript);
      const text = await r.text();
      el.querySelector(".transcript-body").textContent = text.trim();
    } catch { el.querySelector(".transcript-body").textContent = "Transcript unavailable."; }
  });
  $("#markLesson").addEventListener("click", () => {
    if (done) state.completedLessons = state.completedLessons.filter(x => x !== id);
    else state.completedLessons.push(id);
    saveState(); renderLessonList($("#lessonSearch").value); openLesson(id);
  });
  const moveLesson=(delta)=>{
    const idx=allLessons.findIndex(l=>l.id===id);
    const next=(idx+delta+allLessons.length)%allLessons.length;
    openLesson(allLessons[next].id);
    document.getElementById('lessonReader')?.scrollIntoView({behavior:'smooth',block:'start'});
  };
  $("#nextLesson").addEventListener("click", () => moveLesson(1));
  document.getElementById("nextLessonTop")?.addEventListener("click",()=>moveLesson(1));
  document.getElementById("prevLessonTop")?.addEventListener("click",()=>moveLesson(-1));
}
$("#lessonSearch").addEventListener("input", e => renderLessonList(e.target.value));
renderLessonList();

let filteredQuestions = [...questionBank], bankIndex = 0, bankSessionCorrect = 0, bankSessionAnswered = 0;
const categories = [...new Set(questionBank.map(q => q.category))];
categories.forEach(c => $("#questionCategory").insertAdjacentHTML("beforeend", `<option>${c}</option>`));
const flashCategories = [...new Set(flashcards.map(c => c.category))];
flashCategories.forEach(c => $("#flashcardCategory").insertAdjacentHTML("beforeend", `<option>${c}</option>`));
function applyQuestionFilters() {
  const cat = $("#questionCategory").value;
  const mode = $("#questionMode").value;
  filteredQuestions = questionBank.filter((q, idx) => {
    const catOk = cat === "all" || q.category === cat;
    const modeOk = mode === "all" || (mode === "bookmarked" && state.bookmarks.includes(idx)) || (mode === "missed" && state.missed.includes(idx));
    return catOk && modeOk;
  });
  bankIndex = 0;
  renderBankQuestion();
}
function originalQuestionIndex(q) { return questionBank.indexOf(q); }
function renderBankQuestion() {
  if (!filteredQuestions.length) {
    $("#bankQuestion").textContent = "No questions match this filter.";
    $("#bankAnswers").innerHTML = "";
    $("#bankCounter").textContent = "";
    return;
  }
  const q = filteredQuestions[bankIndex];
  const originalIdx = originalQuestionIndex(q);
  $("#bankCounter").textContent = `Question ${bankIndex+1} of ${filteredQuestions.length}`;
  $("#bankProgress").style.width = `${((bankIndex+1)/filteredQuestions.length)*100}%`;
  $("#bankCategory").textContent = q.category;
  $("#bankQuestion").textContent = q.q;
  $("#bookmarkQuestion").textContent = state.bookmarks.includes(originalIdx) ? "★" : "☆";
  $("#bankFeedback").className = "quiz-feedback";
  $("#bankFeedback").textContent = "";
  $("#bankAnswers").innerHTML = "";
  q.options.forEach((o,i) => {
    const b=document.createElement("button"); b.className="answer-btn"; b.textContent=o;
    b.addEventListener("click",()=>answerBank(b,i,q));
    $("#bankAnswers").appendChild(b);
  });
  $("#bookmarkQuestion").onclick = () => {
    if(state.bookmarks.includes(originalIdx)) state.bookmarks=state.bookmarks.filter(x=>x!==originalIdx);
    else state.bookmarks.push(originalIdx);
    saveState(); renderBankQuestion();
  };
}
function answerBank(button, idx, q) {
  if ([...$("#bankAnswers").children].some(b => b.disabled)) return;
  [...$("#bankAnswers").children].forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct")});
  const originalIdx=originalQuestionIndex(q);
  if(idx===q.answer){bankSessionCorrect++;state.correct++;state.missed=state.missed.filter(x=>x!==originalIdx)}
  else{button.classList.add("incorrect");if(!state.missed.includes(originalIdx))state.missed.push(originalIdx)}
  bankSessionAnswered++;state.answered++;
  $("#bankFeedback").className="quiz-feedback visible";
  $("#bankFeedback").innerHTML=`<strong>${idx===q.answer?"Correct":"Incorrect"}</strong><br>${q.explanation}`;
  $("#sessionScore").textContent=`${bankSessionCorrect} correct`;
  $("#sessionDetail").textContent=`${bankSessionAnswered} answered · ${Math.round((bankSessionCorrect/bankSessionAnswered)*100)}%`;
  saveState();
}
$("#previousBank").addEventListener("click",()=>{if(filteredQuestions.length){bankIndex=(bankIndex-1+filteredQuestions.length)%filteredQuestions.length;renderBankQuestion()}});
$("#nextBank").addEventListener("click",()=>{if(filteredQuestions.length){bankIndex=(bankIndex+1)%filteredQuestions.length;renderBankQuestion()}});
$("#questionCategory").addEventListener("change",applyQuestionFilters);
$("#questionMode").addEventListener("change",applyQuestionFilters);
$("#resetBank").addEventListener("click",()=>{bankSessionCorrect=0;bankSessionAnswered=0;$("#sessionScore").textContent="0 correct";$("#sessionDetail").textContent="Answer questions to begin tracking this session."});
renderBankQuestion();

let filteredCards=[...flashcards], flashIndex=0, showingBack=false;
const flashKnown=new Set(JSON.parse(localStorage.getItem('rrm-flash-known')||'[]')), flashStudySet=new Set(JSON.parse(localStorage.getItem('rrm-flash-study')||'[]'));
const cardKey=c=>c.category+'|'+c.front;
function saveFlashBuckets(){localStorage.setItem('rrm-flash-known',JSON.stringify([...flashKnown]));localStorage.setItem('rrm-flash-study',JSON.stringify([...flashStudySet]));document.getElementById('flashBuckets').textContent=`Know: ${flashKnown.size} · Study: ${flashStudySet.size}`;}
function applyFlashFilter(){const cat=$('#flashcardCategory').value;filteredCards=flashcards.filter(f=>(cat==='all'||f.category===cat)&&!flashKnown.has(cardKey(f)));flashIndex=0;showingBack=false;renderFlash();}
function renderFlash(){if(!filteredCards.length){$('#flashText').textContent='No unseen/study cards in this filter. Use Study again cards or change category.';$('#flashCounter').textContent='0 / 0';saveFlashBuckets();return;}const c=filteredCards[flashIndex];$('#flashLabel').textContent=showingBack?'Answer':c.category;$('#flashText').textContent=showingBack?c.back:c.front;$('#flashcard').querySelector('small').textContent=showingBack?'Tap to see question':'Tap to reveal';$('#flashCounter').textContent=`${flashIndex+1} / ${filteredCards.length}`;saveFlashBuckets();}
$('#flashcard').addEventListener('click',()=>{showingBack=!showingBack;renderFlash()});
$('#flashPrev').addEventListener('click',()=>{if(filteredCards.length){flashIndex=(flashIndex-1+filteredCards.length)%filteredCards.length;showingBack=false;renderFlash()}});
$('#flashNext').addEventListener('click',()=>{if(filteredCards.length){flashIndex=(flashIndex+1)%filteredCards.length;showingBack=false;renderFlash()}});
$('#flashcardCategory').addEventListener('change',applyFlashFilter);
$('#flashKnow').addEventListener('click',()=>{if(!filteredCards.length)return;const k=cardKey(filteredCards[flashIndex]);flashKnown.add(k);flashStudySet.delete(k);filteredCards.splice(flashIndex,1);flashIndex=Math.min(flashIndex,Math.max(0,filteredCards.length-1));showingBack=false;renderFlash()});
$('#flashStudy').addEventListener('click',()=>{if(!filteredCards.length)return;const k=cardKey(filteredCards[flashIndex]);flashStudySet.add(k);flashKnown.delete(k);flashIndex=(flashIndex+1)%filteredCards.length;showingBack=false;renderFlash()});
$('#flashShuffle').addEventListener('click',()=>{filteredCards.sort(()=>Math.random()-.5);flashIndex=0;showingBack=false;renderFlash()});
$('#flashChallenge').addEventListener('click',()=>{const panel=$('#flashChallengePanel');panel.hidden=false;const pool=[...questionBank].sort(()=>Math.random()-.5).slice(0,5);let i=0,score=0;const go=()=>{if(i===5){panel.innerHTML=`<h3>Challenge complete: ${score}/5</h3><p>Use your Study pile for concepts that still feel slow.</p>`;return;}const q=pool[i];panel.innerHTML=`<p class="eyebrow">Flash challenge ${i+1}/5</p><h3>${q.q}</h3><div class="answer-list">${q.options.map((o,j)=>`<button class="answer-btn" data-a="${j}">${o}</button>`).join('')}</div><p id="fcf"></p>`;panel.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.a===q.answer;if(ok)score++;panel.querySelectorAll('[data-a]').forEach(x=>x.disabled=true);$('#fcf').innerHTML=`${ok?'Correct':'Incorrect'} — ${q.explanation}<br><button class="btn" id="fcn">Next</button>`;i++;$('#fcn').onclick=go});};go();});
renderFlash();

let examQuestions=[],examIndex=0,examAnswers=[],examSeconds=9000,examTimerId;
$("#startExam").addEventListener("click",startExam);
function startExam(){
  examQuestions=[...questionBank].sort(()=>Math.random()-.5).slice(0,200);
  examAnswers=Array(examQuestions.length).fill(null);examIndex=0;examSeconds=9000;
  $("#examIntro").hidden=true;$("#examCard").hidden=false;$("#examResults").hidden=true;
  renderExam();updateTimer();examTimerId=setInterval(()=>{examSeconds--;updateTimer();if(examSeconds<=0)finishExam()},1000);
}
function updateTimer(){const m=String(Math.floor(examSeconds/60)).padStart(2,"0"),s=String(examSeconds%60).padStart(2,"0");$("#examTimer").textContent=`${m}:${s}`}
function renderExam(){
  const q=examQuestions[examIndex];$("#examCounter").textContent=`Question ${examIndex+1} of ${examQuestions.length}`;$("#examQuestion").textContent=q.q;$("#examAnswers").innerHTML="";
  q.options.forEach((o,i)=>{const b=document.createElement("button");b.className="answer-btn"+(examAnswers[examIndex]===i?" selected":"");b.textContent=o;b.addEventListener("click",()=>{examAnswers[examIndex]=i;renderExam()});$("#examAnswers").appendChild(b)});
  $("#examNext").textContent=examIndex===examQuestions.length-1?"Finish Exam":"Next";
}
$("#examPrevious").addEventListener("click",()=>{if(examIndex>0){examIndex--;renderExam()}});
$("#examNext").addEventListener("click",()=>{if(examIndex<examQuestions.length-1){examIndex++;renderExam()}else finishExam()});
function finishExam(){
  clearInterval(examTimerId);
  const correct=examQuestions.reduce((n,q,i)=>n+(examAnswers[i]===q.answer),0);
  state.answered+=examQuestions.length;state.correct+=correct;saveState();
  $("#examCard").hidden=true;$("#examResults").hidden=false;
  const missed=examQuestions.map((q,i)=>({q,i})).filter(x=>examAnswers[x.i]!==x.q.answer); const byCat=missed.reduce((a,x)=>{(a[x.q.category]||=[]).push(x.q);return a},{});
  $("#examResults").innerHTML=`<p class="eyebrow">Exam complete</p><h2>${correct} / ${examQuestions.length}</h2><p><strong>${Math.round((correct/examQuestions.length)*100)>=75?"PASS":"NOT YET PASSING"}</strong> · ${Math.round((correct/examQuestions.length)*100)}% · passing standard for this Rad Mastery mock is 75%.</p><h3>Personal study plan</h3><p>${missed.length?`You missed ${missed.length} questions. Start with: ${Object.entries(byCat).sort((a,b)=>b[1].length-a[1].length).slice(0,4).map(([c,v])=>`${c} (${v.length})`).join(' · ')}`:'No missed questions.'}</p><div class="exam-review">${missed.map(x=>`<article><strong>${x.q.category}</strong><p>${x.q.q}</p><small>${x.q.explanation||x.q.rationale}</small></article>`).join('')}</div><button class="btn" id="restartExam">Take Another Exam</button>`;
  $("#restartExam").addEventListener("click",()=>{ $("#examResults").hidden=true;$("#examIntro").hidden=false;});
}

// Owner preview mode
(function(){
 const preview=localStorage.getItem('radMasteryOwnerPreview')==='true';
 const banner=document.getElementById('ownerPreviewBanner');
 if(preview&&banner) banner.hidden=false;
 document.getElementById('exitOwnerPreview')?.addEventListener('click',()=>{
   localStorage.removeItem('radMasteryOwnerPreview');
   localStorage.removeItem('radMasteryPreviewAccess');
   location.href='test-access.html';
 });
})();


// Interactive anatomy review
(function(){const btn=document.getElementById('openAnatomyLab'),lab=document.getElementById('anatomyLab');if(!btn||!lab)return;const cases=[
 {name:'PA Chest',img:'assets/verified_real/chest-pa-cc0.jpg',q:'Which evaluation finding best supports a nonrotated PA chest?',opts:['Sternoclavicular joints approximately equidistant from the vertebral column','Scapulae completely superimposed on the lungs','Clavicles projected above the apices','Heart magnified by increased OID'],a:0},
 {name:'PA Hand',img:'assets/verified_real/hand-pa-cc0.jpg',q:'For a correctly positioned PA hand, which finding is expected?',opts:['Minimal rotation with symmetric concavity of phalangeal/metacarpal shafts','Metacarpals completely superimposed','Thumb fully superimposed on second digit','Carpals excluded'],a:0},
 {name:'AP Knee',img:'assets/verified_real/knee-ap-cc0.jpg',q:'Which feature is useful when evaluating rotation on an AP knee?',opts:['Relationship of fibular head superimposition by the tibia','Complete superimposition of femoral condyles','Patella entirely outside the femur','Open intercondylar fossa'],a:0}
];let i=0;const render=()=>{const c=cases[i];lab.innerHTML=`<div class="anatomy-case"><figure><img src="${c.img}" alt="${c.name} radiograph"></figure><div><p class="eyebrow">Interactive anatomy + image evaluation</p><h3>${c.name}</h3><p>${c.q}</p><div class="answer-list">${c.opts.map((o,j)=>`<button class="answer-btn" data-aa="${j}">${o}</button>`).join('')}</div><p id="anatomyFeedback"></p><button class="text-btn" id="nextAnatomy">Next image →</button></div></div>`;lab.querySelectorAll('[data-aa]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.aa===c.a;document.getElementById('anatomyFeedback').textContent=ok?'Correct. Use image-evaluation criteria, not appearance alone.':'Not the best criterion. Re-evaluate rotation and projection criteria.'});document.getElementById('nextAnatomy').onclick=()=>{i=(i+1)%cases.length;render()}};btn.onclick=()=>{lab.hidden=!lab.hidden;if(!lab.hidden){render();lab.scrollIntoView({behavior:'smooth',block:'start'})}}})();

// Board countdown + daily challenge
(function(){
 const dateInput=document.getElementById('boardDate'), countdown=document.getElementById('boardCountdown');
 const refreshCountdown=()=>{const saved=localStorage.getItem('rrm-board-date');if(!saved)return;dateInput.value=saved;const today=new Date();today.setHours(0,0,0,0);const d=new Date(saved+'T00:00:00');const days=Math.ceil((d-today)/86400000);countdown.textContent=days>0?`${days} days until your board exam`:days===0?'Board exam day — you’re ready.':'Update your exam date';};
 document.getElementById('saveBoardDate')?.addEventListener('click',()=>{if(dateInput.value){localStorage.setItem('rrm-board-date',dateInput.value);refreshCountdown();}});refreshCountdown();
 const key=new Date().toISOString().slice(0,10), dailyKey='rrm-daily-'+key; let daily=JSON.parse(localStorage.getItem(dailyKey)||'{"index":0,"correct":0,"done":false}');
 const streak=()=>Number(localStorage.getItem('rrm-daily-streak')||0); document.getElementById('dailyScore').textContent=`${daily.correct}/10`;document.getElementById('dailyStreak').textContent=streak();
 document.getElementById('startDailyChallenge')?.addEventListener('click',()=>{const panel=document.getElementById('dailyChallengePanel');panel.hidden=false;const seed=[...questionBank].sort((a,b)=>(a.q+key).localeCompare(b.q+key)).slice(0,10);const render=()=>{if(daily.index>=10){daily.done=true;localStorage.setItem(dailyKey,JSON.stringify(daily));const last=localStorage.getItem('rrm-last-daily');if(last!==key){localStorage.setItem('rrm-daily-streak',String(streak()+1));localStorage.setItem('rrm-last-daily',key)}panel.innerHTML=`<h3>Daily challenge complete: ${daily.correct}/10</h3><p>Come back tomorrow to protect your streak.</p>`;return;}const q=seed[daily.index];panel.innerHTML=`<p class="eyebrow">Daily challenge ${daily.index+1}/10</p><h3>${q.q}</h3><div class="answer-list">${q.options.map((o,i)=>`<button class="answer-btn" data-i="${i}">${o}</button>`).join('')}</div><div class="quiz-feedback" id="dailyFeedback"></div>`;panel.querySelectorAll('.answer-btn').forEach(b=>b.onclick=()=>{panel.querySelectorAll('.answer-btn').forEach(x=>x.disabled=true);const ok=+b.dataset.i===q.answer;if(ok){daily.correct++;b.classList.add('correct')}else{b.classList.add('incorrect');panel.querySelectorAll('.answer-btn')[q.answer].classList.add('correct')}document.getElementById('dailyFeedback').className='quiz-feedback visible';document.getElementById('dailyFeedback').innerHTML=`${q.explanation}<br><button class="btn" id="dailyNext">Next</button>`;daily.index++;localStorage.setItem(dailyKey,JSON.stringify(daily));document.getElementById('dailyScore').textContent=`${daily.correct}/10`;document.getElementById('dailyNext').onclick=render;});};render();});
 document.getElementById('enableReminder')?.addEventListener('click',async()=>{if(!('Notification' in window))return alert('Browser notifications are not supported here.');const p=await Notification.requestPermission();if(p==='granted')new Notification('Rad Mastery',{body:'Study reminder enabled. Your daily challenge is ready whenever you return.'});});
})();
