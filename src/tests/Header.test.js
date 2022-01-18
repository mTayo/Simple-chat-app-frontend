
import React from 'react';
import Header from 'components/Header';
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

describe('<Header />', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders correctly", () => {
            
        const store = makeStore(emptyReduxState);
        const wrapper = shallow(
            <Provider store={store}>
                <Header  />
            </Provider>
        )
       
    });

    it('Avatar should show if activeInterlocutor props not is empty', () => {
            
        const store = makeStore(reduxState);
        const wrapper = mount(
            <Provider store={store}>
                <Header  />
            </Provider>
        )
        expect(wrapper.find('img')).toHaveLength(1);
            
    });

    it('Avatar should not show if activeInterlocutor props  is empty', () => {
            
        const store = makeStore(emptyReduxState);
        const wrapper = mount(
            <Provider store={store}>
                <Header  />
            </Provider>
        )
        expect(wrapper.find('img')).toHaveLength(0);
            
    });

});

