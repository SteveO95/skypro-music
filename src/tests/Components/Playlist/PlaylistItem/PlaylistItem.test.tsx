import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import PlaylistItem from "@/components/Playlist/PlaylistItem/PlaylistItem";
import useLikeTrack from "@/hooks/useLikeTrack";
import { TrackType } from "@/types/tracks";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { trackReducer } from "@/store/features/trackSlice";

jest.mock("@/hooks/useLikeTrack", () => ({ default: jest.fn(), __esModule: true }));

jest.mock("@/store/store", () => ({ useAppDispatch: jest.fn(), useAppSelector: jest.fn() }));

const track: TrackType = {
  id: 1,
  name: "Live to win",
  author: "Paul Stanley",
  release_date: "24.10.2006",
  genre: "Hard rock",
  duration_in_seconds: 190,
  album: "Live to Win",
  logo: null,
  track_file: "https://example.com/track.mp3",
  stared_user: [],
};

const store = configureStore({
  reducer: {
    track: trackReducer,
  },
});

const setup = () =>
  render(
    <Provider store={store}>
      <PlaylistItem track={track} />
    </Provider>
  );

describe("PlaylistItem", () => {
  (useLikeTrack as jest.Mock).mockReturnValue({
    isLiked: false,
    handleLike: jest.fn(),
  });
  (useAppSelector as jest.Mock).mockImplementation((selector) =>
    selector({
      track: {
        currentTrackState: null,
        isPlayingState: false,
      },
    })
  );
  const dispatch = jest.fn();
  (useAppDispatch as jest.Mock).mockReturnValue(dispatch);

  it("Должен вернуться объект со сведениями о треке", () => {
    setup();

    expect(screen.getByText("Live to win")).toBeInTheDocument();
    expect(screen.getByText("Live to win")).toBeInTheDocument();
  });
});
