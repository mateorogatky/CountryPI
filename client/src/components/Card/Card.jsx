import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ name, image, continent, id, capital }) {
  return (
    <div className={style.container}>
      <div className={style.card} key={id}>
        <Link to={`/home/${id}`}>
          <img src={image} alt="noandas" />
        </Link>
        <h3>Pais: {name}</h3>
        <h4>Continente: {continent}</h4>
        <h4>Capital: {capital}</h4>
      </div>
    </div>
  );
}
