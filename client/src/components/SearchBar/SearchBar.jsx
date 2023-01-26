import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesBySearch } from "../../redux/actions/actions";
import style from './SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');


  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountriesBySearch(name)); //Se dispara el dispatch con lo que busca el usuario
  }
//
//onKeyUp
//
  return (
    <div className={style.main}>
      <input
        className={style.bar}
        type="text"
        placeholder="Buscar.."
        onChange={(e) => handleInputChange(e)}
      />
      <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  );
}
