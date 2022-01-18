
import React from 'react';
import Enzyme, { shallow,  mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatMessageContainer from 'components/ChatMessageContainer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { createStore } from "redux";
import reducer from 'store/reducer';

const makeStore = (reduxState) => {
    return createStore(reducer, reduxState );
};

Enzyme.configure({adapter: new Adapter()});

const emptyReduxState = {
    activeInterlocutor: {},
    usersArray:[],
};
const reduxState ={
    activeInterlocutor: {
        username:'user 1', 
        user_id: 'foeep4w',
        messages:[{
            content: 'Hello world',
            from: 'foeep4w',
            time: '18/01/2022',
            msg_id: 'randStr#465',
            },
            {
            content: 'Hello world',
            from: 'foeep4w',
            time: '18/01/2022',
            msg_id: 'randStr#465',
            },
        ],
        avatar: 'img-src',
    },
    usersArray:[
        {username:'user 1', user_id: 'foeep4w'},
        {username:'user 2', user_id: 'foeep4X'},
    ]
};

describe('<ChatMessageContainer />', () => {
  
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders correctly", () => {
            
        const store = makeStore(emptyReduxState);
        const wrapper = shallow(
            <Provider store={store}>
                <ChatMessageContainer  />
            </Provider>
        )
       
    });

    it('chat divs should not show be activeInterlocator object is empty', () => {
            
        const store = makeStore(emptyReduxState);
        const wrapper = mount(
            <Provider store={store}>
                <ChatMessageContainer  />
            </Provider>
        )
        
        expect(wrapper.find('.chat')).toHaveLength(0);
            
    });

    it('Last interlocutor div should have an avatar', () => {
            
        const store = makeStore(reduxState );
        const props = {index: 1};
        const wrapper = mount(
            <Provider store={store}>
                <ChatMessageContainer  {...props} />
            </Provider>
        )
        expect(wrapper.find(".avatar-img")).toHaveLength(1);
      
    });


});