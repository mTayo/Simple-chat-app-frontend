
import React from 'react';
import SideBar from 'components/SideBar';
import Enzyme, { shallow,  mount  } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
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
    activeInterlocutor: {username:'user 1', user_id: 'foeep4w', avatar: 'img-src'},
    usersArray:[
        {username:'user 1', user_id: 'foeep4w'},
        {username:'user 2', user_id: 'foeep4X'},
    ]
}

describe('<SideBar />', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders correctly", () => {
            
        const store = makeStore(emptyReduxState);
        const wrapper = shallow(
            <Provider store={store}>
                <SideBar  />
            </Provider>
        )
       
    });

    it('A blue active chat indicator should display on the sidebar because  activeInterlocutor props is not empty', () => {
            
        const store = makeStore(reduxState);
        const wrapper = mount(
            <Provider store={store}>
                <SideBar  />
            </Provider>
        )
        expect(wrapper.find('.sidebar-active-chat')).toHaveLength(1);
            
    });

    it('Number of items on the sidebar should be the length of usersArray (2) props', () => {
            
        const store = makeStore(reduxState);
        const wrapper = mount(
            <Provider store={store}>
                <SideBar  />
            </Provider>
        )
        expect(wrapper.find('.sidebar-items')).toHaveLength(2);
            
    });

});

