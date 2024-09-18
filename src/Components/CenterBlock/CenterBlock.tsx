import Filter from '../../components/Filter/Filter';
import Playlist from '../../components/Playlist/Playlist';
import Search from '../../components/Search/Search';
import { PlaylistType } from '../../types/playlist';
import styles from './CenterBlock.module.css';

type CenterBlockProps = {
	tracks: PlaylistType[];
	error?: string;
};

const CenterBlock = ({ tracks, error }: CenterBlockProps) => {
	return (
		<div className={styles.mainCenterblock}>
			<Search />
			<h2 className={styles.centerblockHeader}>Треки</h2>
			<Filter tracks={tracks} />
			{error && <div className={styles.error}>{error}</div>}
			<Playlist tracks={tracks} />
		</div>
	);
};

export default CenterBlock;
