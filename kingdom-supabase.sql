-- Chạy 1 lần trong Supabase: Dashboard → SQL Editor → New query → dán → Run
-- Bảng lưu trạng thái game "Vương quốc Hán tự" cho từng tài khoản.

create table if not exists public.kingdom_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.kingdom_state enable row level security;

drop policy if exists "kingdom_select_own" on public.kingdom_state;
drop policy if exists "kingdom_insert_own" on public.kingdom_state;
drop policy if exists "kingdom_update_own" on public.kingdom_state;

create policy "kingdom_select_own" on public.kingdom_state
  for select using (auth.uid() = user_id);

create policy "kingdom_insert_own" on public.kingdom_state
  for insert with check (auth.uid() = user_id);

create policy "kingdom_update_own" on public.kingdom_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
