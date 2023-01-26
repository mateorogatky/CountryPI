import React, { useState } from "react";
import { useEffect } from "react"; //ejecuta automaticamente las acciones
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  orderByContinent,
  orderByPopulation,
  orderByName,
  getActivity,
  getByActivity,
} from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); // dispara la accion
  const countries = useSelector((state) => state.countries);
  const filtered = useSelector((state) => state.filtered); // traemos el estado del rootReducer
  const activi = useSelector((state) => state.activities); 

  //paginados
  const [currentPage, setCurrentPage] = useState(1); //empieza en la primer pagina.. declara estado y poder interactuar sobre el
  const FirstPage = currentPage !== 1 ? true : false;
  const [countriesPerPage, setCountriesPage] = useState(9 + FirstPage); // primera pag(9 card) si no10 cards por pagina
  const indexOfLastCountry = currentPage * countriesPerPage; // 9 pag 1 , 10 resto pag
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0 primer pais


  var currentCountries;
  if (typeof filtered === "string") {
    currentCountries = filtered;
  } else {
    currentCountries = filtered.slice(indexOfFirstCountry, indexOfLastCountry);
  }

  useEffect(() => {
    if(filtered.length === countries.length){
    dispatch(getCountries())
    dispatch(getActivity());};
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //va seteando la pagina donde haga click
  };
  function handleClick(el) {
    el.preventDefault(); //usa para evitar que ocurra la acción predeterminada del elemento seleccionado
    dispatch(getCountries());
  }
  function hanldeFilterStatus(e) {
    //continent
    console.log(e.target.value);
    dispatch(orderByContinent(e.target.value));
  }
  function handleFilterByPopulation(e) {
    //poblacion
    console.log(e.target.value);
    dispatch(orderByPopulation(e.target.value));
  }
  function handleFilterByName(e) {
    //AZZA
    dispatch(orderByName(e.target.value));
  }

  return (
    <div className={style.body}>
      <div className={style.primeroc}>
        <div className={style.segundoc}>
          <Link to="/">
            <button className={style.inicio}>Inicio</button> {/* Boton al inicio */}
          </Link>
          <Link to="/activities">
            <button className={style.crearAct}>Crear Actividad</button> {/* Boton crear actividad */}
          </Link>
        </div>
        <div className={style.tercerc}>
          <button className={style.btnGithub}>
            <a href="https://github.com/mateorogatky"> GitHub</a>
          </button>

          <button className={style.btnLinkedin}>
            <a  href="https://www.linkedin.com/in/mateo-rogatky/"> Linkedin</a>
          </button>
        </div>
      </div>
      <div className={style.options}>
        <select className={style.alfa} onChange={(e) => handleFilterByName(e)}>
          <option value="all">Alfabeticamente</option>
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
        </select>
        <select className={style.continent} onChange={hanldeFilterStatus}>
          <option value="all">Continentes</option>
          <option value="Europe">Europa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctic">antartida</option>
        </select>
        <select
          className={style.poblacion}
          onChange={(e) => handleFilterByPopulation(e)}
        >
          <option value="all">Population</option>
          <option value="Min">Min-Max</option>
          <option value="Max">Max-Min</option>
        </select>
        <div className={style.actividades}>
          <p>
            <b>Actividades:</b>
          </p>
          <div>
            {activi.map((act) => (
              <button
                className={style.mapActividades}
                value={act.name}
                key={act.id}
                onClick={() => {
                  dispatch(getByActivity(act.name));
                }}
              >
                {act.name}
              </button>
            ))}
          </div>
        </div>
        <button className={style.allPaises} onClick={(el) => handleClick(el)}>
          Refresh Countries
        </button>
        <Paginado 
          countriesPerPage={countriesPerPage}
          totalCards={filtered.length}
          paginado={paginado}
          currentPage={currentPage}
          setCountriesPage={setCountriesPage}
        /> <div>
        <SearchBar />
        </div>
        <div className={style.card}>
          {currentCountries.length ? (
            currentCountries.map((el) => {
              return (
                <div key={el.id} className={style.container}>
                  <Card
                    id={el.id}
                    image={el.image}
                    name={el.name}
                    continent={el.continent}
                    capital={el.capital}
                  />
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
