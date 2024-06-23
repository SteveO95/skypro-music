import Bar from "../Bar/Bar";
import CenterBlock from "../CenterBlock/CenterBlock";
import MainSlideBar from "../MainSlideBar/MainSlideBar";
import Nav from "../Nav/Nav";
import styles from "../Main/Main.module.css";

export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <CenterBlock />
        <MainSlideBar />
      </main>
      <Bar />
      <footer> </footer>
    </>
  );
}
