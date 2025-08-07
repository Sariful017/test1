import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaPlayerInstance,
} from "@vidstack/react";
import { VideoLayout } from "./VideoLayout";
import { useRef, useState, useMemo, useEffect } from "react";
import {
  PlayerProvider,
  defaultSettings,
  type PlayerSettings,
} from "@/contexts/PlayerContext";

type VidstackStyle = React.CSSProperties & { [key: `--${string}`]: string | number | null };

interface PlayerProps {
  title: string;
  src: string;
  poster: string;
  subtitles: { src: string; label: string; language: string; kind: "subtitles"; default?: boolean }[];
}

export function Player({ title, src, poster, subtitles }: PlayerProps) {
  const player = useRef<MediaPlayerInstance>(null);
  const [settings, setSettings] = useState<PlayerSettings>(defaultSettings);
  const [captionStyle, setCaptionStyle] = useState<VidstackStyle>({});

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("player-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("player-settings", JSON.stringify(settings));
  }, [settings]);

  // Helper function to convert rgba to hex
  const rgbaToHex = (rgba: string): string => {
    if (rgba.startsWith('#')) return rgba;

    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return rgba;

    // FIX: Removed the unused 'a' variable to resolve the ESLint warning.
    const [, r, g, b] = match;
    const hex = '#' + [r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    return hex;
  };

  // Apply settings to player and caption styles
  useEffect(() => {
    const newCaptionStyle: VidstackStyle = {
      "--cue-font-size": settings.fontSize,
      "--cue-font-family": settings.fontFamily,
      "--cue-font-weight": settings.fontWeight,
      "--cue-color": rgbaToHex(settings.textColor),
      "--cue-bg-color": rgbaToHex(settings.backgroundColor),
      "--cue-window-color": rgbaToHex(settings.windowColor),
    };

    // Apply text shadow (keep as rgba for text-shadow as it supports alpha)
    if (settings.textShadow === "none") {
      newCaptionStyle["--cue-text-shadow"] = "none";
    } else if (settings.textShadow === "soft") {
      newCaptionStyle["--cue-text-shadow"] = "1px 1px 2px rgba(0,0,0,0.8)";
    } else if (settings.textShadow === "hard") {
      newCaptionStyle["--cue-text-shadow"] = "2px 2px 4px rgba(0,0,0,0.9)";
    }

    // Apply outline (keep as rgba for stroke as it supports alpha)
    if (settings.outline) {
      newCaptionStyle["--cue-text-stroke"] = "1px rgba(0,0,0,0.8)";
    } else {
      newCaptionStyle["--cue-text-stroke"] = "none";
    }

    setCaptionStyle(newCaptionStyle);

    // Apply audio settings to player
    if (player.current) {
      const mediaPlayer = player.current;

      // Apply volume boost
      if (settings.volumeBoost !== 1.0) {
        mediaPlayer.volume = Math.min(mediaPlayer.volume * settings.volumeBoost, 1.0);
      }

      // Note: Loop setting is handled via the MediaPlayer component props
      // Audio normalization and mono audio would require more complex audio processing
      // These would typically be handled by the media source or additional audio processing libraries
    }
  }, [settings]);

  // Apply theme and accessibility settings to the player container
  const playerClassName = useMemo(() => {
    let className = "relative w-full max-w-6xl mx-auto bg-slate-900 text-white font-sans rounded-lg ring-media-focus data-[focus]:ring-4 shadow-2xl";

    // Add proper aspect ratio with responsive behavior
    className += " aspect-video";

    // Add responsive constraints - better height management
    className += " max-h-[85vh] min-h-[280px] h-auto";

    // Ensure overflow is visible so controls don't get cut off
    className += " overflow-visible";

    // Add responsive width constraints for different screen sizes
    className += " max-w-[95vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl";

    if (settings.highContrast) {
      className += " contrast-125 brightness-110";
    }

    if (settings.reducedMotion) {
      className += " motion-reduce:transition-none";
    } else {
      className += " transition-all duration-300 ease-in-out";
    }

    if (settings.theme === "light") {
      className = className.replace("bg-slate-900", "bg-slate-100").replace("text-white", "text-black");
    }

    return className;
  }, [settings.highContrast, settings.reducedMotion, settings.theme]);

  const playerContextValue = useMemo(() => ({
    settings,
    updateSetting: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    resetSettings: () => {
      setSettings(defaultSettings);
      localStorage.removeItem("player-settings");
    },
    resetCaptionStyles: () => {
      setSettings((prev) => ({
        ...prev,
        fontSize: defaultSettings.fontSize,
        fontFamily: defaultSettings.fontFamily,
        fontWeight: defaultSettings.fontWeight,
        textColor: defaultSettings.textColor,
        backgroundColor: defaultSettings.backgroundColor,
        windowColor: defaultSettings.windowColor, // Reset window color
        outline: defaultSettings.outline,
        textShadow: defaultSettings.textShadow, // Reset text shadow
        position: defaultSettings.position,
      }));
    },
  }), [settings]);

  return (
    <PlayerProvider value={playerContextValue}>
      <MediaPlayer
        className={playerClassName}
        style={captionStyle}
        title={title}
        src={src}
        crossOrigin
        playsInline
        ref={player}
        autoPlay={settings.autoplay}
        loop={settings.loop}
      >
        <MediaProvider>
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src={poster}
            alt={`Poster for ${title}`}
          />
          {subtitles.map((track) => (
            <Track {...track} key={track.src} />
          ))}
        </MediaProvider>
        <VideoLayout />
      </MediaPlayer>
    </PlayerProvider>
  );
}
