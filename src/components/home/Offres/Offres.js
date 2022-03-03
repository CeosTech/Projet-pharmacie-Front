import React, { Component, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../middlewares/request";

import "./Offres.css";

function Offres() {
  /* IMAGES */
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  // Retrieve images
  async function fetchData() {
    await axios.get(URL + "pharmacie/offres").then((res) => {
      let tab = [];
      res.data.map((obj) => {
        tab.push(obj.image);
      });
      setList(tab);
      setLoad(true);
    });
  }

  useEffect(() => {
    fetchData();
    console.log(list);
    console.log(load);
  }, [load]);

  return (
    <div className="NosOffresTitle">

      PROFITEZ 
      <p>  de nos prix promotionnels et commandez.   </p>
      <div id="Nosoffres">
        <ul className="cards__items_offres">
          {load && (
            <>
              {list.map((img) => {
                return (
                  <li>
                    <img
                      className="offre_img"
                      alt="Offre Pharmacie"
                      src={img}
                      width="250"
                      height="250"
                    />
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Offres;
