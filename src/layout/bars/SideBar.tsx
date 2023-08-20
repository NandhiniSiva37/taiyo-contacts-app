import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../assets/menu.png";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/reducer";

const sidebarData = [
  {
    title: "Contact",
    link: "contacts",
  },
  {
    title: "Charts and Maps",
    link: "charts",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleNavigation(val: any) {
    dispatch(setTitle(`${val.title} Page`));
    setSidebarOpen(false);
    navigate(val.link);
  }

  function toggleSidebar() {
    setSidebarOpen((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 p-4">
        <div
          className="focus:outline-none"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        >
          <img className="w-6 h-6" src={menuIcon} alt="Menu" />
        </div>
      </div>
      {sidebarOpen && (
        <div className="bg-btnBlue mt-14 h-screen w-[16rem] md:w-[12rem] lg:w-[16rem] fixed top-0 left-0 flex flex-col items-center overflow-hidden z-10">
          <ul className="p-0 text-center w-full overflow-y-auto max-h-screen md:max-h-[90vh]">
            {sidebarData.map((val, key) => (
              <li
                key={key}
                className={
                  window.location.pathname.includes(val.link.split("/")[0])
                    ? "flex items-center list-none my-2 md:my-3 lg:my-4 font-normal text-base text-primary-fontColor px-4 md:px-6 lg:px-8 text-buttonBlue"
                    : "flex items-center list-none my-2 md:my-3 lg:my-4 font-normal text-base text-primary-fontColor px-4 md:px-6 lg:px-8"
                }
              >
                <div
                  onClick={() => handleNavigation(val)}
                  className="flex items-center cursor-pointer w-full"
                >
                  <div>{val.title}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
