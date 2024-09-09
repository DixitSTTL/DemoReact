import { ADD_CONTINENT, REMOVE_CONTINENT } from "./continentActionType"

export const addContinentAction = (parameter) => {
   return {
      type: ADD_CONTINENT,
      payload: parameter
   }
}
export const removeContinentAction = (parameter) => {
   return {
      type: REMOVE_CONTINENT,
      payload: parameter
   }
}