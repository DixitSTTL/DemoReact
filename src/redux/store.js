import { combineReducers, legacy_createStore } from 'redux';
import counterReducer from './Counter/counterReducer';
import todoReducer from './ToDo/todoReducer';
import continentReducer from './Continent/continentReducer';

const store = legacy_createStore(
    combineReducers({
        counter: counterReducer,
        todos: todoReducer,
        continentsStore: continentReducer,
    })
);
export default store; 