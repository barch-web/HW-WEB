export type ServiceName =
  | 'Manned Guarding'
  | 'Industrial Security'
  | 'Cash-in-Transit'
  | 'CCTV Installations and Surveillance'
  | 'Event Security'
  | 'Storage and Asset Security'
  | 'More than one service';

export type ContractStage = 'Assess' | 'Plan' | 'Deploy' | 'Report';

export interface QuoteFormInput {
  name: string;
  phone: string;
  service: string;
  details: string;
}

export interface QuoteValidationResult {
  valid: boolean;
  error: string | null;
}

export interface QuoteRequest {
  id: string;
  client_name: string;
  phone: string;
  service_needed: ServiceName;
  site_details: string;
  channel: 'WhatsApp' | 'Email' | 'Direct Portal';
  stage: ContractStage;
  assigned_guards: number;
  shift_pattern: string;
  estimated_monthly_ghs: number;
  created_at: string;
}

export interface GuardAssignment {
  id: string;
  guard_code: string;
  full_name: string;
  role: 'Uniformed Guard' | 'Shift Supervisor' | 'CIT Escort Lead' | 'CCTV Technician';
  service_type: Exclude<ServiceName, 'More than one service'>;
  site_name: string;
  location_area: string;
  shift_pattern: 'Day Shift (06:00–18:00)' | 'Night Shift (18:00–06:00)';
  briefed: boolean;
  supervisor_checked: boolean;
  supervisor_name: string;
  last_checkin: string;
}

export interface OccurrenceRecord {
  id: string;
  record_type: 'Daily Occurrence' | 'Incident Report' | 'Regular Review';
  site_name: string;
  service_type: Exclude<ServiceName, 'More than one service'>;
  summary: string;
  reported_by: string;
  action_taken: string;
  client_notified: boolean;
  occurred_at: string;
}

export interface CitHandover {
  id: string;
  route_code: string;
  client_name: string;
  pickup_point: string;
  delivery_point: string;
  escort_lead: string;
  checklist_completed: boolean;
  handover_signed_by: string;
  seal_number: string;
  status: 'Scheduled' | 'In Transit' | 'Signed & Completed';
  logged_at: string;
}

export interface CctvSurvey {
  id: string;
  client_name: string;
  site_location: string;
  camera_count: number;
  recording_status: 'Survey Completed' | 'Installed & Active' | 'Maintenance Due';
  next_maintenance_date: string;
  lead_technician: string;
  notes: string;
}

export interface OperationsState {
  quotes: QuoteRequest[];
  guards: GuardAssignment[];
  occurrences: OccurrenceRecord[];
  citHandovers: CitHandover[];
  cctvSurveys: CctvSurvey[];
}

export const COMPANY_DETAILS = {
  registeredName: 'HW SECURITY GUARD LTD',
  tagline: 'Security with purpose',
  registrationNumber: 'CS196120926',
  registeredUnder: 'Companies Act, 2019 (Act 992)',
  sector: 'Private security activities',
  phoneDisplay: '027 342 6450',
  phoneHref: 'tel:+233273426450',
  whatsappNumber: '233273426450',
  email: 'williamsprinceeric@gmail.com',
  officeAddress:
    'House No. C180/11, Nuumo Yaotse Street, North Industrial Area, Accra (Digital address: GA-099-2945)',
  postalAddress: 'P. O. Box 7869, Newtown, Accra',
} as const;

export type ServiceIconId =
  | 'manned-guarding'
  | 'industrial-security'
  | 'cash-in-transit'
  | 'cctv-surveillance'
  | 'event-security'
  | 'storage-asset-security';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconId?: ServiceIconId;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SiteContentState {
  services: ServiceItem[];
  gallery: GalleryItem[];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'manned-guarding',
    title: 'Manned Guarding',
    description:
      'Uniformed guards for offices, shops, estates and private homes, scheduled around your hours and supervised on every shift.',
    iconId: 'manned-guarding',
  },
  {
    id: 'industrial-security',
    title: 'Industrial Security',
    description:
      'Access control, perimeter patrols and gate management for factories, yards and construction sites.',
    iconId: 'industrial-security',
  },
  {
    id: 'cash-in-transit',
    title: 'Cash-in-Transit',
    description:
      'Escorted collection and delivery of cash and valuables, with checklists and signed handovers at every stop.',
    iconId: 'cash-in-transit',
  },
  {
    id: 'cctv-surveillance',
    title: 'CCTV Installations and Surveillance',
    description:
      'Site surveys, camera installation and maintenance, so you can see what is happening at your premises.',
    iconId: 'cctv-surveillance',
  },
  {
    id: 'event-security',
    title: 'Event Security',
    description:
      'Crowd control, entry screening and guest protection for conferences, concerts, weddings and funerals.',
    iconId: 'event-security',
  },
  {
    id: 'storage-asset-security',
    title: 'Storage and Asset Security',
    description:
      'Guarding and access control for warehouses, stockrooms, containers and vehicles.',
    iconId: 'storage-asset-security',
  },
];

