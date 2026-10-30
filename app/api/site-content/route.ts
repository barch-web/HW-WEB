import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { getSupabaseClient } from '@/lib/supabase';
import {
  INITIAL_SITE_CONTENT,
  SiteContentState,
  ServiceItem,
  GalleryItem,
} from '@/lib/security-ops';

const CONTENT_STORE_PATH = path.join('/tmp', 'hw-security-site-content.json');

function readSiteContent(): SiteContentState {
  try {
    if (fs.existsSync(CONTENT_STORE_PATH)) {
      const raw = fs.readFileSync(CONTENT_STORE_PATH, 'utf-8');
      const parsed = JSON.parse(raw) as SiteContentState;
      if (Array.isArray(parsed.services) && Array.isArray(parsed.gallery)) {
        return parsed;
      }
    }
  } catch {
    // Fallback to initial content
  }
  return structuredClone(INITIAL_SITE_CONTENT);
}

function writeSiteContent(state: SiteContentState): void {
  try {
    fs.writeFileSync(CONTENT_STORE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch {
    // Ignore write errors in read-only filesystems
  }
}

export async function GET() {
  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      const [servicesRes, galleryRes] = await Promise.all([
        supabase.from('site_services').select('*').order('created_at', { ascending: true }),
        supabase.from('site_gallery').select('*').order('created_at', { ascending: true }),
      ]);
      if (
        !servicesRes.error &&
        !galleryRes.error &&
        ((servicesRes.data?.length ?? 0) > 0 || (galleryRes.data?.length ?? 0) > 0)
      ) {
        return NextResponse.json({
          services: servicesRes.data ?? INITIAL_SITE_CONTENT.services,
          gallery: galleryRes.data ?? INITIAL_SITE_CONTENT.gallery,
        });
      }
    } catch {
      // Fallback transparently to local store
    }
  }

  return NextResponse.json(readSiteContent());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;
    const state = readSiteContent();
    const supabase = getSupabaseClient();

    if (action === 'save_service') {
      const item: ServiceItem = {
        id:
          payload.id ||
          `service-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: String(payload.title || '').trim(),
        description: String(payload.description || '').trim(),
        iconId: payload.iconId || 'manned-guarding',
      };

      const existingIdx = state.services.findIndex((s) => s.id === item.id);
      if (existingIdx >= 0) {
        state.services[existingIdx] = item;
      } else {
        state.services.push(item);
      }

      writeSiteContent(state);

      if (supabase) {
        await supabase.from('site_services').upsert([item], { onConflict: 'id' });
      }

      return NextResponse.json(state);
    }

    if (action === 'delete_service') {
      const { id } = payload;
      state.services = state.services.filter((s) => s.id !== id);
      writeSiteContent(state);

      if (supabase) {
        await supabase.from('site_services').delete().eq('id', id);
      }

      return NextResponse.json(state);
    }

    if (action === 'save_gallery_item') {
      const item: GalleryItem = {
        id:
          payload.id ||
          `gallery-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: String(payload.title || '').trim(),
        caption: String(payload.caption || '').trim(),
        imageUrl: String(payload.imageUrl || '').trim(),
        imageAlt:
          String(payload.imageAlt || payload.title || 'Security in practice photo').trim(),
      };

      const existingIdx = state.gallery.findIndex((g) => g.id === item.id);
      if (existingIdx >= 0) {
        state.gallery[existingIdx] = item;
      } else {
        state.gallery.push(item);
      }

      writeSiteContent(state);

      if (supabase) {
        await supabase.from('site_gallery').upsert([item], { onConflict: 'id' });
      }

      return NextResponse.json(state);
    }

    if (action === 'delete_gallery_item') {
      const { id } = payload;
      state.gallery = state.gallery.filter((g) => g.id !== id);
      writeSiteContent(state);

      if (supabase) {
        await supabase.from('site_gallery').delete().eq('id', id);
      }

      return NextResponse.json(state);
    }

    if (action === 'reset_defaults') {
      const fresh = structuredClone(INITIAL_SITE_CONTENT);
      writeSiteContent(fresh);
      return NextResponse.json(fresh);
    }

    return NextResponse.json(state);
  } catch {
    return NextResponse.json(
      { error: 'Unable to update site content.' },
      { status: 400 }
    );
  }
}
