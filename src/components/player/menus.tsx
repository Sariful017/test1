import { useState } from 'react';
import {
  Menu,
  Tooltip,
  useCaptionOptions,
  usePlaybackRateOptions,
  type MenuPlacement,
  type TooltipPlacement,
} from '@vidstack/react';
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDot,
  Settings as SettingsIcon,
  Accessibility,
  Play,
  Volume2,
  Subtitles as SubtitlesIcon,
  Palette,
  RotateCcw,
} from 'lucide-react';
import { buttonClass, tooltipClass } from './buttons';
import { usePlayer } from '@/contexts/PlayerContext';

// Enhanced menu styling with better visual hierarchy and improved design
export const menuClass =
  'animate-out fade-out slide-out-to-bottom-2 data-[open]:animate-in data-[open]:fade-in data-[open]:slide-in-from-bottom-4 flex h-[var(--menu-height)] max-h-[600px] min-w-[320px] flex-col overflow-y-auto overscroll-y-contain rounded-2xl border border-white/20 bg-slate-900/98 backdrop-blur-xl p-3 font-sans text-[15px] font-medium outline-none shadow-2xl transition-[height] duration-300 will-change-[height] data-[resizing]:overflow-hidden';

// Enhanced menu item styling with better spacing and hover effects
const menuItemClass = "ring-media-focus parent left-0 z-10 flex w-full cursor-pointer select-none items-center justify-start rounded-xl p-4 outline-none ring-inset hover:bg-white/10 data-[focus]:bg-white/10 data-[focus]:ring-4 transition-all duration-200 group";

// Section header styling with improved visual hierarchy
const sectionHeaderClass = "flex items-center justify-between w-full p-4 text-white font-bold text-lg border-b border-white/20 mb-3 bg-gradient-to-r from-brand/20 to-transparent rounded-lg";

