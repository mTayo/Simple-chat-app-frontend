
import React from 'react';
import Footer from 'components/Footer';
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
    activeInterlocutor: {username:'user 1', user_id: 'foeep4w'},
    usersArray:[
        {username:'user 1', user_id: 'foeep4w'},
        {username:'user 2', user_id: 'foeep4X'},
    ]
}

describe('<Footer />', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
   
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("renders correctly", () => {
            
            const store = makeStore(emptyReduxState);
            const wrapper = shallow(
                <Provider store={store}>
                    <Footer  />
                </Provider>
            )
       
    });

    it('Button should  not show because activeInterlocutor props is empty', () => {
            
            const store = makeStore(emptyReduxState);
            const wrapper = mount(
                <Provider store={store}>
                    <Footer  />
                </Provider>
            )
            expect(wrapper.find('button')).toHaveLength(0);
            
        
    });

    it('Input should show because activeInterlocutor props is not empty', () => {
            
            const store = makeStore(reduxState );
            const wrapper = mount(
                <Provider store={store}>
                    <Footer  />
                </Provider>
            )
            expect(wrapper.find('input')).toHaveLength(1);
            expect(wrapper.find("button").props().disabled).toBe(true);
      
    });


    it('Button should be disabled because chat message state is empty', () => {
            
            const store = makeStore(reduxState );
            const wrapper = mount(
                <Provider store={store}>
                    <Footer  />
                </Provider>
            )
            expect(wrapper.find("button").props().disabled).toBe(true);
    });

    

});

