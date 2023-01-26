import React from "react";
import style from "./Paginado.module.css";

export default function Paginado({
  countriesPerPage,
  totalCards,
  paginado,
  currentPage,
  setCountriesPage,
}) {
  const pageNumber = [];
  const FirtPage = currentPage !== 1 ? true : false;
  setCountriesPage(9 + FirtPage);

 

  if (Math.ceil(totalCards / countriesPerPage) < currentPage) {
    //total de cards / cards por pagina tiene que ser menor
    paginado(1);
  }
  const pages = Math.ceil(totalCards / countriesPerPage) >=25 ? 25 : Math.ceil(totalCards / countriesPerPage)
  console.log(pages)
  for (let i = 1; i <= Math.ceil(pages); i++) {
    
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className={style.paginado}>
        {pageNumber &&
          pageNumber.map((number) => (
            <li key={number}>
              <button className={style.pag} onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}