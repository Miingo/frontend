import React from "react";
import ChartMessages from "./ChartMessages";

function Charts({ src }) {
  const messages = [
    {
      id: 1,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 2,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 3,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 4,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 5,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 6,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 7,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 8,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },

    {
      id: 9,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 10,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 11,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
    {
      id: 12,
      message: "This video was very good  ",
      reply: " Thanks for appreciating",
    },
  ];

  return (
    <div className=" w-full h-[400px]  md:h-[700px] lg:h-72 p-3 lg:pb-20  md:px-10 overflow-y-auto scrollbar-hide border border-blue-100 rounded-lg">
      { messages.map(({ id, message, reply }) => (
        <ChartMessages key = { id } message={message} reply={reply} src={src} />
      ))}
    </div>
  );
}

export default Charts;
