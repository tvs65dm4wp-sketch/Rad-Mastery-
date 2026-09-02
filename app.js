const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function applyTheme() {
  const saved = localStorage.getItem("rrm-theme");
  if (document.body.classList.contains("public-app") && !saved) { document.body.classList.add("dark"); return; }
  document.body.classList.toggle("dark", saved === "dark");
}
applyTheme();

$("#themeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("rrm-theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if ($("#year")) $("#year").textContent = new Date().getFullYear();

$$('.checkout-placeholder').forEach((link) => {
  const type=link.dataset.checkout;
  const url=type==='premium' ? window.RRM_CONFIG?.STRIPE_PREMIUM_URL : window.RRM_CONFIG?.STRIPE_COMPLETE_BUNDLE_URL;
  if(url){ link.href=url; link.target='_blank'; link.rel='noopener'; }
  else { link.href='product.html#purchase'; link.classList.add('checkout-not-configured'); }
});


const fallbackQuestions = [
  {category:"X-Ray Production",q:"Which component releases electrons through thermionic emission?",options:["Anode target","Filament","Rotor","Stator"],answer:1,explanation:"Heating the cathode filament releases electrons through thermionic emission."},
  {category:"Exposure Principles",q:"Which factor primarily controls x-ray photon quantity?",options:["kVp","mAs","SID","OID"],answer:1,explanation:"mAs primarily controls x-ray photon quantity."},
  {category:"Radiation Protection",q:"Which action reduces both patient dose and scatter production?",options:["Increase field size","Collimate","Increase OID","Repeat the image"],answer:1,explanation:"Collimation reduces irradiated tissue volume and scatter."},
  {category:"Digital Imaging",q:"Window level primarily changes displayed:",options:["Brightness","Spatial resolution","Distortion","Magnification"],answer:0,explanation:"Window level primarily changes displayed brightness."},
  {category:"Foundations",q:"Which modality does not use ionizing radiation?",options:["CT","Radiography","MRI","Fluoroscopy"],answer:2,explanation:"MRI uses magnetic fields and radiofrequency energy rather than ionizing radiation."}
];
const sampleQuestions = (typeof questionBank !== "undefined" && Array.isArray(questionBank) && questionBank.length >= 5) ? questionBank.slice(0, 5) : fallbackQuestions;
let quizIndex = 0;
let quizScore = 0;
let answered = false;

function renderHomeQuiz() {
  const item = sampleQuestions[quizIndex];
  $("#quizProgress").textContent = `Question ${quizIndex + 1} of ${sampleQuestions.length}`;
  $("#quizProgressBar").style.width = `${((quizIndex + 1) / sampleQuestions.length) * 100}%`;
  $("#quizQuestion").textContent = item.q;
  $("#quizFeedback").className = "quiz-feedback";
  $("#quizFeedback").textContent = "";
  $("#nextQuestion").hidden = true;
  answered = false;
  $("#quizAnswers").innerHTML = "";
  item.options.forEach((option, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => chooseHomeAnswer(btn, idx));
    $("#quizAnswers").appendChild(btn);
  });
}

function chooseHomeAnswer(button, idx) {
  if (answered) return;
  answered = true;
  const item = sampleQuestions[quizIndex];
  $$("#quizAnswers .answer-btn").forEach((btn, i) => {
    btn.disabled = true;
    if (i === item.answer) btn.classList.add("correct");
  });
  if (idx !== item.answer) button.classList.add("incorrect");
  else quizScore++;
  $("#quizFeedback").className = "quiz-feedback visible";
  $("#quizFeedback").innerHTML = `<strong>${idx === item.answer ? "Correct" : "Review this concept"}</strong><br>${item.explanation}`;
  $("#nextQuestion").hidden = false;
  $("#nextQuestion").textContent = quizIndex === sampleQuestions.length - 1 ? "See Score" : "Next Question";
}

$("#nextQuestion")?.addEventListener("click", () => {
  if (quizIndex < sampleQuestions.length - 1) {
    quizIndex++;
    if ($("#homepageQuiz")) renderHomeQuiz();
  } else {
    $("#homepageQuiz").innerHTML = `
      <p class="eyebrow">Your result</p>
      <h2>${quizScore} / ${sampleQuestions.length}</h2>
      <p>You scored ${Math.round((quizScore / sampleQuestions.length) * 100)}%.</p>
      <a class="btn" href="dashboard.html">Open the Full Dashboard</a>`;
  }
});

if ($("#homepageQuiz")) renderHomeQuiz();
