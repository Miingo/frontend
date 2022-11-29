import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';

import { Link } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import { useRef } from 'react';
import { useState } from 'react';

function Post({ name, postDesc, user, email, createdAt, image }) {
  const [isVisibleCommentField, setIsVisibleCommentField] = useState(false);
  const commentRef = useRef();
  const [loggedInUser] = useLocalStorage('user');

  return (
    <div className="flex flex-col bg-white shadow-lg my-3">
      <div className="p-5 bg-white mt-5  shadow-sm">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <div className=" w-6 h-6 md:w-8 md:h-8">
              <img
                className=" w-full h-full object-cover rounded-full"
                src="/images/ml.jpg"
                alt=""
              />
            </div>

            <div>
              <p className="font-semibold  text-gray-500">{name}</p>
              <p className="text-xs text-gray-400">{createdAt}</p>
            </div>
          </div>

          {/* About me */}
          <Link
            to={`/profile/${user ? user._id : loggedInUser._id}`}
            className="flex items-center"
          >
            <button
              className={`flex  mx-auto text-white bg-regal-orange hover:bg-orange-400 px-3 py-1 md:px-5 rounded-full shadow-xl font-normal
                         hover:shadow-xl active:scale-90 transition duration-300 outline-none `}
            >
              About me
            </button>
          </Link>
        </div>

        <p className="pt-4 text-gray-600"> {postDesc} </p>
      </div>

      {image && (
        <div className="relative  mx-2 md:mx-8 h-56 md:h-96">
          <img src={image} className="w-full h-full object-cover" alt="" />
        </div>
      )}

      {/* footer of post */}
      <div
        className={`flex  justify-between  items-center
              bg-white shadow-md text-gray-600 px-2  py-3 mt-2`}
      >
        <div className=" flex items-center justify-center">
          <div className="rounded-none flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 hover:rounded-lg cursor-pointer">
            <ThumbUpIcon className="h-6" />
            <p className="text-xs sm:text-base hidden md:inline-flex">
              {' '}
              12k Likes{' '}
            </p>
          </div>

          <div className="rounded-none flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 hover:rounded-lg cursor-pointer">
            <ChatAltIcon className="h-6" />
            <p
              className="text-xs sm:text-base"
              onClick={() => setIsVisibleCommentField((prev) => !prev)}
            >
              comment
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <div className="rounded-none flex items-center space-x-2 hover:bg-gray-100 p-2 hover:rounded-lg cursor-pointer">
            <ShareIcon className="h-4" />
            <p className="text-xs sm:text-base">share</p>
          </div>

          <div className="  hover:bg-gray-100 p-2 hover:rounded-full cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
        </div>
      </div>
      {isVisibleCommentField && (
        <div>
          <input
            style={{
              border: '1px solid #eee',
              padding: '0.5em',
              outline: 'none',
              width: '100%'
            }}
            ref={commentRef}
            placeholder="Add comment"
          />
        </div>
      )}
    </div>
  );
}

export default Post;
