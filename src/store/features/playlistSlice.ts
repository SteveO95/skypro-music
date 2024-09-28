import { fetchFavoriteTracks } from "@/api/playlist";
import { PlaylistType } from "@/types/playlist";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavoriteTrack = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (tokens: { access: string; refresh: string }) => {
    const favoriteTracks = await fetchFavoriteTracks(tokens);
    return favoriteTracks;
  }
);

export type PlaylistStateType = {
  currentTrack: null | PlaylistType;
  playlist: PlaylistType[];
  shuffledPlaylist: PlaylistType[];
  isShuffle: boolean;
  likedPlaylist: PlaylistType[];
  initialTracks: PlaylistType[];
};

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  likedPlaylist: [],
  initialTracks: [],
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (
      state,
      action: PayloadAction<{
        track: null | PlaylistType;
        tracks: PlaylistType[];
      }>
    ) => {
      state.currentTrack = action.payload.track;
      state.initialTracks = action.payload.tracks;
      state.shuffledPlaylist = [...action.payload.tracks].sort(
        () => 0.5 - Math.random()
      );
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.initialTracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex + 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.initialTracks;
      const currentTrackIndex = playlist.findIndex(
        (track) => track._id === state.currentTrack?._id
      );
      const newTrack = playlist[currentTrackIndex - 1];
      if (newTrack) {
        state.currentTrack = newTrack;
      }
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setLikeTrack: (state, action: PayloadAction<number>) => {
      const trackId = action.payload;
      // добавить в likedPlaylist
      const track = state.initialTracks.find((track) => track._id === trackId);
      if (track && !state.likedPlaylist.includes(track)) {
        state.likedPlaylist.push(track);
      }
    },
    setDisLikeTrack: (state, action: PayloadAction<number>) => {
      const trackId = action.payload;
      // убрать из likedPlaylist
      state.likedPlaylist = state.likedPlaylist.filter(
        (track) => track._id !== trackId
      );
    },
    setInitialTracks: (state, action: PayloadAction<PlaylistType[]>) => {
      state.initialTracks = action.payload;
    },
    clearLikedTracks: (state) => {
      state.likedPlaylist = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getFavoriteTrack.fulfilled, (state, action) => {
      state.likedPlaylist = action.payload;
    });
    builder.addCase(getFavoriteTrack.rejected, (state, action) => {
      console.error("Error:", action.error.message);
    });
  },
});

export const {
  setCurrentTrack,
  setNextTrack,
  setPrevTrack,
  setIsShuffle,
  setDisLikeTrack,
  setLikeTrack,
  setInitialTracks,
  clearLikedTracks,
} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
