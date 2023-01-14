import { HiOutlineUser, HiOutlineX } from 'react-icons/hi';
import React, { useState } from 'react';

import CollegeStatus from './CollegeStatus';
import { HiDocument } from 'react-icons/hi';
import { HiTemplate } from 'react-icons/hi';
import { state } from '../../state';
import { useSnapshot } from 'valtio';

function CollegeMeet() {
  const [edit, setEdit] = useState(false);
  const snap = useSnapshot(state);
  const users = snap.users.slice(0, 8);

  return (
    <div className="hidden lg:flex flex-col  mt-5 pb-5 shadow-lg bg-white rounded-md  h-auto overflow-hidden">
      <div className=" bg-white  flex items-center justify-between text-gray-700 px-3 border-b">
        <div className="">
          <h2 className="  text-lg text-gray-700 font-medium  py-4 font-sans">
            College Meet
          </h2>

          {/* <h3 className="  text-sm text-gray-700 font-medium  py-4 font-sans">
              Today is your college group meeting
          </h3> */}
        </div>

        <div className="flex items-center space-x-3">
          {edit && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold  p-2 cursor-pointer">
              <HiDocument className="h-6 w-6" />
            </div>
          )}

          {!edit && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold  p-2 cursor-pointer"
            >
              <HiTemplate className="h-6 w-6" />
            </div>
          )}

          {edit && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setEdit(!edit);
              }}
              className=" flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold  p-2 cursor-pointer"
            >
              <HiOutlineX className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>

      <div className=" w-full h-36">
        <img
          src="/bg2.jpg"
          className="w-full h-full object-cover"
          alt="events-pic"
        />
      </div>

      <div className="w-full px-2 py-3">
        {users.map(({ _id, image, name }) => (
          <CollegeStatus
            key={_id}
            image={
              image ||
              `https://ui-avatars.com/api/name=${name}&background=random`
            }
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center space-x-2 text-sm text-gray-400 font-medium">
          <h3 className=""> </h3>
          <span className=" flex ">
            <HiOutlineUser className="w-4 h-4" />
            {snap.users.length} People
          </span>
        </div>

        <p className="text-gray-600 mb-4"> Description of the event </p>

        <h3 className="text-gray-700 cursor-pointer hover:underline ">
          {' '}
          {/* View{' '} */}
        </h3>
      </div>
    </div>
  );
}

export default CollegeMeet;
