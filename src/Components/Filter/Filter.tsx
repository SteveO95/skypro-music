'use client';
import { useState } from 'react';
import { PlaylistType } from '../../types/playlist';
import { getUniqueValues } from '../../utils/getUniqueValues';
import styles from './Filter.module.css';
import FilterItem from './FilterItem/FilterItem';

const SORT_OPTIONS = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

type FilterProps = {
	tracks: PlaylistType[];
};

const Filter = ({ tracks }: FilterProps) => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const handleFilter = (filterName: string) => {
		setActiveFilter(prev => (prev === filterName ? null : filterName));
	};

	const filters = [
		{
			title: 'исполнителю',
			key: 'author',
			list: getUniqueValues(tracks, 'author'),
		},
		{
			title: 'году выпуска',
			key: 'year',
			list: SORT_OPTIONS,
		},
		{
			title: 'жанру',
			key: 'genre',
			list: getUniqueValues(tracks, 'genre'),
		},
	];

	return (
		<div className={styles.centerblockFilter}>
			<div className={styles.filterTitle}>Искать по:</div>
			{filters.map(filter => (
				<FilterItem
					key={filter.title}
					title={filter.title}
					isActive={activeFilter === filter.title}
					list={filter.list}
					handleFilter={() => handleFilter(filter.title)}
				/>
			))}
		</div>
	);
};

export default Filter;
