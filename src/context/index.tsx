'use client'

import React, { createContext, useContext } from 'react'

const MusicContext = createContext<typeMusicContext|undefined>(undefined);
type typeMusicContext = {
  bgMusic1: HTMLAudioElement,
  soundEffect1: HTMLAudioElement,
  soundEffect2: HTMLAudioElement,
  soundEffect3: HTMLAudioElement,
  soundEffect4: HTMLAudioElement,
}

export const AudioContextWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  => {
  const bgMusic1 = new Audio('/bg-music-1.ogg');
  bgMusic1.loop = true;
  const soundEffect1 = new Audio('/18_Thunder_02.wav');
  const soundEffect2 = new Audio('/46_Poison_01.wav');
  const soundEffect3 = new Audio('/21_Debuff_01.wav');
  const soundEffect4 = new Audio('/48_Speed_up_02.wav');
  return (
    <MusicContext.Provider value={{ bgMusic1, soundEffect1, soundEffect2, soundEffect3, soundEffect4 }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusicContext() {
  return useContext(MusicContext);
}