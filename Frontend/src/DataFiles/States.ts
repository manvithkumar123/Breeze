import { State, City } from 'country-state-city';

export const states = State.getStatesOfCountry("IN");

export const getCitiesByState = (stateCode: string) => {
  return City.getCitiesOfState("IN", stateCode);
};