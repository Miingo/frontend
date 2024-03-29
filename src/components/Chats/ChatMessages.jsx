import React from "react";
import moment from "moment";
import config from "../../utils/envConfig";
import { useSnapshot } from "valtio";
import { state } from "../../state";

function ChatMessages({ message, sender, createdAt }) {
  const { me } = useSnapshot(state);
  return (
    <div className="h-auto">
      {/* First msg */}

      {sender._id !== me._id && (
        <div className={`flex 'items-start justify-start`}>
          <div className="flex flex-col space-y-2 text-xs max-w-xs md:max-w-md mx-2 order-2 items-start ">
            <p
              className="px-4 py-2  w-auto rounded-lg  rounded-bl-none bg-white shadow-lg
               text-gray-600 "
            >
              {message}
            </p>
            <p> {moment(createdAt).startOf("millisecond").fromNow()}</p>
          </div>

          <div className="flex items-center justify-center order-1 my-5">
            <img
              src={
                sender?.image
                  ? `${config.API_URL}post/stream-video?streamFile=${sender?.image}`
                  : `https://ui-avatars.com/api/name=${sender?.name}&background=random`
              }
              className="w-7 h-7 rounded-full order-1"
              loading="lazy"
              alt="sender profile"
            />
          </div>
        </div>
      )}

      {/* second msg */}
      {sender._id === me._id && (
        <div className="flex items-end justify-end my-4">
          <div className="flex flex-col  space-y-2 text-xs  max-w-sm md:max-w-md mx-2 order-2 items-end  rounded-md ">
            <p className="px-4 py-2  w-auto rounded-lg  rounded-bl-none bg-green-100 shadow-lg text-gray-600">
              {message}
            </p>
            <p> {moment(createdAt).startOf("millisecond").fromNow()}</p>
          </div>

          <div className=" flex items-center justify-center order-2  my-5">
            <img
              src={
                sender?.image
                  ? `${config.API_URL}/post/stream-video?streamFile=${sender?.image}`
                  : `https://ui-avatars.com/api/name=${sender?.name}&background=random`
              }
              className="w-7 h-7 rounded-full "
              loading="lazy"
              alt="profile"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatMessages;
