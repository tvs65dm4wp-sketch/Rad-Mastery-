function applySiteTheme(){document.body.classList.add('dark');}
applySiteTheme();
document.querySelectorAll('.theme-toggle').forEach(btn=>btn.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('rrm-theme',document.body.classList.contains('dark')?'dark':'light');}));

document.querySelectorAll('[data-checkout=complete]').forEach(a=>{if(window.RRM_CONFIG?.STRIPE_COMPLETE_BUNDLE_URL)a.href=window.RRM_CONFIG.STRIPE_COMPLETE_BUNDLE_URL});

document.querySelectorAll('.checkout-placeholder').forEach(link=>{const type=link.dataset.checkout;const url=type==='premium'?window.RRM_CONFIG?.STRIPE_PREMIUM_URL:window.RRM_CONFIG?.STRIPE_COMPLETE_BUNDLE_URL;if(url){link.href=url;link.target='_blank';link.rel='noopener';}else{link.href='contact.html';link.textContent='Contact for launch access';}});
document.querySelectorAll('[data-support-email]').forEach(el=>{if(window.RRM_CONFIG?.SUPPORT_EMAIL)el.textContent=window.RRM_CONFIG.SUPPORT_EMAIL;});
