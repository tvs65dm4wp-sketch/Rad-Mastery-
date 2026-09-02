const communityForm=document.getElementById('communityForm');
const communityFeed=document.getElementById('communityFeed');
const postImage=document.getElementById('postImage');
const postPreview=document.getElementById('postPreview');
let localCommunityPosts=[];
let localHelpful=JSON.parse(localStorage.getItem('rrm-community-helpful')||'{}');
let localComments=JSON.parse(localStorage.getItem('rrm-community-comments')||'{}');

const demoPosts=[
 {id:'demo1',user_id:'demo',caption:'My quick reminder sheet for kVp vs. mAs. Writing the relationship out by hand helped me stop mixing them up.',category:'Study Notes',image_url:'',created_at:new Date(Date.now()-3600000*4).toISOString()},
 {id:'demo2',user_id:'demo',caption:'Can someone explain why increasing OID causes more magnification? I understand the rule but want to understand the geometry.',category:'Homework Question',image_url:'',created_at:new Date(Date.now()-3600000*8).toISOString()}
];
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}
function timeAgo(iso){let s=Math.max(1,Math.floor((Date.now()-new Date(iso))/1000));if(s<60)return `${s}s ago`;let m=Math.floor(s/60);if(m<60)return `${m}m ago`;let h=Math.floor(m/60);if(h<24)return `${h}h ago`;return `${Math.floor(h/24)}d ago`;}
function isCloudPostId(id){return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);}
function saveLocal(){localStorage.setItem('rrm-community-helpful',JSON.stringify(localHelpful));localStorage.setItem('rrm-community-comments',JSON.stringify(localComments));}
async function postReactionInfo(postId){
 if(window.RRM_CLOUD?.user && isCloudPostId(postId)) return await window.RRM_CLOUD.getHelpfulInfo(postId);
 return {count:localHelpful[postId]?1:0,mine:!!localHelpful[postId]};
}
async function renderCommunity(posts){
 const filter=document.getElementById('communityFilter')?.value||'all';
 posts=posts.filter(p=>filter==='all'||p.category===filter);
 if(!posts.length){communityFeed.innerHTML='<div class="panel"><p>No posts in this category yet.</p></div>';return;}
 const cards=[];
 for(const p of posts){
   const r=await postReactionInfo(p.id);
   cards.push(`<article class="community-post panel" data-post-id="${p.id}"><div class="post-meta"><div class="avatar-small">R</div><div><strong>Radiography Student</strong><small>${esc(p.category)} · ${timeAgo(p.created_at)}</small></div>${window.RRM_CLOUD?.user?.id===p.user_id?`<button class="text-btn delete-post" data-id="${p.id}">Delete</button>`:''}</div>${p.image_url?`<img class="community-image" src="${esc(p.image_url)}" alt="Student uploaded study notes or homework">`:''}<p>${esc(p.caption)}</p><div class="post-actions"><button type="button" class="reaction-btn helpful-btn ${r.mine?'active':''}" data-id="${p.id}">♡ Helpful <span>${r.count}</span></button><button type="button" class="reaction-btn discuss-btn" data-id="${p.id}">💬 Discuss</button></div><div class="discussion-panel" id="discussion-${p.id}" hidden></div></article>`);
 }
 communityFeed.innerHTML=cards.join('');
 bindPostActions();
}
function bindPostActions(){
 document.querySelectorAll('.delete-post').forEach(b=>b.addEventListener('click',async()=>{try{if(window.RRM_CLOUD?.user)await window.RRM_CLOUD.deleteCommunityPost(b.dataset.id);else{localCommunityPosts=localCommunityPosts.filter(p=>p.id!==b.dataset.id);delete localHelpful[b.dataset.id];delete localComments[b.dataset.id];saveLocal();}await refreshCommunity();}catch(e){alert(e.message)}}));
 document.querySelectorAll('.helpful-btn').forEach(b=>b.addEventListener('click',async()=>{const id=b.dataset.id;try{if(window.RRM_CLOUD?.user && isCloudPostId(id))await window.RRM_CLOUD.toggleHelpful(id);else{localHelpful[id]=!localHelpful[id];saveLocal();}await refreshCommunity();}catch(e){alert(e.message)}}));
 document.querySelectorAll('.discuss-btn').forEach(b=>b.addEventListener('click',()=>toggleDiscussion(b.dataset.id)));
}
async function toggleDiscussion(postId){
 const panel=document.getElementById(`discussion-${postId}`);if(!panel)return;
 if(!panel.hidden){panel.hidden=true;return;}
 panel.hidden=false;panel.innerHTML='<p class="microcopy">Loading discussion…</p>';
 let comments=[];
 try{comments=(window.RRM_CLOUD?.user && isCloudPostId(postId))?await window.RRM_CLOUD.loadComments(postId):(localComments[postId]||[]);}catch(e){comments=localComments[postId]||[];}
 panel.innerHTML=`<div class="comment-list">${comments.length?comments.map(c=>`<div class="comment"><strong>Student</strong><small>${timeAgo(c.created_at)}</small><p>${esc(c.body)}</p></div>`).join(''):'<p class="microcopy">No replies yet. Start the discussion.</p>'}</div><form class="comment-form" data-id="${postId}"><input type="text" maxlength="500" required placeholder="Write a helpful reply…"><button class="btn btn-small" type="submit">Reply</button></form>`;
 panel.querySelector('.comment-form').addEventListener('submit',async e=>{e.preventDefault();const input=e.currentTarget.querySelector('input');const body=input.value.trim();if(!body)return;try{if(window.RRM_CLOUD?.user && isCloudPostId(postId))await window.RRM_CLOUD.addComment(postId,body);else{localComments[postId]||=[];localComments[postId].push({id:crypto.randomUUID(),body,created_at:new Date().toISOString()});saveLocal();}await toggleDiscussion(postId);await toggleDiscussion(postId);}catch(err){alert(err.message)}});
}
async function refreshCommunity(){try{if(window.RRM_CLOUD?.user){const posts=await window.RRM_CLOUD.loadCommunityPosts();await renderCommunity(posts.length?posts:demoPosts);}else await renderCommunity([...localCommunityPosts,...demoPosts]);}catch(e){await renderCommunity([...localCommunityPosts,...demoPosts]);}}
postImage?.addEventListener('change',()=>{let f=postImage.files[0];if(!f){postPreview.hidden=true;return}const allowed=['image/jpeg','image/png','image/webp','image/heic','image/heif'];if(!allowed.includes(f.type)&&!/[.](jpe?g|png|webp|heic|heif)$/i.test(f.name)){alert('Please choose a JPG, PNG, WEBP, HEIC, or HEIF image.');postImage.value='';postPreview.hidden=true;return}if(f.size>8*1024*1024){alert('Please choose an image smaller than 8 MB.');postImage.value='';postPreview.hidden=true;return}postPreview.src=URL.createObjectURL(f);postPreview.hidden=false;postPreview.onerror=()=>{postPreview.hidden=true;document.getElementById('communityMessage').textContent=`Selected ${f.name}. Preview is not available for this photo format, but it can still be uploaded.`;};});
communityForm?.addEventListener('submit',async e=>{e.preventDefault();let msg=document.getElementById('communityMessage');let caption=document.getElementById('postCaption').value.trim();let category=document.getElementById('postCategory').value;let file=postImage.files[0]||null;if(!caption){msg.textContent='Add a caption or question first.';return}msg.textContent='Sharing…';try{if(window.RRM_CLOUD?.user){await window.RRM_CLOUD.createCommunityPost({caption,category,file});}else{let image_url=file?URL.createObjectURL(file):'';localCommunityPosts.unshift({id:crypto.randomUUID(),user_id:'local',caption,category,image_url,created_at:new Date().toISOString()});saveLocal();}communityForm.reset();postPreview.hidden=true;msg.textContent=window.RRM_CLOUD?.user?'Post shared.':'Preview post added for this browser session. Connect Supabase for permanent sharing across student accounts.';await refreshCommunity();}catch(err){msg.textContent=err.message;}});
document.getElementById('communityFilter')?.addEventListener('change',refreshCommunity);
setTimeout(refreshCommunity,250);
