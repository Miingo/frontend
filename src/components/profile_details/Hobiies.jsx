import { Button, Spinner, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { HiOutlinePencil } from 'react-icons/hi';
import Input from '../Input';
import instance from '../../services/axios-config';
import useLocalStorage from '../../hooks/useLocalStorage';

function Hobiies() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hobbies, setHobbies] = useState([]);
  const [interests, setInterests] = useState([]);
  const [user] = useLocalStorage('user');
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const { data } = await instance.get(`/user/profile/${user._id}`);

      setUserData(data);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await instance.patch(`/user/profile/${user._id}`, {
        hobbies,
        interests
      });

      setShowModal(false);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative  mt-10 w-full md:w-[880px] lg:w-[640px] pb-2">
        <div className=" space-y-7 px-2 sticky top-0 bg-white rounded-lg shadow-xl">
          <div class="max-w-md mx-auto space-y-6">
            <div className="flex justify-between">
              <p class="text-gray-800">Hobbies & Interest</p>
              <HiOutlinePencil
                onClick={() => setShowModal(true)}
                className="h-6 w-6 mr-2 cursor-pointer"
              />
            </div>
            {userData && (
              <div>
                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">Hobbies:</p>
                  {userData.hobbies?.map((item) => (
                    <p class="text-gray-800">
                      {item || 'No Hobbies Specified At the Moment'}
                    </p>
                  ))}
                </div>

                <div class="text-base leading-7">
                  <p class="font-medium text-gray-700">Other Interest :</p>

                  {userData.interests?.map((item) => (
                    <p class="text-gray-800">
                      {item || 'No Hobbies Specified At the Moment'}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>{' '}
        </div>
      </div>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-2xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-center justify-center p-1 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl text-gray-700 font=semibold">
                    Hobbies & Interest
                  </h3>
                </div>
                <div className="relative p-1 flex-auto">
                  <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 rounded px-8 pt-6 pb-8 w-full">
                    <Stack spacing="2">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Hobbies
                      </label>
                      <Input
                        value={hobbies}
                        onChange={({ target }) => setHobbies(target.value)}
                      />
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Interests
                      </label>
                      <Input
                        value={interests}
                        onChange={({ target }) => setInterests(target.value)}
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

export default Hobiies;
