import React from 'react';

function Status({ id, image, handleClick }) {
  return (
    <div className=" h-16 md:h-20 w-16 md:w-20 inline-block rounded-full  border-2 border-blue cursor-pointer hover:scale-105 ease-in-out duration-300 mr-2 md:mr-6">
      <div className="w-full h-full">
        <img
          onClick={handleClick}
          src={image}
          className="w-full h-full  rounded-full object-cover"
          alt="status "
        />
      </div>
    </div>
  );
}

export default Status;
