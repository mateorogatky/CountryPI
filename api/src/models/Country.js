const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    	id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		capital: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		continent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subRegion: {
			type: DataTypes.STRING,
		},
		area: {
			type: DataTypes.FLOAT,
		},
		population: {
			type: DataTypes.INTEGER,
		},
	});
};
