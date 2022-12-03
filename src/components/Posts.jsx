import React, { useEffect, useState } from 'react';
import { actions, state } from '../state';

import Addfriends from './Addfriends';
import Post from './Post';
import axios from '../services/axios-config';
import useLocalStorage from '../hooks/useLocalStorage';
import { useSnapshot } from 'valtio';

function Posts() {
  const [error, setError] = useState(null);
  const snapshot = useSnapshot(state);
  const [accessToken] = useLocalStorage('accessToken');
  useEffect(() => {
    axios
      .get('/post', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        actions.addPosts(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [accessToken]);

  const posts = snapshot.posts;

  return (
    <div className="w-full md:w-[640px] space-y-4">
      {posts.slice(0, 1).map((post) => (
        <Post
          key={post._id}
          name={post.user ? post.user.name : "creator's name"}
          postDesc={post.postDesc}
          email={post.user ? post.user.email : "creator's email"}
          createdAt={post.createdAt}
          user={post.user}
          image={
            post.image
              ? `https://api1.miingoapp.com/${post.image}?not-from-cache-please`
              : null
          }
          _id={post._id}
        />
      ))}

      <Addfriends />

      {posts.slice(1).map((post) => (
        <Post
          key={post._id}
          name={post.user ? post.user.name : "creator's name"}
          postDesc={post.postDesc}
          email={post.user ? post.user.email : "creator's email"}
          createdAt={post.createdAt}
          image={
            post.image
              ? `https://api1.miingoapp.com/${post.image}?not-from-cache-please`
              : null
          }
          likes={post.likes.length}
          comments={post.comments}
          _id={post._id}
        />
      ))}

      {posts.map((post) => (
        <Post
          key={post._id}
          name={post.user ? post.user.name : "creator's name"}
          postDesc={post.postDesc}
          email={post.user ? post.user.email : "creator's email"}
          createdAt={post.createdAt}
          image={
            post.image
              ? `https://api1.miingoapp.com/${post.image}?not-from-cache-please`
              : null
          }
          likes={post.likes.length}
          comments={post.comments}
          _id={post._id}
        />
      ))}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default Posts;
