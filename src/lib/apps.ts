export type AppId = "hyper" | "pk-movie" | "pk-spotify" | "youtube-premium" | "yt-activator";

export interface AppMeta {
  id: AppId;
  name: string;
  tag: string;
  desc: string;
  long: string;
  hue: number;          // accent hue
  glyph: string;        // unicode glyph fallback
  icon: string;         // path to PNG icon in /public/icons/
  preview: string;      // path to PNG preview/screenshot in /public/previews/
  features: string[];
}

export const APPS: AppMeta[] = [
  {
    id: "hyper",
    name: "Hyper",
    tag: "Velocity Engine",
    desc: "A fluid speed launcher that bends interface time around you.",
    long: "Hyper rebuilds your device's response surface — gestures, transitions, and motion all rendered through a unified velocity engine. Every tap arrives a frame earlier.",
    hue: 165,
    glyph: "✦",
    icon: "/icons/hyper.png",
    features: ["120fps fluid gestures", "Predictive prefetch", "Adaptive haptics", "Zero-latency theming"],
  },
  {
    id: "pk-movie",
    name: "PK Movie",
    tag: "Cinematic Vault",
    desc: "A holographic theatre — every film, framed in light.",
    long: "PK Movie is a curated cinematic vault. Stream, queue, and re-experience films inside a vivid, ambient interface engineered for immersion.",
    hue: 200,
    glyph: "◐",
    icon: "/icons/pk-movie.png",
    features: ["4K HDR streams", "Ambient room lighting sync", "Hyper-fast scrubber", "Personal cinema rooms"],
  },
  {
    id: "pk-spotify",
    name: "PK Spotify",
    tag: "Sound Reactor",
    desc: "Your music — rendered as living, reactive light.",
    long: "PK Spotify is a re-imagined music client. Visual EQ, lyric typography, and surface-level animation that breathes with every note.",
    hue: 145,
    glyph: "◉",
    icon: "/icons/pk-spotify.png",
    features: ["Lossless audio", "Reactive visualizer", "Lyric typography", "Cross-room playback"],
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    tag: "Pure Video",
    desc: "Background play, no ads, every pixel for the content.",
    long: "A purified video surface — uninterrupted, ambient, and engineered for focus. Premium playback wrapped in a cinematic shell.",
    hue: 15,
    glyph: "▶",
    icon: "/icons/youtube-premium.png",
    features: ["Ad-free playback", "Background audio", "Picture-in-Picture", "Offline downloads"],
  },
  {
    id: "yt-activator",
    name: "YT Activator",
    tag: "Access Module",
    desc: "Unlocks the premium layer with a single cinematic ritual.",
    long: "YT Activator is a precision tool — a one-tap ritual that unlocks the full premium video experience on any device.",
    hue: 280,
    glyph: "⬢",
    icon: "/icons/yt-activator.png",
    features: ["One-tap activation", "Multi-device sync", "Encrypted handshake", "Auto-renewal hooks"],
  },
];

export const getApp = (id: string) => APPS.find((a) => a.id === id);
