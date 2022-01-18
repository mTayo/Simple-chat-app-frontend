import React from 'react';
import { connect } from 'react-redux';
import { isObjectEmpty } from 'utils/utils';
import { useSelector } from "react-redux";
const Header = (): JSX.Element => {
    const reduxState = useSelector( (state: UsersState) => state);
    const {activeInterlocutor} = reduxState;

    return(
        <>
            <div className='header'>
                <div className='d-flex align-items-center justify-center'>
                    {!isObjectEmpty(activeInterlocutor) && (
                        <>
                            <img 
                                alt="Avatar pic"
                                src={activeInterlocutor?.avatar}
                                className="rounded-circle"
                                style={{width: "50px"}}
                            />
                            <div className='ml-2'>
                                {activeInterlocutor?.username}
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </>
    );
};


export default Header;

