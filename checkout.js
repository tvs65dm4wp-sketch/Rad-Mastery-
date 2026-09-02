(async()=>{
  const message=document.getElementById('checkoutMessage');
  const cfg=window.RRM_CONFIG||{};
  const sb=(cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&window.supabase)?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
  async function begin(plan){
    if(!sb){ if(message) message.textContent='Student accounts are not configured.'; return; }
    const {data}=await sb.auth.getSession(); const session=data.session;
    if(!session){ location.href=`auth.html?plan=${encodeURIComponent(plan)}`; return; }
    const base=plan==='monthly'?cfg.STRIPE_MONTHLY_URL:cfg.STRIPE_LIFETIME_URL;
    if(!base){ if(message) message.textContent='Stripe Checkout is not configured.'; return; }
    const url=new URL(base);
    url.searchParams.set('client_reference_id',session.user.id);
    if(session.user.email) url.searchParams.set('prefilled_email',session.user.email);
    if(message) message.textContent='Opening secure Stripe Checkout…';
    location.href=url.toString();
  }
  document.querySelectorAll('.secure-checkout').forEach(b=>b.addEventListener('click',()=>begin(b.dataset.plan)));
  const auto=new URLSearchParams(location.search).get('checkout');
  if(auto==='monthly'||auto==='lifetime') begin(auto);
})();
