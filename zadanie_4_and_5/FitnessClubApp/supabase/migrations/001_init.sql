begin;

create table public.trainings (
  id bigint generated always as identity primary key,
  title text not null,
  date date not null,
  "time" time not null,
  type text not null,
  trainer text not null,
  place text not null,
  slots integer not null,
  created_at timestamptz not null default now()
);

create table public.bookings (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  training_id bigint not null references public.trainings(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, training_id)
);

insert into public.trainings (
  title,
  date,
  "time",
  type,
  trainer,
  place,
  slots
)
values
  ('Утренняя йога', '2026-10-12', '09:00', 'Йога', 'Анна Волкова', 'Зал 2', 5),
  ('Силовой старт', '2026-10-12', '12:30', 'Силовая', 'Максим Орлов', 'Зал 1', 3),
  ('Кардио-драйв', '2026-10-13', '18:00', 'Кардио', 'Елена Соколова', 'Кардиозона', 8),
  ('Йога для спины', '2026-10-14', '10:00', 'Йога', 'Анна Волкова', 'Зал 2', 0),
  ('Функциональный тренинг', '2026-10-15', '17:30', 'Силовая', 'Игорь Лебедев', 'Зал 1', 4),
  ('Вечерний HIIT', '2026-10-16', '20:00', 'Кардио', 'Елена Соколова', 'Зал 3', 2),
  ('Йога-баланс', '2026-10-17', '11:00', 'Йога', 'Мария Белова', 'Зал 2', 6),
  ('Сила и выносливость', '2026-10-18', '16:00', 'Силовая', 'Максим Орлов', 'Зал 1', 1);

alter table public.trainings enable row level security;
alter table public.bookings enable row level security;

create policy "trainings_select_public"
on public.trainings
for select
to anon, authenticated
using (true);

create policy "bookings_select_own"
on public.bookings
for select
to authenticated
using (auth.uid() = user_id);

create policy "bookings_insert_own"
on public.bookings
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "bookings_delete_own"
on public.bookings
for delete
to authenticated
using (auth.uid() = user_id);

grant select on public.trainings to anon, authenticated;
grant select, insert, delete on public.bookings to authenticated;
grant usage, select on sequence public.bookings_id_seq to authenticated;

commit;
