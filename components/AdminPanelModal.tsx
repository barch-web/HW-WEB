'use client';

import React, { useState } from 'react';
import {
  ServiceItem,
  GalleryItem,
  ServiceIconId,
  SiteContentState,
  validateServiceItem,
  validateGalleryItem,
} from '@/lib/security-ops';
import { ServiceLineIcon } from './GalleryIllustrations';
import { HwShieldMark } from './HwBrandSvg';

interface AdminPanelModalProps {
  siteContent: SiteContentState;
  onUpdateContent: (
    action: string,
    payload: Record<string, unknown>
  ) => Promise<void>;
  onClose: () => void;
  isSaving: boolean;
}

const ICON_OPTIONS: Array<{ value: ServiceIconId; label: string }> = [
  { value: 'manned-guarding', label: 'Shield / Manned Guarding' },
  { value: 'industrial-security', label: 'Factory / Industrial Security' },
  { value: 'cash-in-transit', label: 'Armoured Van / Cash-in-Transit' },
  { value: 'cctv-surveillance', label: 'Camera / CCTV Surveillance' },
  { value: 'event-security', label: 'Crowd / Event Security' },
  { value: 'storage-asset-security', label: 'Padlock / Storage & Asset Security' },
];

export function AdminPanelModal({
  siteContent,
  onUpdateContent,
  onClose,
  isSaving,
}: AdminPanelModalProps) {
  const [activeTab, setActiveTab] = useState<'services' | 'gallery'>('services');
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  // Service Form State (Create or Edit)
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceIcon, setServiceIcon] = useState<ServiceIconId>('manned-guarding');
  const [serviceError, setServiceError] = useState<string | null>(null);

  // Gallery Form State (Create or Edit)
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');
  const [galleryImageAlt, setGalleryImageAlt] = useState('');
  const [galleryError, setGalleryError] = useState<string | null>(null);

  const startEditService = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceTitle(service.title);
    setServiceDesc(service.description);
    setServiceIcon(service.iconId || (service.id as ServiceIconId) || 'manned-guarding');
    setServiceError(null);
    setStatusBanner(null);
  };

  const resetServiceForm = () => {
    setEditingServiceId(null);
    setServiceTitle('');
    setServiceDesc('');
    setServiceIcon('manned-guarding');
    setServiceError(null);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateServiceItem({
      title: serviceTitle,
      description: serviceDesc,
    });
    if (!check.valid) {
      setServiceError(check.error);
      return;
    }
    setServiceError(null);
    const isEdit = Boolean(editingServiceId);
    await onUpdateContent('save_service', {
      id: editingServiceId || undefined,
      title: serviceTitle.trim(),
      description: serviceDesc.trim(),
      iconId: serviceIcon,
    });
    setStatusBanner(
      isEdit
        ? `Updated service "${serviceTitle.trim()}".`
        : `Added new service "${serviceTitle.trim()}".`
    );
    resetServiceForm();
  };

  const handleDeleteService = async (service: ServiceItem) => {
    await onUpdateContent('delete_service', { id: service.id });
    if (editingServiceId === service.id) {
      resetServiceForm();
    }
    setStatusBanner(`Removed service "${service.title}".`);
  };

  const startEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryTitle(item.title);
    setGalleryCaption(item.caption);
    setGalleryImageUrl(item.imageUrl);
    setGalleryImageAlt(item.imageAlt);
    setGalleryError(null);
    setStatusBanner(null);
  };

  const resetGalleryForm = () => {
    setEditingGalleryId(null);
    setGalleryTitle('');
    setGalleryCaption('');
    setGalleryImageUrl('');
    setGalleryImageAlt('');
    setGalleryError(null);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setGalleryImageUrl(reader.result);
        setGalleryError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateGalleryItem({
      title: galleryTitle,
      caption: galleryCaption,
      imageUrl: galleryImageUrl,
    });
    if (!check.valid) {
      setGalleryError(check.error);
      return;
    }
    setGalleryError(null);
    const isEdit = Boolean(editingGalleryId);
    await onUpdateContent('save_gallery_item', {
      id: editingGalleryId || undefined,
      title: galleryTitle.trim(),
      caption: galleryCaption.trim(),
      imageUrl: galleryImageUrl.trim(),
      imageAlt: galleryImageAlt.trim() || galleryTitle.trim(),
    });
    setStatusBanner(
      isEdit
        ? `Updated gallery photo "${galleryTitle.trim()}".`
        : `Added new gallery photo "${galleryTitle.trim()}".`
    );
    resetGalleryForm();
  };

  const handleDeleteGallery = async (item: GalleryItem) => {
    await onUpdateContent('delete_gallery_item', { id: item.id });
    if (editingGalleryId === item.id) {
      resetGalleryForm();
    }
    setStatusBanner(`Removed gallery photo "${item.title}".`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="HW Security Guard Ltd Admin Panel"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-3 pt-6 sm:p-6"
    >
      <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] text-[#0B192C] shadow-2xl">
        {/* Admin Panel Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 bg-[#0B192C] px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <HwShieldMark className="h-10 w-8 shrink-0" />
            <div>
              <h2 className="font-heading text-lg font-extrabold text-white sm:text-xl">
                Admin Panel · Content &amp; Services Manager
              </h2>
              <p className="text-xs text-amber-300">
                Update the security services the business is engaged in and manage Gallery photos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              disabled={isSaving}
              onClick={async () => {
                await onUpdateContent('reset_defaults', {});
                resetServiceForm();
                resetGalleryForm();
                setStatusBanner('Restored default services and gallery photos.');
              }}
              className="min-h-[42px] rounded-lg border border-white/25 bg-[#132842] px-3.5 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[42px] rounded-lg bg-[#F5B722] px-4 py-2 text-xs font-bold text-[#0B192C] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Done &amp; View Website
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          {/* Sub-navigation Tabs */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Admin Management Sections"
              className="inline-flex rounded-xl border border-slate-200 bg-slate-200/75 p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'services'}
                onClick={() => {
                  setActiveTab('services');
                  setStatusBanner(null);
                }}
                className={`min-h-[42px] rounded-lg px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-[#0B192C] text-white'
                    : 'text-slate-700 hover:text-[#0B192C]'
                }`}
              >
                Manage Services ({siteContent.services.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'gallery'}
                onClick={() => {
                  setActiveTab('gallery');
                  setStatusBanner(null);
                }}
                className={`min-h-[42px] rounded-lg px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#0B192C] text-white'
                    : 'text-slate-700 hover:text-[#0B192C]'
                }`}
              >
                Manage Gallery Photos ({siteContent.gallery.length})
              </button>
            </div>

            {statusBanner && (
              <div
                role="status"
                className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-900"
              >
                ✓ {statusBanner}
              </div>
            )}
          </div>

          {/* TAB 1: MANAGE BUSINESS SERVICES */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Existing Services List */}
              <div className="lg:col-span-7 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-heading text-base font-bold text-[#0B192C]">
                    Active Security Services ({siteContent.services.length})
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Click &ldquo;Edit&rdquo; on any service to update its title, description or icon, or add a new service on the right.
                  </p>

                  <div className="mt-4 divide-y divide-slate-200">
                    {siteContent.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-start"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-[#FEF3C7] text-[#0B192C]">
                            <ServiceLineIcon
                              serviceId={service.iconId || service.id}
                            />
                          </div>
                          <div>
                            <h4 className="font-heading text-base font-bold text-[#0B192C]">
                              {service.title}
                            </h4>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => startEditService(service)}
                            className="min-h-[38px] rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-[#0B192C] hover:bg-amber-50 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Edit Service
                          </button>
                          <button
                            type="button"
                            disabled={siteContent.services.length <= 1 || isSaving}
                            onClick={() => handleDeleteService(service)}
                            aria-label={`Delete service ${service.title}`}
                            className="min-h-[38px] rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add / Edit Service Form */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-lg font-bold text-[#0B192C]">
                      {editingServiceId ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={resetServiceForm}
                        className="text-xs font-bold text-slate-500 underline hover:text-[#0B192C] cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Changes immediately update the Services grid and the Contact quote request dropdown.
                  </p>

                  {serviceError && (
                    <div
                      role="alert"
                      className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-800"
                    >
                      {serviceError}
                    </div>
                  )}

                  <form
                    onSubmit={handleSaveService}
                    className="mt-4 space-y-4"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="admin-service-title"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Service Title
                      </label>
                      <input
                        id="admin-service-title"
                        type="text"
                        value={serviceTitle}
                        onChange={(e) => setServiceTitle(e.target.value)}
                        placeholder="e.g. VIP & Executive Protection"
                        className="mt-1 w-full min-h-[44px] rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#0B192C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-service-icon"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Service Icon
                      </label>
                      <select
                        id="admin-service-icon"
                        value={serviceIcon}
                        onChange={(e) =>
                          setServiceIcon(e.target.value as ServiceIconId)
                        }
                        className="mt-1 w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B192C]"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="admin-service-desc"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Service Description
                      </label>
                      <textarea
                        id="admin-service-desc"
                        rows={4}
                        value={serviceDesc}
                        onChange={(e) => setServiceDesc(e.target.value)}
                        placeholder="Describe how HW Security Guard Ltd delivers this service..."
                        className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm text-[#0B192C]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full min-h-[48px] rounded-lg bg-[#0B192C] px-4 py-2.5 text-sm font-bold text-[#F5B722] transition-colors hover:bg-slate-800 cursor-pointer"
                    >
                      {editingServiceId ? 'Save Service Changes' : 'Add Service'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE GALLERY PHOTOS */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Existing Gallery Photos */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h3 className="font-heading text-base font-bold text-[#0B192C]">
                    Current Gallery Photos ({siteContent.gallery.length})
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Click &ldquo;Edit Photo&rdquo; to replace an image URL, upload a new photo file, or update its title and caption.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {siteContent.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white"
                      >
                        <div>
                          <div className="aspect-[16/10] w-full overflow-hidden bg-[#0B192C]">
                            <img
                              src={item.imageUrl}
                              alt={item.imageAlt}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-3.5">
                            <h4 className="font-heading text-sm font-bold text-[#0B192C]">
                              {item.title}
                            </h4>
                            <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                              {item.caption}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-3.5 py-2.5">
                          <button
                            type="button"
                            onClick={() => startEditGallery(item)}
                            className="min-h-[36px] flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-[#0B192C] hover:bg-amber-50 cursor-pointer"
                          >
                            Edit Photo
                          </button>
                          <button
                            type="button"
                            disabled={siteContent.gallery.length <= 1 || isSaving}
                            onClick={() => handleDeleteGallery(item)}
                            aria-label={`Delete gallery photo ${item.title}`}
                            className="min-h-[36px] rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-40 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add / Edit Gallery Photo Form */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-lg font-bold text-[#0B192C]">
                      {editingGalleryId ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
                    </h3>
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={resetGalleryForm}
                        className="text-xs font-bold text-slate-500 underline hover:text-[#0B192C] cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    Paste an image URL or upload an image file from your device.
                  </p>

                  {galleryError && (
                    <div
                      role="alert"
                      className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-800"
                    >
                      {galleryError}
                    </div>
                  )}

                  <form
                    onSubmit={handleSaveGallery}
                    className="mt-4 space-y-4"
                    noValidate
                  >
                    <div>
                      <label
                        htmlFor="admin-gallery-title"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Photo Title
                      </label>
                      <input
                        id="admin-gallery-title"
                        type="text"
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="e.g. Manned Guarding"
                        className="mt-1 w-full min-h-[44px] rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#0B192C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-gallery-url"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Photo URL
                      </label>
                      <input
                        id="admin-gallery-url"
                        type="url"
                        value={galleryImageUrl}
                        onChange={(e) => setGalleryImageUrl(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="mt-1 w-full min-h-[44px] rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#0B192C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="admin-gallery-upload"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Or Upload Photo File from Device
                      </label>
                      <input
                        id="admin-gallery-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="mt-1 block w-full text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#0B192C] file:px-3.5 file:py-2 file:text-xs file:font-bold file:text-[#F5B722] hover:file:bg-slate-800"
                      />
                    </div>

                    {galleryImageUrl && (
                      <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#0B192C]">
                        <img
                          src={galleryImageUrl}
                          alt={galleryTitle || 'Preview'}
                          referrerPolicy="no-referrer"
                          className="aspect-[16/9] w-full object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="admin-gallery-caption"
                        className="block text-xs font-bold text-[#0B192C]"
                      >
                        Photo Caption
                      </label>
                      <textarea
                        id="admin-gallery-caption"
                        rows={3}
                        value={galleryCaption}
                        onChange={(e) => setGalleryCaption(e.target.value)}
                        placeholder="Describe what is shown in this security photo..."
                        className="mt-1 w-full rounded-lg border border-slate-300 p-3 text-sm text-[#0B192C]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="w-full min-h-[48px] rounded-lg bg-[#0B192C] px-4 py-2.5 text-sm font-bold text-[#F5B722] transition-colors hover:bg-slate-800 cursor-pointer"
                    >
                      {editingGalleryId ? 'Save Photo Changes' : 'Add Photo to Gallery'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
