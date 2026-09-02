const cfg = window.RRM_CONFIG || {};
const msg = document.getElementById('authMessage');
function client(){
  if(!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY || !window.supabase) throw new Error('Student accounts are not configured.');
  return window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
}
function setMessage(t, type=''){ if(msg){ msg.textContent=t; msg.dataset.type=type; } }
document.querySelectorAll('[data-auth-tab]').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-auth-tab]').forEach(b=>b.classList.toggle('active',b===btn));
  document.getElementById('signInForm').hidden=btn.dataset.authTab!=='signin';
  document.getElementById('signUpForm').hidden=btn.dataset.authTab!=='signup';
  setMessage('');
}));
const params=new URLSearchParams(location.search);
if(params.get('reason')==='session-replaced') setMessage('This account was opened on another device. Rad Mastery allows one active login at a time.','notice');

document.getElementById('signInForm')?.addEventListener('submit',async e=>{
  e.preventDefault();setMessage('Signing in…');
  try{
    const sb=client();const fd=new FormData(e.target);
    const {data,error}=await sb.auth.signInWithPassword({email:fd.get('email'),password:fd.get('password')});
    if(error)throw error;
    const token=crypto.randomUUID();sessionStorage.setItem('radm-session-token',token);
    const label=`${navigator.platform||'browser'} · ${navigator.userAgent.includes('Mobile')?'mobile':'desktop'}`;
    const claim=await sb.rpc('claim_session',{p_session_token:token,p_device_label:label});
    if(claim.error) throw claim.error;
    const plan=params.get('plan');
    location.href=(plan==='monthly'||plan==='lifetime')?`product.html?checkout=${plan}`:'dashboard.html';
  }catch(err){setMessage(err.message,'error');}
});

document.getElementById('signUpForm')?.addEventListener('submit',async e=>{
  e.preventDefault();setMessage('Creating account…');
  try{
    const sb=client();const fd=new FormData(e.target);
    const redirect=`${location.origin}/auth.html`;
    const {data,error}=await sb.auth.signUp({email:fd.get('email'),password:fd.get('password'),options:{data:{full_name:fd.get('name')},emailRedirectTo:redirect}});
    if(error)throw error;
    if(data.session){
      const token=crypto.randomUUID();sessionStorage.setItem('radm-session-token',token);
      await sb.rpc('claim_session',{p_session_token:token,p_device_label:'new account'});
      location.href='dashboard.html';
    } else setMessage('Account created. Check your email to confirm your address, then sign in.','success');
  }catch(err){setMessage(err.message,'error');}
});

document.getElementById('resetPassword')?.addEventListener('click',async()=>{
  const email=document.querySelector('#signInForm [name=email]')?.value?.trim();
  if(!email){setMessage('Enter your email address first.');return;}
  try{const sb=client();const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/auth.html`});if(error)throw error;setMessage('Password reset email sent.','success');}
  catch(err){setMessage(err.message,'error');}
});
