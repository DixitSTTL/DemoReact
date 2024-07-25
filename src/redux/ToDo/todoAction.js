import {  ADD_TODO, REMOVE_TODO } from
'./todoActionTypes';


export const addToDoAction = (text) => {
   return {
      type: ADD_TODO,
      payload: text
   }
}

export const removeToDoAction = (id) => {
   return {
      type: REMOVE_TODO,
      payload: id
   }
}