const { ActivityTourist, Country } = require("../db.js");
const router = require("express").Router();
const { sequelize } = require("sequelize");

router.post("/", async (req, res) => {
  const { name, difficulty, duration, season, country } = req.body;
  //compruebo que esten todos los parametros
  if (name && difficulty && duration && season && country) {
    const newActivity = await ActivityTourist.create({
      name,
      difficulty,
      duration,
      season,
    });
    //Busco el pais por su nombre
    const pais = await Country.findAll({
      where: {
        id: country,
      },
    });
    //le agrego la actividad al pais
    await newActivity.addCountry(pais);
    res.send(newActivity);
  } else {
    return res.status(400).send("Faltan parametros");
  }
});

router.get("/", async (req, res) => {
  try {
    const act = await ActivityTourist.findAll();
    return res.status(200).json(act);
  } catch (error) {
    console.log(error);
  }
});

 
module.exports = router;
