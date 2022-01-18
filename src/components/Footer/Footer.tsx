import socket from 'config/socketConfig';
import React, {useReducer, useState} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { formatDateTimeToString, isObjectEmpty, randomStr } from 'utils/utils';
import { addInterlocutorMessage } from 'store/actionCreators';
import { useSelector } from "react-redux";

const Footer = ():JSX.Element => {
  
    const [chatText, setChatText]= useState('');
    const dispatch: Dispatch = useDispatch();
    const reduxState = useSelector( (state: UsersState) => state);
    const {usersArray, activeInterlocutor} = reduxState;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) :void  => {
        const {value} = e.target;
        setChatText(value);
    };

    const handleSubmit = async (e : React.SyntheticEvent<Element, Event>) => {
        const newUsersArray = [...usersArray];
        socket.emit("message", {
            content: chatText,
            to: activeInterlocutor?.user_id,
            time: formatDateTimeToString(new Date()),
        });
        setChatText('');
        const interlocutor =  newUsersArray.filter(function(user) {
            return user.user_id === activeInterlocutor?.user_id;
        });
        
        if(interlocutor[0]){
            if(!interlocutor[0].messages){
                interlocutor[0].messages = [{
                    content: chatText,
                    from: '',
                    time: formatDateTimeToString(new Date()),
                    msg_id: randomStr(),
                }]; 
            }else{
                interlocutor[0].messages.push({
                    content: chatText,
                    from: '',
                    time: formatDateTimeToString(new Date()),
                    msg_id: randomStr(),
                });
            }
        }
        dispatch(addInterlocutorMessage(newUsersArray));
    }
   
    return(
        <div>
         
            {!isObjectEmpty(activeInterlocutor) && (
                <div className='footer border-top pt-3'>
                    <div className='d-flex align-items-center justify-center'>
                        <input
                            placeholder='Type a message ...'
                            className='form-input w-100'
                            name="chat_text"
                            type='text'
                            onChange={handleChange}
                            role="msg-input"
                            value={chatText}
                        />

                        <button 
                            className='ml-2 p-2 submit-button'
                            onClick={(e)=>handleSubmit(e)}
                            disabled={!chatText? true : false}
                            role="msg-button"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};


export default Footer;
