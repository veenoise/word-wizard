'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type TypeMusicContext = {
  bgMusic1: HTMLAudioElement | null;
  soundEffect1: HTMLAudioElement | null;
  soundEffect2: HTMLAudioElement | null;
  soundEffect3: HTMLAudioElement | null;
  soundEffect4: HTMLAudioElement | null;
};

const MusicContext = createContext<TypeMusicContext | undefined>(undefined);

export const AudioContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [audioElements, setAudioElements] = useState<TypeMusicContext>({
    bgMusic1: null,
    soundEffect1: null,
    soundEffect2: null,
    soundEffect3: null,
    soundEffect4: null,
  });

  useEffect(() => {
    // Initialize audio objects only in the browser
    setAudioElements({
      bgMusic1: Object.assign(new Audio('/bg-music-1.ogg'), { loop: true }),
      soundEffect1: new Audio('/18_Thunder_02.wav'),
      soundEffect2: new Audio('/46_Poison_01.wav'),
      soundEffect3: new Audio('/21_Debuff_01.wav'),
      soundEffect4: new Audio('/48_Speed_up_02.wav'),
    });
  }, []);

  return (
    <MusicContext.Provider value={audioElements}>
      {children}
    </MusicContext.Provider>
  );
};

export function useMusicContext() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusicContext must be used within an AudioContextWrapper');
  }
  return context;
}