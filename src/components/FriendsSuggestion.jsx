import { FiRotateCw } from "react-icons/fi";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { HiSun } from "react-icons/hi";
import Suggestion from "./Suggestion";
import config from "../utils/envConfig";

function FriendsSuggestion({ profile, followers: users }) {

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="flex flex-col space-y-2 bg-white rounded-lg shadow-lg h-64 w-full font-serif ">
      <div className=" w-72 flex items-center justify-between mx-4 mt-2 p-2">
        <div className="text-gray-600">
          <h3 className="font-semibold">
            {profile ? "Suggested Friends " : "Friend Suggestion"}
          </h3>
        </div>

        <div className="flex items-center justify-around space-x-3">
          <div className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer">
            <FiRotateCw className="h-4 w-4" />
          </div>
          <div className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer">
            <HiSun className="h-4 w-4" />
          </div>
        </div>
      </div>

      {users?.length > 0 ? (users.map((user) => (
        <div  key={user._id} className="relative flex items-center justify-around space-x-2  mx-auto w-80 h-56 p-2 ">
          <div
            onClick={slideLeft}
            className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer"
          >
            <HiChevronLeft className="h-4 w-4" />
          </div>

          <div
            id="slider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            <Suggestion
              name={user.name}
              status={user?.onlineStatus?.online}
              image={
                user?.image
                  ? `${config.API_URL}/post/stream-video?streamFile=${user?.image}`
                  : `https://ui-avatars.com/api/name=${user?.name}&background=random`
              }
            />
          </div>

          <div
            onClick={slideRight}
            className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer"
          >
            <HiChevronRight className="h-4 w-4" />
          </div>
        </div>
      ))) : (<div className="w-full h-auto flex items-center justify-center">
        start getting active to have some suggestions
      </div>
      )
      }
    </div>
  );
}

export default FriendsSuggestion;