export const PROCESS_STEPS: Array<{
  number: string;
  stage: ContractStage;
  title: string;
  description: string;
}> = [
  {
    number: '01',
    stage: 'Assess',
    title: 'Assess',
    description:
      'We walk your premises, find the risks and agree what needs protecting.',
  },
  {
    number: '02',
    stage: 'Plan',
    title: 'Plan',
    description:
      'You receive a written plan with guard numbers, shift patterns and costs.',
  },
  {
    number: '03',
    stage: 'Deploy',
    title: 'Deploy',
    description:
      'Briefed guards start on site, and supervisors check in on every shift.',
  },
  {
    number: '04',
    stage: 'Report',
    title: 'Report',
    description:
      'You get daily occurrence records, prompt incident reports and regular reviews.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'manned-guarding',
    title: 'Manned Guarding',
    caption: 'Uniformed night guard stationed at an illuminated commercial entrance in Accra.',
    imageUrl:
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Uniformed security guard on night duty outside a commercial building entrance',
  },
  {
    id: 'industrial-security',
    title: 'Industrial Security',
    caption: 'Factory complex with chimneys, secured perimeter fencing and high-mast floodlighting.',
    imageUrl:
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Industrial factory complex illuminated by floodlights at dusk behind perimeter fencing',
  },
  {
    id: 'cash-in-transit',
    title: 'Cash-in-Transit',
    caption: 'Armoured bullion van on an escorted transit route with checklist handover protocols.',
    imageUrl:
      'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Heavy-duty armoured cash-in-transit security van travelling on a city road',
  },
  {
    id: 'cctv-surveillance',
    title: 'CCTV and Surveillance',
    caption: 'Pole-mounted surveillance camera covering a parking yard with live recording monitor.',
    imageUrl:
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Pole-mounted outdoor CCTV security camera overlooking a commercial parking area',
  },
  {
    id: 'event-security',
    title: 'Event Security',
    caption: 'Evening stage venue with festoon string lights, gold-rope stanchions and guest screening.',
    imageUrl:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Evening corporate event stage with warm lighting, stanchion barriers and crowd control',
  },
  {
    id: 'storage-asset',
    title: 'Storage and Asset Security',
    caption: 'Warehouse roller bay, shipping containers and heavy-duty gold padlock access control.',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    imageAlt:
      'Logistics storage warehouse with roller doors and stacked shipping containers',
  },
];

export const INITIAL_SITE_CONTENT: SiteContentState = {
  services: SERVICES_LIST,
  gallery: GALLERY_ITEMS,
};

export function validateServiceItem(input: {
  title: string;
  description: string;
}): QuoteValidationResult {
  if (!input.title.trim() || !input.description.trim()) {
    return {
      valid: false,
      error: 'Enter both a service title and a description.',
    };
  }
  return { valid: true, error: null };
}

export function validateGalleryItem(input: {
  title: string;
  caption: string;
  imageUrl: string;
}): QuoteValidationResult {
  if (!input.title.trim() || !input.caption.trim() || !input.imageUrl.trim()) {
    return {
      valid: false,
      error: 'Enter a photo title, caption, and a valid image URL or uploaded photo.',
    };
  }
  return { valid: true, error: null };
}

