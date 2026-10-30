import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { getSupabaseClient } from '@/lib/supabase';
import {
  INITIAL_OPERATIONS_STATE,
  OperationsState,
  QuoteRequest,
  GuardAssignment,
  OccurrenceRecord,
  CitHandover,
  CctvSurvey,
  advanceContractStage,
} from '@/lib/security-ops';

const STORE_PATH = path.join('/tmp', 'hw-security-guard-ops-store.json');

function readLocalStore(): OperationsState {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw) as OperationsState;
    }
  } catch {
    // Fallback to initial state
  }
  return structuredClone(INITIAL_OPERATIONS_STATE);
}

function writeLocalStore(state: OperationsState): void {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch {
    // Ignore write errors in read-only environments
  }
}

export async function GET() {
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const [quotesRes, guardsRes, occRes, citRes, cctvRes] = await Promise.all([
        supabase.from('quote_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('guard_assignments').select('*').order('created_at', { ascending: false }),
        supabase.from('occurrence_records').select('*').order('created_at', { ascending: false }),
        supabase.from('cit_handovers').select('*').order('created_at', { ascending: false }),
        supabase.from('cctv_surveys').select('*').order('created_at', { ascending: false }),
      ]);

      if (
        !quotesRes.error &&
        !guardsRes.error &&
        !occRes.error &&
        !citRes.error &&
        !cctvRes.error
      ) {
        const hasData =
          (quotesRes.data?.length ?? 0) > 0 || (guardsRes.data?.length ?? 0) > 0;
        if (hasData) {
          return NextResponse.json({
            quotes: quotesRes.data ?? [],
            guards: guardsRes.data ?? [],
            occurrences: occRes.data ?? [],
            citHandovers: citRes.data ?? [],
            cctvSurveys: cctvRes.data ?? [],
          });
        }
      }
    } catch {
      // Fallback transparently to local store
    }
  }

  const state = readLocalStore();
  return NextResponse.json(state);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const state = readLocalStore();
    const supabase = getSupabaseClient();

    if (action === 'create_quote') {
      const newQuote: QuoteRequest = {
        id: `QR-2026-${String(state.quotes.length + 1).padStart(2, '0')}`,
        client_name: payload.client_name,
        phone: payload.phone,
        service_needed: payload.service_needed,
        site_details: payload.site_details || 'Site assessment requested.',
        channel: payload.channel || 'WhatsApp',
        stage: 'Assess',
        assigned_guards: Number(payload.assigned_guards) || 2,
        shift_pattern: payload.shift_pattern || '12-hour rotating (06:00 / 18:00)',
        estimated_monthly_ghs: Number(payload.estimated_monthly_ghs) || 7200,
        created_at: new Date().toISOString(),
      };

      state.quotes = [newQuote, ...state.quotes];
      writeLocalStore(state);

      if (supabase) {
        await supabase.from('quote_requests').insert([newQuote]);
      }

      return NextResponse.json(state);
    }

    if (action === 'advance_quote_stage') {
      const { id } = payload;
      state.quotes = state.quotes.map((q) => {
        if (q.id !== id) return q;
        const nextStage = advanceContractStage(q.stage);
        return { ...q, stage: nextStage };
      });
      writeLocalStore(state);

      if (supabase) {
        const updated = state.quotes.find((q) => q.id === id);
        if (updated) {
          await supabase
            .from('quote_requests')
            .update({ stage: updated.stage })
            .eq('id', id);
        }
      }

      return NextResponse.json(state);
    }

    if (action === 'create_guard') {
      const nextNum = 120 + state.guards.length;
      const newGuard: GuardAssignment = {
        id: `HW-G${nextNum}`,
        guard_code: `HW-${nextNum}`,
        full_name: payload.full_name,
        role: payload.role || 'Uniformed Guard',
        service_type: payload.service_type || 'Manned Guarding',
        site_name: payload.site_name,
        location_area: payload.location_area || 'North Industrial Area, Accra',
        shift_pattern: payload.shift_pattern || 'Day Shift (06:00–18:00)',
        briefed: Boolean(payload.briefed ?? true),
        supervisor_checked: Boolean(payload.supervisor_checked ?? false),
        supervisor_name: payload.supervisor_name || 'Sup. Kofi Boateng',
        last_checkin: 'Just deployed',
      };

      state.guards = [newGuard, ...state.guards];
      writeLocalStore(state);

      if (supabase) {
        await supabase.from('guard_assignments').insert([newGuard]);
      }

      return NextResponse.json(state);
    }

    if (action === 'toggle_guard_check') {
      const { id, field } = payload as {
        id: string;
        field: 'briefed' | 'supervisor_checked';
      };
      const nowLabel = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' GMT';

      state.guards = state.guards.map((g) => {
        if (g.id !== id) return g;
        const nextVal = !g[field];
        return {
          ...g,
          [field]: nextVal,
          last_checkin:
            field === 'supervisor_checked' && nextVal ? nowLabel : g.last_checkin,
        };
      });
      writeLocalStore(state);

      if (supabase) {
        const updated = state.guards.find((g) => g.id === id);
        if (updated) {
          await supabase
            .from('guard_assignments')
            .update({
              briefed: updated.briefed,
              supervisor_checked: updated.supervisor_checked,
              last_checkin: updated.last_checkin,
            })
            .eq('id', id);
        }
      }

      return NextResponse.json(state);
    }

    if (action === 'create_occurrence') {
      const newOccurrence: OccurrenceRecord = {
        id: `DOR-${882 + state.occurrences.length}`,
        record_type: payload.record_type || 'Daily Occurrence',
        site_name: payload.site_name,
        service_type: payload.service_type || 'Manned Guarding',
        summary: payload.summary,
        reported_by: payload.reported_by,
        action_taken: payload.action_taken || 'Logged and reviewed by shift supervisor.',
        client_notified: Boolean(payload.client_notified ?? true),
        occurred_at:
          new Date().toISOString().slice(0, 16).replace('T', ' ') + ' GMT',
      };

      state.occurrences = [newOccurrence, ...state.occurrences];
      writeLocalStore(state);

      if (supabase) {
        await supabase.from('occurrence_records').insert([newOccurrence]);
      }

      return NextResponse.json(state);
    }

    if (action === 'create_cit_handover') {
      const newCit: CitHandover = {
        id: `CIT-${403 + state.citHandovers.length}`,
        route_code: payload.route_code || `ACC-CIT-0${state.citHandovers.length + 3}`,
        client_name: payload.client_name,
        pickup_point: payload.pickup_point,
        delivery_point: payload.delivery_point,
        escort_lead: payload.escort_lead || 'Yaw Asante (HW-109)',
        checklist_completed: true,
        handover_signed_by: payload.handover_signed_by,
        seal_number:
          payload.seal_number || `HW-SEAL-${99420 + state.citHandovers.length}`,
        status: payload.status || 'Signed & Completed',
        logged_at:
          new Date().toISOString().slice(0, 16).replace('T', ' ') + ' GMT',
      };

      state.citHandovers = [newCit, ...state.citHandovers];
      writeLocalStore(state);

      if (supabase) {
        await supabase.from('cit_handovers').insert([newCit]);
      }

      return NextResponse.json(state);
    }

    if (action === 'update_cit_status') {
      const { id, status } = payload;
      state.citHandovers = state.citHandovers.map((c) =>
        c.id === id ? { ...c, status, checklist_completed: true } : c
      );
      writeLocalStore(state);

      if (supabase) {
        await supabase
          .from('cit_handovers')
          .update({ status, checklist_completed: true })
          .eq('id', id);
      }

      return NextResponse.json(state);
    }

    if (action === 'create_cctv_survey') {
      const newSurvey: CctvSurvey = {
        id: `CCTV-${303 + state.cctvSurveys.length}`,
        client_name: payload.client_name,
        site_location: payload.site_location,
        camera_count: Number(payload.camera_count) || 4,
        recording_status: payload.recording_status || 'Survey Completed',
        next_maintenance_date: payload.next_maintenance_date || '2026-12-01',
        lead_technician: payload.lead_technician || 'Isaac Osei (HW-112)',
        notes: payload.notes || 'Site camera survey and NVR check completed.',
      };

      state.cctvSurveys = [newSurvey, ...state.cctvSurveys];
      writeLocalStore(state);

      if (supabase) {
        await supabase.from('cctv_surveys').insert([newSurvey]);
      }

      return NextResponse.json(state);
    }

    return NextResponse.json(state);
  } catch {
    return NextResponse.json(
      { error: 'Unable to process security operations action.' },
      { status: 400 }
    );
  }
}
