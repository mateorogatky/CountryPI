//importaciones de las actions
import {
  GET_COUNTRIES,
  ORDER_BY_CONTINENT,
  GET_COUNTRIES_BY_QUERY,
  ORDER_BY_POPULATION,
  ORDER_BY_NAME,
  GET_COUNTRY_DETAIL,
  ORDER_BY_ACTIVITY,
  GET_ACTIVITY,
  GET_BY_ACTIVITY
} from "../actions/actions.js";

const initialState = {
  countries: [],
  filtered: [],
  activities: [],
  activitiFilter: [],
  countrieDetail: [],
};

function hasActivity(country, activity) {
  const activitie = country.ActivityTourists;
  console.log(activitie)
  var isPresent = false;
  activitie.forEach(act => {
    if (act.name === activity) {
      isPresent = true;
    }
  });
  return isPresent;
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state, // guardo el estado inicial
        countries: action.payload,
        filtered: action.payload,
      };
    case GET_BY_ACTIVITY:
      console.log(action.payload);
      return {
        ...state,
        filtered: state.countries.filter(country => hasActivity(country, action.payload))
      };
      
      case GET_ACTIVITY:
        return{
          ...state,
          activities: action.payload
        }

    case ORDER_BY_CONTINENT:
      const allCountries = state.countries;
      const statusFiltered =
        action.payload === "all"
          ? allCountries
          : allCountries.filter((el) =>
              el.continent
                ? el.continent.toLowerCase() === action.payload.toLowerCase()
                : null
            );
      return {
        ...state,
        filtered: statusFiltered,
      };
    case ORDER_BY_ACTIVITY:
      const filter = state.activities;
      const activity =
        action.payload === "all"
          ? filter
          : filter.filter((el) =>
              el.name
                ? el.name === action.payload
                : null
            );
      return {
        ...state,
        activitiFilter: activity,
      };
    case ORDER_BY_POPULATION:
      if (action.payload === "Min") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.population > next.population) return 1;
            if (prev.population < next.population) return -1;
            return 0;
          }),
        };
      }
      if (action.payload === "Max") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.population > next.population) return -1;
            if (prev.population < next.population) return 1;
            return 0;
          }),
        };
      }
      if (action.payload === "all") {
        return {
          ...state,
          filtered: state.countries,
        };
      } else {
        return {
          ...state,
          filtered: state.countries,
        };
      }

    case GET_COUNTRIES_BY_QUERY:
      return {
        ...state,
        filtered: state.countries.filter((e) =>
          e.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    case ORDER_BY_NAME:
      if (action.payload === "AZ") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      }
      if (action.payload === "ZA") {
        return {
          ...state,
          filtered: [...state.filtered].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      }
      if (action.payload === "all") {
        return { ...state, filtered: state.countries };
      } else {
        return {
          ...state,
          filtered: state.countries,
        };
      }

    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countrieDetail: action.payload,
      };

    default:
      return state;
  }
}
