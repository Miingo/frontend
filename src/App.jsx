/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-use-before-define */

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';
import { actions, state } from './state';

import ActivityCard from './components/profile/ActivityCard';
import BottomNav from './components/BottomNav';
import Coming from './pages/ComingSoon';
import Gallery from './components/Album/ImageGallery';
import Header from './components/Header';
import { HiOutlineChat } from 'react-icons/hi';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiOutlineMusicNote } from 'react-icons/hi';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineX } from 'react-icons/hi';
import { HiViewGrid } from 'react-icons/hi';
import LoadingScreen from './components/LoadingScreen';
import MenuBottomSheet from './components/bottom-sheet/BottomSheet';
import MenuItem from './components/MenuItem';
import NewProfilePage from './pages/Profile_Page';
import StatusCarousel from './components/StatusCarousel';
import StatusPopOut from './components/status/StatusPopOut';
import instance from './services/axios-config';
import axios from './services/axios-config';
import api from './services/axios-config';
import { devtools } from 'valtio/utils';
import { getTokenPayload } from './utils/getTokenPayload';
import { useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';


//importing icons

const menuItems = [
  {
    id: 1,
    name: 'Groups',
    icon: HiOutlineUserGroup,
    path: '/groups'
  },
  {
    id: 2,
    name: 'News Feeds',
    icon: HiOutlineNewspaper,
    path: '/coming'
  },
  {
    id: 3,
    name: 'Entertainment',
    icon: HiOutlineMusicNote,
    path: '/coming'
  },
  {
    id: 4,
    name: 'Gallery',
    icon: HiViewGrid,
    path: '/coming'
  },

  {
    id: 5,
    name: 'Events',
    icon: HiOutlineSpeakerphone,
    path: '/coming'
  },
  {
    id: 6,
    name: 'Birthday',
    icon: HiOutlineChat,
    path: '/coming'
  }
];

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

// Notice the convention of how we're importing pagesing with the Loadable HOC
const Home = Loadable(lazy(() => import('./pages/Home')));
const Messages = Loadable(lazy(() => import('./pages/Messages')));
const GroupFeeds = Loadable(lazy(() => import('./pages/GroupFeeds')));
const GroupMessages = Loadable(lazy(() => import('./pages/GroupMessages')));
const Profile = Loadable(lazy(() => import('./pages/ProfilePage')));

export default () => {
  const [logout, setLogout] = useState(false);
  const [menuModal, showMenuModal] = useState(false);
  const [accessToken] = useLocalStorage('accessToken');
  const navigate = useNavigate();
  const [user] = useLocalStorage('user');
  const name = user?.name;
  const snap = useSnapshot(state);
  const location = useLocation();

  const userName = name?.split(' ')[0];

  useEffect(() => {
    fetchUser();
  });



  const fetchUser = async () => {
    try {
      const { data } = await instance.get(`/user/profile/${user._id}`);
      if (data) {
        actions.setUserInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showDropdown = () => {
    setLogout(!logout);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.patch('/auth/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (snap.socket && snap.socket.connected) {
        snap.socket.disconnect()
      }
      actions.setUser(null);
      actions.setAccessToken(null);
      navigate('/signin',{replace: true});
    } catch (error) {
      console.error('ERROR: ', error);
    }
    navigate('/signin');
  };

  const toggleAction = () => {
    showMenuModal(!menuModal);
  };
  //const { accessToken } = useSnapshot(state);
  actions.setAccessToken(localStorage.getItem('accessToken'));

  useEffect(() => () => {
    devtools(state, {
      name: 'MIINGO_STATE',
      enabled: process.env.NODE_ENV !== 'production'
    });
  });

  // const init = () => {
  //   if (accessToken) {
  //     console.log('initiating sockets')
  //     actions.initSocket()
  //     console.log('initiated sockets')
  //   }
  // }

  // useEffect(() => {
  //  init()
  // }, [])
  
  useEffect(() => {
    if (accessToken) {
      console.log('appjx access token', accessToken)
      const { exp: tokenEXp, iat } = getTokenPayload(accessToken);
      const currentTime = Date.now() / 1000; //time in seconds
      

      if (tokenEXp > currentTime - 10) {
        actions.setAccessToken(accessToken);
        console.log('initiating sockets')
        actions.initSocket()
        const intervalID = setInterval(() => {
          console.log('TIME TO EXPIRE', tokenEXp, iat);
          if (
            location.pathname !== '/signin' ||
            location.pathname !== '/signup' ||
            location.pathname !== '/'
          ) {
            api
              .get('/auth/refresh-token', {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              .then((res) => {
                const data = res.data;
                console.log('RES: ', data);
                actions.setAccessToken(data.accessToken);
              });
          }
        }, (tokenEXp - iat) * 1000 - 10000);

        return () => clearInterval(intervalID);
      } else if( tokenEXp < currentTime) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        if (snap.socket) {
          snap.socket.disconnect()
        }
       
        navigate('/signin');
      }
    } else {
      if (snap.socket) {
        snap.socket.disconnect()
      }
      navigate('/signin');
    }
  }, [accessToken, location.pathname, navigate, snap.socket]);

  return (
    <div className="relative">
      <Header
        onPress={showDropdown}
        showMenuModal={() => showMenuModal(true)}
      />

      {logout && (
        <div className="absolute top-16 right-14 z-50 bg-white shadow-xl rounded-lg h-auto w-28 p-2">
          <div className="py-1">
            <div className="w-4 h-4 right-3 md:left-3 absolute mt-1 bg-white -top-3  rotate-45"></div>
          </div>

          <p className="sm:hidden flex items-center space-x-1 text-sm hover:bg-lightgraybg hover:rounded-md p-1 cursor-pointer border-b mb-2 ">
            <span className="">
              <HiOutlineUserCircle className="w-5 h-5 hover:scale-105 transition ease-out duration-300 " />
            </span>

            <span>{userName}</span>
          </p>

          <Link
            to={`/profile/${user?._id}`}
            className=" flex items-center space-x-3 text-sm hover:bg-lightgraybg hover:rounded-md p-1 cursor-pointer border-b mb-2 text no-underline "
          >
            <span className="">
              <HiOutlineUserCircle className="w-5 h-5 hover:scale-105 transition ease-out duration-300 " />
            </span>

            <span>Profile</span>
          </Link>
          <p
            onClick={handleLogout}
            className="text-sm hover:bg-lightgraybg p-1 hover:rounded-md cursor-pointer flex items-center space-x-3"
          >
            <span className="">
              <HiOutlineLogout className="w-5 h-5 hover:scale-105 transition ease-out duration-300 " />
            </span>
            <span>Logout</span>
          </p>
        </div>
      )}

      <>
        <Routes>
        <Route
            path=""
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          {/* test routes */}
          <Route path="ld" element={<NewProfilePage />} />
          <Route path="ad" element={<ActivityCard />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="status" element={<StatusCarousel />} />
          <Route path="av" element={<StatusPopOut />} />

          {/* end */}
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="feed"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="messages"
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />

          <Route
            path="group_messages"
            element={
              <RequireAuth>
                <GroupMessages />
              </RequireAuth>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            path="groups"
            element={
              <RequireAuth>
                <GroupFeeds />
              </RequireAuth>
            }
          />

          <Route
            path="groups/:id"
            element={
              <RequireAuth>
                <GroupFeeds />
              </RequireAuth>
            }
          />

          <Route path="coming" element={<Coming />} />
        </Routes>
      </>

      <BottomNav />

      {menuModal ? (
        <>
          <MenuBottomSheet
            onClick={toggleAction}
            onDismiss={toggleAction}
            open={menuModal}
          >
            <div className=" flex flex-col space-y-4 rounded shadow-lg h-[600px]">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <h3 className="text-gray-600 font-semibold">Menu </h3>
                <HiOutlineX className="h-6 w-6 cursor-pointer" />
              </div>

              {/* Modal body */}
              <div className="h-56 p-3 grid grid-cols-3 gap-2 pb-20 ">
                {menuItems.map(({ id, name, icon, path }) => (
                  <MenuItem key={id} Icon={icon} name={name} path={path} />
                ))}
              </div>
            </div>
          </MenuBottomSheet>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

const RequireAuth = ({ children }) => {
  //const user = localStorage.getItem('user');
  const { me: user} = useSnapshot(state);
  const location = useLocation();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  actions.setAccessToken(accessToken);
  //actions.setUser(user)  

  useEffect(() => {
    if (accessToken) {
      const { exp: tokenEXp, iat } = getTokenPayload(accessToken);
      const currentTime = Date.now() / 1000; //time in seconds

      if (tokenEXp > currentTime - 10) {
        actions.setAccessToken(accessToken);
        const intervalID = setInterval(() => {
          if (
            location.pathname !== '/signin' ||
            location.pathname !== '/signup' ||
            location.pathname !== '/'
          ) {
            api
              .get('/auth/refresh-token', {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              })
              .then((res) => {
                const data = res.data;
                actions.setAccessToken(data.accessToken);
              });
          }
        }, (tokenEXp - iat) * 1000 - 10000);

        return () => clearInterval(intervalID);
      } else if( tokenEXp < currentTime) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/signin');
      }
    } else {
      navigate('/signin');
    }
  }, [accessToken, location.pathname, navigate]);

  return user ? children : <Navigate to="/signin" />;
};
