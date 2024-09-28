"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";
import {
  clearLikedTracks,
  setCurrentTrack,
} from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";
import Link from "next/link";
import { resetFilters } from "@/store/features/filtersSlice";

const playlists = [
  {
    id: 1,
    href: "/tracks/selection/2",
    src: "/img/playlist01.png",
    alt: "day's playlist",
  },
  {
    id: 2,
    href: "/tracks/selection/3",
    src: "/img/playlist02.png",
    alt: "100 dance hits",
  },
  {
    id: 3,
    href: "/tracks/selection/4",
    src: "/img/playlist03.png",
    alt: "indie charge",
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCurrentTrack({ track: null, tracks: [] }));
    dispatch(clearLikedTracks());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>
          {isClient ? user?.username || "Пользователь" : ""}
        </p>
        <div onClick={() => handleLogout()} className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {playlists.map((playlist) => (
            <div key={playlist.id} className={styles.sidebarItem}>
              <Link className={styles.sidebarLink} href={playlist.href} onClick={handleResetFilters}>
                <Image
                  priority={true}
                  alt={playlist.alt}
                  src={playlist.src}
                  width={250}
                  height={150}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
