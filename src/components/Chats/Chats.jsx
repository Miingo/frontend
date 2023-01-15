import React, { useEffect, useRef } from "react";
import ChatMessages from "./ChatMessages";

function Chats({ messages }) {
  
  const scrollRef = useRef()
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" w-full h-[400px]  md:h-[700px] lg:h-72 p-3   md:px-10 overflow-y-auto scrollbar-hide border border-blue-100 rounded-lg">
      {messages?.map(({ _id, message, sender, createdAt }) => (
        <div key={_id} ref={scrollRef}>
          <ChatMessages  message={message} sender={sender} createdAt={createdAt} />
        </div>
      ))}
    </div>
  );
}

export default Chats;
