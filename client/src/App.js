import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx";
import Detail from "./components/Detail/Detail";


function App() {
  return (
    <div className="App">
    <BrowserRouter>  {/* inyecta propiedades a nuestro componente para poder acceder al historial de navegación */}
         <Switch> 
          <Route exact path="/" component={LandingPage} /> {/* asegurarse de que la ruta coincida solo si la URL actual es una coincidencia exacta */}
          <Route exact path="/home" component={Home} />
          <Route path="/activities" component={CreateActivity} />
          <Route path='/home/:idPais' component={Detail} />
         </Switch> 
    </BrowserRouter>
    </div>
  );
}

export default App;
