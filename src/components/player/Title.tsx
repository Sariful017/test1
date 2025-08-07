'use client';

import { Title as VdsTitle, useMediaState } from '@vidstack/react';

/**
 * This component displays the title of the media.
 * It's designed to only be visible when the player enters fullscreen mode
 * to avoid cluttering the UI in the standard view.
 */
export function Title() {
  // This hook tracks the player's fullscreen state.
  const isFullscreen = useMediaState('fullscreen');

  // If the player is not in fullscreen, we render nothing (null).
  if (!isFullscreen) {
    return null;
  }

  // When in fullscreen, the title is displayed.
  return (
    <div className="flex-1 overflow-hidden whitespace-nowrap px-2 text-sm font-medium text-white/70">
      <span className="mr-1">|</span>
      <VdsTitle />
    </div>
  );
}
