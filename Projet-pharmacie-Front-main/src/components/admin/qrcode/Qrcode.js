import { useHistory } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import "./qrcode.css";
function Menucode() {
  const history = useHistory();
  const faireRedirection = () => {
    let url = "/admin/Gestion_commerciale";
    history.push(url);
  };

  return (
    <div className="Container">
      <div className="Qrcode-header">
        <h1>Menu QR Code</h1>
      </div>
      <div className="nom">Menu Mustang</div>
      <div className="Gestioncommercial">
        <div className="QrcodeContent">
          
          <a href="https://mustangtroyes.web.app//carte">
            <img
              src="https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1yS40m%252F8TYex%252BClEuWu4lenvXZtoPs%252F%252BUrLXgu0YhszNgP%252BKdjyjPlmstXQT%252FaVrtPKhQyftmIdGYv13ikDwALrMbZP22mR79KHkzbFuKXEpiL8j20cuH2aGWOj2IjvLpcUzuo31AnGGGBeZdrGyuu6Mb1zDGpyywrS%252B5yeqbhCDsdf2ngwtgyCcvqn%252FkPoGT48k7Zb06ksS6dOfTPoertTzMiq4Mgk2nDSwvLctSifg4oYe6WxXSo2EjxNfAHS0UWrx%252BCwhb%252BzBP7NrH%252B%252BZlZs%252FXDs92K3tBQe80BxPKfx%252F%252Bme1qAC44DLLJTIyY7zWLPEJqJr9PXwKsxHZNME6ljyHnf2Oa%252BoGw1YrcCB6lIoQULfIM%252FRbtsUX7SUxjZyH9g%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJspOHYyu3qwyEtO%252B16w7eEqDZ3odcEb32kTJzvyyBCEdIA%253D%253D"
              alt="QR Code"
            />
          </a>
        </div>
        <div className="societe_button">
          <a
            href={
              "https://www.unitag.io/qreator/generate?crs=Ppv8rOENN3V1lAwTz82zPpEYgrTpeQPpAxSJGcmyf1zqoOPAufHCjI4ccbj8leQIffpWitL50YSc%252FcPVAqhvQcY8L%252ByEXXE2GKn8SsxpZk4WZaQp7PKE7yfTgH2P3e9CKW00WL5%252F1cMS7FElOQtZuX8mpOG0vfXH1R11ooGrRdY%253D&crd=fhOysE0g3Bah%252BuqXA7NPQ87MoHrnzb%252BauJLKoOEbJsp9Y9pz9bzci%252BPpQiStfIuZqvkkFeDMoAnPhUMKrFw%252FRA%253D%253D"
            }
            target="_blank"
            download
          >
            <button className="reg_button" type="submit">
              Télecharger
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Menucode;
