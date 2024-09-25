import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlaylistItemSkeleton from "@/components/Playlist/PlaylistItem/PlaylistItemSkeleton";

describe("PlaylistItemSkeleton", () => {
  it("Должен вернуть корректное количество элементов", () => {
    const items = 3;
    render(<PlaylistItemSkeleton items={items} />);

    const playlistItems = screen.getAllByTestId("playlist-item");
    expect(playlistItems.length).toBe(items);
  });

  it("Должнен вернуть 1 компонент по умолчанию", () => {
    render(<PlaylistItemSkeleton />);

    const playlistItems = screen.getAllByTestId("playlist-item");
    expect(playlistItems.length).toBe(1);
  });
});
