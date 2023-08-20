import { useOutlet } from "react-router-dom";
import SideBar from "./bars/SideBar";
import TopBar from "./bars/TopBar";

function MainLayout() {
  const outlet = useOutlet();
  return (
    <div className="min-h-screen">
      <SideBar />
      <div>
        <TopBar />
        <div className="mt-24 static w-full">{outlet}</div>
      </div>
    </div>
  );
}

export default MainLayout;
