-- HW SECURITY GUARD LTD (Registration No: CS196120926)
-- Supabase PostgreSQL Schema for Security Operations Management System

create extension if not exists "pgcrypto";

-- 1. Quote Requests & 4-Step Contract Pipeline (Assess -> Plan -> Deploy -> Report)
create table if not exists public.quote_requests (
  id text primary key default ('QR-' || floor(extract(epoch from now()))::text),
  client_name text not null,
  phone text not null,
  service_needed text not null,
  site_details text not null default '',
  channel text not null default 'WhatsApp',
  stage text not null default 'Assess' check (stage in ('Assess', 'Plan', 'Deploy', 'Report')),
  assigned_guards integer not null default 2,
  shift_pattern text not null default '12-hour rotating (06:00 / 18:00)',
  estimated_monthly_ghs numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Uniformed Guards, Briefing Status & Shift Supervision
create table if not exists public.guard_assignments (
  id text primary key default ('HW-G' || floor(random() * 9000 + 1000)::text),
  guard_code text not null,
  full_name text not null,
  role text not null default 'Uniformed Guard',
  service_type text not null,
  site_name text not null,
  location_area text not null default 'North Industrial Area, Accra',
  shift_pattern text not null default 'Day Shift (06:00–18:00)',
  briefed boolean not null default true,
  supervisor_checked boolean not null default false,
  supervisor_name text not null default 'Duty Supervisor',
  last_checkin text not null default 'Just logged',
  created_at timestamptz not null default now()
);

-- 3. Daily Occurrence Records, Prompt Incident Reports & Regular Reviews
create table if not exists public.occurrence_records (
  id text primary key default ('DOR-' || floor(random() * 9000 + 1000)::text),
  record_type text not null check (record_type in ('Daily Occurrence', 'Incident Report', 'Regular Review')),
  site_name text not null,
  service_type text not null,
  summary text not null,
  reported_by text not null,
  action_taken text not null,
  client_notified boolean not null default true,
  occurred_at text not null,
  created_at timestamptz not null default now()
);

-- 4. Cash-in-Transit (CIT) Checklists & Signed Handovers
create table if not exists public.cit_handovers (
  id text primary key default ('CIT-' || floor(random() * 9000 + 1000)::text),
  route_code text not null,
  client_name text not null,
  pickup_point text not null,
  delivery_point text not null,
  escort_lead text not null,
  checklist_completed boolean not null default true,
  handover_signed_by text not null,
  seal_number text not null,
  status text not null default 'Scheduled' check (status in ('Scheduled', 'In Transit', 'Signed & Completed')),
  logged_at text not null,
  created_at timestamptz not null default now()
);

-- 5. CCTV Site Surveys, Installations & Maintenance
create table if not exists public.cctv_surveys (
  id text primary key default ('CCTV-' || floor(random() * 9000 + 1000)::text),
  client_name text not null,
  site_location text not null,
  camera_count integer not null default 4,
  recording_status text not null default 'Survey Completed',
  next_maintenance_date text not null,
  lead_technician text not null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;
alter table public.guard_assignments enable row level security;
alter table public.occurrence_records enable row level security;
alter table public.cit_handovers enable row level security;
alter table public.cctv_surveys enable row level security;

create policy "Allow public quote submissions and ops read/write" on public.quote_requests for all using (true) with check (true);
create policy "Allow ops access to guard_assignments" on public.guard_assignments for all using (true) with check (true);
create policy "Allow ops access to occurrence_records" on public.occurrence_records for all using (true) with check (true);
create policy "Allow ops access to cit_handovers" on public.cit_handovers for all using (true) with check (true);
create policy "Allow ops access to cctv_surveys" on public.cctv_surveys for all using (true) with check (true);

-- 6. Admin-Managed Business Services
create table if not exists public.site_services (
  id text primary key,
  title text not null,
  description text not null,
  "iconId" text not null default 'manned-guarding',
  created_at timestamptz not null default now()
);

-- 7. Admin-Managed Gallery Photos
create table if not exists public.site_gallery (
  id text primary key,
  title text not null,
  caption text not null,
  "imageUrl" text not null,
  "imageAlt" text not null,
  created_at timestamptz not null default now()
);

alter table public.site_services enable row level security;
alter table public.site_gallery enable row level security;

create policy "Allow public read and admin write to site_services" on public.site_services for all using (true) with check (true);
create policy "Allow public read and admin write to site_gallery" on public.site_gallery for all using (true) with check (true);
