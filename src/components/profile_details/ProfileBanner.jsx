import React, { useEffect, useState } from "react";
import { HiCamera } from "react-icons/hi";
import PartialProfileEdit from "./PartialProfileEdit";
import ProfileCaption from "./ProfileCaption";
import { UserProvider } from "../../context/userContext";
import { state, actions } from "../../state";
import useLocalStorage from "../../hooks/useLocalStorage";
import { HiOutlinePencil } from "react-icons/hi2";
import ProfileTabs from "./ProfileTabs";
import instance from "../../services/axios-config";
import { compressImage } from "../../services/compressor";
import { useSnapshot } from "valtio";
import config from "../../utils/envConfig";

function ProfileBanner() {
  const { userInfo, me } = useSnapshot(state);
  const [follow, setFollow] = useState(true);
  const [partialEdit, setPartialEdit] = useState(false);
  // const [usr] = useLocalStorage('user');

  //const [userInfo, setUserInfo] = useState(null);
  //  console.log(userInfo)
  useEffect(() => {
    fetchUser();
  });

  //  console.log(userInfo)


  const fetchUser = async () => {
    try {
      const { data } = await instance.get(`/user/profile/${me._id}`);
      if (data) {
        //setUserInfo(data);
        //actions.setUserInfo(data)
        // // setUser
        actions.setUserInfo(data);
        console.log(userInfo)
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    
    setPartialEdit(!partialEdit);
  };

  const submitCover = async (file) => {
    console.log(file);
    try {
      const compressedImage = await compressImage(file);
      const formData = new FormData();
      formData.append("cover", compressedImage);
      const { data } = await instance.patch(`/user/${me._id}/cover`, formData);
      console.log(data);
      actions.setUserInfo(data)
    } catch (error) {
      console.log(error);
    }
  };

  const submitProfile = async (file) => {
      console.log(file)
    try {
      const compressedImage = await compressImage(file);
      const formData = new FormData();
      formData.append("image", compressedImage);
      const { data } = await instance.patch(`/user/${me._id}/image`, formData);
      console.log(data);
     actions.updateUserImg(data)
     // actions.setUserInfo(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative mx-4 flex flex-col bg-white">
      <UserProvider>
        <ProfileCaption handleEdit={handleEdit} user={userInfo} handleSubmit={submitProfile} />
      </UserProvider>

      {partialEdit && <PartialProfileEdit />}

      <div className=" relative w-full h-56 md:h-96 ">
        <img
          src={
            userInfo?.user?.coverImage
              ? `${config.API_URL}/post/stream-video?streamFile=${userInfo?.user?.coverImage}`
              : null
          }
          className="w-full h-full object-cover "
          alt="profile_banner"
        />

        {/* editting the background image */}
        <form className="absolute bottom-2 right-2 flex items-center space-x-2 justify-center bg-gray  cursor-pointer p-2 rounded-lg">
          <label
            htmlFor="cover"
            className="flex items-center justify-center space-x-2"
          >
            <HiOutlinePencil className=" w-4 h-4 text-white" />
            <p className="text-white "> Edit cover </p>
            <input
              name="cover"
              type="file"
              placeholder="upload image"
              id="cover"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                submitCover(e.target.files[0]);
              }}
            />
          </label>
        </form>

        {/*follow user on Mobile  */}
        <div className="absolute bottom-2 right-32 flex items-center justify-around space-x-2 md:hidden ">
          <div
            onClick={(e) => {
              e.preventDefault();
              setFollow(!follow);
            }}
            className={`flex items-center space-x-1 ${
              follow && "bg-gray rounded-lg"
            }
            flex-grow justify-center p-2 text-white cursor-pointer`}
          >
            <p className="text-xs sm:text-base">
              {follow ? " UnFollow " : "Follow"}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:hidden border-b">
        <div className="relative flex items-center justify-between space-x-2 p-4">
          <div className="absolute -top-6 md:-top-10 w-16 h-16 md:w-20 md:h-20  rounded-full border-4 border-white ">
            <div className="relative w-full h-full">
              <img
                src={
                  userInfo?.user?.image
                    ? `${config.API_URL}/post/stream-video?streamFile=${userInfo?.user?.image}`
                    : `https://ui-avatars.com/api/name=${userInfo?.user?.name}&background=random`
                }
                className="w-full h-full rounded-full object-cover "
                alt="group-profile"
              />

              <form className="absolute top-0 -right-2 flex items-center justify-center bg-gray cursor-pointer p-1 rounded-full">
                <label
                  htmlFor="profile"
                  className="flex items-center justify-center space-x-2"
                >
                  <HiCamera className=" w-4 h-4 text-white " />
                  <input
                    name="image"
                    type="file"
                    placeholder="upload image"
                    id="profile"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      submitProfile(e.target.files[0]);
                    }}
                  />
                </label>
              </form>
            </div>
          </div>

          <div className="pl-14 md:pl-20 flex items-center flex-grow justify-between space-x-4">
            <div className="w-48">
              <h1 className="text-gray-700 font-semibold">
                {userInfo?.user?.name}
              </h1>
              <p className="text-gray-600 text-xs ">{userInfo?.user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <ProfileTabs />
      </div>
    </div>
  );
}

export default React.memo(ProfileBanner);
