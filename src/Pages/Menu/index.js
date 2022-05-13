import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import TopMenu from '../../Components/TopMenu';
import Friendbar from '../../Components/Friendbar';
import Searchbar from '../../Components/Searchbar';
import { getFriends } from '../../Firebase/firebase-database';
import { useUserContext } from '../../Contexts/UserContext';
import { useSearchContext } from '../../Contexts/SearchContext';

function Menu() {

  const { user } = useUserContext();
  const { friendSearch } = useSearchContext();
  const [friends, setFriends] = useState([]);

  useEffect(() => {

    let friends = getFriends(user.uid);
    if (friendSearch !== "" || friendSearch !== null || friendSearch !== undefined) {
      let friendList = [];
      setFriends(friendList);

      friends.forEach((friend) => {
        if (friend.name.toLowerCase().includes(friendSearch)) {
          friendList.push(friend);
          setFriends(friendList);
        }
      });
    }
    else {
      setFriends(friends);
    }

  }, [friends, user, friendSearch]);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#476072', minHeight: '100vh', borderRight: '2px solid #4a6c7d'}}>
      <TopMenu />
      <Searchbar bgColor="#548CA8" color="#334257" isFriendSearch={true} />
      <Box sx={{overflowY:'scroll'}}>
        {
          friends.map((friend) => {
            return <Friendbar key={friend.id} id={friend.id} channelId={friend.channelId}></Friendbar>
          })
        }
      </Box>
    </Box>
  )
}

export default React.memo(Menu);