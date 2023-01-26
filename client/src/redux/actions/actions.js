import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES"; // declaro la constante que voy a usar dentro de la funcion y la exporto
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const ORDER_BY_CONTINENT = "ORDER_BY_CONTINENT";
export const GET_COUNTRIES_BY_QUERY = "GET_COUNTRIES_BY_QUERY";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const ORDER_BY_ACTIVITY = "ORDER_BY_ACTIVITY";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const GET_BY_ACTIVITY = "GET_BY_ACTIVITY";

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/countries");

    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getActivity() {
  return async function (dispatch) {
    const info = await axios.get("http://localhost:3001/activity/");
    return dispatch({
      type: GET_ACTIVITY,
      payload: info.data,
    });
  };
}

export function getByActivity(payload) {
  return function (dispatch) {
    dispatch({
      type: GET_BY_ACTIVITY,
      payload,
    });
  };
}


export function getCountriesBySearch(name) {
  return function (dispatch) {
    dispatch({
      type: GET_COUNTRIES_BY_QUERY,
      payload: name,
    });
  };
}

export function orderByContinent(payload) {
  return {
    type: ORDER_BY_CONTINENT,
    payload,
  };
}
export function orderByPopulation(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_POPULATION,
      payload,
    });
  };
}

export function orderByName(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_NAME,
      payload,
    });
  };
}

export function getCountryDetail(idPais) {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${idPais}`);
      return dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
