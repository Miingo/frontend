import Boards from '../components/Boards';
import Chat from '../components/Chats/Chat';
import ModalWrapper from '../components/StatusModal';
import SideFeed from '../components/SideFeed';
import Statuses from '../components/Statuses';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { actions, state } from '../state';
import api from '../services/axios-config';

export default function Messages() {
  const location = useLocation();
  const { _id, src,name,online,chat } = location.state;
  const [showModal, setShowModal] = useState(false);
  const snap = useSnapshot(state);

  console.log('LOGGEDIN USER', snap.me._id)
  console.log('State data: ', _id, { ...chat });
  const getConversations = async () => {
    try {
      const res = await api.get(`chat/conversation/user/${snap.me._id}`)
      if (res.data) {
        actions.setConversations(res.data)
        console.log('CONVERSATIONS======>',res.data)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    actions.chatStarted(chat._id);
  }, [chat._id])

  useEffect(() => {
  
    getConversations();
  })

  return (
    <div className="relative h-screen bg-miingo-gray">
      <Statuses handlePostStatus={() => setShowModal(true)} />

      {showModal ? <ModalWrapper handler={setShowModal} /> : null}

      <main className="flex space-x-2 pr-3">
        {/* chats */}

        <SideFeed showChat />

        {/* Messages */}

        <Chat name={name} src={src} online={online} />

        {/* Boards */}

        <Boards />
      </main>
    </div>
  );
}
