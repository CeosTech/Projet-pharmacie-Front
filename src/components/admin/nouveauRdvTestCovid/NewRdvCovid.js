import React from "react";
import ReactHtmlParser from "react-html-parser";
import "./NewRdvCovid.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import { useState } from "react";
import ExpandedIcon from "../product/ExpandedIcon";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "black",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    position: "relative",
    border: "1px solid gray",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
    color:"green",
  },
}));

export default function NewRdvCovid({ article }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleEdit = () => {
    history.push({
      pathname: "/admin/nouvelles-commandes",
      state: { articleToUpdate: article },
    });
  };

  const history = useHistory();

  const val = article.id;

  const deleteData = async () => {
    axios.delete(URL + val);
    let currentPath = window.location.pathname;
    history.replace(`${currentPath}/replace`);
    setTimeout(() => {
      history.replace(currentPath);
    }, 1000);
  };

  const date_RDV = new Date(article.date_reservation).toLocaleDateString();
  const heure_RDV = new Date(article.date_reservation).toLocaleTimeString();
  const date_envoi = new Date(article.date_message).toLocaleDateString();
  

  return (
    <Accordion
      className={classes.accordion}
      key={article.id}
      onChange={(e, expand) => setExpanded(expand)}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        {!expanded ? (
          <div className={classes.table}>
            <p className={classes.p}>{article.nom}</p>
            <p className={classes.p}>{article.prenom}</p>
            <p className={classes.p}>{date_envoi}</p>
          </div>
        ) : (
          <div></div>
        )}

      <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
        <div className="article__container">
  
          <div className="container darker">
            <strong> Nom : </strong> {ReactHtmlParser(article.nom)}
          
            <strong> Prénom : </strong> {ReactHtmlParser(article.prenom)}
          
            <strong> Age : </strong> {ReactHtmlParser(article.age)}
          
            <strong> Telephone : </strong> {ReactHtmlParser(article.telephone)}
          
          
            <strong> Email : </strong> {ReactHtmlParser(article.email)}
          
            <strong> Adresse : </strong> {ReactHtmlParser(article.adresse)}
          
            <strong> Code Postal : </strong> {ReactHtmlParser(article.code_postal)}
          
            <strong> Ville : </strong> {ReactHtmlParser(article.ville)}
          
            <strong> Numéro de sécurité sociale : </strong> {ReactHtmlParser(article.num_secu)}
          
            <strong> Message : </strong> {ReactHtmlParser(article.message)}
          
            <strong> Date du rendez-vous : </strong> {date_RDV}

            <strong> Heure rendez-vous : </strong> {heure_RDV}
          </div>
          

{/**
          <span style={{ marginTop: "1rem" }}>
            {new Date(article.date_message).toLocaleTimeString()}
          </span>
*/}
          {/** BUTTON */}
          <div className="article__button">
            
            
            
              <button
                className="registre__button"
                onClick={() => {
                  handleEdit();
                }}
              >
                Modifier
              </button>
           

            {/** VALIDATION BUTTON */}
            
              <button
                className="validation__button"
                onClick={() => {
                  handleEdit();
                }}
              >
                Confirmer
              </button>
         

            {/** DELETED BUTTON */}
            <button
              className="supp_button"
              onClick={() => {
                deleteData(article.id);
              }}
            >
              Supprimer
            </button>


            
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
