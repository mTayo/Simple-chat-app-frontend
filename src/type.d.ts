interface NewUserObject {
    username?: string
    avatar?: string
    user_id?: string
    messages?: any
}

type UsersState = {
  usersArray: NewUserObject[],
  activeInterlocutor: NewUserObject,
}
  
type AddUserAction = {
  type: string
  usersArray: NewUserObject[]
}

type AddActiveInterlocutor = {
  type: string
  activeInterlocutor: NewUserObject
}
  
type DispatchType = (args: AddUserAction) => AddUserAction