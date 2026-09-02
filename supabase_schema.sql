create table if not exists public.profiles(id uuid primary key references auth.users(id) on delete cascade,full_name text,access_level text not null default 'free' check(access_level in('free','complete','premium')),created_at timestamptz not null default now());create table if not exists public.student_progress(user_id uuid primary key references auth.users(id) on delete cascade,state jsonb not null default '{}'::jsonb,updated_at timestamptz not null default now());alter table public.profiles enable row level security;alter table public.student_progress enable row level security;create policy "Users read own profile" on public.profiles for select using(auth.uid()=id);create policy "Users read own progress" on public.student_progress for select using(auth.uid()=user_id);create policy "Users insert own progress" on public.student_progress for insert with check(auth.uid()=user_id);create policy "Users update own progress" on public.student_progress for update using(auth.uid()=user_id);create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$begin insert into public.profiles(id,full_name) values(new.id,new.raw_user_meta_data->>'full_name') on conflict(id) do nothing;return new;end;$$;drop trigger if exists on_auth_user_created on auth.users;create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Student Hub / Community
create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  caption text not null check (char_length(caption) between 1 and 800),
  category text not null default 'Study Notes',
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.community_posts enable row level security;
create policy "Authenticated users read community posts" on public.community_posts for select to authenticated using (true);
create policy "Users create own community posts" on public.community_posts for insert to authenticated with check (auth.uid() = user_id);
create policy "Users delete own community posts" on public.community_posts for delete to authenticated using (auth.uid() = user_id);

insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('student-uploads','student-uploads',true,8388608,array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp','image/heic','image/heif'];

create policy "Students upload own study images" on storage.objects for insert to authenticated
with check (bucket_id='student-uploads' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "Students delete own study images" on storage.objects for delete to authenticated
using (bucket_id='student-uploads' and (storage.foldername(name))[1]=auth.uid()::text);


-- Community reactions and discussion replies
create table if not exists public.community_reactions (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id,user_id)
);
alter table public.community_reactions enable row level security;
create policy "Authenticated users read reactions" on public.community_reactions for select to authenticated using (true);
create policy "Users add own reactions" on public.community_reactions for insert to authenticated with check (auth.uid()=user_id);
create policy "Users remove own reactions" on public.community_reactions for delete to authenticated using (auth.uid()=user_id);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  created_at timestamptz not null default now()
);
alter table public.community_comments enable row level security;
create policy "Authenticated users read comments" on public.community_comments for select to authenticated using (true);
create policy "Users add own comments" on public.community_comments for insert to authenticated with check (auth.uid()=user_id);
create policy "Users delete own comments" on public.community_comments for delete to authenticated using (auth.uid()=user_id);


-- V11 access and single-login controls
alter table public.profiles drop constraint if exists profiles_access_level_check;
alter table public.profiles add constraint profiles_access_level_check check (access_level in ('free','monthly','lifetime','complete','premium'));
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists stripe_subscription_id text;
alter table public.profiles add column if not exists subscription_status text;

create table if not exists public.active_sessions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  device_token text not null,
  last_seen timestamptz not null default now()
);
alter table public.active_sessions enable row level security;
drop policy if exists "Users read own active session" on public.active_sessions;
drop policy if exists "Users create own active session" on public.active_sessions;
drop policy if exists "Users update own active session" on public.active_sessions;
drop policy if exists "Users delete own active session" on public.active_sessions;
create policy "Users read own active session" on public.active_sessions for select to authenticated using (auth.uid()=user_id);
create policy "Users create own active session" on public.active_sessions for insert to authenticated with check (auth.uid()=user_id);
create policy "Users update own active session" on public.active_sessions for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "Users delete own active session" on public.active_sessions for delete to authenticated using (auth.uid()=user_id);
