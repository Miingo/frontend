import React, { useState } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiMessageCircle, FiBell } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import CustomBottomSheet from "./bottom-sheet/BottomSheet";
import { useSnapshot } from "valtio";
import { state } from "../state";
import Contact from "./Contact";
import GroupInfo from "./GroupInfo";

const groups = [
  {
    id: 1,
    image: `https://ui-avatars.com/api/name=${["chelsea", "fc"].join(
      " "
    )}&background=random`,
    members: 246,
    name: "Chelsea FC",
    active: 13,
  },
  {
    id: 2,
    image: `https://ui-avatars.com/api/name=${["Myooga"].join(
      " "
    )}&background=random`,
    members: 236,
    name: " Myooga",
    active: 18,
  },
  {
    id: 3,
    image: `https://ui-avatars.com/api/name=${["Wattoto", "Church"].join(
      " "
    )}&background=random`,
    members: 634,
    name: "Wattoto Church",
    active: 19,
  },
  {
    id: 4,
    image: `https://ui-avatars.com/api/name=${["Radio", "Simba"].join(
      " "
    )}&background=random`,
    members: 736,
    name: " Radio Simba",
    active: 20,
  },
];

function BottomNav({ group }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const snap = useSnapshot(state);
  const friends = snap.friends;
  const navigate = useNavigate();

  const toggleClick = () => {
    // toggle the popup action
    setIsOpen(!isOpen);
  };

  const toggleGroupClick = () => {
    setOpenGroups(!openGroups);
  };

  const handleClick = () => {
    navigate("/coming");
  };

  return (
    <div className=" md:hidden sticky bottom-0 z-30 bg-white flex justify-around p-2 shadow-2xl border-t border-blue">
      {/* left */}
      <Link
        to="/feed"
        className="flex  items-center hover:bg-slate-200 p-3 rounded-lg cursor-pointer "
      >
        <HomeIcon className="h-6 w-6" />
      </Link>

      <div
        onClick={toggleGroupClick}
        className="flex  items-center hover:bg-slate-200 p-3 rounded-lg cursor-pointer "
      >
        <HiOutlineUserGroup className="h-6 w-6" />

        {openGroups ? (
          <>
            <CustomBottomSheet
              onClick={() => setOpenGroups((prev) => !prev)}
              onDismiss={toggleGroupClick}
              open={openGroups}
            >
              <div className=" flex flex-col font-serif bg-white rounded-lg shadow-lg p-2 h-[600px]">
                <div className=" flex items-center justify-between p-2 mb-10">
                  <div className="flex items-center justify-center">
                    <h4 className="text-gray-700 font-medium m-2 ">
                      {" "}
                      My Groups{" "}
                    </h4>
                  </div>

                  <div className="flex items-center">
                    <button
                      className={`flex  mx-auto text-white bg-blue px-3 py-1 md:px-5 rounded-full shadow-xl font-normal
                         hover:shadow-xl active:scale-90 transition duration-300`}
                    >
                      Create Group
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-2 h-56 mt-2 ">
                  {groups?.map(({ id, image, members, name, active }) => (
                    <GroupInfo
                      key={id}
                      image={image}
                      members={members}
                      name={name}
                      active={active}
                    />
                  ))}
                </div>
              </div>
            </CustomBottomSheet>
          </>
        ) : (
          ""
        )}
      </div>

      <div
        className=" flex items-center relative hover:bg-slate-200 p-3 rounded-lg cursor-pointer"
        onClick={toggleClick}
      >
        <span className="absolute top-3 right-3  h-4 w-4   bg-red text-center rounded-full text-white text-xs font-bold">
          {" "}
          {friends.length}
        </span>

        {/* chaticon */}
        <FiMessageCircle className="h-6 w-6" />

        {isOpen ? (
          <>
            <CustomBottomSheet
              onClick={() => setIsOpen((prev) => !prev)}
              onDismiss={toggleClick}
              open={isOpen}
            >
              <div className=" relative  lg:flex flex-col pb-2 mt-5 shadow-lg bg-white rounded-md  h-screen overflow-y-auto scrollbar-hide ">
                <div className=" bg-white  sticky top-0 z-30 flex space-x-4 items-center text-gray-700 mb-5">
                  <h2 className="  text-lg text-gray-700 font-medium pl-10 py-4 font-sans">
                    {group ? "Group Members" : "Chats"}
                  </h2>
                </div>

                {friends.length > 0 ? (
                  <div className=" px-1  pb-20">
                    {friends.map((friend) => (
                      <Contact
                        key={friend._id}
                        _id={friend._id}
                        src={friend?.image }
                        name={friend?.name}
                        online={friend?.onlineStatus.online}
                        timestamp={friend?.onlineStatus.time ? friend?.onlineStatus.time : friend?.onlineStatus.lastSeen}
                      />
                    ))}
                  </div>
                ) : (<div className="w-full h-auto flex items-center justify-center">You have no friends</div>)
                }

              </div>
            </CustomBottomSheet>
          </>
        ) : (
          ""
        )}
      </div>

      <div className=" flex items-center relative hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
        <span className="absolute top-3 right-3  h-4 w-4 bg-red text-center rounded-full text-white text-xs font-bold">
          {" "}
          8
        </span>
        <FiBell onClick={handleClick} className="h-6 w-6" />
      </div>

      <div
        onClick={handleClick}
        className=" flex  items-center mr-2 relative hover:bg-slate-200 p-3 rounded-lg cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default BottomNav;
