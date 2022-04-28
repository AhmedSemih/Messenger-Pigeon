import { Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Main from './Pages/Main';
import Chat from './Pages/Chat';
import Menu from './Pages/Menu';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import AddFriend from './Pages/AddFriend';
import NotFound from './Pages/NotFound';

// Desktop, Laptop and Big Tablets
export const LargeScreenRoute = ({ user }) => {
      
        return (
            <Routes>
                <Route path="/login" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                {user === null ? <Route path='*' element={<Navigate to="/login" />} /> : <Route path='*' element={<Main />} />}
            </Routes>
        )
    
}

//Phones and Small Tablets
export const SmallScreenRoute = ({ user }) => {
    
    return (
    
            <Routes>
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            {user === null ? <Route path='*' element={<Navigate to="/login" />} /> :
                <>
                    <Route exact path="/" element={<Menu />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/addfriend" element={<AddFriend />} />
                    <Route path="*" element={<NotFound />} />
                </>
            }
        </Routes>
            
    )
}