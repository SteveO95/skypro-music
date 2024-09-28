import React from "react";
import renderer from "react-test-renderer";
import CenterBlock from "./CenterBlock";
import { PlaylistType } from "@/types/playlist";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { PlayerStateContext } from "@/contexts/PlayerStateContext";

const mockStore = configureStore();
const initialState = {
  user: {
    tokens: {
      access: "mockAccessToken",
      refresh: "mockRefreshToken",
    },
  },
  playlist: {
    likedPlaylist: [],
    tracks: [],
  },
  filters: {
    keyword: "",
    genres: [],
    authors: [],
    sortOrder: "По умолчанию",
  },
};
const store = mockStore(initialState);

const mockPlayerState = {
  isPlaying: false,
  setIsPlaying: jest.fn(),
};

it("корректный рендеринг треков и заголовков", () => {
  const mockTracks: PlaylistType[] = [
    {
      _id: 1,
      name: "Test Track 1",
      author: "Test Artist 1",
      release_date: "2024-01-01",
      genre: "Pop",
      duration_in_seconds: 200,
      album: "Test Album 1",
      logo: "/path/to/logo1.png",
      track_file: "/path/to/track1.mp3",
      stared_user: [],
    },
    {
      _id: 2,
      name: "Test Track 2",
      author: "Test Artist 2",
      release_date: "2024-02-01",
      genre: "Rock",
      duration_in_seconds: 210,
      album: "Test Album 2",
      logo: "/path/to/logo2.png",
      track_file: "/path/to/track2.mp3",
      stared_user: [],
    },
  ];

  const tree = renderer
    .create(
      <Provider store={store}>
        <PlayerStateContext.Provider value={mockPlayerState}>
          <CenterBlock tracks={mockTracks} title="Test Title" />
        </PlayerStateContext.Provider>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it("корректный рендеринг с ошибкой", () => {
  const mockTracks: PlaylistType[] = [];

  const tree = renderer
    .create(
      <Provider store={store}>
        <PlayerStateContext.Provider value={mockPlayerState}>
          <CenterBlock tracks={mockTracks} error="Произошла ошибка" />
        </PlayerStateContext.Provider>
      </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
