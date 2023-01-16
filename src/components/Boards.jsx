import BirthdayCard from './BirthdayCard';
import Entertainment from './Entertainment';
import Events from './Events';
import FriendsSuggestion from './FriendsSuggestion';
import Gallery from './Gallery';
import Groups from './Groups';
import LeadersBoard from './LeadersBoard';
import React, { useEffect } from 'react';
import api from '../services/axios-config';
import { useSnapshot } from 'valtio';
import { actions, state } from '../state';

function Boards() {
  const { me, followers } = useSnapshot(state)


  const getFollowers = async () => {
    const res = await api.get(`user/${me._id}/followers/followings`);
    if (res.data) {
      actions.setFollowers(res.data.followers);
      actions.setFollowings(res.data.followings);
      console.log('FOOLOFH', res?.data)
    }
  }
    useEffect(() => {
      getFollowers()
    })

    return (
      <div className="relative hidden lg:block  w-[340px] mt-2  ">

        <div className=" space-y-4 sticky top-20 ">
          <LeadersBoard />

          <Groups />

          <Entertainment />

          <Gallery />

          <BirthdayCard />

          <Events />
          <FriendsSuggestion followers={followers} />

        </div>
      </div>
    );
  }

  export default Boards;
