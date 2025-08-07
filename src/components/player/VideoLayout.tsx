import { Captions, Controls, Gesture } from '@vidstack/react';
import { BufferingIndicator } from './BufferingIndicator';
import * as Buttons from './buttons';
import * as Menus from './menus';
import * as Sliders from './sliders';
import { TimeGroup } from './TimeGroup';
import { Title } from './Title';
import { usePlayer } from '@/contexts/PlayerContext';

export function VideoLayout() {
  const { settings } = usePlayer();

  return (
    <>
      {settings.gestureControls && <Gestures />}
      <BufferingIndicator />

      {/* Center Play/Pause Button */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* FIX: The className has been moved to a new wrapper `div`.
          The original <Buttons.Play> component does not accept a `className` prop,
          which was causing the type error. This wrapper applies the styles and ensures
          the button remains interactive with `pointer-events-auto`.
        */}
        <div
          className="pointer-events-auto opacity-0 media-paused:opacity-100 media-ended:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-sm rounded-full p-6 hover:bg-black/80 hover:scale-110 transform transition-all duration-200 shadow-2xl border border-white/20"
        >
          <Buttons.Play tooltipPlacement="top" />
        </div>
      </div>

      <Captions
        className="media-preview:opacity-0 media-captions:opacity-100 absolute inset-0 z-10 select-none break-words text-center opacity-0 transition-opacity duration-300"
        style={{
          '--cue-color': settings.textColor,
          '--cue-bg-color': settings.backgroundColor,
          '--cue-font-size': settings.fontSize,
          '--cue-font-family': settings.fontFamily,
          '--cue-font-weight': settings.fontWeight,
          '--cue-window-color': settings.windowColor,
          '--cue-text-shadow': settings.textShadow === 'none' ? 'none' : settings.textShadow === 'soft' ? '1px 1px 2px rgba(0,0,0,0.8)' : '2px 2px 4px rgba(0,0,0,0.9)',
          // Position handling for captions
          ...(settings.position === 'top' && {
            top: '10%',
            bottom: 'auto',
          }),
          ...(settings.position === 'center' && {
            top: '50%',
            bottom: 'auto',
            transform: 'translateY(-50%)',
          }),
          ...(settings.position === 'bottom' && {
            top: 'auto',
            bottom: '10%',
          }),
        } as React.CSSProperties & {
          [key: `--${string}`]: string | number | null | undefined;
        }}
      />
      <Controls.Root
        className={`media-controls:opacity-100 absolute inset-0 z-20 flex h-full w-full flex-col bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-all duration-300 ${
          settings.controlBar === 'always' ? 'opacity-100' : ''
        } ${
          settings.controlBar === 'minimal' ? 'from-black/40' : ''
        }`}
      >
        <div className="flex-1" />

        {/* Progress bar - positioned with proper spacing */}
        <Controls.Group className="flex w-full items-center px-4 pb-1">
          <Sliders.Time />
        </Controls.Group>

        {/* Main control bar - ensure it's always within bounds */}
        <Controls.Group className={`flex w-full items-center justify-between px-4 pb-2 ${
          settings.controlBar === 'minimal' ? 'space-x-2' : 'space-x-3'
        }`}>
          <div className="flex items-center space-x-3">
            <Buttons.Play tooltipPlacement="top start" />
            <Buttons.Mute tooltipPlacement="top" />
            <div className="w-20 sm:w-24">
              <Sliders.Volume />
            </div>
            <TimeGroup />
          </div>

          {/* Title - responsive visibility */}
          {settings.controlBar !== 'minimal' && (
            <div className="flex-1 min-w-0 mx-4 hidden sm:block">
              <Title />
            </div>
          )}

          <div className="flex items-center space-x-2">
            {/* Dedicated Subtitle Menu */}
            <Menus.SubtitleMenu
              placement="top end"
              tooltipPlacement="top"
            />

            {/* Settings menu */}
            <Menus.Settings
              placement="top end"
              tooltipPlacement="top"
            />

            {/* PIP and Fullscreen - responsive visibility */}
            {settings.controlBar !== 'minimal' && (
              <div className="flex items-center space-x-2">
                <div className="hidden md:block">
                  <Buttons.PIP tooltipPlacement="top" />
                </div>
                <Buttons.Fullscreen tooltipPlacement="top end" />
              </div>
            )}
          </div>
        </Controls.Group>
      </Controls.Root>
    </>
  );
}

function Gestures() {
  return (
    <>
      {/* Double tap left side to seek backward */}
      <Gesture
        className="absolute inset-0 z-0 block h-full w-1/5"
        event="dblpointerup"
        action="seek:-10"
      />

      {/* Double tap right side to seek forward */}
      <Gesture
        className="absolute inset-0 z-0 block h-full w-4/5"
        event="dblpointerup"
        action="seek:10"
      />

      {/* Single tap to toggle play/pause */}
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:paused"
      />

      {/* Single tap to show/hide controls */}
      <Gesture
        className="absolute inset-0 z-0 block h-full w-full"
        event="pointerup"
        action="toggle:controls"
      />
    </>
  );
}
