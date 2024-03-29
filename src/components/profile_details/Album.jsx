import React, { useState } from "react";

import { HiOutlinePlusCircle } from "react-icons/hi";
import Input from "../Input";

const albums = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668007553/pexels-jonathan-borba-12031357_rzxxvm.jpg",
    title: "Cover Photos",
    length: "3",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668007542/pexels-mahdi-chaghari-12463279_cwiw1n.jpg",
    title: "Profile Photos",
    length: "8",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668007538/pexels-martin-boh%C3%A1%C4%8D-10288457_uwpcbd.jpg",
    title: "Family Trip",
    length: "3",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668007538/pexels-martin-boh%C3%A1%C4%8D-10288457_uwpcbd.jpg",
    title: "Family Trip",
    length: "3",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668011048/pexels-james-gana-13747843_vz07rw.jpg",
    title: "Birth Day trip",
    length: "4",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/itgenius/image/upload/v1668011048/pexels-james-gana-13747843_vz07rw.jpg",
    title: "Cover Photos",
    length: "3",
  },
];

function Album() {
  const [title, setTitle] = useState();
  const [addlbum, setAddAlbum] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddAlbum(false);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <div className="relative w-full md:w-56 h-56 md:h-72 rounded-md cursor-pointer flex items-center justify-center border-2 border-gray6 border-dashed">
        <div className="flex flex-col space-y-3">
          <div
           onClick={ (e) => setAddAlbum(!addlbum)}
           className="flex items-center justify-center">
            <HiOutlinePlusCircle className="w-6 h-6" />
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <p className="text-base font-medium "> Create Album </p>
            <p className="text-xs font-semibold ">
              {" "}
              create album in just few minutes{" "}
            </p>
          </div>

          {addlbum && (
            <>
              <form
                onSubmit={handleSubmit}
                className="absolute top-14 md:top-16  right-3 left-2  flex items-center justify-center space-x-2 p-5 md:p-2 bg-white shadow-lg rounded-md"
              >
                <Input
                  className="cursor-pointer text-gray-400"
                  placeholder="title"
                  type="text"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />

                <button
                  className="bg-blue text-center px-2 py-1  text-white rounded-lg"
                  type="submit"
                >
                  post
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {albums.map(({ id, image, title, length }) => (
        <>
          <div
            key={id}
            className=" relative w-full md:w-56 h-56 md:h-72 rounded-md cursor-pointer"
          >
            <img
              src={image}
              className="w-full h-full object-cover rounded-md"
              alt="albums"
            />

            <div className="absolute bottom-3  left-24 md:left-14 flex flex-col items-center justify-center">
              <p className="text-lg font-medium text-white">{title}</p>
              <p className=" text-xs font-medium text-white">
                {length} photos{" "}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Album;
