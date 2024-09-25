import { getAllTracks } from "@/services/api";
import { TrackType } from "@/types/tracks";
import { useEffect, useState } from "react";

const useAllTracks = (): [TrackType[], boolean, boolean] => {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllTracks = async () => {
      try {
        const data = await getAllTracks();
        setTracks(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTracks();
  }, []);

  return [tracks, loading, error];
};

export default useAllTracks;
