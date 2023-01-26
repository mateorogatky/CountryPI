import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux"; //
import axios from "axios";
import style from "./CreateActivity.module.css";
import { useEffect } from "react";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (!input.difficulty) {
    errors.difficulty = "Se requiere la dificultad";
  } else if (!input.duration) {
    errors.duration = "Se requiere la duracion";
  } else if (!input.season) {
    errors.season = "Se requiere la season";
  } else if (input.country.length === 0) {
    errors.country = "Se requiere un country";
  }
  return errors;
}

export default function CreateActivity() {
  const countries = useSelector((state) => state.filtered); // uso un hooks
  const history = useHistory();
  const [errors, setErrors] = useState({ form: "complete form" }); //
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  const setDataHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCountries = (e) => {
    e.preventDefault();
    if (input.country.includes(e.target.value)) {
      return alert("This country has already been loaded.");
    } else {
      setInput({
        ...input,
        country: [...input.country, e.target.value],
      });
    }
  };
  const handleDelete = (el) => {
    setInput({
      ...input,
      country: input.country.filter((e) => e !== el),
    });
  };

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const submitForm = (e) => {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    if (Object.values(errors).length === 0) {
      axios
        .post("http://localhost:3001/activity", input)
        .then((res) => console.log(res.data));
      setInput({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: [],
      });
      alert("Activity created successfully!");
      history.push("/home");
    }
  };

  return (
    <section className={style.Genre}>
      <div className={style.container}>
        <h1>Crea Actividad</h1>
        <form className={style.form} onSubmit={(e) => submitForm(e)}>
          <div className={style.names}>
            <p className={style.nombres}>Name:</p>
            <input
              type="text"
              value={input.name}
              name="name"
              placeholder="Nombre de la Actividad"
              onChange={setDataHandler}
            />
            <br />
            {errors.name ? <label>{errors.name}</label> : null}
          </div>
          <div className={style.names}>
            <p className={style.nombres}>Difficulty:</p>
            <select
              name="difficulty"
              value={input.difficulty}
              id="difficulty"
              onChange={setDataHandler}
            >
            
              <option value="default">Elija un valor</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <br />
            {errors.difficulty ? <label>{errors.difficulty}</label> : null}
          </div>
          <div className={style.names}>
            <p className={style.nombres}>Duration:</p>
            <select
              type="text"
              value={input.duration}
              name="duration"
              id="duration"
              onChange={setDataHandler}
            >
              <option value="default">Elija un valor</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
            </select>
            <br />
            {errors.duration ? <label>{errors.duration}</label> : null}
          </div>
          <div className={style.names}>
            <p className={style.nombres}>Season: </p>
            <select
              name="season"
              value={input.season}
              id="season"
              onChange={setDataHandler}
            >
              <option value="default">Elija un valor</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Primavera">Primavera</option>
              <option value="Invierno">Invierno</option>
            </select>
            <br />
            {errors.season ? <label>{errors.season}</label> : null}
          </div>
          <div className={style.names}>
            <p className={style.nombres}>Countries: </p>
            <select onChange={handleCountries}>
              {countries.map((act) => (
                <option value={act.id} key={act.id}>
                  {act.name}
                </option>
              ))}
            </select>
            <br />
            {errors.country ? <label>{errors.country}</label> : null}
          </div>

          <div className={style.mapCountries}>
            {input.country.map((el) => (
              <div className={style.delete} key={el}>
                <p>{el}</p>
                <button
                  className={style.btnDelete}
                  onClick={() => handleDelete(el)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className={style.btnSubmit}>
            <input type="submit" value="Add activity" />
          </div>
        </form>
      </div>

      <Link to="/home">
        <button className={style.Btnvolver}>Volver a Home</button>
      </Link>
    </section>
  );
}
