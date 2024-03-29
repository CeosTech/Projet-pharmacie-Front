import { useState, useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NavBarContextProvider from "./contexts/Navbar/navbarState";
import Navbar from './components/navbar/Navbar';

import Commander from './components/commander/Commander';
import ParapharmacieShop from './components/parapharmacie/commander/Commander';

import Panier from "./pages/Panier";
import Paiement from "./pages/Paiement";
import Felicitation from "./pages/Felicitation";

import RendezVous from './components/RDV/RendezVous';
import ChoixVaccin from './components/FormulaireVaccin/ChoixVaccin';
import FormulaireVaccin from './components/FormulaireVaccin/PremiereInjection/FormulaireVaccin';
import FormVaccinNoCovid from './components/FormulaireVaccin/JamaisEuCovid/FormVaccinNoCovid';
import FormRappelVaccin from './components/FormulaireVaccin/DoseRappel/FormRappelVaccin';
import FormDeuxiemeInjec from './components/FormulaireVaccin/DeuxiemeInjection/FormVaccinDeuxiemeInjec';
import FormulaireAntigenique from "./components/FormulaireAntigenique/FormulaireAntigenique";

import Ordonnance from "./components/EnvoiOrdonnance/Ordonnance";

import LocationMateriel from "./components/LocationMateriel/LocationMateriel"

import Franchise from './components/franchise/Franchise';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import { sendrequest } from "./middlewares/request.js";
import Admin from "./pages/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/admin/security/Login";
import SecuredRoute from "./middlewares/SecuredRout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Alerts from "./components/alert/Alerts";


//For all the common style
import './components/base.css';


const LoginContainer=()=><div><Route path="/login" component={Login} /></div>

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [isKeyLoaded, setIsKeyLoaded] = useState(false);

  const getAPIKeys = () => {
    sendrequest("get", "paiement/api/keys", setApiKey, setIsKeyLoaded);
  }
  useEffect(() => {
    getAPIKeys();
  }, []);

  const DefaultContainer = () => {
    return(

      <div>
        <NavBarContextProvider>
          <Navbar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/RendezVous" >
            <RendezVous />
          </Route>
          <Route exact path="/Test antigenique formulaire" component={FormulaireAntigenique} />
          <Route exact path="/Premiere Injection" >
            <FormulaireVaccin />
          </Route>
          <Route exact path="/Injection sans covid" >
            <FormVaccinNoCovid />
          </Route>
          <Route exact path="/Rappel Vaccin" >
            <FormRappelVaccin />
          </Route>
          <Route exact path="/Deuxieme Injection" >
            <FormDeuxiemeInjec />
          </Route>
          <Route exact path="/Location De Materiel" >
            <LocationMateriel />
          </Route>
          <Route exact path="/Choix du vaccin" component={ChoixVaccin} />
          <Route exact path="/ordonnance" component={Ordonnance} />
          <Route exact path="/shop-orthopedie" component={Commander} />
          <Route exact path="/shop-parapharmacie" component={ParapharmacieShop} />
          <Route exact path="/panier" component={Panier} />
          {/*<Route exact path="/franchise" component={Franchise}/>*/}
          
          {isKeyLoaded && (
            <Route exact path="/paiement">
              
              {/*<Elements stripe={loadStripe(apiKey[0].stripe_public_key)}> */}
                {/*Pour les tests en prod */}
                <Elements stripe={"pk_test_51KO0T9Lequm3HWkAqh1zL6MSN258h4DD8ZUVgyaDFZAs1QjfJ4W1BxCueu8Vo7REY4DUa4QBj1gV4jy9VJT5FQOW009Q6ZDmWU"}>
                <Paiement />
              </Elements>
            </Route>
          )}
      
          <Route exact path="/felicitation" component={Felicitation} />
          <SecuredRoute path="/admin" component={Admin} />
        </NavBarContextProvider>
        <Footer />
      </div>

    );
}

  return (
    <div className="App">
      <Alerts />

      <Router>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route component={DefaultContainer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
