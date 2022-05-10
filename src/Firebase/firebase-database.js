import { getDatabase, ref, set, onValue, push, } from "firebase/database";

//Add User Data
export const addUserData = (userId, username, email, info) => {
    const db = getDatabase();

    set(ref(db, 'users/' + userId), {
        userId: userId,
        username: username,
        email: email,
        info: info ? info : 'No Information'
    });
};

//Get User Data
export const getUserData = (userId) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + userId);
    var data = "";
    onValue(userRef, snapshot => {
        data = snapshot.val();
    });

    return data;
};

//Get Users
export const getUsers = () => {
    const db = getDatabase();
    const userRef = ref(db, 'users/');
    var users = "";
    var usersArray = [];
    onValue(userRef, snapshot => {
        users = snapshot.val();
        Object.values(users).forEach(val => {
            usersArray.push(val);
        });
    });
    return usersArray;
};

//Send Friend Request
export const sendFriendRequest = (userId, senderId,senderName) => {
    const db = getDatabase();

    set(ref(db, 'users/' + userId + '/requests/'+senderId), {
        senderId: senderId,
        senderName: senderName
    });
};

//Get Friend Requests
export const getFriendRequests = (userId) => {
    const db = getDatabase();
    const requestRef = ref(db, 'users/' + userId + '/requests/');
    var requests = "";
    var requestArray = [];
    onValue(requestRef, snapshot => {
        requests = snapshot.val();
        if(requests){
            Object.values(requests).forEach(val => {
                requestArray.push(val);
            });
        }
    });
    return requestArray;
};

//Accept Friend Request
export const acceptFriendRequest=(userId,userName,senderId,senderName)=>{
    const db = getDatabase();

    set(ref(db, 'users/' + userId + '/requests/'+senderId), {
    });
    set(ref(db, 'users/' + senderId + '/requests/'+userId), {
    });

    let randomRef=push(ref(db,'users/'));
    var channelId=randomRef.key;

    set(ref(db,'users/' + userId +'/friends/'+senderId),{
        id:senderId,
        name:senderName,
        channelId:channelId
    });

    set(ref(db,'users/' + senderId +'/friends/'+userId),{
        id:userId,
        name:userName,
        channelId:channelId
    });
}

//Decline Friend Request
export const declineFriendRequest=(userId,senderId)=>{
    const db = getDatabase();

    set(ref(db, 'users/' + userId + '/requests/'+senderId), {
    });
}

//Get Friends
export const getFriends=(userId)=>{
    const db = getDatabase();
    const friendsRef = ref(db, 'users/' + userId + '/friends/');
    var friends="";
    var friendsArray=[];
    onValue(friendsRef,snapshot=>{
        friends=snapshot.val();
        if(friends){
            Object.values(friends).forEach(val=>{
                friendsArray.push(val);
            });
        }
    });
    return friendsArray;
}

//Remove Friend
export const removeFriend=(userId,removeId)=>{
    const db = getDatabase();
    set(ref(db,'users/'+userId+'/friends/'+removeId),{});
}