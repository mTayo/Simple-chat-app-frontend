import * as actionTypes from "./actionTypes"

export function addUser(usersArray: NewUserObject[]) {
  
  const action: AddUserAction = {
    type: actionTypes.NEW_USER,
    usersArray: usersArray,
  }
  return action;

};


export function addInterlocutorMessage(usersArray: NewUserObject[]) {
  const action: AddUserAction = {
    type: actionTypes.ADD_INTERLOCUTOR_MESSAGE,
    usersArray: usersArray,
  }
  return action;

};

export function addInterlocutor(usersObject: NewUserObject) {
  const action: AddActiveInterlocutor = {
    type: actionTypes.ACTIVE_INTERLOCUTOR,
    activeInterlocutor: usersObject,
  }
  return action;

};

