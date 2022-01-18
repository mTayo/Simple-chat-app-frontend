import React, {useEffect, useState} from 'react';
import 'assets/styles/style.scss';
import Header from 'components/Header';
import ChatMessageContainer  from 'components/ChatMessageContainer';
import Footer from 'components/Footer';
import socket from 'config/socketConfig';
import { generateRandomNumber, selectRandomAvatar } from 'utils/utils';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { addUser } from 'store/actionCreators';
import { connect } from 'react-redux';
import SideBar from 'components/SideBar';

const App = () => {
  const [userName, setUserName] = useState('');
  const dispatch: Dispatch<any> = useDispatch();

  let username = `user ${generateRandomNumber()}`;
  let avatar = selectRandomAvatar();

  useEffect(()=>{
    
    socket.auth = { 
        username: username,
        avatar: avatar,
    };
    socket.connect();
    setUserName(username);
  
    socket.on("users", (users) => {
      dispatch(addUser(users));
    });
    
    socket.on("user connected", (users) => {
      dispatch(addUser(users?.users));
    });
    
  },[]);

  return (
    <div className='app-container'>
      <div className='d-flex w-100' >
        <div className='w-25'>
          <SideBar />
        </div>
        <div className='w-75'>
          <Header />
          <ChatMessageContainer 
            userName = {userName}
          />
          <Footer />
        </div>
        
      </div>
     
    </div>
  );
};

const mapStateToProps = (appState:any) => {
  return {};
}
export default connect(mapStateToProps)(App);

