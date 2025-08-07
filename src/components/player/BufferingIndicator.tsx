'use client';

/**
 * This component displays a spinning loader icon whenever the media is in a "buffering" state.
 * It's styled to be centered within the player viewport.
 */
export function BufferingIndicator() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 media-buffering:opacity-100">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
    </div>
  );
}
