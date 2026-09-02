window.RRM_CLOUD = {
  client: null,
  user: null,
  sessionToken: null,
  sessionTimer: null,
  async init() {
    const c = window.RRM_CONFIG || {};
    if (!c.SUPABASE_URL || !c.SUPABASE_ANON_KEY || !window.supabase) return false;
    this.client = window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY);
    const { data } = await this.client.auth.getSession();
    this.user = data.session?.user || null;
    if (!this.user) return false;
    this.sessionToken = sessionStorage.getItem('radm-session-token');
    if (!this.sessionToken) {
      this.sessionToken = crypto.randomUUID();
      sessionStorage.setItem('radm-session-token', this.sessionToken);
      await this.claimSession();
    } else {
      const valid = await this.touchSession();
      if (!valid) await this.claimSession();
    }
    this.startSessionWatch();
    return true;
  },
  async claimSession() {
    const label = `${navigator.platform || 'browser'} · ${navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop'}`;
    const { error } = await this.client.rpc('claim_session', { p_session_token: this.sessionToken, p_device_label: label });
    if (error) throw error;
  },
  async touchSession() {
    if (!this.user || !this.sessionToken) return false;
    const { data, error } = await this.client.rpc('touch_session', { p_session_token: this.sessionToken });
    if (error) return false;
    return data === true;
  },
  startSessionWatch() {
    clearInterval(this.sessionTimer);
    const check = async () => {
      if (!this.user) return;
      const ok = await this.touchSession();
      if (!ok) {
        clearInterval(this.sessionTimer);
        await this.client.auth.signOut({ scope: 'local' });
        sessionStorage.removeItem('radm-session-token');
        location.href = 'auth.html?reason=session-replaced';
      }
    };
    this.sessionTimer = setInterval(check, 12000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  },
  async entitlement() {
    if (!this.user) return 'free';
    const { data, error } = await this.client.from('entitlements').select('access_level,status,current_period_end').eq('user_id', this.user.id).maybeSingle();
    if (error || !data || data.status !== 'active') return 'free';
    return data.access_level;
  },
  async profile() {
    if (!this.user) return null;
    const { data } = await this.client.from('profiles').select('display_name,student_status,role').eq('id', this.user.id).maybeSingle();
    return data || null;
  },
  async loadProgress() {
    if (!this.user) return null;
    const { data, error } = await this.client.from('progress').select('item_key,progress_percent,score').eq('user_id', this.user.id);
    if (error) throw error;
    const state = {};
    (data || []).forEach(r => state[r.item_key] = { progress_percent:r.progress_percent, score:r.score });
    return state;
  },
  async saveProgressItem(itemKey, progressPercent, score=null) {
    if (!this.user) return;
    const { error } = await this.client.from('progress').upsert({ user_id:this.user.id, item_key:itemKey, progress_percent:progressPercent, score, updated_at:new Date().toISOString() }, { onConflict:'user_id,item_key' });
    if (error) console.warn(error.message);
  },
  async listPosts(category='all') {
    if (!this.user) return [];
    let q = this.client.from('forum_posts').select('id,user_id,category,title,body,attachment_path,solved,created_at,profiles:user_id(display_name,student_status)').order('created_at',{ascending:false}).limit(100);
    if (category !== 'all') q = q.eq('category', category);
    const { data, error } = await q;
    if (error) throw error;
    return data || [];
  },
  async createPost({category,title,body,file}) {
    if (!this.user) throw new Error('Sign in to post.');
    let attachment_path = null;
    if (file) {
      const ext=(file.name.split('.').pop()||'bin').toLowerCase();
      attachment_path=`${this.user.id}/${crypto.randomUUID()}.${ext}`;
      const { error } = await this.client.storage.from('notes-help').upload(attachment_path,file,{contentType:file.type,upsert:false});
      if (error) throw error;
    }
    const { error } = await this.client.from('forum_posts').insert({user_id:this.user.id,category,title,body,attachment_path});
    if (error) throw error;
  },
  async attachmentUrl(path) {
    if (!path) return null;
    const { data, error } = await this.client.storage.from('notes-help').createSignedUrl(path, 3600);
    if (error) return null;
    return data.signedUrl;
  },
  async listReplies(postId) {
    const { data, error } = await this.client.from('forum_replies').select('id,user_id,body,is_solution,created_at,profiles:user_id(display_name,student_status)').eq('post_id',postId).order('created_at',{ascending:true});
    if (error) throw error; return data || [];
  },
  async reply(postId, body) {
    const { error } = await this.client.from('forum_replies').insert({post_id:postId,user_id:this.user.id,body});
    if (error) throw error;
  },
  async helpful(postId) {
    const { data } = await this.client.from('post_reactions').select('user_id').eq('post_id',postId);
    const mine=(data||[]).some(r=>r.user_id===this.user?.id);
    return { count:(data||[]).length, mine };
  },
  async toggleHelpful(postId) {
    const { data }=await this.client.from('post_reactions').select('post_id').eq('post_id',postId).eq('user_id',this.user.id).maybeSingle();
    if (data) return this.client.from('post_reactions').delete().eq('post_id',postId).eq('user_id',this.user.id);
    return this.client.from('post_reactions').insert({post_id:postId,user_id:this.user.id,reaction:'helpful'});
  },
  async toggleBookmark(postId) {
    const { data }=await this.client.from('bookmarks').select('post_id').eq('post_id',postId).eq('user_id',this.user.id).maybeSingle();
    if (data) return this.client.from('bookmarks').delete().eq('post_id',postId).eq('user_id',this.user.id);
    return this.client.from('bookmarks').insert({post_id:postId,user_id:this.user.id});
  },
  async markSolved(postId, solved=true) {
    const { error }=await this.client.from('forum_posts').update({solved,updated_at:new Date().toISOString()}).eq('id',postId).eq('user_id',this.user.id);
    if (error) throw error;
  },
  async reportPost(postId, reason='Needs moderator review') {
    const { error }=await this.client.from('reports').insert({reporter_id:this.user.id,post_id:postId,reason});
    if (error) throw error;
  },
  async signOut() {
    clearInterval(this.sessionTimer);
    if (this.client) await this.client.auth.signOut({scope:'local'});
    sessionStorage.removeItem('radm-session-token');
    location.href='index.html';
  }
};
