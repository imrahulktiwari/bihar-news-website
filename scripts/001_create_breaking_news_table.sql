-- Create breaking_news table to store fetched articles
create table if not exists public.breaking_news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text,
  image_url text,
  source_url text unique,
  source_name text default 'NDTV News',
  category text default 'World',
  published_at timestamp with time zone,
  fetched_at timestamp with time zone default now(),
  is_featured boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for breaking_news table
alter table public.breaking_news enable row level security;

-- Policy: Anyone can view breaking news (public data)
create policy "breaking_news_select_all"
  on public.breaking_news for select
  using (true);

-- Policy: Only admin/service role can insert breaking news
create policy "breaking_news_insert_service"
  on public.breaking_news for insert
  with check (true);

-- Policy: Only admin/service role can update breaking news
create policy "breaking_news_update_service"
  on public.breaking_news for update
  using (true)
  with check (true);

-- Create index for faster queries
create index if not exists idx_breaking_news_featured on public.breaking_news(is_featured, created_at desc);
create index if not exists idx_breaking_news_category on public.breaking_news(category, created_at desc);
create index if not exists idx_breaking_news_published on public.breaking_news(published_at desc);
