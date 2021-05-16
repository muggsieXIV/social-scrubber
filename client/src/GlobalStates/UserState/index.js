import React, {useReducer, useContext, createContext} from 'react'
import {SET_USER} from "./userAction"

const UserContext = createContext()
const {Provider} = UserContext

const reducer = (state, action) =>{
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user}
            break
    }

}

const UserProvider = ({value=[], ...props}) => {

    const [state, dispatch] = useReducer(reducer, {})

    return (
        <Provider value = {[state, dispatch]} {...props}/>
    )
}

const useUserContext = () => {
    return useContext(UserContext)
}

export {useUserContext, UserProvider}