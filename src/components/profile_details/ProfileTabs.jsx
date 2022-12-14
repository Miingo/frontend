import React, { useState } from "react";
import ProfileTabList from "./ProfileTabList";
import TimeLine from "./TimeLine";
import AboutTab from "./AboutTab";
import Tab3 from "./Tab3";
import Photos from "./Photos";
import Videos from "./Album";

const ProfileTabs = () => {
  
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    {
      id: 1,
      label: "Timeline",
      component: <TimeLine/>,
    },
    {
      id: 2,
      label: "About",
      component: <AboutTab/>,
    },
    {
      id: 3,
      label: "Friends",
      component: <Tab3/>,
    },
    {
      id: 4,
      label: "Photos",
      component: <Photos/>,
    },
  ];

  return (
    <div className="w-full">
      <ProfileTabList
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {tabs.find((tab) => tab.id === activeTab).component}
    </div>
  );
};

export default ProfileTabs;
