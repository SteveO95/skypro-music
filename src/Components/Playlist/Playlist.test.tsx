import { render, screen } from "@testing-library/react";
import Playlist from "./Playlist";
import { PlaylistType } from "@/types/playlist";
import "@testing-library/jest-dom";
import ReduxProvider from "@/store/ReduxProvider";
import { PlayerStateProvider } from "@/contexts/PlayerStateContext";

// Пример данных для теста
const mockTracks: PlaylistType[] = [
  {
    _id: 1,
    name: "Test Track 1",
    author: "Test Artist 1",
    release_date: "2024-01-01",
    genre: "Pop",
    duration_in_seconds: 180,
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

describe("Playlist component", () => {
  beforeEach(() =>
    render(
      <ReduxProvider>
        <PlayerStateProvider>
          <Playlist tracks={mockTracks} />;
        </PlayerStateProvider>
      </ReduxProvider>
    )
  );
  it("должны правильно отображать названия плейлистов", () => {
    expect(screen.getByText("Трек")).toBeInTheDocument();
    expect(screen.getByText("Исполнитель")).toBeInTheDocument();
    expect(screen.getByText("Альбом")).toBeInTheDocument();
  });

  it("должен рендерить все треки", () => {
    expect(screen.getByText("Test Track 1")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Test Album 1")).toBeInTheDocument();

    expect(screen.getByText("Test Track 2")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Test Album 2")).toBeInTheDocument();
  });
});