// Enhanced toggle switch component with better styling
function ToggleSwitch({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      className={menuItemClass}
      onClick={() => onChange(!checked)}
    >
      <span className="flex-1 text-left text-white/90">{label}</span>
      <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ${checked ? 'bg-gradient-to-r from-brand to-brand/80 shadow-lg shadow-brand/30' : 'bg-white/20'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </div>
    </button>
  );
}

// Radio button component with enhanced styling
function Radio({ children, ...props }: Menu.RadioProps) {
  return (
    <Menu.Radio className={menuItemClass} {...props}>
      <Circle className="h-5 w-5 text-white/60 group-data-[checked]:hidden transition-colors" />
      <CircleDot className="text-brand hidden h-5 w-5 group-data-[checked]:block transition-colors" />
      <span className="ml-4 flex-1 text-white/90">{children}</span>
    </Menu.Radio>
  );
}

// Enhanced slider component for numeric values with better styling
function Slider({ label, value, min, max, step, onChange, unit = '' }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
}) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-white/90 font-medium">{label}</span>
        <span className="text-brand font-bold text-lg">{value}{unit}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer slider focus:outline-none focus:ring-4 focus:ring-brand/50 transition-all duration-200"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-brand)) 0%, rgb(var(--color-brand)) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.2) 100%)`
          }}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
          }
          .slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.2s ease;
          }
          .slider::-moz-range-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0,0,0,0.4);
          }
        `}</style>
      </div>
    </div>
  );
}

// Enhanced color picker component with better styling
function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-white/90 font-medium">{label}</span>
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white/20 bg-transparent appearance-none overflow-hidden"
          />
          <div 
            className="absolute inset-1 rounded-lg pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
      </div>
    </div>
  );
}

// Dedicated Subtitle Menu Component
export function SubtitleMenu({ placement, tooltipPlacement }: {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}) {
  const captionOptions = useCaptionOptions();
  const { settings, updateSetting, resetCaptionStyles } = usePlayer();

  return (
    <Menu.Root className="parent relative">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <SubtitlesIcon className="w-5 h-5" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Subtitles
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={`${menuClass} menu-scrollbar`} placement={placement}>
        <div className="w-full flex flex-col">
          <div className={sectionHeaderClass}>
            <SubtitlesIcon className="w-5 h-5 text-yellow-400" />
            <span>Subtitle</span>
          </div>
          
          <div className="px-3 py-2">
            <div className="text-sm text-white/60 mb-2">Language</div>
            <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={captionOptions.selectedValue}>
              {captionOptions.map(({ label, value, select }) => (
                <Radio value={value} onSelect={select} key={value}>{label}</Radio>
              ))}
            </Menu.RadioGroup>
          </div>
          
          <div className="my-2 border-t border-white/10"></div>
          
          <Slider
            label="Font Size"
            value={parseInt(settings.fontSize.replace('%', ''))}
            min={75}
            max={200}
            step={25}
            onChange={(value) => updateSetting('fontSize', `${value}%`)}
            unit="%"
          />
          
          <div className="my-2 border-t border-white/10"></div>
          
          <div className="px-3 py-2">
            <div className="text-sm text-white/60 mb-2">Font Family</div>
            <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.fontFamily}>
              <Radio onSelect={() => updateSetting('fontFamily', 'sans-serif')}>Sans-serif</Radio>
              <Radio onSelect={() => updateSetting('fontFamily', 'serif')}>Serif</Radio>
              <Radio onSelect={() => updateSetting('fontFamily', 'monospace')}>Monospace</Radio>
            </Menu.RadioGroup>
          </div>

          <div className="my-2 border-t border-white/10"></div>
          
          <div className="px-3 py-2">
            <div className="text-sm text-white/60 mb-2">Font Weight</div>
            <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.fontWeight}>
              <Radio onSelect={() => updateSetting('fontWeight', 'normal')}>Normal</Radio>
              <Radio onSelect={() => updateSetting('fontWeight', 'bold')}>Bold</Radio>
            </Menu.RadioGroup>
          </div>

          <div className="my-2 border-t border-white/10"></div>

          <ColorPicker
            label="Text Color"
            value={settings.textColor}
            onChange={(value) => updateSetting('textColor', value)}
          />

          <div className="my-2 border-t border-white/10"></div>

          <ColorPicker
            label="Background Color"
            value={settings.backgroundColor}
            onChange={(value) => updateSetting('backgroundColor', value)}
          />

          <div className="my-2 border-t border-white/10"></div>

          <ColorPicker
            label="Window Color"
            value={settings.windowColor}
            onChange={(value) => updateSetting('windowColor', value)}
          />

          <div className="my-2 border-t border-white/10"></div>

          <div className="px-3 py-2">
            <div className="text-sm text-white/60 mb-2">Text Shadow</div>
            <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.textShadow}>
              <Radio onSelect={() => updateSetting('textShadow', 'none')}>None</Radio>
              <Radio onSelect={() => updateSetting('textShadow', 'soft')}>Soft</Radio>
              <Radio onSelect={() => updateSetting('textShadow', 'hard')}>Hard</Radio>
            </Menu.RadioGroup>
          </div>
          
          <div className="my-2 border-t border-white/10"></div>
          
          <div className="px-3 py-2">
            <div className="text-sm text-white/60 mb-2">Position</div>
            <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.position}>
              <Radio onSelect={() => updateSetting('position', 'top')}>Top</Radio>
              <Radio onSelect={() => updateSetting('position', 'center')}>Center</Radio>
              <Radio onSelect={() => updateSetting('position', 'bottom')}>Bottom</Radio>
            </Menu.RadioGroup>
          </div>
          
          <div className="my-2 border-t border-white/10"></div>
          
          <button
            className={menuItemClass}
            onClick={resetCaptionStyles}
          >
            <RotateCcw className="w-5 h-5 mr-3" />
            <span>Reset Subtitle Settings</span>
          </button>
        </div>
      </Menu.Content>
    </Menu.Root>
  );
}

type SubmenuType = 'main' | 'accessibility' | 'playback' | 'audio-booster' | 'subtitle' | 'customize';

export function Settings({ placement, tooltipPlacement }: {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}) {
  const [activeSubmenu, setActiveSubmenu] = useState<SubmenuType>('main');
  
  const captionOptions = useCaptionOptions();
  const playbackRateOptions = usePlaybackRateOptions();
  const { settings, updateSetting, resetCaptionStyles } = usePlayer();

  const renderMainMenu = () => (
    <div className="w-full flex flex-col space-y-1">
      <div className={sectionHeaderClass}>
        <SettingsIcon className="w-5 h-5" />
        <span>Settings</span>
      </div>
      
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('accessibility')}
      >
        <Accessibility className="w-5 h-5 text-blue-400" />
        <span className="ml-3 flex-1">Accessibility</span>
        <ChevronRight className="ml-2 h-4 w-4 text-white/50" />
      </button>
      
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('playback')}
      >
        <Play className="w-5 h-5 text-green-400" />
        <span className="ml-3 flex-1">Playback</span>
        <span className="ml-auto text-sm text-white/50">{playbackRateOptions.selectedValue === '1' ? 'Normal' : playbackRateOptions.selectedValue + 'x'}</span>
        <ChevronRight className="ml-2 h-4 w-4 text-white/50" />
      </button>
      
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('audio-booster')}
      >
        <Volume2 className="w-5 h-5 text-purple-400" />
        <span className="ml-3 flex-1">Audio Booster</span>
        <span className="ml-auto text-sm text-white/50">{Math.round(settings.volumeBoost * 100)}%</span>
        <ChevronRight className="ml-2 h-4 w-4 text-white/50" />
      </button>
      
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('subtitle')}
        disabled={captionOptions.disabled}
      >
        <SubtitlesIcon className="w-5 h-5 text-yellow-400" />
        <span className="ml-3 flex-1">Subtitle</span>
        <span className="ml-auto text-sm text-white/50">{captionOptions.selectedTrack?.label ?? 'Off'}</span>
        <ChevronRight className="ml-2 h-4 w-4 text-white/50" />
      </button>
      
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('customize')}
      >
        <Palette className="w-5 h-5 text-pink-400" />
        <span className="ml-3 flex-1">Customize</span>
        <span className="ml-auto text-sm text-white/50">{settings.theme}</span>
        <ChevronRight className="ml-2 h-4 w-4 text-white/50" />
      </button>
    </div>
  );

  const renderAccessibilityMenu = () => (
    <div className="w-full flex flex-col">
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('main')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <Accessibility className="w-5 h-5 text-blue-400" />
        <span className="ml-3">Accessibility</span>
      </button>
      <div className="my-2 border-t border-white/10"></div>
      
      <ToggleSwitch
        checked={settings.highContrast}
        onChange={(checked) => updateSetting('highContrast', checked)}
        label="High Contrast Mode"
      />
      
      <ToggleSwitch
        checked={settings.focusIndicators}
        onChange={(checked) => updateSetting('focusIndicators', checked)}
        label="Enhanced Focus Indicators"
      />
      
      <ToggleSwitch
        checked={settings.reducedMotion}
        onChange={(checked) => updateSetting('reducedMotion', checked)}
        label="Reduced Motion"
      />
    </div>
  );

  const renderPlaybackMenu = () => (
    <div className="w-full flex flex-col">
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('main')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <Play className="w-5 h-5 text-green-400" />
        <span className="ml-3">Playback</span>
      </button>
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Speed</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={playbackRateOptions.selectedValue}>
          {playbackRateOptions.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>{label}</Radio>
          ))}
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <ToggleSwitch
        checked={settings.loop}
        onChange={(checked) => updateSetting('loop', checked)}
        label="Loop Video"
      />
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Skip Interval</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.skipInterval.toString()}>
          {[5, 10, 15, 30].map((seconds) => (
            <Radio 
              key={seconds} 
              value={seconds.toString()} 
              onSelect={() => updateSetting('skipInterval', seconds)}
            >
              {seconds} seconds
            </Radio>
          ))}
        </Menu.RadioGroup>
      </div>
    </div>
  );

  const renderAudioBoosterMenu = () => (
    <div className="w-full flex flex-col">
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('main')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <Volume2 className="w-5 h-5 text-purple-400" />
        <span className="ml-3">Audio Booster</span>
      </button>
      <div className="my-2 border-t border-white/10"></div>
      
      <Slider
        label="Volume Boost"
        value={Math.round(settings.volumeBoost * 100)}
        min={50}
        max={200}
        step={10}
        onChange={(value) => updateSetting('volumeBoost', value / 100)}
        unit="%"
      />
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Audio Equalizer</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.audioEqualizer}>
          <Radio value="none" onSelect={() => updateSetting('audioEqualizer', 'none')}>None</Radio>
          <Radio value="bass" onSelect={() => updateSetting('audioEqualizer', 'bass')}>Bass Boost</Radio>
          <Radio value="treble" onSelect={() => updateSetting('audioEqualizer', 'treble')}>Treble Boost</Radio>
          <Radio value="vocal" onSelect={() => updateSetting('audioEqualizer', 'vocal')}>Vocal Enhance</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <ToggleSwitch
        checked={settings.audioNormalization}
        onChange={(checked) => updateSetting('audioNormalization', checked)}
        label="Audio Normalization"
      />
      
      <ToggleSwitch
        checked={settings.monoAudio}
        onChange={(checked) => updateSetting('monoAudio', checked)}
        label="Mono Audio"
      />
    </div>
  );

  const renderSubtitleMenu = () => (
    <div className="w-full flex flex-col">
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('main')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <SubtitlesIcon className="w-5 h-5 text-yellow-400" />
        <span className="ml-3">Subtitle</span>
      </button>
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Language</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={captionOptions.selectedValue}>
          {captionOptions.map(({ label, value, select }) => (
            <Radio value={value} onSelect={select} key={value}>{label}</Radio>
          ))}
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Font Size</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.fontSize}>
          <Radio onSelect={() => updateSetting('fontSize', '75%')}>Small</Radio>
          <Radio onSelect={() => updateSetting('fontSize', '100%')}>Medium</Radio>
          <Radio onSelect={() => updateSetting('fontSize', '125%')}>Large</Radio>
          <Radio onSelect={() => updateSetting('fontSize', '150%')}>Extra Large</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Font Family</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.fontFamily}>
          <Radio onSelect={() => updateSetting('fontFamily', 'sans-serif')}>Sans-serif</Radio>
          <Radio onSelect={() => updateSetting('fontFamily', 'serif')}>Serif</Radio>
          <Radio onSelect={() => updateSetting('fontFamily', 'monospace')}>Monospace</Radio>
        </Menu.RadioGroup>
      </div>

      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Font Weight</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.fontWeight}>
          <Radio onSelect={() => updateSetting('fontWeight', 'normal')}>Normal</Radio>
          <Radio onSelect={() => updateSetting('fontWeight', 'bold')}>Bold</Radio>
        </Menu.RadioGroup>
      </div>

      <div className="my-2 border-t border-white/10"></div>

      <ColorPicker
        label="Text Color"
        value={settings.textColor}
        onChange={(value) => updateSetting('textColor', value)}
      />

      <div className="my-2 border-t border-white/10"></div>

      <ColorPicker
        label="Background Color"
        value={settings.backgroundColor}
        onChange={(value) => updateSetting('backgroundColor', value)}
      />

      <div className="my-2 border-t border-white/10"></div>

      <ColorPicker
        label="Window Color"
        value={settings.windowColor}
        onChange={(value) => updateSetting('windowColor', value)}
      />

      <div className="my-2 border-t border-white/10"></div>

      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Text Shadow</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.textShadow}>
          <Radio onSelect={() => updateSetting('textShadow', 'none')}>None</Radio>
          <Radio onSelect={() => updateSetting('textShadow', 'soft')}>Soft</Radio>
          <Radio onSelect={() => updateSetting('textShadow', 'hard')}>Hard</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Position</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.position}>
          <Radio onSelect={() => updateSetting('position', 'top')}>Top</Radio>
          <Radio onSelect={() => updateSetting('position', 'center')}>Center</Radio>
          <Radio onSelect={() => updateSetting('position', 'bottom')}>Bottom</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <button
        className={menuItemClass}
        onClick={resetCaptionStyles}
      >
        <RotateCcw className="w-5 h-5 mr-3" />
        <span>Reset Subtitle Settings</span>
      </button>
    </div>
  );

  const renderCustomizeMenu = () => (
    <div className="w-full flex flex-col">
      <button
        className={menuItemClass}
        onClick={() => setActiveSubmenu('main')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        <Palette className="w-5 h-5 text-pink-400" />
        <span className="ml-3">Customize</span>
      </button>
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Theme</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.theme}>
          <Radio onSelect={() => updateSetting('theme', 'dark')}>Dark</Radio>
          <Radio onSelect={() => updateSetting('theme', 'light')}>Light</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Control Bar Mode</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.controlBar}>
          <Radio onSelect={() => updateSetting('controlBar', 'auto-hide')}>Auto</Radio>
          <Radio onSelect={() => updateSetting('controlBar', 'always')}>Always Visible</Radio>
          <Radio onSelect={() => updateSetting('controlBar', 'minimal')}>Minimal</Radio>
        </Menu.RadioGroup>
      </div>
      
      <div className="my-2 border-t border-white/10"></div>
      
      <ToggleSwitch
        checked={settings.gestureControls}
        onChange={(checked) => updateSetting('gestureControls', checked)}
        label="Gesture Controls"
      />
      
      <div className="my-2 border-t border-white/10"></div>
      
      <div className="px-3 py-2">
        <div className="text-sm text-white/60 mb-2">Keyboard Shortcuts</div>
        <Menu.RadioGroup className="w-full flex flex-col space-y-1" value={settings.keyboardShortcuts}>
          <Radio onSelect={() => updateSetting('keyboardShortcuts', 'enabled')}>Enabled</Radio>
          <Radio onSelect={() => updateSetting('keyboardShortcuts', 'disabled')}>Disabled</Radio>
        </Menu.RadioGroup>
      </div>
    </div>
  );

  return (
    <Menu.Root className="parent relative">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className={buttonClass}>
            <SettingsIcon className="w-5 h-5" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className={tooltipClass} placement={tooltipPlacement}>
          Settings
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className={`${menuClass} menu-scrollbar`} placement={placement}>
        {activeSubmenu === 'main' && renderMainMenu()}
        {activeSubmenu === 'accessibility' && renderAccessibilityMenu()}
        {activeSubmenu === 'playback' && renderPlaybackMenu()}
        {activeSubmenu === 'audio-booster' && renderAudioBoosterMenu()}
        {activeSubmenu === 'subtitle' && renderSubtitleMenu()}
        {activeSubmenu === 'customize' && renderCustomizeMenu()}
      </Menu.Content>
    </Menu.Root>
  );
}

