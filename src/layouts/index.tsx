import React, { useState } from "react";
import Header from "../components/Header";
import { OpenSideNav } from "../components/icons";
import SideNav from "../components/SideNav";

type LayoutProps = {
  children: React.ReactNode;
};

const MainLayout = (props: LayoutProps) => {
  const [sideBar, setSideBar] = useState<boolean>(false);
  return (
    <div>
      <Header />
      <button
        type="button"
        className="openSideNavBtn"
        onClick={() => setSideBar(!sideBar)}
      >
        <OpenSideNav />
      </button>
      <div className="layout">
        <div className={`sideNavWrap ${sideBar && "openSideNav"}`}>
          <SideNav closeSideNav={() => setSideBar(false)} />
        </div>

        <div className="contentsSection">{props.children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
