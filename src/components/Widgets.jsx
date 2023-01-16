import Contact from './Contact';
import React from 'react';
import { state } from '../state';
import { useSnapshot } from 'valtio';
import Conversation from './conversation';
import config from '../utils/envConfig';

const Widgets = ({ group, showChat, home }) => {


  //const [contacts, setContatcts] = useState();
  const snap = useSnapshot(state);
  const friends = snap.friends;
  const conversations = snap.conversations;
  console.log("FRIEND IMAGE: ", friends)

  return (
    <div className=" relative hidden lg:flex flex-col pb-2 mt-5 shadow-lg bg-white rounded-md  h-auto max-h-screen overflow-y-auto scrollbar-hide ">
      <div className=" bg-white  sticky top-0 z-30 flex space-x-4 items-center text-gray-700 mb-5">
        <h2 className="  text-lg text-gray-700 font-medium pl-10 py-4 font-sans">
          {(group && "Group Members") || (showChat && "your chats ") || (home && "your Friends")}
        </h2>
      </div>

      <div className=" px-1">
        {showChat ? (
          <>
            {
              conversations?.map(({ _id, members, createdAt }) => (
                <Conversation key={_id} _id={_id} members={members} createdAt={createdAt} />
              )
              )}
          </>
        ) : (
          <>
            {friends.map((friend) => (

              <Contact
                key={friend._id}
                _id={friend._id}
                src={friend?.image}
                name={friend?.name}
                online={friend?.onlineStatus.online}
                timestamp={friend?.onlineStatus.time ? friend?.onlineStatus.time : friend?.onlineStatus.lastSeen}
              />
            ))}
          </>
        )}

      </div>
    </div>
  );
}

export default Widgets
