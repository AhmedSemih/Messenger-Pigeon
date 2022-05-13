import React, { useEffect, useState } from 'react';
import {Box} from '@mui/material';
import Searchbar from './Searchbar';
import AddFriendbar from './AddFriendbar';
import { getUsers} from '../Firebase/firebase-database';
import {useUserContext} from '../Contexts/UserContext'
import { useSearchContext } from '../Contexts/SearchContext';

function FriendAdd() {

    const {user}=useUserContext();
    const {userSearch}=useSearchContext();

    const [usersArray,setUsersArray]=useState([]);

    useEffect(()=>{
        
        //Render by Search
        if(userSearch!==" " && userSearch!==null && userSearch!==undefined){

           let userList=[];
                setUsersArray(userList);
                var users=getUsers();

            //For Email
            if(userSearch.includes('@')){
                users.forEach((user)=>{
                    if(user.email.toLowerCase().includes(userSearch)){
                        userList.push(user);
                        setUsersArray(userList);
                    }
                });
            }
            //For Username
            else{

                users.forEach((user)=>{
                    
                   if(user.username.toLowerCase().includes(userSearch)){
                        userList.push(user);
                        setUsersArray(userList);
                    }
                });
            }
        }
        else{
            let userList=[];
            setUsersArray(userList);
        }

    },[userSearch]);

    return (
        <Box sx={{ width: '100%', height: '90vh', borderRight: '2px solid #4a6c7d',px:2,backgroundColor:'#548CA8'}}>
            <Searchbar bgColor="#334257" color="#548CA8" isFriendSearch={false} />
            {usersArray.map((u)=>{

                return user.uid !== u.userId ? <AddFriendbar key={u.userId} name={u.username} request={false} uid={u.userId} userId={user.uid} ></AddFriendbar> : null
                
            })}
        </Box>
    )
}

export default React.memo(FriendAdd);