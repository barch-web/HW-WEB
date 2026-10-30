import React from 'react';

/**
 * Renders the single <symbol id="hw-shield-mark"> definition in the DOM.
 * Spec:
 * - Shield with a flat peaked top, straight sides and a curved point at the bottom.
 * - The body is gold (#F59E0B / #FBBF24), with a thin navy (#0B192C) inner outline.
 * - Navy "HW" letters sit in the centre, with a small gap between the H and the W.
 * - Below them is a small navy five-point star flanked by two short navy horizontal lines.
 * - The mark always appears on navy backgrounds.
 */
export function HwSvgSymbolDefs() {
  return (
    <svg
      aria-hidden="true"
       focusable="false"
      className="sr-only pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <symbol id="hw-shield-mark" viewBox="0 0 100 120">
          {/* Outer Gold Shield Body: flat peaked top, straight sides, curved point at bottom */}
          <path
            d="M 10 16 L 50 6 L 90 16 L 90 66 C 90 92 68 107 50 115 C 32 107 10 92 10 66 Z"
            fill="#F5B722"
          />
          {/* Thin Navy Inner Outline */}
          <path
            d="M 16 21 L 50 12.5 L 84 21 L 84 65 C 84 87.5 64.5 100.5 50 108 C 35.5 100.5 16 87.5 16 65 Z"
            fill="none"
            stroke="#0B192C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Navy "H" letter on left of centre with small gap before "W" */}
          <path
            d="M 23 36 H 29.5 V 49.5 H 39.5 V 36 H 46 V 69 H 39.5 V 55.5 H 29.5 V 69 H 23 Z"
            fill="#0B192C"
          />
          {/* Navy "W" letter on right of centre (gap from x=46 to x=50) */}
          <path
            d="M 50 36 H 56.2 L 59.8 57.5 L 63.8 39 H 68.8 L 72.8 57.5 L 76.4 36 H 82.5 L 76 69 H 70 L 66.3 50.5 L 62.6 69 H 56.6 Z"
            fill="#0B192C"
          />
          {/* Left short navy horizontal line */}
          <line
            x1="27"
            y1="84"
            x2="40"
            y2="84"
            stroke="#0B192C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Small navy five-point star in centre below HW */}
          <polygon
            points="50,75.5 52.4,80.6 58,81.4 53.9,85.3 54.9,90.8 50,88.1 45.1,90.8 46.1,85.3 42,81.4 47.6,80.6"
            fill="#0B192C"
          />
          {/* Right short navy horizontal line */}
          <line
            x1="60"
            y1="84"
            x2="73"
            y2="84"
            stroke="#0B192C"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}

export function HwShieldMark({
  className = 'h-10 w-9',
  title = 'HW Security Guard Ltd Shield Mark',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      role="img"
      aria-label={title}
    >
      <use href="#hw-shield-mark" />
    </svg>
  );
}
