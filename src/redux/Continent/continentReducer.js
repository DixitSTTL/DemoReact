import { ADD_CONTINENT, REMOVE_CONTINENT } from "./continentActionType";


const initState = {
    continents: [],
}
const continentReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_CONTINENT: return {
            ...state,
            continents: action.payload
            ,
        };
        case REMOVE_CONTINENT: return {
            ...state,
            continents: state.continents.filter((continent) => continent !== action.payload),
        };
        default:
            return state;
    }
}

export default continentReducer;