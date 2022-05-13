import { getDatabase, ref, set, onValue, push, serverTimestamp, limitToLast, limitToFirst, query, remove, child } from "firebase/database";

//Create Channel
export const createChannel = (channelId, user1, user2) => {
    const db = getDatabase();

    //Create Channel
    set(ref(db, 'channels/' + channelId), {
        channelId: channelId,
    });

    //Last Seen and Send
    set(ref(db, 'channels/' + channelId + '/' + user1 + '/lastseen/'), {
        lastSeen: 0,
    });
    set(ref(db, 'channels/' + channelId + '/' + user1 + '/lastsend/'), {
        lastSend: 0,
    });
    set(ref(db, 'channels/' + channelId + '/' + user2 + '/lastseen/'), {
        lastSeen: 0,
    });
    set(ref(db, 'channels/' + channelId + '/' + user2 + '/lastsend/'), {
        lastSend: 0,
    });
}

//Send Message
export const sendMessage = (channelId, senderId, text) => {
    const db = getDatabase();

    //Update Last Send
    set(ref(db, 'channels/' + channelId + '/' + senderId + '/lastsend/'), {
        lastSend: serverTimestamp(),
    });

    updateLastSeen(channelId, senderId);

    //Send Messages
    push(ref(db, 'channels/' + channelId + '/messages/'), {
        sender: senderId,
        text: text,
        sendedAt: serverTimestamp()
    });
}

//Get Messages
export const getMessages = (channelId) => {
    const db = getDatabase();

    const messagesQuery = query(ref(db, 'channels/' + channelId + '/messages/'), limitToLast(14));
    const allMessages=ref(db, 'channels/' + channelId + '/messages/');

    let messages = "";
    var messageArray = [];

    onValue(messagesQuery, snapshot => {
        messages = snapshot.val();
        if (messages) {
            Object.values(messages).forEach((message) => {
                messageArray.push(message);
            });
        }
    });

    let childCount=0;
    onValue(allMessages,snapshot=>{
        snapshot.forEach(()=>{
            childCount=childCount+1;
        });
    });
    
    //Delete Old Messages Every 100 Message
    if(childCount>100){
        remove(allMessages);
        messageArray.forEach((mess)=>{
            push(allMessages,{
                sender:mess.sender,
                text:mess.text,
                sendedAt:mess.sendedAt
            });
        });
    }

    return messageArray;
}

//Get Last Seen
export const getLastSeen = (channelId, userId) => {
    const db = getDatabase();

    const lastSeenRef = ref(db, 'channels/' + channelId + '/' + userId + '/lastseen/');
    let lastSeen = '';

    onValue(lastSeenRef, snapshot => {
        lastSeen = snapshot.val();
    });
    return lastSeen;
}

//Get Last Send
export const getLastSend = (channelId, userId) => {
    const db = getDatabase();

    const lastSendRef = ref(db, 'channels/' + channelId + '/' + userId + '/lastsend/');
    let lastSend = '';

    onValue(lastSendRef, snapshot => {
        lastSend = snapshot.val();
    });
    return lastSend;
}

//Update Last Seen
export const updateLastSeen = (channelId, userId) => {
    const db = getDatabase();

    set(ref(db, 'channels/' + channelId + '/' + userId + '/lastseen/'), {
        lastSeen: serverTimestamp(),
    });
}