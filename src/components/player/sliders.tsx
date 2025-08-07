'use client';

import { TimeSlider, VolumeSlider } from '@vidstack/react';
import { usePlayer } from '@/contexts/PlayerContext';

export function Volume() {
  const { settings } = usePlayer();
  
  return (
    <VolumeSlider.Root className="volume-slider group relative mx-[7.5px] inline-flex h-10 w-full max-w-[80px] cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
      <VolumeSlider.Track className={`relative ring-media-focus z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px] transition-all duration-200 ${
        settings.focusIndicators ? 'focus-within:ring-4 focus-within:ring-brand/50' : ''
      }`}>
        <VolumeSlider.TrackFill className="bg-brand absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width] transition-all duration-200" />
      </VolumeSlider.Track>
      <VolumeSlider.Thumb className={`absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-100 ring-white/40 transition-all duration-200 group-data-[dragging]:ring-4 will-change-[left] ${
        settings.focusIndicators ? 'focus:ring-4 focus:ring-brand/50' : ''
      }`} />
      <VolumeSlider.Preview 
        className="pointer-events-none opacity-0 group-hover:opacity-100 group-data-[dragging]:opacity-100 transition-opacity duration-200" 
        noClamp
        style={{
          position: 'absolute',
          left: 'clamp(20px, var(--slider-pointer), calc(100% - 20px))',
          width: 'max-content',
          bottom: 'calc(100% + 8px)',
          transform: 'translateX(-50%)'
        }}
      >
        <VolumeSlider.Value className="rounded-lg bg-black/90 px-3 py-1.5 text-[13px] font-medium backdrop-blur-sm border border-white/10" />
      </VolumeSlider.Preview>
    </VolumeSlider.Root>
  );
}

export function Time() {
  const { settings } = usePlayer();
  
  return (
    <TimeSlider.Root className="time-slider group relative mx-[7.5px] inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none">
      <TimeSlider.Track className={`relative ring-media-focus z-0 h-[5px] w-full rounded-sm bg-white/30 group-data-[focus]:ring-[3px] transition-all duration-200 ${
        settings.focusIndicators ? 'focus-within:ring-4 focus-within:ring-brand/50' : ''
      }`}>
        <TimeSlider.TrackFill className="bg-brand absolute h-full w-[var(--slider-fill)] rounded-sm will-change-[width] transition-all duration-200" />
        <TimeSlider.Progress className="absolute z-10 h-full w-[var(--chapter-progress)] rounded-sm bg-white/50 will-change-[width] transition-all duration-200" />
      </TimeSlider.Track>
      <TimeSlider.Thumb className={`absolute left-[var(--slider-fill)] top-1/2 z-20 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#cacaca] bg-white opacity-100 ring-white/40 transition-all duration-200 group-data-[dragging]:ring-4 will-change-[left] ${
        settings.focusIndicators ? 'focus:ring-4 focus:ring-brand/50' : ''
      }`} />
      <TimeSlider.Preview 
        className={`flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100 pointer-events-none ${
          settings.thumbnailPreview ? '' : 'hidden'
        }`}
        style={{
          position: 'absolute',
          left: 'clamp(33px, var(--slider-pointer), calc(100% - 33px))',
          width: 'max-content',
          bottom: 'calc(100% + 8px)',
          transform: 'translateX(-50%)'
        }}
      >
        <TimeSlider.Value className="rounded-lg bg-black/90 px-3 py-1.5 text-[13px] font-medium backdrop-blur-sm border border-white/10" />
      </TimeSlider.Preview>
    </TimeSlider.Root>
  );
}

