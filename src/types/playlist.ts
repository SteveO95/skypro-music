import { UserType } from './user';

export type PlaylistType = {
	_id(_id: any): { isLiked: any; handleLike: any };
	id: number;
	name: string;
	author: string;
	release_date: string;
	genre: string;
	duration_in_seconds: number;
	album: string;
	logo: string | null;
	track_file: string;
	stared_user: UserType[];
};
