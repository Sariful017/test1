'use client';

import { Time } from '@vidstack/react';

/**
 * This component renders the current time and the total duration of the media.
 * E.g., "01:23 / 10:45"
 */
export function TimeGroup() {
  return (
    <div className="ml-1.5 flex items-center text-sm font-medium">
      {/* Renders the current playback time. */}
      <Time className="time" type="current" />
      <div className="mx-1 text-white/80">/</div>
      {/* Renders the total duration of the media. */}
      <Time className="time" type="duration" />
    </div>
  );
}
