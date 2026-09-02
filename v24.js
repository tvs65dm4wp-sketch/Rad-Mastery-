(function(){
// V24: navigation clarity, unique subcategories, richer lesson media, verified live interactions.
window.V20_AUDIO=window.V20_AUDIO||{};
Object.assign(window.V20_AUDIO,{
  'radiation-physics-08':'https://www.aidocmaker.com/g0/audio?name=d9deb64516274b3c8c978bcda0f93cf5',
  'radiation-physics-09':'https://www.aidocmaker.com/g0/audio?name=9275d8bebb0e4f538c54c584ec740713',
  'radiation-physics-10':'https://www.aidocmaker.com/g0/audio?name=9275d8bebb0e4f538c54c584ec740713',
  'radiation-physics-13':'https://www.aidocmaker.com/g0/audio?name=fc3d8c2bddcf4dbd9a6a1d90005aeff0',
  'radiation-physics-14':'https://www.aidocmaker.com/g0/audio?name=60928a59c5d246738c45158cf2089266',
  'image-production-01':'https://www.aidocmaker.com/g0/audio?name=0e62f26ed92d467d806644f4cd29c7b8',
  'image-production-02':'https://www.aidocmaker.com/g0/audio?name=0e62f26ed92d467d806644f4cd29c7b8',
  'image-production-10':'https://www.aidocmaker.com/g0/audio?name=544dfffa34c44842838d2fb0a17dd1a3',
  'image-production-11':'https://www.aidocmaker.com/g0/audio?name=a9f03f15c4cc43a59300f64934b22164',
  'image-production-12':'https://www.aidocmaker.com/g0/audio?name=a9f03f15c4cc43a59300f64934b22164'
});

const categoryMap={
'Radiation Physics':[
 ['Atomic Foundations',0,3],['Electricity & Generator Fundamentals',3,8],['X-ray Tube & Electron Control',8,12],['X-ray Production',12,16],['Beam Interactions & Quantitative Physics',16,20]],
'Image Production':[
 ['Exposure Factors: kVp, mAs & Technique Compensation',0,4],['Geometry, Sharpness & Distortion',4,10],['Scatter, Collimation & Grids',10,13],['Exposure Control & Technique Selection',13,17],['Image Quality, Resolution & Repeat Analysis',17,20]],
'Digital Imaging':[
 ['Detector Conversion & Readout',0,4],['Pixels, Sampling & Spatial Resolution',4,10],['Noise, Histogram & Exposure Recognition',10,15],['Display Processing & Image Presentation',15,19],['Artifacts, PACS & Informatics',19,20]],
'Fluoroscopy':[
 ['Fluoroscopy Geometry & Detector Chain',0,4],['Pulse Control & Image Acquisition',4,9],['Scatter & Occupational Protection',9,15],['OR / Mobile C-arm Workflow',15,17],['Dose Metrics, Image Quality & Safety',17,20]],
'Radiation Safety & Biology':[
 ['Dose Concepts & Biological Effects',0,4],['Radiosensitivity & Exposure Patterns',4,9],['Patient Protection & Optimization',9,13],['Occupational Monitoring & Shielding',13,17],['Pediatric / Fluoroscopy Safety & Incidents',17,20]],
'Patient Care & Clinical':[
 ['Identification, Communication & Rights',0,4],['Assessment & Infection Control',4,9],['Transfers, Lines & Contrast Safety',9,14],['Trauma, Portable & OR Workflow',14,17],['Special Needs, Emergencies & Documentation',17,20]],
'Positioning & Procedures':[
 ['Chest & Abdomen',0,2],['Upper Extremity',2,7],['Lower Extremity',7,12],['Spine',12,16],['Skull, Ribs & Trauma Adaptations',16,20]],
'Registry Strategy':[
 ['Question-Stem Reasoning',0,3],['Exposure & Physics Calculations',3,9],['Anatomy, Positioning & Image Critique',9,12],['Patient Care, Safety, Fluoro & Digital Scenarios',12,17],['Pacing, Remediation & Final Review',17,20]]
};
courseData.forEach(mod=>{
  (categoryMap[mod.module]||[]).forEach(([name,start,end])=>mod.lessons.slice(start,end).forEach(l=>l.category=name));
});

const imageProdDeep={
'kVp effects on beam quality':`<h3>What kVp actually changes</h3><p>kVp sets the maximum potential difference across the tube and therefore the maximum kinetic energy available to projectile electrons. Raising kVp increases the maximum photon energy, increases average beam energy, increases penetrability, and usually increases the number of photons produced. It also changes scatter production and subject contrast. In digital imaging, displayed brightness can be rescaled, so the clinically useful questions are penetration, receptor exposure, contrast information, noise, and patient dose—not whether the display simply looks darker or lighter.</p><h3>What you should see</h3><p>Use the hand simulator below. At very low kVp, penetration is reduced and thicker anatomy becomes relatively underpenetrated. As kVp rises, penetration increases and subject contrast generally decreases. If mAs is held constant, receptor exposure generally rises as well.</p>`,
'mAs effects on photon quantity':`<h3>Photon quantity and quantum noise</h3><p>mAs is the product of tube current and exposure time. It primarily determines the total number of electrons crossing the tube and therefore the total number of x-ray photons generated. Doubling mAs approximately doubles photon quantity and receptor exposure when other factors remain unchanged. Reducing mAs too far increases quantum noise because fewer photons contribute to the detector signal.</p><h3>Digital imaging trap</h3><p>Post-processing can normalize displayed brightness even when receptor exposure is too low or too high. Judge mAs adequacy using exposure indicators, noise, clinical image quality, and dose—not display brightness alone.</p>`,
'15% rule and technique compensation':`<h3>Why the 15% rule works</h3><p>As a traditional technique relationship, increasing kVp by about 15% has an effect on receptor exposure roughly comparable to doubling mAs; decreasing kVp by about 15% is roughly comparable to halving mAs. The rule is approximate, not a law of nature, and modern generator/detector systems can alter the exact response. Use it to reason about technique compensation while preserving the distinction between beam energy and photon quantity.</p>`,
'SID and intensity':`<h3>Distance changes beam intensity</h3><p>When source-to-image distance increases, beam intensity at the receptor falls according to the inverse square relationship. To maintain receptor exposure when SID changes, mAs can be adjusted with the exposure maintenance formula. Geometry also changes: increasing SID generally reduces magnification and can improve geometric sharpness when other factors are controlled.</p>`,
'OID, magnification, and recorded detail':`<h3>OID is a geometry problem</h3><p>Increasing object-to-image distance increases magnification and geometric unsharpness because diverging rays spread before reaching the detector. Keep the anatomy of interest as close to the receptor as practical. When OID is unavoidable, increasing SID can partially compensate for magnification.</p>`,
'Focal spot size and geometric unsharpness':`<h3>Focal spot controls penumbra</h3><p>A smaller effective focal spot reduces geometric unsharpness and improves recorded detail, but it limits tube loading because heat is concentrated over a smaller focal-track area. The line-focus principle allows a larger actual focal spot for heat loading while maintaining a smaller effective focal spot toward the detector.</p>`,
'Motion and temporal unsharpness':`<h3>Motion destroys spatial information</h3><p>Voluntary or involuntary motion during the exposure blurs edges and reduces recorded detail. Shorter exposure time is one of the most direct technical methods for reducing motion blur when mAs can be maintained appropriately.</p>`,
'Shape distortion and alignment':`<h3>Elongation and foreshortening come from misalignment</h3><p>Shape distortion occurs when the tube, anatomy, and receptor are not aligned correctly. The exact appearance depends on whether the central ray or anatomy is angled relative to the receptor. Treat distortion as a geometry problem rather than an exposure problem.</p>`,
'Size distortion and magnification':`<h3>Magnification is predictable</h3><p>Magnification increases as OID increases and decreases as SID increases. The magnification factor is image size divided by object size and can also be related to SID and source-to-object distance.</p>`,
'Collimation and scatter control':`<h3>Field size changes scatter</h3><p>Collimation reduces the volume of tissue irradiated. A smaller field generally produces less scatter, improves subject contrast at the detector, and reduces unnecessary patient exposure. The interactive scatter field below demonstrates why field-size restriction matters.</p>`,
'Grid construction and grid ratio':`<h3>A grid is selective scatter cleanup</h3><p>Lead strips absorb obliquely traveling scatter before it reaches the detector while radiolucent interspaces transmit more of the primary beam. Higher grid ratios improve scatter cleanup but demand more accurate alignment and usually require increased technique.</p>`,
'Grid cutoff and alignment errors':`<h3>Grid cutoff is a geometry failure</h3><p>Off-level, off-center, off-focus, and upside-down focused-grid errors attenuate primary radiation. The pattern of cutoff can help identify the cause. Do not respond to grid cutoff by simply increasing exposure; correct the geometry.</p>`,
'AEC chambers and backup time':`<h3>AEC terminates exposure from detector feedback</h3><p>Automatic exposure control ends the exposure after a predetermined detector signal is reached. Correct chamber selection, positioning, collimation, and anatomy coverage are essential. Backup time protects against excessive exposure if the AEC fails to terminate normally.</p>`,
'Technique charts and patient habitus':`<h3>Technique charts reduce arbitrary exposure selection</h3><p>Charts standardize technique using anatomy thickness, body habitus, projection, receptor/grid conditions, and equipment characteristics. A chart is a starting system; the technologist still evaluates the patient and examination conditions.</p>`,
'Subject contrast versus image contrast':`<h3>Separate patient attenuation from display processing</h3><p>Subject contrast arises from differences in attenuation within the patient. Image contrast is what appears in the displayed image after acquisition and processing. kVp, tissue composition, scatter, contrast media, detector response, and processing all participate—but at different stages.</p>`,
'Receptor exposure and quantum noise':`<h3>Low detector exposure reveals itself as noise</h3><p>When too few photons reach the detector, statistical variation becomes a larger fraction of the signal and quantum mottle increases. Digital rescaling cannot create missing signal-to-noise information. Excessive receptor exposure can still produce a visually acceptable image and contribute to exposure creep.</p>`,
'SNR and CNR fundamentals':`<h3>SNR and CNR describe detectability</h3><p>Signal-to-noise ratio compares useful signal with random noise. Contrast-to-noise ratio considers the difference between two signals relative to noise and is directly related to how conspicuous an object is against its background.</p>`,
'Spatial resolution and limiting factors':`<h3>Spatial resolution is a system property</h3><p>Recorded detail is limited by focal spot size, geometry, motion, detector element size, sampling, and processing. Improving one component cannot fully recover information lost earlier in the chain.</p>`,
'Exposure latitude and dynamic range':`<h3>Wide latitude is useful—but can hide mistakes</h3><p>Digital detectors can capture a broad range of exposures, reducing obvious over- or underexposure appearance compared with film. That flexibility makes exposure indicators, noise assessment, and dose awareness more important.</p>`,
'Image evaluation and repeat analysis':`<h3>Diagnose the cause before repeating</h3><p>Classify the failure: positioning, anatomy coverage, motion, exposure/noise, artifact, processing, or equipment. Repeat only when the image is not diagnostically acceptable and correct the actual cause rather than making a random technique change.</p>`
};
const im=courseData.find(m=>m.module==='Image Production');
if(im) im.lessons.forEach(l=>{if(imageProdDeep[l.title]) l.content += `<section class="v24-deep-dive"><h3>Detailed Image Production Lesson</h3>${imageProdDeep[l.title]}</section>`;});

// Purpose-built interaction assignments.
const findLesson=(module,re)=>courseData.find(m=>m.module===module)?.lessons.find(l=>re.test(l.title));
[
 ['Image Production',/Collimation and scatter/, 'v24-scatter'],
 ['Image Production',/Grid construction/, 'v24-grid'],
 ['Digital Imaging',/Direct versus indirect|detector overview/i,'v24-detector'],
 ['Fluoroscopy',/geometry|scatter distribution/i,'v24-fluoro'],
 ['Positioning & Procedures',/Hand and wrist/i,'v24-anatomy-hand'],
 ['Positioning & Procedures',/Chest positioning/i,'v24-anatomy-chest']
].forEach(([m,re,type])=>{const l=findLesson(m,re);if(l)l.interactive=type;});

function subjectImage(lesson){
 const t=lesson.title.toLowerCase(),m=lesson.module;
 if(/hand|wrist/.test(t)) return 'assets/verified_real/hand-pa-cc0.jpg';
 if(/chest/.test(t)) return 'assets/verified_real/chest-pa-cc0.jpg';
 if(/knee|tibia|fibula/.test(t)) return 'assets/verified_real/knee-ap-cc0.jpg';
 if(/foot|ankle/.test(t)) return 'assets/verified_real/foot-ap-cc0.jpg';
 if(/pelvis|hip/.test(t)) return 'assets/verified_real/pelvis-ap-public-domain.jpg';
 if(/shoulder|scapula/.test(t)) return 'assets/verified_real/shoulder-y-cc0.jpg';
 if(m==='Radiation Physics') return /circuit|transform|autotransformer|rectif/.test(t)?'assets/v21-circuit-reference.png':'assets/v21-electron-photon-storyboard.png';
 if(m==='Image Production') return 'assets/verified_real/hand-pa-cc0.jpg';
 if(m==='Digital Imaging') return 'assets/v21-electron-photon-storyboard.png';
 if(m==='Fluoroscopy') return 'assets/verified_real/pelvis-ap-public-domain.jpg';
 return '';
}
window.v24LessonMedia=function(lesson){
 const src=subjectImage(lesson); const hasAudio=!!window.V20_AUDIO?.[lesson.id];
 return `<section class="v24-media-shell"><div class="v24-media-head"><div><span class="premium-label">LESSON MEDIA</span><h3>${lesson.title}</h3></div><div class="v24-media-actions">${hasAudio?'<button type="button" class="btn v24-audio">▶ Play narration</button>':''}<button type="button" class="btn btn-secondary v24-replay">↻ Replay animation</button></div></div><div class="v24-media-grid"><div class="v24-visual ${lesson.module.toLowerCase().replace(/[^a-z]+/g,'-')}">${src?`<img src="${src}" alt="Visual reference for ${lesson.title}">`:''}<div class="v24-animation-track"><i class="v24-particle p1"></i><i class="v24-particle p2"></i><i class="v24-particle p3"></i><span class="v24-track-label">Conceptual mechanism animation — not to scale</span></div></div><div class="v24-media-notes"><strong>During this lesson</strong><ol><li>Identify the controlling variable or component.</li><li>Watch what physically changes next.</li><li>Connect that change to image quality, receptor exposure, geometry, dose, or patient care.</li><li>Complete the 5-question review after marking the topic reviewed.</li></ol><div class="v24-audio-status" aria-live="polite">${hasAudio?'Instructor narration available.':'Visual/interactive lesson; narration for this topic is not yet recorded.'}</div></div></div></section>`;
};
window.bindV24=function(lesson){
 const shell=document.querySelector('.v24-media-shell');
 shell?.querySelector('.v24-replay')?.addEventListener('click',()=>{shell.classList.remove('playing');void shell.offsetWidth;shell.classList.add('playing')});
 shell?.querySelector('.v24-audio')?.addEventListener('click',()=>{const status=shell.querySelector('.v24-audio-status'),url=window.V20_AUDIO?.[lesson.id]; if(!url)return; window.__v24Audio?.pause();const a=new Audio(url);window.__v24Audio=a;status.textContent='Playing instructor narration…';a.play().catch(()=>status.textContent='Audio could not start. Tap Play again after the page finishes loading.');a.onended=()=>status.textContent='Narration complete.'});
 const scatter=document.getElementById('v24Field');if(scatter){const up=()=>{const v=+scatter.value;document.getElementById('v24FieldVal').textContent=v+'%';document.getElementById('v24ScatterCloud').style.opacity=.15+.75*v/100;document.getElementById('v24ScatterRead').textContent=v<35?'Tight field: less tissue irradiated → less scatter produced.':v<70?'Moderate field: scatter production rises as irradiated volume increases.':'Large field: more irradiated tissue → more scatter → lower subject contrast and unnecessary exposure.'};scatter.oninput=up;up();}
 const grid=document.getElementById('v24GridRatio');if(grid){const up=()=>{const v=+grid.value;document.getElementById('v24GridVal').textContent=v+':1';document.getElementById('v24GridRead').textContent=v<8?'Lower ratio: more forgiving alignment, less scatter cleanup.':v<13?'Moderate ratio: stronger scatter cleanup with increased alignment/technique demands.':'High ratio: greater scatter rejection but greater risk of cutoff and higher technique requirement.'};grid.oninput=up;up();}
};

const oldInteractive=window.v22Interactive;
window.v22Interactive=function(type){
 if(type==='v24-scatter') return `<section class="v24-lab"><h3>Scatter & collimation lab</h3><p>Change field size and watch the relative scatter cloud around the patient. The animation is conceptual and designed to teach the relationship between irradiated volume and scatter production.</p><label>Field size <strong id="v24FieldVal">50%</strong><input id="v24Field" type="range" min="10" max="100" value="50"></label><div class="v24-scatter-stage"><div class="v24-patient">PATIENT</div><div class="v24-primary-beam"></div><div id="v24ScatterCloud" class="v24-scatter-cloud"></div></div><div id="v24ScatterRead" class="lesson-callout"></div></section>`;
 if(type==='v24-grid') return `<section class="v24-lab"><h3>Grid-ratio lab</h3><label>Grid ratio <strong id="v24GridVal">8:1</strong><input id="v24GridRatio" type="range" min="5" max="16" value="8"></label><div class="v24-grid-stage"><div class="v24-grid-lines"></div><span>Primary rays → detector</span><i>Oblique scatter → preferentially absorbed</i></div><div id="v24GridRead" class="lesson-callout"></div></section>`;
 if(type==='v24-detector') return `<section class="v24-lab"><h3>Direct vs indirect DR conversion</h3><div class="v24-detector-tabs"><button type="button" data-det="indirect">Indirect DR</button><button type="button" data-det="direct">Direct DR</button></div><div id="v24DetectorPath" class="v24-detector-path">Choose a detector pathway.</div></section>`;
 if(type==='v24-fluoro') return `<section class="v24-lab"><h3>C-arm geometry & scatter lab</h3><div class="v24-fluoro-stage"><span class="tube">X-RAY TUBE</span><span class="patient">PATIENT</span><span class="detector">DETECTOR</span><i class="scatter s1"></i><i class="scatter s2"></i><i class="scatter s3"></i></div><p>Keep the detector close to the patient when practical and use distance from the patient/scatter source to reduce occupational exposure.</p></section>`;
 if(type==='v24-anatomy-hand') return `<section class="v24-lab"><h3>Interactive hand radiograph</h3><div class="v24-anatomy"><img src="assets/verified_real/hand-pa-cc0.jpg" alt="PA hand radiograph"><button style="left:46%;top:66%" data-label="Carpal region: evaluate wrist inclusion, rotation, joint spaces, and bony detail.">?</button><button style="left:54%;top:38%" data-label="Metacarpals: assess alignment, cortical continuity, joint spaces, and overlap.">?</button></div><div id="v24AnatomyRead" class="lesson-callout">Tap a marker on the radiograph.</div></section>`;
 if(type==='v24-anatomy-chest') return `<section class="v24-lab"><h3>Interactive PA chest radiograph</h3><div class="v24-anatomy"><img src="assets/verified_real/chest-pa-cc0.jpg" alt="PA chest radiograph"><button style="left:50%;top:40%" data-label="Mediastinum / heart: inspect rotation, inspiration, exposure, and cardiac silhouette.">?</button><button style="left:30%;top:48%" data-label="Lung field: inspect penetration, inspiration, motion, and symmetry.">?</button></div><div id="v24AnatomyRead" class="lesson-callout">Tap a marker on the radiograph.</div></section>`;
 return oldInteractive?oldInteractive(type):'';
};
const oldBind=window.bindV22;
window.bindV22=function(lesson){oldBind?.(lesson);document.querySelectorAll('[data-det]').forEach(b=>b.onclick=()=>{document.getElementById('v24DetectorPath').innerHTML=b.dataset.det==='indirect'?'<b>Indirect DR:</b> x-ray photon → scintillator → visible light → photodiode → electrical charge → TFT/readout → pixel value.':'<b>Direct DR:</b> x-ray photon → photoconductor (such as a-Se) → electron-hole charge carriers → electric field/readout → pixel value.'});document.querySelectorAll('.v24-anatomy [data-label]').forEach(b=>b.onclick=()=>document.getElementById('v24AnatomyRead').textContent=b.dataset.label);window.bindV24?.(lesson)};
})();