export const FAQ_ITEMS: Array<{
  question: string;
  answer: string;
}> = [
  {
    question: 'What services does HW Security Guard Ltd offer?',
    answer:
      'We offer manned guarding, industrial security, cash-in-transit, CCTV installations and surveillance, event security, and storage and asset security.',
  },
  {
    question: 'How do I get a quote?',
    answer:
      'Use the quote form below, call us, or message us on WhatsApp. We assess your site first, then send a written plan with guard numbers, shift patterns and costs.',
  },
  {
    question: 'Can I combine several services?',
    answer:
      'Yes. Many sites need guards and cameras together. We plan the services as one package so there are no gaps.',
  },
  {
    question: 'How do you prepare guards for my site?',
    answer:
      'Guards are briefed on your site rules, access points and emergency contacts before their first shift. Supervisors then check in on every shift.',
  },
  {
    question: 'How will I know what happened on my site?',
    answer:
      'You receive daily occurrence records and prompt incident reports. We review them with you regularly and adjust the plan when needed.',
  },
  {
    question: 'How does cash-in-transit work?',
    answer:
      'Cash and valuables are collected and delivered under escort, with checklists and signed handovers at every stop. Routes and schedules are agreed privately with you.',
  },
  {
    question: 'Do you install and maintain CCTV?',
    answer:
      'Yes. We survey your premises, install the cameras and maintain the system afterwards.',
  },
  {
    question: 'Can you cover a one-off event?',
    answer:
      'Yes. We provide crowd control, entry screening and guest protection for conferences, concerts, weddings and funerals.',
  },
];

export const QUOTE_VALIDATION_ERROR =
  'Enter your name and phone number so we can reach you.';

