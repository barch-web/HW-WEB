import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateQuoteForm,
  QUOTE_VALIDATION_ERROR,
  buildWhatsAppQuoteUrl,
  buildMailtoQuoteUrl,
  advanceContractStage,
  calculateOperationsMetrics,
  INITIAL_OPERATIONS_STATE,
  buildFaqJsonLd,
  FAQ_ITEMS,
  validateServiceItem,
  validateGalleryItem,
} from './security-ops';

test('validateQuoteForm blocks empty name or phone with exact required message', () => {
  const emptyBoth = validateQuoteForm({
    name: '',
    phone: '',
    service: 'Manned Guarding',
    details: 'Need 2 guards',
  });
  assert.equal(emptyBoth.valid, false);
  assert.equal(emptyBoth.error, QUOTE_VALIDATION_ERROR);

  const emptyPhone = validateQuoteForm({
    name: 'Ama Mensah',
    phone: '   ',
    service: 'Event Security',
    details: '',
  });
  assert.equal(emptyPhone.valid, false);
  assert.equal(emptyPhone.error, 'Enter your name and phone number so we can reach you.');

  const validInput = validateQuoteForm({
    name: 'Ama Mensah',
    phone: '027 342 6450',
    service: 'Industrial Security',
    details: 'Factory in North Industrial Area',
  });
  assert.equal(validInput.valid, true);
  assert.equal(validInput.error, null);
});

test('buildWhatsAppQuoteUrl and buildMailtoQuoteUrl generate properly encoded URLs', () => {
  const sample = {
    name: 'Kofi Mensah',
    phone: '024 123 4567',
    service: 'Cash-in-Transit',
    details: 'Weekly collection in Accra',
  };

  const waUrl = buildWhatsAppQuoteUrl(sample);
  assert.equal(waUrl.startsWith('https://wa.me/233273426450?text='), true);
  assert.equal(decodeURIComponent(waUrl).includes('Kofi Mensah'), true);
  assert.equal(decodeURIComponent(waUrl).includes('Cash-in-Transit'), true);

  const mailUrl = buildMailtoQuoteUrl(sample);
  assert.equal(mailUrl.startsWith('mailto:williamsprinceeric@gmail.com?subject='), true);
  assert.equal(decodeURIComponent(mailUrl).includes('Quote request: Cash-in-Transit'), true);
});

test('advanceContractStage progresses through Assess -> Plan -> Deploy -> Report', () => {
  assert.equal(advanceContractStage('Assess'), 'Plan');
  assert.equal(advanceContractStage('Plan'), 'Deploy');
  assert.equal(advanceContractStage('Deploy'), 'Report');
  assert.equal(advanceContractStage('Report'), 'Report');
});

test('calculateOperationsMetrics computes accurate guard briefing and CIT handover metrics', () => {
  const metrics = calculateOperationsMetrics(INITIAL_OPERATIONS_STATE);
  assert.equal(metrics.totalQuotes, 4);
  assert.equal(metrics.activeDeployments, 2);
  assert.equal(metrics.totalGuards, 5);
  assert.equal(metrics.briefingCompliancePct, 100);
  assert.equal(metrics.supervisorCheckPct, 80);
  assert.equal(metrics.completedHandovers, 1);
  assert.equal(metrics.totalCameras, 20);
});

test('buildFaqJsonLd produces valid Schema.org FAQPage with all 8 questions', () => {
  const jsonLd = buildFaqJsonLd();
  assert.equal(jsonLd['@type'], 'FAQPage');
  assert.equal(jsonLd.mainEntity.length, 8);
  assert.equal(jsonLd.mainEntity[0].name, FAQ_ITEMS[0].question);
});

test('validateServiceItem and validateGalleryItem enforce required fields for admin updates', () => {
  assert.equal(validateServiceItem({ title: '', description: 'Desc' }).valid, false);
  assert.equal(
    validateServiceItem({
      title: 'VIP Close Protection',
      description: 'Dedicated executive escort officers in Accra.',
    }).valid,
    true
  );

  assert.equal(
    validateGalleryItem({ title: 'Guard', caption: '', imageUrl: 'https://example.com/a.jpg' })
      .valid,
    false
  );
  assert.equal(
    validateGalleryItem({
      title: 'VIP Protection',
      caption: 'Executive protection detail at Kotoka International Airport.',
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509',
    }).valid,
    true
  );
});
