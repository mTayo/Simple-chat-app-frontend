import React, { useEffect, useState, useReducer } from 'react';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import socket from 'config/socketConfig';
import { addInterlocutorMessage } from 'store/actionCreators';
import { isObjectEmpty } from 'utils/utils';
import { useSelector } from "react-redux";

const ChatMessageContainer = (props:any) => {
  
    const reduxState = useSelector( (state: UsersState) => state);
    const {usersArray, activeInterlocutor} = reduxState;
    const [displayAvatarIndex, setDisplayAvatarIndex] = useState(props?.index || null);
    const dispatch: Dispatch<any> = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleNewMessages = (data?:any) => { 

        const newUsersArray = usersArray;
        const newMsg = {    
            content: data?.content,
            from: data?.from,
            time: data?.time,
            msg_id: data?.msg_id,
        };
        
        const currentInterlocutor =  newUsersArray.filter(function(user:NewUserObject) {
            return user.user_id === data?.from;
        });

        if(currentInterlocutor[0]){

            if(!currentInterlocutor[0].messages){
                currentInterlocutor[0].messages = [newMsg]; 
            }else{
                let messages = currentInterlocutor[0].messages;
                messages =  messages.filter(function(message:any) {
                    return message.msg_id !== data?.msg_id;
                });
                messages.push(newMsg);
                currentInterlocutor[0].messages = messages;
            };
        
            dispatch(addInterlocutorMessage(newUsersArray));
            const getDispalyIndex = getAvatarIndex(currentInterlocutor[0].messages);
            //@ts-ignore
            setDisplayAvatarIndex(getDispalyIndex);
        };
      };
    
    useEffect(() => {
        
        socket.on("message", ({ content, from, time, msg_id }) => {
           handleNewMessages({content, from, time, msg_id} );
        }, );
            
    },[handleNewMessages]);


    const getAvatarIndex = (items:any ) => {
        let returnIndex = null;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if(element.from){
                returnIndex = index;
            } 
        }
        return returnIndex; 
    };
    
    return(
        
        <>
            <div className='msg-container'>
                <div className='chat-body'>
                {!isObjectEmpty(activeInterlocutor) && (   
                    <>
                    {activeInterlocutor?.messages?.map((item:any, index: number) =>      
                    
                        <div key={index}>
                            {item.from === activeInterlocutor?.user_id? (
                                <>
                                     <div className="chat left-text">
                                        
                                         {index === displayAvatarIndex && (
                                             <>
                                                <img 
                                                    alt="Avatar pic"
                                                    src={activeInterlocutor?.avatar}
                                                    className="rounded-circle avatar-img"
                                                    style={{width: "50px"}}
                                                />
                                                
                                             </>
                                         )}
                                        
                                        <div className="msg-bubble">
                                            <div className="msg-info">
                                            <div className="msg-info-name">{activeInterlocutor?.username}</div>
                                            
                                            </div>

                                            <div className="msg-text">
                                                {item.content}
                                            </div>
                                            <div className="msg-info-time small-text mt-2 grey-text">{item.time}</div>
                                        </div>
                                    </div>
                                </>
                            ): (
                                <>

                                    <div className="chat right-msg">
                                        <div className="msg-bubble">
                                            <div className="msg-info">                                     
                                            <div className="msg-info-name">{props?.userName || ''}</div> 
                                            </div>
                                            <div className="msg-text">
                                                {item.content}
                                            </div>
                                            <div className="msg-info-time small-text mt-2 grey-text">
                                                {item.time}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        
                        </div>
                    )
                }
                    </>
                )}
            
                </div>
            </div>
        </>
    );
};

export default ChatMessageContainer;

