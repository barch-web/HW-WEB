import React from 'react';

/**
 * Six bespoke flat inline-SVG illustrations for the Gallery section and Lightbox.
 * Note: Uses zero internal element `id` attributes so rendering in both the grid
 * and the lightbox never creates duplicate DOM IDs.
 */
export function GalleryIllustration({
  itemId,
  className = 'w-full h-auto',
}: {
  itemId: string;
  className?: string;
}) {
  switch (itemId) {
    case 'manned-guarding':
      // 1. Manned Guarding: a guard at a business entrance at night
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="Uniformed security guard stationed outside a lit business entrance at night"
        >
          {/* Night sky background */}
          <rect width="480" height="300" fill="#0B192C" />
          {/* Stars & crescent moon */}
          <circle cx="70" cy="48" r="2" fill="#FDE68A" />
          <circle cx="135" cy="34" r="1.8" fill="#FDE68A" />
          <circle cx="410" cy="42" r="2.2" fill="#FDE68A" />
          <circle cx="360" cy="68" r="1.5" fill="#FDE68A" />
          <path
            d="M 88 76 A 18 18 0 1 1 104 52 A 14 14 0 1 0 88 76 Z"
            fill="#F5B722"
          />
          {/* Office building facade */}
          <rect x="165" y="45" width="265" height="205" rx="4" fill="#162A45" />
          <rect x="165" y="45" width="265" height="12" fill="#243B5A" />
          {/* Upper office windows */}
          <rect x="190" y="75" width="46" height="32" rx="2" fill="#1E3A5F" />
          <rect x="250" y="75" width="46" height="32" rx="2" fill="#FEF08A" opacity="0.85" />
          <rect x="310" y="75" width="46" height="32" rx="2" fill="#1E3A5F" />
          <rect x="370" y="75" width="38" height="32" rx="2" fill="#FEF08A" opacity="0.7" />
          {/* Illuminated Business Entrance Canopy & Glass Doors */}
          <polygon points="180,136 415,136 425,150 170,150" fill="#F5B722" />
          {/* Warm light cone from entrance */}
          <polygon
            points="195,150 400,150 435,250 160,250"
            fill="#FDE68A"
            opacity="0.16"
          />
          {/* Double glass doors */}
          <rect
            x="220"
            y="150"
            width="155"
            height="100"
            fill="#FEF3C7"
            stroke="#F5B722"
            strokeWidth="3"
          />
          <line x1="297.5" y1="150" x2="297.5" y2="250" stroke="#0B192C" strokeWidth="3" />
          <rect x="286" y="192" width="6" height="18" rx="2" fill="#0B192C" />
          <rect x="303" y="192" width="6" height="18" rx="2" fill="#0B192C" />
          {/* Ground pavement */}
          <rect x="0" y="250" width="480" height="50" fill="#081220" />
          <line x1="0" y1="250" x2="480" y2="250" stroke="#243B5A" strokeWidth="2" />
          {/* Guard Booth / Post Pillar */}
          <rect x="65" y="128" width="75" height="122" rx="4" fill="#1E3A5F" />
          <rect x="75" y="142" width="55" height="42" rx="2" fill="#93C5FD" opacity="0.35" />
          <rect x="60" y="120" width="85" height="10" rx="2" fill="#F5B722" />
          {/* Uniformed Security Guard at Entrance */}
          {/* Boots & Legs */}
          <rect x="172" y="218" width="11" height="32" rx="2" fill="#0B192C" />
          <rect x="189" y="218" width="11" height="32" rx="2" fill="#0B192C" />
          {/* Uniform Torso (Navy with Gold Epaulettes & Shield Badge) */}
          <rect x="166" y="168" width="38" height="52" rx="6" fill="#0F2537" stroke="#F5B722" strokeWidth="1.5" />
          <rect x="166" y="168" width="10" height="4" rx="1" fill="#F5B722" />
          <rect x="194" y="168" width="10" height="4" rx="1" fill="#F5B722" />
          {/* Duty belt */}
          <rect x="166" y="206" width="38" height="6" fill="#081220" />
          <rect x="181" y="205" width="8" height="8" rx="1" fill="#F5B722" />
          {/* Gold badge on chest */}
          <polygon points="193,178 198,180 198,186 193,190 188,186 188,180" fill="#F5B722" />
          {/* Head & Peaked Cap */}
          <circle cx="185" cy="152" r="12" fill="#8D5524" />
          <path d="M 170 145 L 200 145 L 196 135 L 174 135 Z" fill="#0B192C" />
          <rect x="170" y="144" width="32" height="4" rx="1" fill="#F5B722" />
          {/* Flashlight beam held by guard */}
          <rect x="198" y="190" width="16" height="6" rx="2" fill="#475569" />
          <polygon points="214,193 275,176 275,212" fill="#FEF08A" opacity="0.45" />
        </svg>
      );

    case 'industrial-security':
      // 2. Industrial Security: a factory with chimneys, a perimeter fence and a floodlight
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="Industrial factory with chimneys, perimeter fence and floodlight"
        >
          {/* Dusk industrial sky */}
          <rect width="480" height="300" fill="#10233A" />
          {/* Chimneys */}
          <rect x="92" y="54" width="26" height="110" fill="#334155" />
          <rect x="90" y="50" width="30" height="8" fill="#F5B722" />
          <rect x="136" y="70" width="26" height="94" fill="#334155" />
          <rect x="134" y="66" width="30" height="8" fill="#F5B722" />
          {/* Soft smoke puffs */}
          <circle cx="105" cy="36" r="10" fill="#64748B" opacity="0.45" />
          <circle cx="120" cy="26" r="13" fill="#64748B" opacity="0.35" />
          <circle cx="149" cy="50" r="9" fill="#64748B" opacity="0.45" />
          {/* Sawtooth Factory Roof & Main Plant */}
          <polygon
            points="70,155 130,122 130,155 190,122 190,155 250,122 250,155 320,122 320,155"
            fill="#1E3A5F"
          />
          <rect x="70" y="155" width="275" height="95" fill="#162A45" />
          {/* Factory industrial windows */}
          <rect x="95" y="175" width="42" height="24" fill="#FDE68A" opacity="0.8" />
          <rect x="155" y="175" width="42" height="24" fill="#FDE68A" opacity="0.8" />
          <rect x="215" y="175" width="42" height="24" fill="#38BDF8" opacity="0.45" />
          <rect x="275" y="175" width="48" height="75" fill="#334155" />
          {/* High-Mast Floodlight Pole & Beam */}
          <rect x="398" y="48" width="8" height="202" fill="#94A3B8" />
          <rect x="378" y="42" width="34" height="14" rx="3" fill="#F5B722" />
          {/* Floodlight illumination cone */}
          <polygon
            points="382,56 175,250 445,250"
            fill="#FEF08A"
            opacity="0.22"
          />
          {/* Perimeter Fence spanning across foreground */}
          <rect x="0" y="250" width="480" height="50" fill="#0B192C" />
          {/* Fence posts and security rails */}
          <line x1="20" y1="202" x2="460" y2="202" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="20" y1="248" x2="460" y2="248" stroke="#94A3B8" strokeWidth="2.5" />
          {[30, 80, 130, 180, 230, 280, 330, 380, 430].map((x) => (
            <g key={x}>
              <rect x={x - 3} y="194" width="6" height="56" fill="#CBD5E1" />
              <line x1={x} y1="202" x2={x + 48} y2="248" stroke="#64748B" strokeWidth="1.2" />
              <line x1={x + 48} y1="202" x2={x} y2="248" stroke="#64748B" strokeWidth="1.2" />
            </g>
          ))}
          {/* Security Gate Warning Sign */}
          <rect x="212" y="212" width="56" height="24" rx="3" fill="#F5B722" />
          <rect x="218" y="218" width="44" height="4" fill="#0B192C" />
          <rect x="224" y="226" width="32" height="4" fill="#0B192C" />
        </svg>
      );

    case 'cash-in-transit':
      // 3. Cash-in-Transit: an armoured van on a road
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="Armoured cash-in-transit bullion van travelling on a road"
        >
          {/* Warm daylight sky & Accra skyline silhouette */}
          <rect width="480" height="300" fill="#132A46" />
          <rect x="40" y="100" width="55" height="120" fill="#1B385C" />
          <rect x="108" y="80" width="70" height="140" fill="#1B385C" />
          <rect x="330" y="92" width="68" height="128" fill="#1B385C" />
          <rect x="408" y="115" width="45" height="105" fill="#1B385C" />
          {/* Roadway */}
          <rect x="0" y="215" width="480" height="85" fill="#0B1626" />
          <line x1="0" y1="215" x2="480" y2="215" stroke="#F5B722" strokeWidth="3" />
          {/* Dashed road centre line */}
          {[25, 105, 185, 265, 345, 425].map((x) => (
            <rect key={x} x={x} y="256" width="44" height="6" rx="2" fill="#FDE68A" opacity="0.7" />
          ))}
          {/* Armoured Bullion Van */}
          <g>
            {/* Main reinforced body */}
            <path
              d="M 95 112 H 310 L 352 145 L 385 156 V 216 H 95 Z"
              fill="#0B192C"
              stroke="#94A3B8"
              strokeWidth="3"
            />
            {/* Gold HW visibility stripe along side */}
            <rect x="100" y="170" width="280" height="14" fill="#F5B722" />
            {/* Reinforced riveted vault plates */}
            <rect
              x="114"
              y="126"
              width="95"
              height="38"
              rx="3"
              fill="#162A45"
              stroke="#64748B"
              strokeWidth="2"
            />
            <rect
              x="220"
              y="126"
              width="66"
              height="76"
              rx="3"
              fill="#162A45"
              stroke="#64748B"
              strokeWidth="2"
            />
            {/* Ballistic windscreen */}
            <polygon
              points="302,126 342,148 342,165 302,165"
              fill="#93C5FD"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Roof beacon light */}
            <rect x="292" y="100" width="22" height="10" rx="4" fill="#F59E0B" />
            <circle cx="303" cy="96" r="14" fill="#FDE68A" opacity="0.28" />
            {/* Mini gold shield emblem on van side */}
            <polygon
              points="160,134 172,138 172,150 160,157 148,150 148,138"
              fill="#F5B722"
            />
            {/* Front bumper & headlight */}
            <rect x="378" y="182" width="12" height="14" rx="2" fill="#FEF08A" />
            <polygon points="390,185 455,172 455,208" fill="#FEF08A" opacity="0.3" />
            <rect x="374" y="204" width="18" height="12" rx="3" fill="#475569" />
            {/* Heavy-duty wheels */}
            <circle cx="158" cy="218" r="26" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
            <circle cx="158" cy="218" r="11" fill="#F5B722" />
            <circle cx="326" cy="218" r="26" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
            <circle cx="326" cy="218" r="11" fill="#F5B722" />
          </g>
        </svg>
      );

    case 'cctv-surveillance':
      // 4. CCTV and Surveillance: a camera on a pole covering a parking area, with a small monitor showing a red recording dot
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="CCTV camera mounted on a pole scanning a parking area with a live recording monitor"
        >
          {/* Background */}
          <rect width="480" height="300" fill="#0F2537" />
          {/* Parking Lot Ground & Marked Bays */}
          <polygon points="0,195 480,195 480,300 0,300" fill="#1E293B" />
          <line x1="120" y1="205" x2="75" y2="295" stroke="#F5B722" strokeWidth="3" />
          <line x1="230" y1="205" x2="200" y2="295" stroke="#F5B722" strokeWidth="3" />
          <line x1="340" y1="205" x2="325" y2="295" stroke="#F5B722" strokeWidth="3" />
          {/* Parked Vehicles in Bays */}
          <rect x="115" y="218" width="68" height="36" rx="8" fill="#38BDF8" opacity="0.85" />
          <rect x="125" y="223" width="48" height="18" rx="4" fill="#0B192C" />
          <rect x="235" y="218" width="68" height="36" rx="8" fill="#E2E8F0" opacity="0.85" />
          <rect x="245" y="223" width="48" height="18" rx="4" fill="#0B192C" />
          {/* Surveillance Detection Field Cone */}
          <polygon
            points="116,96 85,275 360,275"
            fill="#38BDF8"
            opacity="0.16"
          />
          {/* Camera Pole on Left */}
          <rect x="64" y="42" width="12" height="240" fill="#CBD5E1" />
          <rect x="52" y="274" width="36" height="12" rx="2" fill="#64748B" />
          {/* Mounting Arm & Bullet CCTV Camera */}
          <path d="M 76 82 H 104 L 112 92" fill="none" stroke="#CBD5E1" strokeWidth="5" />
          <g transform="rotate(18 112 88)">
            <rect x="96" y="72" width="48" height="22" rx="4" fill="#F8FAFC" stroke="#0B192C" strokeWidth="2" />
            <rect x="140" y="76" width="8" height="14" rx="2" fill="#0B192C" />
            <path d="M 94 70 H 150 L 144 74 H 94 Z" fill="#F5B722" />
          </g>
          {/* Small Security Monitor in Upper Right Corner with Red Recording Dot */}
          <rect
            x="302"
            y="30"
            width="148"
            height="104"
            rx="8"
            fill="#081220"
            stroke="#F5B722"
            strokeWidth="3"
          />
          <rect x="312" y="40" width="128" height="76" rx="4" fill="#162A45" />
          {/* Monitor Grid Crosshairs */}
          <line x1="376" y1="40" x2="376" y2="116" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <line x1="312" y1="78" x2="440" y2="78" stroke="#38BDF8" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          {/* Red Recording Dot + REC Indicator */}
          <circle cx="328" cy="54" r="6" fill="#EF4444" />
          <circle cx="328" cy="54" r="10" fill="#EF4444" opacity="0.3" />
          <rect x="340" y="50" width="26" height="8" rx="2" fill="#F8FAFC" opacity="0.85" />
          <rect x="318" y="98" width="54" height="8" rx="2" fill="#38BDF8" opacity="0.7" />
        </svg>
      );

    case 'event-security':
      // 5. Event Security: string lights, a stage, barrier posts with a gold rope and a crowd silhouette
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="Event stage with string lights, gold rope barrier posts and crowd silhouette"
        >
          {/* Evening Event Sky */}
          <rect width="480" height="300" fill="#0B192C" />
          {/* Overhead String Lights */}
          <path
            d="M 20 34 Q 130 68 240 38 Q 350 68 460 32"
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
          />
          {[55, 105, 155, 205, 240, 285, 335, 385, 430].map((cx, i) => {
            const cy = i % 2 === 0 ? 48 : 54;
            return (
              <g key={cx}>
                <circle cx={cx} cy={cy} r="9" fill="#FDE68A" opacity="0.3" />
                <circle cx={cx} cy={cy} r="4.5" fill="#FEF08A" />
              </g>
            );
          })}
          {/* Illuminated Event Stage */}
          <rect x="115" y="78" width="250" height="96" rx="4" fill="#162A45" stroke="#F5B722" strokeWidth="2" />
          <polygon points="150,78 195,174 125,174" fill="#F5B722" opacity="0.18" />
          <polygon points="330,78 355,174 285,174" fill="#F5B722" opacity="0.18" />
          {/* Stage Podium / Truss */}
          <rect x="222" y="124" width="36" height="50" rx="2" fill="#0F2537" stroke="#F5B722" strokeWidth="1.5" />
          <rect x="95" y="172" width="290" height="14" rx="2" fill="#243B5A" />
          {/* Barrier Posts (Stanchions) with Draped Gold Rope */}
          {[90, 190, 290, 390].map((x) => (
            <g key={x}>
              <rect x={x - 4} y="186" width="8" height="58" fill="#E2E8F0" />
              <circle cx={x} cy="184" r="6" fill="#F5B722" />
              <rect x={x - 12} y="240" width="24" height="6" rx="2" fill="#94A3B8" />
            </g>
          ))}
          {/* Gold Velvet Rope Catenary Curves */}
          <path
            d="M 90 194 Q 140 222 190 194 Q 240 222 290 194 Q 340 222 390 194"
            fill="none"
            stroke="#F5B722"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Crowd Silhouette in Foreground */}
          <g fill="#060E1A">
            <circle cx="55" cy="258" r="18" />
            <rect x="33" y="272" width="44" height="30" rx="12" />
            <circle cx="115" cy="252" r="20" />
            <rect x="90" y="268" width="50" height="32" rx="14" />
            <circle cx="178" cy="256" r="18" />
            <rect x="155" y="272" width="46" height="30" rx="12" />
            <circle cx="242" cy="250" r="21" />
            <rect x="216" y="266" width="52" height="34" rx="14" />
            <circle cx="308" cy="255" r="19" />
            <rect x="284" y="270" width="48" height="30" rx="12" />
            <circle cx="372" cy="252" r="20" />
            <rect x="348" y="268" width="48" height="32" rx="14" />
            <circle cx="430" cy="258" r="18" />
            <rect x="408" y="272" width="44" height="30" rx="12" />
          </g>
        </svg>
      );

    case 'storage-asset':
    default:
      // 6. Storage and Asset Security: a warehouse with a roller door, containers and a gold padlock
      return (
        <svg
          viewBox="0 0 480 300"
          className={className}
          role="img"
          aria-label="Storage warehouse with a steel roller door, shipping containers and a gold padlock"
        >
          {/* Sky & Yard Background */}
          <rect width="480" height="300" fill="#10233A" />
          <rect x="0" y="236" width="480" height="64" fill="#0B1626" />
          {/* Warehouse Structure on Left */}
          <polygon points="30,105 145,62 260,105" fill="#1E3A5F" stroke="#F5B722" strokeWidth="2" />
          <rect x="38" y="105" width="214" height="131" fill="#162A45" />
          {/* Steel Roller Door with Horizontal Slats */}
          <rect x="78" y="132" width="134" height="104" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
          {[144, 158, 172, 186, 200, 214, 228].map((y) => (
            <line key={y} x1="80" y1={y} x2="210" y2={y} stroke="#1E293B" strokeWidth="2.5" />
          ))}
          {/* Stacked Shipping Containers on Right */}
          {/* Bottom Container */}
          <rect x="276" y="168" width="168" height="68" rx="3" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1.5" />
          {[296, 316, 336, 356, 376, 396, 416].map((x) => (
            <line key={x} x1={x} y1="174" x2={x} y2="230" stroke="#1E40AF" strokeWidth="3" />
          ))}
          {/* Top Container */}
          <rect x="292" y="100" width="144" height="66" rx="3" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
          {[312, 332, 352, 372, 392, 412].map((x) => (
            <line key={x} x1={x} y1="106" x2={x} y2="160" stroke="#115E59" strokeWidth="3" />
          ))}
          {/* Prominent Gold Padlock Emblem in Foreground */}
          <g transform="translate(216, 154)">
            {/* Shackle */}
            <path
              d="M 18 28 V 14 A 16 16 0 0 1 50 14 V 28"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Gold Padlock Body */}
            <rect
              x="6"
              y="26"
              width="56"
              height="48"
              rx="8"
              fill="#F5B722"
              stroke="#0B192C"
              strokeWidth="3"
            />
            {/* Keyhole */}
            <circle cx="34" cy="46" r="6" fill="#0B192C" />
            <polygon points="31,48 37,48 39,62 29,62" fill="#0B192C" />
          </g>
        </svg>
      );
  }
}

export function ServiceLineIcon({ serviceId }: { serviceId: string }) {
  switch (serviceId) {
    case 'manned-guarding':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path d="M12 3L4 7v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V7l-8-4z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'industrial-security':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path d="M3 21h18M5 21V10l5 3V10l5 3V6h4v15" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 17h2M14 17h2" strokeLinecap="round" />
        </svg>
      );
    case 'cash-in-transit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <rect x="2" y="7" width="14" height="10" rx="1.5" />
          <path d="M16 10h3l3 3v4h-6v-7z" strokeLinejoin="round" />
          <circle cx="6.5" cy="17.5" r="2" />
          <circle cx="18.5" cy="17.5" r="2" />
          <path d="M7 12h4" strokeLinecap="round" />
        </svg>
      );
    case 'cctv-surveillance':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path d="M3 9l13-4 4 7-13 4-4-7z" strokeLinejoin="round" />
          <path d="M7 14v5h5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="9" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'event-security':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5" strokeLinecap="round" />
          <path d="M15 14.5c2.5.4 4.5 2.2 4.5 4.5" strokeLinecap="round" />
        </svg>
      );
    case 'storage-asset-security':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        </svg>
      );
  }
}
