import { useHistory } from "react-router-dom";

import "./GestionProduits.css";


function GestionProduits() {

  const history = useHistory();
  /*const faireRedirection = () => {
    let url = "/admin/Comptabilite/facture-achats";
    history.push(url);
  };*/
  
   const RedirectionOrtho = () => {
    let url = "/admin/produits/orthopedie/";
    history.push(url);
  };
  

  const RedirectionParapharma = () => {
    let url = "/admin/produits/parapharmacie/";
    history.push(url);
  };
  
  return (
    <div className="Magasins">
        <div className="Magasins-header">
            <h1>Choisissez le magasin</h1>
        </div>

        <div className="Magasins-button">

            <button className="button" onClick={RedirectionOrtho}>
                Orthopédie
            </button>

            <button className="button" onClick={RedirectionParapharma}>
                Parapharmacie
            </button>

            
        </div>
    </div>
  );
}
export default GestionProduits;
