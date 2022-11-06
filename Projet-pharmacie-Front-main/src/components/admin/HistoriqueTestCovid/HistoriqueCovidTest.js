import axios from "axios";
import { useEffect, useState } from "react";
import NewRdvCovidList from "../GestionRdvTestCovid/NewRdvCovidList";
import {URL} from "../../../middlewares/request";

const HistoriqueTestCovid = () => {
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      const { data } = await axios.get(
        URL + ""
      );
      setCommandes(data);
    };

    fetchCommandes();

    return () => setCommandes([]);
  }, []);

  return (
    <div className='historiqueCommande admin__container'>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#04295D",
        }}>
        {commandes.length > 0? "Historique des commandes" : "Pas de commanndes dans votre historique des commandes"}
      </h1>
      <NewRdvCovidList commandes={commandes} />
    </div>
  );
};

export default HistoriqueTestCovid;
