# CountryPI — Explorador de países y actividades turísticas

**Aplicación full stack para explorar países y asociarles actividades.**

Desarrollada como proyecto individual del bootcamp Soy Henry. La propuesta combina información geográfica con actividades turísticas: buscar un destino, consultar sus datos y registrar propuestas para realizar allí.

## Qué incluye

- Listado de países con bandera, nombre y continente.
- Búsqueda por nombre, filtros por continente y actividad, y ordenamiento por nombre o población.
- Paginación del listado.
- Vista de detalle con capital, subregión, superficie, población y actividades asociadas.
- Formulario de creación de actividades con nombre, dificultad, duración y temporada.
- Relación entre países y actividades mediante PostgreSQL y Sequelize.

## Tecnologías

| Capa | Herramientas |
| --- | --- |
| Frontend | React, Redux, React Router y CSS Modules |
| Backend | Node.js y Express |
| Persistencia | PostgreSQL y Sequelize |
| Datos geográficos | REST Countries |
| Herramientas de pruebas incluidas | Mocha, Chai y Supertest |

## Organización

- `client/`: interfaz, componentes y estado con Redux.
- `api/src/routes/`: endpoints de países y actividades.
- `api/src/models/`: modelos de datos.
- `api/src/db.js`: conexión y relación muchos a muchos.
- `api/tests/`: archivos de pruebas del backend.

## Ejecutar en desarrollo

Requiere Node.js, npm y PostgreSQL. Es un proyecto con dependencias históricas; puede requerir ajustes para ejecutarse con entornos actuales.

```bash
git clone https://github.com/mateorogatky/CountryPI.git
cd CountryPI
```

Crear una base PostgreSQL llamada `countries` y configurar `api/.env` con credenciales propias:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
```

Iniciar el backend:

```bash
cd api
npm install
npm start
```

La API escucha en http://localhost:3001. En otra terminal, desde la raíz del repositorio:

```bash
cd client
npm install
npm start
```

El frontend utiliza http://localhost:3001 para las consultas. La sincronización de Sequelize crea las tablas; la carga de países se intenta al consultar el listado.

## Estado y alcance

Proyecto académico. El backend utiliza el endpoint `https://restcountries.com/v3/all` y el formato de respuesta esperado por esa implementación. Antes de probarlo, revisar su compatibilidad con el servicio externo; no se garantiza que la integración histórica funcione sin ajustes.

El repositorio incluye archivos de prueba; su presencia no implica que hayan sido ejecutados o que todos los casos pasen actualmente.

## Qué permite mostrar

Integración entre frontend y backend, manejo de estado con Redux, formularios, consultas a servicios externos y modelado relacional de países y actividades.

## Autor

[Mateo Nicolás Rogatky](https://github.com/mateorogatky)
