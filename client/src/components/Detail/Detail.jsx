import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions/actions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { idPais } = useParams();
  console.log(idPais);

  useEffect(() => {
    dispatch(getCountryDetail(idPais));
  }, [dispatch, idPais]);

  const myCountry = useSelector((state) => state.countrieDetail);

  return (
    <div className={style.body}>
      
      {myCountry ? (
        <div className={style.country} >
          <div className={style.genre}>
          <div className={style.nameImg}>
          <h2>{myCountry.name}</h2>
          <img className={style.img} src={myCountry.image} alt="Foto pais" />
          </div>
          <div className={style.nameImg}>
          <h3>Capital: {myCountry.capital}.</h3>
          <p>Continent: {myCountry.continent}.</p>
          <p>Sub region: {myCountry.subRegion}.</p>
          <p>Area: {myCountry.area} km².</p>
          <p>Population: {myCountry.population} de habitantes.</p>
          </div>
          </div>
          <h4 className={style.activi}>Actividades</h4>
          <div className={style.container}>
          
              {myCountry.ActivityTourists?.map((el) => (
                <div className={style.actDiv} key={el.id}>
                  <div className={style.colum}>
                    <div><b>Name:</b> {el.name}</div>
                    <p>Difficulty: {el.difficulty}</p>
                  </div>
                  <div className={style.colum}>
                    <p>Duration: {el.duration} hs</p>
                    <p>Season: {el.season}</p>
                  </div>
                </div>
              ))}
            
          </div>
        </div>
      ) : (
        <p>Loading..</p>
      )}
      <Link to="/home">
        <button className={style.volver}>Volver al Home</button>
      </Link>
    </div>
  );
}
