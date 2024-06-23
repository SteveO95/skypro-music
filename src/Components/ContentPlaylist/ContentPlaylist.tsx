import styles from "../ContentPlaylist/ContentPlaylist.module.css";
import PlayListItem from "../PlaylistItem/PlayListItem";
import classNames from "classnames";

export default function ContentPlaylist() {
  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      <PlayListItem />

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Elektro <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Dynoro, Outwork, Mr. Gee
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Elektro
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>2:22</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                I’m Fire <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Ali Bakgor
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              I’m Fire
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>2:22</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Non Stop
                <span className={styles.trackTitleSpan}>(Remix)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Стоункат, Psychopath
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Non Stop
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>4:12</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Run Run
                <span className={styles.trackTitleSpan}>(feat. AR/CO)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Jaded, Will Clarke, AR/CO
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Run Run
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>2:54</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Eyes on Fire
                <span className={styles.trackTitleSpan}>(Zeds Dead Remix)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Blue Foundation, Zeds Dead
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Eyes on Fire
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>5:20</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Mucho Bien
                <span className={styles.trackTitleSpan}>
                  (Hi Profile Remix)
                </span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              HYBIT, Mr. Black, Offer Nissim, Hi Profile
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Mucho Bien
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>3:41</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Knives n Cherries
                <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              minthaze
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Captivating
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>1:48</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                How Deep Is Your Love
                <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Calvin Harris, Disciples
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              How Deep Is Your Love
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>3:32</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={classNames(styles.playlistTrack, styles.track)}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <a className={styles.trackTitleLink} href="http://">
                Morena
                <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href="http://">
              Tom Boxer
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href="http://">
              Soundz Made in Romania
            </a>
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className={styles.trackTimeText}>3:36</span>
          </div>
        </div>
      </div>
    </div>
  );
}
