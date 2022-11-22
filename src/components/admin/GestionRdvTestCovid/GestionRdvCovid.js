import React, { useEffect, useState, useRef } from "react";
import EditIcon from "@material-ui/icons/Edit"
import Pagination from "react-js-pagination";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import "./NewRdvCovid.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import ExpandedIcon from "../product/ExpandedIcon";
import { URL } from "../../../middlewares/request";
import { useHistory } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";

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
  },

  detail: {
    fontSize: theme.typography.pxToRem(16),
    color: "black",
  },

  color: {
    color: "black",
  },

  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    height: "100vh",
    width: "100vw",
    background: "#04295d",
    opacity: 0.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ItemsCountPerPage = 10;

   export default function GestionRdvCovid() {
    const [articles, setArticles] = useState([]);
    const [bounds, setBounds] = useState([0, ItemsCountPerPage]);
    const [activePage, setActivePage] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

  const ordRef = useRef();
  const history = useHistory();
  const classes = useStyles();

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


  const deleteData = (e) => {
    console.log("old articles", articles);
    const val = e.target.id;
    setLoadingDelete(true);
    axios
      .delete(
        " https://pharmacie-site.herokuapp.com/pharmacie/formulaire-test-covid/"+
      // `http://localhost:8000/pharmacie/formulaire-test-covid/`
          val
      )
      .then((response) => {
        if (response.status === 204) {
          const newArticles = articles.filter((a) => a.id !== Number(val));
          setArticles(newArticles);
          setLoadingDelete(false);
        }
      });
    };

    const updateData = (val, champs, value) => {

      console.log(value)
      let data ={}
      data[champs] = value
      console.log(data)
      setLoadingUpdate(true);
      axios.patch(
        `https://pharmacie-site.herokuapp.com/pharmacie/formulaire-test-covid/${val}/`
        ,
        data
      )
         .then((response)=>{
             console.log(response)
         }).catch(err => console.log(err));
    };

    const confirmData  = (value) => {
      let data ={}
      data.confirmer = true

      axios.patch(
        `http://127.0.0.1:8000/pharmacie/formulaire-test-covid/${value}/`
        ,
        data
      ).then(response => {
        if (response.status === 200) {
          const newArticles = articles.filter((a) => a.id !== Number(value));
          setArticles(newArticles);
           alert('confirmer avec success')
        }

      })
         
      };

      const date_RDV = new Date(articles.date_reservation).toLocaleDateString();
      const heure_RDV = new Date(articles.date_reservation).toLocaleTimeString();
      const date_envoi = new Date(articles.date_message).toLocaleDateString();


  const fetchArticles = async () => {
    await axios
      .get(        
            `https://pharmacie-site.herokuapp.com/pharmacie/formulaire-test-covid/`
         //  `http://localhost:8000/pharmacie/formulaire-test-covid/`
        )
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  useEffect(() => {
    console.log("new articles", articles);
  }, [articles]);

  useEffect(() => {
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
        Réception des formulaires test covid
      </h2>
      <div>
      {articles.length > 0 && (
        <>
        <div className={classes.table}>
              <p className={classes.heading}>Nom</p>
              <p className={classes.heading}>Prénom</p>
              <p className={classes.heading}>Date de retrait</p>
            </div>
          {articles.slice(bounds[0], bounds[1]).map((article) => (
          !article.confirmer &&
          <Accordion
             className={classes.accordion}
             id={article.id}
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
            <p className={classes.p}>{date_envoi}
            {new Date(article.date_message).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div></div>
        )}

      <ExpandedIcon 
           expanded={expanded} 
            setExpanded={setExpanded} />
      </AccordionSummary>
      <AccordionDetails>
      <div className="article__container">
  
         <div className="container ">
         <Champs
                        articleId = {article.id}
                        id = "nom"
                        label="Nom"
                        value={article.nom}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
          <Champs
                        articleId = {article.id}
                        id = "prénom"
                        label="Prénom"
                        value={article.nom}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
          <Champs
                        articleId = {article.id}
                        id="telephone"
                        label="Téléphone"
                        value={article.telephone}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                        />
          <Champs
                        articleId = {article.id}
                        id="email"
                        label="Email"
                        value={article.email}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
            <Champs
                        articleId = {article.id}
                        id="adresse"
                        label="Adresse"
                        value={article.adresse}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
            <Champs
                        articleId = {article.id}
                        id="CodePostale"
                        label="CodePostale"
                        value={article.code_postal}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />

            <Champs
                        articleId = {article.id}
                        id="Ville"
                        label="Ville"
                        value={article.ville}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />

            <Champs
                        articleId = {article.id}
                        id="numéro de sécurité sociale"
                        label="numéro de sécurité sociale"
                        value={article.num_secu}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
              <Champs
                        articleId = {article.id}
                        id="Message"
                        label="Message"                        
                        value={article.message}
                        updateData={(val, champs, value) => updateData(val, champs, value)}
                      />
                      <strong> Date de retrait : </strong>{" "}
                      {new Date(article.date_message).toLocaleDateString()}
                    
                     
       </div> 
        {/** BUTTON */}
         <div className="article__button">
           
            {/** ANSWER BUTTON */}
          <button
                className="answer__button"
               
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
                id={article.id}
                className="validation__button"
                onClick={() =>confirmData(article.id)}
              >
                Confirmer
              </button>
         

            {/** DELETED BUTTON */}
            <button
              id={article.id}
              className="supp_button"
              onClick={(e) => {
                deleteData(e);
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


const Champs = ({ label, value, updateData,articleId, id}) => {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(value)
  const handleEdit = (e) => {
       setEdit(true);
  };

 const handleSubmit = (e) =>{
    e.preventDefault()
    updateData(articleId, e.target.id, e.target[0].value)
    setEdit(false)
    setVal(e.target[0].value)
};

return (
  <div>
    <strong> {label} : </strong>
    {edit ? (
      <form style={{display:'flex'}} id={id} onSubmit={handleSubmit}>
        <input type="text" defaultValue={val} />
        <input style={{marginLeft:"15px"}} type="submit" value="confirmer le changement" />
      </form>
    ) : (
      <div>{ReactHtmlParser(val)}</div>
    )}

    <IconButton
      onClick={(e) => {
        handleEdit(e);
      }}
    >
      <EditIcon />
    </IconButton>
  </div>
);
}
