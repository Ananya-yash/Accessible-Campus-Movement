'use client';

/**
 * BuildingAccessibilityCard
 * Shows the ramp, lift and stairs status for a single campus building.
 * Matches the visual style of RouteFinderCard (bg-white, border-slate-200, rounded-lg, p-5).
 *
 * @param {{ building: import('../app/api/buildings/route').BuildingRow | null | undefined }} props
 */

/**
 * Returns the Tailwind classes and visible label for a given status string.
 * Colour is never the only signal — an emoji prefix is always included in the
 * label text so the meaning is clear to colour-blind users and screen readers.
 *
 * @param {string} status - Raw status value from the database.
 * @returns {{ colour: string, label: string }}
 */
function getBadgeProps(status) {
  switch (status) {
    case 'Open':
      return { colour: 'bg-green-100 text-green-800', label: '🟢 Open' };
    case 'Working':
      return { colour: 'bg-green-100 text-green-800', label: '🟢 Working' };
    case 'Blocked':
      return { colour: 'bg-red-100 text-red-700',   label: '🔴 Blocked' };
    case 'Closed':
      return { colour: 'bg-red-100 text-red-700',   label: '🔴 Closed' };
    case 'Not Working':
      return { colour: 'bg-red-100 text-red-700',   label: '🔴 Not Working' };
    default:
      // Unknown status: show raw text in a neutral grey badge
      return { colour: 'bg-slate-100 text-slate-600', label: status };
  }
}

function StatusBadge({ status }) {
  const { colour, label } = getBadgeProps(status);
  return (
    // aria-hidden: the parent row's aria-label already announces the full sentence.
    // The badge is purely visual reinforcement for sighted users.
    <span aria-hidden="true"
      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${colour}`}>
      {label}
    </span>
  );
}

function AccessibilityRow({ emoji, label, status }) {
  // aria-label gives screen readers a single, clean sentence: "Entrance ramp: Blocked".
  // role="group" is required for aria-label to be announced on a plain <div>.
  // All visual children are aria-hidden to prevent double-reading.
  return (
    <div
      role="group"
      aria-label={`${label}: ${status}`}
      className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
    >
      <span aria-hidden="true" className="flex items-center gap-2 text-xs text-slate-700">
        <span className="text-base leading-none">{emoji}</span>
        {label}
      </span>
      <StatusBadge status={status} />
    </div>
  );
}

export default function BuildingAccessibilityCard({ building }) {
  // Placeholder state — no building selected yet
  if (!building) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-center items-center min-h-[120px] text-center">
        <span aria-hidden="true" className="text-3xl mb-2">🏫</span>
        <p className="text-xs text-slate-400 leading-snug">
          Please select a building to view accessibility status.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5">
      {/* Header */}
      <h3 className="font-semibold text-slate-800 text-sm mb-1">{building.name}</h3>
      <p className="text-xs text-slate-500 mb-3">Current accessibility status</p>

      {/* Status rows */}
      <div className="divide-y divide-slate-100">
        <AccessibilityRow emoji="♿" label="Entrance Ramp"    status={building.rampStatus} />
        <AccessibilityRow emoji="🛗" label="Lift / Elevator" status={building.liftStatus} />
        <AccessibilityRow emoji="🪜" label="Stairs"          status={building.stairsStatus} />
      </div>
    </div>
  );
}

