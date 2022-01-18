import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { addInterlocutor } from 'store/actionCreators';
import socket from 'config/socketConfig';
import { useSelector } from "react-redux";

const SideBar = () : JSX.Element  => {
    
    const reduxState = useSelector( (state: UsersState) => state);
    const {usersArray, activeInterlocutor} = reduxState;
    const dispatch: Dispatch<any> = useDispatch();

    const newActiveChat = (data: NewUserObject ): void => {
        dispatch(addInterlocutor(data));
    };
  
    return(
        <>
            <div className='side-bar'>
                <div className='font-weight-bold p-2 text-white mb-4'>
                    Simple chat app
                </div>

                {usersArray?.map((user:NewUserObject, index: number) => {
                 
                    return(
                        <Fragment key={index}>
                            <div 
                                className={`
                                    p-2 text-white pointer mt-1 sidebar-items
                                    ${activeInterlocutor.user_id === user.user_id? 'sidebar-active-chat' :''}
                                `}
                                onClick={()=>newActiveChat(user)}
                            >
                                {user?.username}  {user?.user_id === socket?.id && (<>(Self) </>)}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </>
    );
};


export default SideBar;

