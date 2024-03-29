import React, { useEffect, useState } from 'react';

import Boards from '../components/Boards';
import Feed from '../components/Feed';
import ModalWrapper from '../components/StatusModal';
import SideFeed from '../components/SideFeed';
import Statuses from '../components/Statuses';
import { actions } from '../state';

function Home({ contentType }) {
  const [showModal, setShowModal] = useState(false);

  /**
   * This effect is used to connect first time users to a socket
   */
  useEffect(() => {
    actions.initSocket();
  }, [showModal]);

  return (
    <div className=" h-screen w-full bg-miingo-gray  font-serif overflow-y-auto overflow-x-hidden scrollbar-hide ">
      <Statuses handlePostStatus={() => setShowModal(true)} />

      {showModal ? <ModalWrapper handler={setShowModal} /> : null}

      <main className="relative flex space-x-2 pr-3 pb-10 ">
     

        {/* SideFeed  /> */}
        <SideFeed home/>

        {/* Feed */}

        <Feed />

        {/* Boards */}

        <Boards />
      </main>
    </div>
  );
}

export default Home;
