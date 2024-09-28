import { getPlaylist, getSelectionPlaylist } from "@/api/playlist";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { PlaylistType } from "@/types/playlist";

type selectionPageType = {
  params: { id: string };
};

const selectionPage = async ({ params }: selectionPageType) => {
  
  const selectionData = await getSelectionPlaylist(params.id);

  const allTracks: PlaylistType[] = await getPlaylist();

  const selectedTracks = allTracks.filter((track) =>
    selectionData.includes(track._id)
  );
  const title = "подборка"
  return <CenterBlock tracks={selectedTracks} title={title} />;
};

export default selectionPage;
