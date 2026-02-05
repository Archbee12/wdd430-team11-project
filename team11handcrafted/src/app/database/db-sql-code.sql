
create table artisans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  bio text,
  location text,
  created_at timestamp with time zone default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  artisan_id uuid references artisans(id) on delete cascade,
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  created_at timestamp with time zone default now()
);

