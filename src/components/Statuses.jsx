import React, { useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import { HiChevronLeft } from 'react-icons/hi';
import { HiChevronRight } from 'react-icons/hi';
import Input from './Input';
import Status from './Status';
import StatusPopOut from './status/StatusPopOut';
import StatusWrapper from './status/StatusWrapper';
import { state } from '../state';
import { useSnapshot } from 'valtio';

function Statuses({ handlePostStatus }) {
  const [showModal, setShowModal] = useState(false);
  const [statusOwner, setStatusOwner] = useState(null);

  const snap = useSnapshot(state);
  const me = snap.me;
  const users = snap.users;

  const followings = users.filter((user) => user.followers?.includes(me._id));

  const slideLeft2 = () => {
    var slider = document.getElementById('slider2');
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight2 = () => {
    var slider = document.getElementById('slider2');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

 
  return (
    <div className="sticky top-0 z-30  flex items-center justify-around w-screen  bg-miingo-gray pr-1 mb-2">
      
      <div className="pl-2 h-full">
        <button
          onClick={ handlePostStatus }
          className="h-16 w-16 md:h-20 md:w-20  rounded-full bg-regal-orange shadow-lg flex items-center justify-center  hover:shadow-xl active:scale-90 transition duration-300"
        >
          <GoPlus className="font-extrabold text-white" />
        </button>
      </div>
        
    
      <div className="relative flex md:flex-grow items-center justify-center space-x-2  w-80 h-full md:pr-4">
        <div
          onClick={ slideLeft2 }
          className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer hidden md:inline-flex"
        >
          <HiChevronLeft className="h-4 w-4" />
        </div>
        
        <div
          id="slider2"
          className="w-[285px] md:w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {followings?.map((user) => (
            <Status
              handleClick={() => {
                setShowModal(true);
                setStatusOwner(user);
              }}
              key={user._id}
              image={
                user?.image || `https://ui-avatars.com/api/?name=${user?.name}`
              }
            />
          ))}
        </div>

        <div
          onClick={slideRight2}
          className="bg-miingo-cyan text-gray-600 rounded-full p-1 cursor-pointer hidden md:inline-flex "
        >
          <HiChevronRight className="h-4 w-4" />
        </div>

        {showModal ? (
          <StatusWrapper
            closeModal={() => setShowModal(false)}
            bodyContent={<StatusPopOut statusOwner={statusOwner} />}
            footer={true}
            footerContent={
              <>
                <div className="flex relative space-x-2">
                  <Input placeholder="comment on status" />
                  <button className="bg-regal-orange text-white p-2 rounded-full">
                    <BiSend />
                  </button>
                </div>
              </>
            }
          />
        ) : null}
      </div>
    </div>
  );
}

export default Statuses;
