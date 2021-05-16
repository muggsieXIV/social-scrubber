import React, {useReducer, useContext, createContext} from "react"
import {SELECT_MESSAGE_TEMPLATE, CLEAR_MESSAGE_TEMPLATE, LOAD_ALL_MESSAGE_TEMPLATES} from "./messageAction"

const MessageContext = createContext();
const {Provider} = MessageContext

const reducer = (state, action) => {
    switch(action.type) {
        
        case LOAD_ALL_MESSAGE_TEMPLATES:

            return {...state, all_message_templates : action.all_message_templates}
            break

        case SELECT_MESSAGE_TEMPLATE:

            return {...state, current_message_template: action.current_message_template}
            break
        
        case CLEAR_MESSAGE_TEMPLATE:

            return {...state, current_message_template: null}
    }
}

const MessageProvider = ({value = [], ...props}) => {

    const [state, dispatch] = useReducer(reducer, {
        all_message_templates : [],
        current_message_template: null
    })

    return (
        <Provider value = {[state, dispatch]} {...props}/>
    )


}

const useMessageContext = () => {
    return useContext(MessageContext)
}

export {useMessageContext, MessageProvider}