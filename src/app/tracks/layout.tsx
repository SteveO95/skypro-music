import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import Sidebar from "@/components/Sidebar/Sidebar";
import Wrapper from "@/components/Wrapper/Wrapper";
import { ReactNode } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import styles from "./page.module.css";
// import { Main } from "next/document";

export default function TracksLayout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <main className={styles.main}>
          <Nav />
          {children}
          <Sidebar />
        </main>
        <Bar />
        <Footer />
      </SkeletonTheme>
    </Wrapper>
  );
}
