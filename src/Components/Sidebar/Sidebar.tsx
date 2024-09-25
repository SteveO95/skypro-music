"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Routes from "@/app/Routes";
import { setUserLogout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import useUserAuth from "@/hooks/useUserAuth";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { useEffect } from "react";
import { getCustomCatalogs } from "@/store/features/customCatalogSlice";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuth, setLogout } = useUserAuth();
  const username = useAppSelector((state) => state.auth.username);
  const customCatalogs = useAppSelector((state) => state.customCatalog.customCatalogs);

  const handleUserAuth = async () => {
    if (isAuth) setLogout();
    else router.push(Routes.SIGNIN);
  };

  useEffect(() => {
    const getCatalogs = async () => {
      await dispatch(getCustomCatalogs());
    };
    getCatalogs();
  }, []);

  return (
    <div className={styles.mainSidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>{username}</p>
        <div className={styles.sidebarIcon} onClick={handleUserAuth}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          {customCatalogs === undefined && (
            <>
              <Skeleton className={styles.sidebarItem} width={250} height={150} />
              <Skeleton className={styles.sidebarItem} width={250} height={150} />
              <Skeleton className={styles.sidebarItem} width={250} height={150} />
            </>
          )}

          {customCatalogs?.map((customCatalog) => (
            <div className={styles.sidebarItem} key={customCatalog._id}>
              <Link href={Routes.CUSTOMCATALOG(customCatalog._id)} className={styles.sidebarLink}>
                <Image
                  alt={customCatalog.name}
                  className={styles.sidebarImg}
                  src={customCatalog.imagePath}
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
