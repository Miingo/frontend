import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../services/axios-config";
import { useSnapshot } from "valtio";
import { state, actions } from "../state";
import config from "../utils/envConfig";

function Contact({ _id, src, name, online, timestamp }) {
  const snap = useSnapshot(state);

  const navigate = useNavigate();

  const getMessages = async (chat) => {
    try {
      const res = await api.get(`chat/messages/${chat._id}`);
      if (res.data) {
        actions.setMessages(res.data.messages);
        console.log("CHAT MESSAGES", res.data.messages);
      }

      actions.setCurrentConversation({
        _id: chat._id,
        members: chat.members,
        createdAt: chat.createdAt,
      });
      actions.chatStarted(chat._id);
    } catch (error) {
      console.error(error);
    }
  };

  const createChat = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("chat/conversation", {
        user1: snap.me,
        user2: _id,
      });
      if (res.data) {
        console.log(res.data);

        actions.chatStarted(res.data?._id);
        getMessages(res.data);

        navigate("/messages", {
          state: { _id, src, name, online, timestamp, chat: res.data },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick = { createChat }
      className={`flex items-center justify-between space-x-3
	    mb-2 relative hover:bg-graybg3 cursor-pointer
	   p-2 pr-5 rounded-xl
	  `}
    >
      <div className=" flex flex-grow-1 items-center space-x-3">
        
        <div className="flex items-center justify-center">
          <div className="relative w-14 h-14 rounded-full object-cover border-2 border-white">
            <img
              src={
                src
                  ? `${config.API_URL}/post/stream-video?streamFile=${src}`
                  : `https://ui-avatars.com/api/name=${name}&background=random`
              }
              className="w-full h-full rounded-full"
              alt="convUser-pic"
            />

            <span
              className={` absolute w-3 h-3 ${
                online ? "bg-green-400" : "bg-reddark"
              } rounded-full  top-0 right-0 `}
            ></span>
          </div>
        </div>

        <div className="w-full">
          <p className="">{name}</p>
          <p className=" flex text-xs font-medium text-gray-500">
            <span className={`mr-1 flex-grow-1 ${online && "text-green-400"}`}>
              {online ? "online" : "Last seen"}
            </span>
            <span className="">
              {moment(timestamp).startOf("millisecond").fromNow()}
            </span>
          </p>
        </div>
      </div>

      <div className=" flex items-center justify-center bg-green-400 text-white rounded-full w-7 h-7 ">
        <p className=" text-sm">13</p>
      </div>
    </div>
  );
}

export default Contact;
