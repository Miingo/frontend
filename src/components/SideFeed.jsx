import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../state";
import NewsFeeds from "./NewsFeeds";
import Widgets from "./Widgets";


function SideFeed({ home, showChat, group }) {
  const { friends, conversations } = useSnapshot(state)
  return (
    <div className="relative hidden lg:block w-[340px] mt-2">
      <div className="space-y-4  px-2 sticky top-20">
        {
          home && friends.length > 0 && (
            <Widgets home={home} showChat={showChat} group={group} />
          )
        }
        {
          showChat && conversations.length > 0 && (
            <Widgets home={home} showChat={showChat} group={group} />
          )
        }
         <NewsFeeds />
      
      </div>
    </div>
  );
}

export default SideFeed;
