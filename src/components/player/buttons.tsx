
import {
  FullscreenButton,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Tooltip,
  useMediaState,
  type TooltipPlacement,
} from '@vidstack/react';
import {
  Rewind,
  FastForward,
  Minimize,
  Maximize,
  VolumeX,
  Volume1,
  Volume2,
  PictureInPicture,
  PictureInPicture2,
  Play as PlayIcon,
  Pause as PauseIcon,
  Subtitles as SubtitlesIcon,
} from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
}

export const buttonClass =
  'group ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 transition-all duration-200';

export const tooltipClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[visible]:animate-in data-[visible]:fade-in data-[visible]:slide-in-from-bottom-4 z-10 rounded-lg bg-black/90 px-3 py-1.5 text-sm font-medium text-white parent-data-[open]:hidden backdrop-blur-sm border border-white/10';

export function CentralControls() {
  const { settings } = usePlayer();
  const iconClass = "w-12 h-12 text-white hover:text-brand transition-colors duration-200";
  
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity media-controls:opacity-100 media-buffering:opacity-0">
      <div className="flex items-center space-x-6">
        <SeekButton className={`${buttonClass} h-16 w-16`} seconds={-settings.skipInterval}>
          <Rewind className={iconClass} />
        </SeekButton>

        <PlayButton className="group ring-media-focus relative inline-flex h-24 w-24 cursor-pointer items-center justify-center rounded-full bg-black/60 outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4 transition-all duration-200 backdrop-blur-sm">
          <PlayIcon className="w-20 h-20 hidden group-data-[paused]:block text-white hover:text-brand transition-colors duration-200" />
          <PauseIcon className="w-20 h-20 block group-data-[paused]:hidden text-white hover:text-brand transition-colors duration-200" />
        </PlayButton>

        <SeekButton className={`${buttonClass} h-16 w-16`} seconds={settings.skipInterval}>
          <FastForward className={iconClass} />
        </SeekButton>
      </div>
    </div>
  );
}

export function Play({ tooltipPlacement }: MediaButtonProps) {
  const isPaused = useMediaState('paused');
  const { settings } = usePlayer();
  const iconClass = `w-8 h-8 text-white group-hover:text-brand transition-colors duration-200 ${
    settings.focusIndicators ? 'group-focus:text-brand' : ''
  }`;
  
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className={buttonClass}>
          {isPaused ? <PlayIcon className={iconClass} /> : <PauseIcon className={iconClass} />}
        </PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isPaused ? 'Play' : 'Pause'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState('volume');
  const isMuted = useMediaState('muted');
  const { settings } = usePlayer();
  const iconClass = `w-8 h-8 text-white group-hover:text-brand transition-colors duration-200 ${
    settings.focusIndicators ? 'group-focus:text-brand' : ''
  }`;
  
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className={buttonClass}>
          {isMuted || volume === 0 ? (
            <VolumeX className={iconClass} />
          ) : volume < 0.5 ? (
            <Volume1 className={iconClass} />
          ) : (
            <Volume2 className={iconClass} />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isMuted ? 'Unmute' : 'Mute'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('pictureInPicture');
  const { settings } = usePlayer();
  const iconClass = `w-8 h-8 text-white group-hover:text-brand transition-colors duration-200 ${
    settings.focusIndicators ? 'group-focus:text-brand' : ''
  }`;
  
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton className={buttonClass}>
          {isActive ? (
            <PictureInPicture2 className={iconClass} />
          ) : (
            <PictureInPicture className={iconClass} />
          )}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? 'Exit PIP' : 'Enter PIP'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('fullscreen');
  const { settings } = usePlayer();
  const iconClass = `w-8 h-8 text-white group-hover:text-brand transition-colors duration-200 ${
    settings.focusIndicators ? 'group-focus:text-brand' : ''
  }`;
  
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className={buttonClass}>
          {isActive ? (
            <Minimize className={iconClass} />
          ) : (
            <Maximize className={iconClass} />
          )}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function SubtitleButton({ tooltipPlacement, onClick }: MediaButtonProps & { onClick: () => void }) {
  const { settings } = usePlayer();
  const iconClass = `w-8 h-8 text-white group-hover:text-brand transition-colors duration-200 ${
    settings.focusIndicators ? 'group-focus:text-brand' : ''
  }`;

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className={buttonClass} onClick={onClick}>
          <SubtitlesIcon className={iconClass} />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
        Subtitles
      </Tooltip.Content>
    </Tooltip.Root>
  );
}


