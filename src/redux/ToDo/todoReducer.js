import { ADD_TODO, REMOVE_TODO } from '../ToDo/todoActionTypes';

//initializing state
const initialState = {
   todos: [],
}
const todoReducer = (state = initialState, action) => {
   console.log("size"+state.todos.length)

   switch (action.type) {
      case ADD_TODO: return {
         ...state,
         todos: [
           ...state.todos,
           { id: Date.now(), text: action.payload },
         ],
       };


      case REMOVE_TODO: return {
         ...state,
         todos: state.todos.filter((todo) => todo.id !== action.payload),
       };
      default: return state
   }


}
export default todoReducer;