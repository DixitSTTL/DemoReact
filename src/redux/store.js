import { combineReducers, legacy_createStore } from 'redux';
import counterReducer from './Counter/counterReducer';
import todoReducer from './ToDo/todoReducer';

const store = legacy_createStore(
    combineReducers({
        counter: counterReducer,
        todos: todoReducer,
    })
);
export default store; 