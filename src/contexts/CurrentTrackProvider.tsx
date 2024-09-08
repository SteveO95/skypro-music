'use client';

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { PlaylistType } from '../types/playlist';

type CurrentTrackContextValue = {
	currentTrack: PlaylistType | null;
	setCurrentTrack: Dispatch<SetStateAction<PlaylistType | null>>;
};

const CurrentTrackContext = createContext<CurrentTrackContextValue | undefined>(
	undefined
);

type CurrentTrackProviderProps = {
	children: ReactNode;
};

export function CurrentTrackProvider({ children }: CurrentTrackProviderProps) {
	const [currentTrack, setCurrentTrack] = useState<PlaylistType | null>(null);

	return (
		<CurrentTrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
			{children}
		</CurrentTrackContext.Provider>
	);
}

export function useCurrentTrack() {
	const context = useContext(CurrentTrackContext);
	if (context === undefined) {
		throw new Error('useCurrentTrack должен использоваться внутри провайдера');
	}
	return context;
}
