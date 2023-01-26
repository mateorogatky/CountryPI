import React from "react";
import style from "./landingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <body className={style.body}>
      <div className={style.linkBoton}>
        <div className={style.links}>
          <button className={style.btnGit}>
            <a href="https://github.com/mateorogatky"> GitHub</a>
          </button>

          <button className={style.btnLin}>
            <a href="https://www.linkedin.com/in/mateo-rogatky/"> Linkedin</a>
          </button>
        </div>
        <div className={style.home}>
          <Link to="/home">
            <button type="button" className={style.botonHome}>
             <p>Home</p>
            </button>
          </Link>
        </div>
      </div>
    </body>
  );
}
