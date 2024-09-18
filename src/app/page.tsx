import Bar from '../components/Bar/Bar';
import Main from '../components/Main/Main';
import { CurrentTrackProvider } from '../contexts/CurrentTrackProvider';
import { PlayerStateProvider } from '../contexts/PlayerStateContext';

export default function Home() {
	return (
		<div className='wrapper'>
			<div className='container'>
				<PlayerStateProvider>
					<CurrentTrackProvider>
						<Main />
						<Bar />
					</CurrentTrackProvider>
				</PlayerStateProvider>
			</div>
		</div>
	);
}
