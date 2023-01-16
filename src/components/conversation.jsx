import React, {useEffect, useState} from "react";
import moment from 'moment'
import api from '../services/axios-config'
import { useSnapshot } from "valtio";
import { actions, state } from "../state";
import config from "../utils/envConfig";

function Conversation({ _id, members, createdAt }) {
  const snap = useSnapshot(state);
  const [convUser, setConvUser] = useState();
  const users = snap.users
  
  const getMessages = async (e) => {
    console.log('EXECTING GET MESSAGES');
    e.preventDefault();
    try {
      const res = await api.get(`chat/messages/${_id}`)
      if (res.data) {
        actions.setMessages(res.data.messages);
        console.log('CHAT MESSAGES', res.data.messages)
      }

      actions.setCurrentConversation({_id, members, createdAt});
      actions.chatStarted(_id);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const notMe = members.find(m => m._id !== snap.me._id)
    setConvUser(users.find((u) => u._id === notMe._id));
    
  },[members, setConvUser, snap.me._id, users])

  useEffect(() => {
    actions.setCurrentConversation({ _id, members, createdAt })
    //console.log('CURRENT CONVERSATION', snap.currentConversation)
  },[_id, convUser, createdAt, members])
  

  return (
    <div
      onClick={ getMessages }
      className={`flex items-center justify-between space-x-3
	    mb-2 relative hover:bg-graybg3 cursor-pointer
	   p-2 pr-5 rounded-xl
	  `}
    >
      <div className=" flex flex-grow-1 items-center space-x-3">
        <div className=" relative w-50 h-50 border-2 border-white rounded-full object-cover">
          <img
            src={ convUser?.image ? `${config.API_URL}/pos/stream=video/sreamFile= ${convUser.image}`: `https://ui-avatars.com/api/name=${convUser?.name}&background=random` }
            alt="user pic"
            className="w-50 h-50 rounded-full"
          />

          <span
            className={` absolute w-3 h-3 ${
              convUser?.onlineStatus.online ? "bg-green-400" : "bg-reddark"
            } rounded-full  top-0 right-0 `}
          ></span>
        </div>

        <div className="w-full">
          <p className="">{convUser?.name}</p>
          <p className=" flex text-xs font-medium text-gray-500">
            <span className={`mr-1 flex-grow-1 ${convUser?.onlineStatus.online && "text-green-400"}`}>
              {convUser?.onlineStatus.online  ? "online" : "Last seen"}
            </span>
            <span className="">
              {convUser?.onlineStatus.time? moment(convUser?.onlineStatus.time).startOf('millisecond').fromNow(): moment(convUser?.onlineStatus.lastSeen).startOf('millisecond').fromNow()}
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

export default Conversation;
