import React, { useEffect, useState } from "react";
import axios from "axios";

import Offre from "./Offre/";
import { sendrequest } from "../../middlewares/request";

const OffreDuMoment = () => {
  /* offers */
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  /* Retrieve current offers data */
  async function fetchData() {
    sendrequest("get", "restaurant/offres", setList, setLoad);
  }

  useEffect(() => {
    fetchData();
  }, [load]);

  return (
    <div className="offres">
      <center>
        <h1>Les offres du moment</h1>
      </center>
      {load &&
        list.map((offre) => {
          return(
            <Offre
              key={offre.id}
              id={offre.id}
              titre={offre.titre}
              image={offre.image}
            />
            )
        })}
    </div>
  );
};

export default OffreDuMoment;