export function validateQuoteForm(input: QuoteFormInput): QuoteValidationResult {
  const cleanName = input.name ? input.name.trim() : '';
  const cleanPhone = input.phone ? input.phone.trim() : '';

  if (!cleanName || !cleanPhone) {
    return {
      valid: false,
      error: QUOTE_VALIDATION_ERROR,
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export function buildQuoteMessageBody(input: QuoteFormInput): string {
  const lines = [
    'Hello HW Security Guard Ltd,',
    '',
    'I would like to request a security quote:',
    `• Name: ${input.name.trim()}`,
    `• Phone: ${input.phone.trim()}`,
    `• Service needed: ${input.service}`,
    `• Site / Event details: ${
      input.details.trim() || 'Please contact me to arrange a site assessment.'
    }`,
  ];
  return lines.join('\n');
}

export function buildWhatsAppQuoteUrl(input: QuoteFormInput): string {
  const text = buildQuoteMessageBody(input);
  return `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoQuoteUrl(input: QuoteFormInput): string {
  const subject = `Quote request: ${input.service}`;
  const body = buildQuoteMessageBody(input);
  return `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

const STAGE_ORDER: ContractStage[] = ['Assess', 'Plan', 'Deploy', 'Report'];

export function advanceContractStage(current: ContractStage): ContractStage {
  const idx = STAGE_ORDER.indexOf(current);
  if (idx === -1 || idx === STAGE_ORDER.length - 1) {
    return 'Report';
  }
  return STAGE_ORDER[idx + 1];
}

export function calculateOperationsMetrics(state: OperationsState) {
  const totalQuotes = state.quotes.length;
  const activeDeployments = state.quotes.filter(
    (q) => q.stage === 'Deploy' || q.stage === 'Report'
  ).length;
  const totalGuards = state.guards.length;
  const briefedCount = state.guards.filter((g) => g.briefed).length;
  const supervisedCount = state.guards.filter((g) => g.supervisor_checked).length;
  const briefingCompliancePct =
    totalGuards > 0 ? Math.round((briefedCount / totalGuards) * 100) : 100;
  const supervisorCheckPct =
    totalGuards > 0 ? Math.round((supervisedCount / totalGuards) * 100) : 100;
  const completedHandovers = state.citHandovers.filter(
    (c) => c.checklist_completed && c.status === 'Signed & Completed'
  ).length;
  const totalCameras = state.cctvSurveys.reduce((acc, s) => acc + s.camera_count, 0);

  return {
    totalQuotes,
    activeDeployments,
    totalGuards,
    briefedCount,
    supervisedCount,
    briefingCompliancePct,
    supervisorCheckPct,
    completedHandovers,
    totalCitRoutes: state.citHandovers.length,
    totalOccurrences: state.occurrences.length,
    totalCameras,
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export const INITIAL_OPERATIONS_STATE: OperationsState = {
  quotes: [
    {
      id: 'QR-2026-01',
      client_name: 'Nuumo Yaotse Commercial Plaza',
      phone: '024 411 8920',
      service_needed: 'More than one service',
      site_details:
        'North Industrial Area office complex requiring 4 uniformed guards (2 day, 2 night) and 8 perimeter CCTV cameras.',
      channel: 'WhatsApp',
      stage: 'Deploy',
      assigned_guards: 4,
      shift_pattern: '12-hour rotating (06:00 / 18:00)',
      estimated_monthly_ghs: 14800,
      created_at: '2026-10-24T09:15:00Z',
    },
    {
      id: 'QR-2026-02',
      client_name: 'Kaneshie Logistics & Cold Store Yard',
      phone: '027 890 3312',
      service_needed: 'Industrial Security',
      site_details:
        'Gate management, vehicle logbook control and floodlit perimeter patrol for 3-acre industrial yard.',
      channel: 'Email',
      stage: 'Plan',
      assigned_guards: 6,
      shift_pattern: '24/7 3-post coverage',
      estimated_monthly_ghs: 21600,
      created_at: '2026-10-27T14:30:00Z',
    },
    {
      id: 'QR-2026-03',
      client_name: 'Newtown Wholesale Cash Office',
      phone: '055 219 7740',
      service_needed: 'Cash-in-Transit',
      site_details:
        'Scheduled Tuesday and Friday escorted cash collection from Newtown to Ridge banking hall with signed handover checklists.',
      channel: 'WhatsApp',
      stage: 'Report',
      assigned_guards: 3,
      shift_pattern: 'Escort Window (09:30–13:00)',
      estimated_monthly_ghs: 11200,
      created_at: '2026-10-20T11:00:00Z',
    },
    {
      id: 'QR-2026-04',
      client_name: 'Abossey Okai Spare Parts Warehouse',
      phone: '020 715 4409',
      service_needed: 'Storage and Asset Security',
      site_details:
        'Roller-door warehouse and 6 shipping containers requiring night guarding and padlock seal checks.',
      channel: 'Direct Portal',
      stage: 'Assess',
      assigned_guards: 2,
      shift_pattern: 'Night Shift (18:00–06:00)',
      estimated_monthly_ghs: 7400,
      created_at: '2026-10-29T16:45:00Z',
    },
  ],
  guards: [
    {
      id: 'HW-G101',
      guard_code: 'HW-101',
      full_name: 'Kwame Mensah',
      role: 'Uniformed Guard',
      service_type: 'Manned Guarding',
      site_name: 'Nuumo Yaotse Commercial Plaza',
      location_area: 'North Industrial Area, Accra',
      shift_pattern: 'Night Shift (18:00–06:00)',
      briefed: true,
      supervisor_checked: true,
      supervisor_name: 'Sup. Kofi Boateng',
      last_checkin: '2026-10-30 01:15 GMT',
    },
    {
      id: 'HW-G102',
      guard_code: 'HW-104',
      full_name: 'Emmanuel Tetteh',
      role: 'Uniformed Guard',
      service_type: 'Industrial Security',
      site_name: 'Dadeban Road Factory Gate B',
      location_area: 'North Industrial Area, Accra',
      shift_pattern: 'Day Shift (06:00–18:00)',
      briefed: true,
      supervisor_checked: true,
      supervisor_name: 'Sup. Kofi Boateng',
      last_checkin: '2026-10-29 17:40 GMT',
    },
    {
      id: 'HW-G103',
      guard_code: 'HW-109',
      full_name: 'Yaw Asante',
      role: 'CIT Escort Lead',
      service_type: 'Cash-in-Transit',
      site_name: 'Newtown – Ridge Bullion Route',
      location_area: 'Newtown / Ridge, Accra',
      shift_pattern: 'Day Shift (06:00–18:00)',
      briefed: true,
      supervisor_checked: true,
      supervisor_name: 'Ops Dir. Prince Williams',
      last_checkin: '2026-10-29 14:20 GMT',
    },
    {
      id: 'HW-G104',
      guard_code: 'HW-112',
      full_name: 'Isaac Osei',
      role: 'CCTV Technician',
      service_type: 'CCTV Installations and Surveillance',
      site_name: 'Ring Road West Retail Yard',
      location_area: 'Industrial Area, Accra',
      shift_pattern: 'Day Shift (06:00–18:00)',
      briefed: true,
      supervisor_checked: true,
      supervisor_name: 'Sup. Samuel Quaye',
      last_checkin: '2026-10-29 16:05 GMT',
    },
    {
      id: 'HW-G105',
      guard_code: 'HW-118',
      full_name: 'bright Nii Armah',
      role: 'Uniformed Guard',
      service_type: 'Storage and Asset Security',
      site_name: 'Nuumo Yaotse Container Depot',
      location_area: 'North Industrial Area, Accra',
      shift_pattern: 'Night Shift (18:00–06:00)',
      briefed: true,
      supervisor_checked: false,
      supervisor_name: 'Sup. Samuel Quaye',
      last_checkin: 'Pending 02:30 GMT patrol',
    },
  ],
  occurrences: [
    {
      id: 'DOR-881',
      record_type: 'Daily Occurrence',
      site_name: 'Nuumo Yaotse Commercial Plaza',
      service_type: 'Manned Guarding',
      summary:
        'All 4 access gates locked at 20:00 GMT. Perimeter floodlights and backup generator fuel level verified during 00:30 patrol.',
      reported_by: 'Kwame Mensah (HW-101)',
      action_taken: 'Logged in site occurrence book and verified by shift supervisor.',
      client_notified: true,
      occurred_at: '2026-10-30 00:45 GMT',
    },
    {
      id: 'INC-204',
      record_type: 'Incident Report',
      site_name: 'Dadeban Road Factory Gate B',
      service_type: 'Industrial Security',
      summary:
        'Unscheduled delivery truck attempted entry after 19:00 cutoff without signed waybill.',
      reported_by: 'Emmanuel Tetteh (HW-104)',
      action_taken:
        'Entry held at outer barrier; contacted site warehouse manager who confirmed deferral to 07:00 morning shift.',
      client_notified: true,
      occurred_at: '2026-10-29 19:18 GMT',
    },
    {
      id: 'REV-109',
      record_type: 'Regular Review',
      site_name: 'Newtown Wholesale Cash Office',
      service_type: 'Cash-in-Transit',
      summary:
        'Monthly route timing and handover checklist audit completed with client finance officer.',
      reported_by: 'Sup. Kofi Boateng',
      action_taken: 'Updated secondary departure window for Friday collections.',
      client_notified: true,
      occurred_at: '2026-10-28 15:00 GMT',
    },
  ],
  citHandovers: [
    {
      id: 'CIT-401',
      route_code: 'ACC-NIA-01',
      client_name: 'Newtown Wholesale Cash Office',
      pickup_point: 'Newtown Branch Vault (GA-099-2945 Corridor)',
      delivery_point: 'Ridge Commercial Banking Hall',
      escort_lead: 'Yaw Asante (HW-109)',
      checklist_completed: true,
      handover_signed_by: 'M. Owusu (Vault Custodian)',
      seal_number: 'HW-SEAL-99412',
      status: 'Signed & Completed',
      logged_at: '2026-10-29 11:42 GMT',
    },
    {
      id: 'CIT-402',
      route_code: 'ACC-IND-04',
      client_name: 'North Industrial Area Hardware Depot',
      pickup_point: 'Nuumo Yaotse Cash Office',
      delivery_point: 'High Street Treasury Centre',
      escort_lead: 'Yaw Asante (HW-109)',
      checklist_completed: true,
      handover_signed_by: 'A. Quartey (Chief Cashier)',
      seal_number: 'HW-SEAL-99418',
      status: 'In Transit',
      logged_at: '2026-10-30 08:30 GMT',
    },
  ],
  cctvSurveys: [
    {
      id: 'CCTV-301',
      client_name: 'Nuumo Yaotse Commercial Plaza',
      site_location: 'North Industrial Area, Accra',
      camera_count: 12,
      recording_status: 'Installed & Active',
      next_maintenance_date: '2026-11-15',
      lead_technician: 'Isaac Osei (HW-112)',
      notes: 'NVR recording 30-day retention; parking pole cameras tested for night IR clarity.',
    },
    {
      id: 'CCTV-302',
      client_name: 'Abossey Okai Spare Parts Warehouse',
      site_location: 'Abossey Okai / Industrial Area',
      camera_count: 8,
      recording_status: 'Survey Completed',
      next_maintenance_date: '2026-11-05',
      lead_technician: 'Isaac Osei (HW-112)',
      notes: 'Site survey completed covering roller doors, container yard and loading bay.',
    },
  ],
};

export const SUPABASE_SCHEMA_SQL = `-- HW SECURITY GUARD LTD (Registration No: CS196120926)
-- Supabase PostgreSQL Schema for Security Operations Management System
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)

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

-- Enable Row Level Security (RLS) with policies for authenticated & anon app operations
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
`;
