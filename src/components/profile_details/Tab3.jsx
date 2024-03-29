import React, { useEffect } from "react";
import { UserProvider, userContext } from "../../context/userContext";
import { actions, state } from "../../state";

import Friend from "./Friend";
import { SearchIcon } from "@heroicons/react/outline";
import axios from "../../services/axios-config";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSnapshot } from "valtio";
import config from "../../utils/envConfig";

export default function Tab1() {
  const [accessToken] = useLocalStorage("accessToken");
  const [loggedInUser] = useLocalStorage("user");
  const snap = useSnapshot(state);

  useEffect(() => {
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        actions.addUsers(res.data);
      })
      .catch((err) => {});
  }, [accessToken]);

  return (
    <div className=" flex flex-col   mt-3 bg-white px-2 py-3 rounded-lg">
      <div className="flex items-center justify-between p-2 bg-white mx-2 md:mx-4 rounded-md mb-6">
        <div className="flex items-center justify-center">
          <h1 className="text-lg font-semibold text-gray-600">Friends</h1>
        </div>

        <div className="flex items-center rounded-lg  p-2 border-2 w-56 md:w-96 ">
          <input
            type="text"
            placeholder="Filter Friends ..."
            className="flex mx-2 items-center bg-transparent outline-none placeholder-gray-500  text-gray-700 w-40 md:flex-grow"
          />

          <SearchIcon className="h-6 text-gray-600 cursor-pointer" />
        </div>
      </div>

      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <UserProvider>
          {snap.users
            .slice(0, 8)
            .map(({ _id, name, followers, followings, image }) => (
              <Friend
                key={_id}
                _id={_id}
                name={name}
                followers={followers}
                followings={followings}
                image={
                  image
                  ? `https://ui-avatars.com/api/?name=${name}&background=random`
                  : `${config.API_URL}/post/stream-video?streamFile=${image}`
                }
              />
            ))}
        </UserProvider>
      </div> */}
    </div>
  );
}
