import * as actionTypes from "./actionTypes"

const initialState: UsersState = {
    usersArray:[],
    activeInterlocutor: {},
};

const reducer = (
    state: UsersState = initialState,
    action: any
  ): UsersState => {
   
    switch (action.type) {
      
      case actionTypes.NEW_USER:
     
        return {
          ...state,
          usersArray: action?.usersArray,
        }
        
      case actionTypes.ADD_INTERLOCUTOR_MESSAGE:
        return {
          ...state,
          usersArray: action?.usersArray,
        }

      case actionTypes.ACTIVE_INTERLOCUTOR:
        
        return {
          ...state,
          activeInterlocutor: action?.activeInterlocutor,
        }
    }
    return state
  }
  
  export default reducer;