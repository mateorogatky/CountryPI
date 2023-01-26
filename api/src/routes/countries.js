/* 
GET /countries
GET /countries/{idPais}
GET /countries?name="..."
*/
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { Country, ActivityTourist } = require("../db.js");
const secualize = require("sequelize");

router.get("/countries", async (req, res) => {
  //name por query
  const { name } = req.query;
  //Traigo los datos de la api
  const { data } = await axios.get("https://restcountries.com/v3/all");
  const arr = data?.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      image: e.flags[0],
      continent: e.region,
      capital: e.capital ? e.capital[0] : "no tiene capital",
      subRegion: e.subregion,
      area: e.area,
      population: e.population,
    };
  });
  try {
    let DbCountry = await Country.findAll({
      include: {
        model: ActivityTourist,
      },
    });
    //Chequeo que la base de datos este vacia para cargar los datos de la api
    if (!DbCountry.length) {
      await Country.bulkCreate(arr); // le permite insertar múltiples registros en la tabla de su base de datos con una sola llamada de función.
    }
  } catch (err) {
    throw new Error(err);
  }
  ///countries/?name=
  if (name) {
    //busco el pais por el nombre
    const paiss = await Country.findAll({
      where: {
        name: {
          [secualize.Op.iLike]: `%${name}%`, // ilike trabaja entre mayusculas y minusculas y de cierta forma te acelera los procesos
        },
      },
    });
    //si hay name y encuentra al pais lo devuelve
    paiss.length
      ? res.status(200).send(paiss)
      : res.status(404).send("No se encontro pais");
  } else {
    //si no esta el name de query, trae todo los paises

    const pais2 = await Country.findAll({
      include: {
        model: ActivityTourist,
      },
    });
    res.status(200).json(pais2);
  }
});

router.get("/countries/:idPais", async (req, res) => {
  const { idPais } = req.params;
  try {
    //Traigo el pais por parametro
    const unPais = await Country.findOne({
      where: {
        id: idPais.toUpperCase(),
      },
      include: {
        model: ActivityTourist,
      },
    });
    console.log(unPais);
    if (unPais) {
      //si encuentra el pais
      return res.status(200).json(unPais);
    } else {
      return res.status(404).send("País no encontrado");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
