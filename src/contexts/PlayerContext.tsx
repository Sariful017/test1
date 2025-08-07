
import { createContext, useContext, type ReactNode } from 'react';

export interface PlayerSettings {
  // Accessibility
  highContrast: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  
  // Playback
  loop: boolean;
  autoplay: boolean;
  skipInterval: number; // in seconds
  
  // Audio Booster
  volumeBoost: number; // 1.0 = 100%, 2.0 = 200%
  audioEqualizer: 'none' | 'bass' | 'treble' | 'vocal';
  audioNormalization: boolean;
  monoAudio: boolean;
  
  // Subtitle
  fontSize: string;
  fontFamily: 'sans-serif' | 'serif' | 'monospace';
  fontWeight: 'normal' | 'bold';
  textColor: string;
  backgroundColor: string;
  windowColor: string; // New: Subtitle window background color
  outline: boolean;
  textShadow: 'none' | 'soft' | 'hard'; // New: Subtitle text shadow
  position: 'top' | 'center' | 'bottom';
  
  // Customize
  theme: 'dark' | 'light' | 'auto';
  controlBar: 'always' | 'auto-hide' | 'minimal';
  thumbnailPreview: boolean;
  gestureControls: boolean;
  keyboardShortcuts: 'enabled' | 'disabled';
}

export interface PlayerContextValue {
  settings: PlayerSettings;
  updateSetting: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
  resetSettings: () => void;
  resetCaptionStyles: () => void;
}

const defaultSettings: PlayerSettings = {
  // Accessibility
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
  
  // Playback
  loop: false,
  autoplay: false,
  skipInterval: 10,
  
  // Audio Booster
  volumeBoost: 1.0,
  audioEqualizer: 'none',
  audioNormalization: false,
  monoAudio: false,
  
  // Subtitle
  fontSize: '100%',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  textColor: '#ffffff',
  backgroundColor: '#000000', // Changed from rgba(0, 0, 0, 0.7) to hex
  windowColor: '#000000', // Changed from rgba(0, 0, 0, 0) to hex (transparent black)
  outline: true,
  textShadow: 'soft', // Default: soft shadow
  position: 'bottom',
  
  // Customize
  theme: 'dark',
  controlBar: 'auto-hide',
  thumbnailPreview: true,
  gestureControls: true,
  keyboardShortcuts: 'enabled',
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
  value: PlayerContextValue;
}

export function PlayerProvider({ children, value }: PlayerProviderProps) {
  return (
    <PlayerContext.Provider value={value}>
        {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export { defaultSettings };


