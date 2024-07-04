"use client";
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './ContentPlaylist.module.css';
import PlayListItem from '../PlaylistItem/PlayListItem';
import { getTracks } from '../../api/tracks/tracks';

export default function ContentPlaylist() {
  const [tracks, setTracks] = useState(null);
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки данных
  const [error, setError] = useState(null); // Состояние для отслеживания ошибок

  useEffect(() => {
    async function fetchTracks() {
      const response = await getTracks();
      if (response.error) {
        setError(response.error); // Установка сообщения об ошибке, если оно есть
        setLoading(false); // Загрузка завершена
      } else {
        setTracks(response.data); // Установка данных треков
        setLoading(false); // Загрузка завершена
      }
    }

    fetchTracks();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Показывать загрузку, пока данные не будут получены
  }

  if (error) {
    return <div>Error: {error}</div>; // Показывать ошибку, если она произошла
  }

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {tracks.map((item) => (
        <PlayListItem key={item.id} item={item} /> // Используйте уникальный id в качестве ключа
      ))}
    </div>
  );
}