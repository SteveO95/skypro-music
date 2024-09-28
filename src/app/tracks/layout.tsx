import Bar from "@/components/Bar/Bar";
import Navigation from "@/components/Navigation/Navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import { CurrentTrackProvider } from "@/contexts/CurrentTrackProvider";
import { PlayerStateProvider } from "@/contexts/PlayerStateContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <div className="container">
        <PlayerStateProvider>
          <CurrentTrackProvider>
            <Navigation />
            {children}
            <Sidebar />
            <Bar />
          </CurrentTrackProvider>
        </PlayerStateProvider>
      </div>
    </div>
  );
}
