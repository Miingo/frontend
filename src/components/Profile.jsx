import { Button, Select, Spinner, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

import Input from './Input';
import ProfileTabs from './profile_details/ProfileTabList';
import axios from '../services/axios-config';

export default function Profile({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [intro, setIntro] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [relationship, setRelationship] = useState('');
  const [livesIn, setlivesIn] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('Uganda');

  const id = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.patch(`/user/profile/${id}`, {
        intro,
        birthDate,
        gender,
        phone,
        country,
        city,
        relationship,
        email,
        website,
        id
      });
      setShowModal(false);
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div class="overflow-y-auto scrollbar-hide flex-grow   h-screen  pb-2 ">
        <div class="p-1 md:p-8  bg-white shadow mt-20">
          <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p class="font-bold text-gray-700 text-xl">22</p>
                <p class="text-gray-400">Friends</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">10</p>
                <p class="text-gray-400">Photos</p>
              </div>
              <div>
                <p class="font-bold text-gray-700 text-xl">89</p>
                <p class="text-gray-400">Comments</p>
              </div>
            </div>
            <div class="relative">
              <div class="w-24 h-24 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="space-x-4 flex justify-center md:justify-between mt-20 md:mt-0 md:justify-center">
              <button
                onClick={() => setShowModal(true)}
                data-bs-toggle="modal"
                class=" text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Edit Profile
              </button>
            </div>
          </div>

          <div class="mt-20 text-center border-b pb-12">
            <h1 class="text-4xl font-medium text-gray-700">{user.name}</h1>
            <p class="font-light text-gray-600 mt-3">{user.email}</p>
          </div>

          <div class="mt-7 flex flex-col justify-center">
            <ProfileTabs />
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-center p-1 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl text-gray-700 font=semibold">
                    General Information
                  </h3>
                </div>
                <div className="relative p-1 flex-auto">
                  <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 rounded px-8 pt-6 pb-8 w-full">
                    <Stack spacing="2">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Intro
                      </label>
                      <Input
                        value={intro}
                        onChange={({ target }) => setIntro(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Phone
                      </label>
                      <Input
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Email
                      </label>
                      <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Lives In
                      </label>

                      <Input
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                      />
                    </Stack>

                    <Stack spacing="4">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Gender
                      </label>
                      <Select
                        className="cursor-pointer"
                        placeholder="Select Gender"
                        onChange={({ target }) => setGender(target.value)}
                        value={gender}
                      >
                        <option
                          value="male"
                          className="block cursor-pointer text-gray-700 text-sm font-bold mb-1"
                        >
                          Male
                        </option>
                        <option
                          value="female"
                          className="block cursor-pointer text-gray-700 text-sm font-bold mb-1"
                        >
                          Female
                        </option>
                      </Select>
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Birth Date
                      </label>
                      <Input
                        className="cursor-pointer"
                        type="date"
                        value={birthDate}
                        onChange={({ target }) => setbirthDate(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Website
                      </label>
                      <Input
                        value={website}
                        onChange={({ target }) => setWebsite(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        RelationShip
                      </label>
                      <Input
                        value={relationship}
                        onChange={({ target }) => setRelationship(target.value)}
                      />
                    </Stack>
                  </form>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="md"
                    fontSize="md"
                    onClick={handleSubmit}
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
