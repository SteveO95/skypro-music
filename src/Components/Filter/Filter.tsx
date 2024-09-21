'use client';
import { useState } from 'react';
import { getUniqueValues } from '../../helpers/getUniqueValues';
import { useAppSelector } from '../../store/store';
import styles from './Filter.module.css';
import FilterItem from './FilterItem/FilterItem';

const DATES_FILTER: string[] = [
	'По умолчанию',
	'Сначала новые',
	'Сначала старые',
];

const Filter = () => {
	const tracks = useAppSelector(state => state.track.currentPlaylistState);

	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
	const authorList = tracks ? getUniqueValues(tracks, 'author') : [];
	const genreList = tracks ? getUniqueValues(tracks, 'genre') : [];

	const handleFilter = (newFilter: string) => {
		setSelectedFilter(currentFilter =>
			currentFilter === newFilter ? null : newFilter
		);
	};

	return (
		<div className={styles.filter}>
			<div className={styles.filterTitle}>Искать по:</div>
			<FilterItem
				title={'исполнителю'}
				isActive={selectedFilter == 'исполнителю'}
				filterList={authorList}
				handleFilter={handleFilter}
			/>
			<FilterItem
				title={'году выпуска'}
				isActive={selectedFilter == 'году выпуска'}
				filterList={DATES_FILTER}
				handleFilter={handleFilter}
			/>
			<FilterItem
				title={'жанру'}
				isActive={selectedFilter == 'жанру'}
				filterList={genreList}
				handleFilter={handleFilter}
			/>
		</div>
	);
};

export default Filter;
