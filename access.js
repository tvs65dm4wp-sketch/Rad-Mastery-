(()=>{
const load=(src)=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s);});
const unlock=async(level,profile)=>{
  document.body.classList.remove('access-pending');
  document.body.classList.add('access-granted');
  const plan=document.querySelector('.profile span'); if(plan) plan.textContent=level==='lifetime'?'Lifetime access':level==='monthly'?'Monthly member':'Member';
  const name=document.querySelector('.profile strong'); if(name&&profile?.display_name) name.textContent=profile.display_name; const av=document.querySelector('.profile-avatar'); if(av&&profile?.display_name) av.textContent=profile.display_name.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
  await load('data.js'); await load('v26_curriculum.js'); await load('v20.js'); await load('v21.js'); await load('v22.js'); await load('v24.js'); await load('v25.js'); await load('dashboard.js'); await load('community-v12.js'); await load('v26.js');
};
(async()=>{
  try{
    const ok=await window.RRM_CLOUD.init();
    if(!ok){location.replace('auth.html?return=dashboard');return;}
    const level=await window.RRM_CLOUD.entitlement();
    if(!['monthly','lifetime'].includes(level)){
      const gate=document.getElementById('accessGate'); if(gate){gate.hidden=false;gate.innerHTML=`<div class="access-gate-card"><img src="assets/rad-mastery-v10-icon.jpg" alt=""><p class="premium-kicker">Premium access</p><h1>Choose your Rad Mastery access.</h1><p>Your account is signed in, but it does not have an active membership yet.</p><div class="access-gate-actions"><a class="btn" href="product.html#purchase">View Membership Options</a><button class="btn btn-secondary" id="gateSignOut">Sign Out</button></div></div>`;document.getElementById('gateSignOut')?.addEventListener('click',()=>window.RRM_CLOUD.signOut());}
      return;
    }
    await unlock(level,await window.RRM_CLOUD.profile());
  }catch(err){
    console.error(err); const gate=document.getElementById('accessGate'); if(gate){gate.hidden=false;gate.innerHTML=`<div class="access-gate-card"><h1>We couldn't verify access.</h1><p>${String(err.message||err)}</p><a class="btn" href="auth.html">Sign In Again</a></div>`;}
  }
})();
})();
