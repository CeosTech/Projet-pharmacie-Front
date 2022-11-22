import React, { useEffect, useState, useRef} from "react";
import ReactHtmlParser from "react-html-parser";
import "./GestionRdvVaccin.css";
import Pagination from "react-js-pagination";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
} from "@material-ui/core";
import ExpandedIcon from "../product/ExpandedIcon";
import axios from "axios";
import { URL } from "../../../middlewares/request";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "3rem auto",
    alignItems: "center",
  },
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
    borderBottom: "1px solid black",
    margin:"2em",
  },

  detail: {
    fontSize: theme.typography.pxToRem(16),
    color: "black",
  },

  color: {
    color: "black",
  },

  backdrop: {
    position:"fixed",
    top:0,
    left:0,
    zIndex:100,
    height:"100vh",
    width:"100vw",
    background:"#04295d",
    opacity: 0.8,
    display:"flex",
    justifyContent:"center",
    alignItems: "center",
  },
}));

const ItemsCountPerPage = 10;

export default function GestionRdvVaccin() {
  const[articles, setArticles]=useState([]);
  const [bounds, setBounds] = useState([0, ItemsCountPerPage]);
  const [activePage, setActivePage] = useState(1);
  const[expanded, setExpanded]=useState(false);
  const[loadingDelete, setLoadingDelete] = useState(false);
  

  const classes = useStyles();
  
  const date_RDV = new Date(articles.date_reservation).toLocaleDateString();
  const heure_RDV = new Date(articles.date_reservation).toLocaleTimeString();
  const date_envoi = new Date(articles.date_message).toLocaleDateString();

  //fonction permet de traiter le changement de page
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setBounds([
      (pageNumber - 1) * ItemsCountPerPage,
      pageNumber * ItemsCountPerPage,
    ]);
    window.scrollTo(0, 0);
  };
  
  const handleEdit = () => {
    //   history.push({
    //     pathname: "/admin/editer-article",
    //     state: { articleToUpdate: article },
    //   });
  };

  const deleteData =(e) => {
    const val=e.target.id;
    setLoadingDelete(true);
    axios
        .delete(
          'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/' + val
        )
            .then((response) =>{
              if(response.status ===204){
                const newArticles =articles.filter((a)=> a.id !== Number(val));
                 setArticles(newArticles);
                 setLoadingDelete(false)
              }
            });
  };

   const fetchArticles = async () =>{
       await axios
             .get(
              'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/'
             )
              .then((response) => {
                setArticles(response.data);

              });
   };

   useEffect(() => {
      console.log("new article", articles);

   }, [articles]);

   useEffect(()=>{
    fetchArticles();
   }, []);

  return (
    <>
      {loadingDelete ? (
        <div className={classes.backdrop}>
          <CircularProgress />
        </div>
      ) : null}
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Réception des formulaires vaccin covid
      </h2>
    <div>
      {articles.length > 0 && (
        <>
          <div className={classes.table}>
            <p className={classes.heading}>Nom</p>
            <p className={classes.heading}>Prénom</p>
            <p className={classes.heading}>Objet</p>
            <p className={classes.heading}>Vaccin</p>
            <p className={classes.heading}>Date de réception</p>
          </div>
        
          {articles.slice(bounds[0], bounds[1]).map((article) => (
     
           <Accordion
           className={classes.accordion}
           key={article.id}
           onChange={(e, expand) => setExpanded(expand)}
         >
           <AccordionSummary 
              aria-controls="panel1a-content" 
              id="panel1a-header"
              >

             {!expanded ? (
               <div className={classes.table}>
                 <p className={classes.p}>{article.nom}</p>
                 <p className={classes.p}>{article.prenom}</p>
                 <p className={classes.p}>{article.objet}</p>
                 <p className={classes.p}>{article.choix_vaccin}</p>
                 <p className={classes.p}>{date_envoi}
                 </p>
               </div>
             ) : (
               <div></div>
             )}
     
           <ExpandedIcon  expanded={expanded} 
                           setExpanded={setExpanded} />
           </AccordionSummary>
           <AccordionDetails>
        <div className="article__container">
  
          <div className="container darker">
            <strong> Objet : </strong> 
            {ReactHtmlParser(article.objet)}
            <strong> Choix du vaccin : </strong>
             {ReactHtmlParser(article.choix_vaccin)}
            <strong> Nom : </strong>
             {ReactHtmlParser(article.nom)}
            <strong> Prénom : </strong> 
            {ReactHtmlParser(article.prenom)}
            <strong> Age : </strong> 
            {ReactHtmlParser(article.age)}
            <strong> Telephone : </strong> 
            {ReactHtmlParser(article.telephone)}
            <strong> Email : </strong> 
            {ReactHtmlParser(article.email)}
            <strong> Adresse : </strong> 
            {ReactHtmlParser(article.adresse)}
            <strong> Code Postal : </strong> 
            {ReactHtmlParser(article.code_postal)}
            <strong> Ville : </strong> 
            {ReactHtmlParser(article.ville)}
            <strong> Numéro de sécurité sociale : </strong> 
            {ReactHtmlParser(article.num_secu)}
            <strong> Message : </strong>
             {ReactHtmlParser("-   "+ article.message)}
            <strong> Date du rendez-vous : </strong> 
            {date_RDV}

            <strong> Heure rendez-vous : </strong> 
            {heure_RDV}
          </div>
          
          <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        </div>

{/**
          <span style={{ marginTop: "1rem" }}>
            {new Date(article.date_message).toLocaleTimeString()}
          </span>
*/}
          {/** BUTTON */}
          <div className="article__button">
            
            
            {/** ANSWER BUTTON */}
          <button
                className="answer__button"
                onClick={() => {
                  handleEdit();
                }}
              >
                Répondre
          </button>

          {/** MODIFY BUTTON */}
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
))}
    <hr style={{ marginTop: "2rem" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <Pagination
              activePage={activePage}
              itemsCountPerPage={
                ItemsCountPerPage
              } /*{bounds[1] - bounds[0] + 1}*/
              totalItemsCount={articles.length}
              pageRangeDisplayed={ItemsCountPerPage}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </>
      )}
    </div>
    </>
  );
}