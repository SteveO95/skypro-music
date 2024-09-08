"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type PlayerStateContextProps = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerStateContext = createContext<PlayerStateContextProps | undefined>(
  undefined
);

type PlayerStateProviderProps = {
  children: ReactNode;
};

export function PlayerStateProvider({ children }: PlayerStateProviderProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <PlayerStateContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayerStateContext.Provider>
  );
}

export function usePlayerState() {
  const context = useContext(PlayerStateContext);
  if (context === undefined) {
    throw new Error("usePlayerState должен использоваться внутри провайдера");
  }
  return context;
}
