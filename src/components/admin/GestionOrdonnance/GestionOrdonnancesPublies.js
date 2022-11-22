import React, { useEffect, useState, useRef } from "react";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "react-js-pagination";
import ReactHtmlParser from "react-html-parser";
import "./Gestion_Ordonnance.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  IconButton,
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

export default function GestionOrdonnancesPublies() {
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


  const deleteData = (e) => {
    console.log("old articles", articles);
    const val = e.target.id;
    setLoadingDelete(true);
    axios
      .delete(
        "https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/" +
       //'http://localhost:8000/pharmacie/formulaire-ordonnance/'
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

  const updateData = (val, champ, value) => {

    console.log(value)
    let data ={}
    data[champ] = value
    console.log(data)
    setLoadingUpdate(true);
    axios.patch(
        `https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/${val}/`
     // `http://localhost:8000/pharmacie/formulaire-ordonnance/${val}`
          ,
          data
      )
      .then((response) => {
          console.log(response)
        //       const newArticles = articles.filter((a) => a.id !== Number(val));
    //       setArticles(newArticles);
    //       setLoadingUpdate(false);
      }).catch(err => console.log(err));
  };
  // console.log(val)
  // let currentPath = window.location.pathname;
  // history.replace(`${currentPath}/replace`);
  // setTimeout(() => {
  //   history.replace(currentPath);
  // }, 1000);

  const fetchArticles = async () => {
    await axios
      .get(
        `https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/`
     // 'http://localhost:8000/pharmacie/formulaire-ordonnance/'
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
        Réception des ordonnances
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
                      <p className={classes.p}>
                        {new Date(article.date_message).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
                </AccordionSummary>
                <AccordionDetails>
                  <div className="article__container">
                    <div className="article__photo">
                      <img
                        className="photo_fact"
                        src={article.image_ordonnance}
                        alt=""
                      />
                    </div>
                    <div className="container ">
                      <Champ
                        articleId = {article.id}
                        id = "nom"
                        label="Nom"
                        value={article.nom}
                        updateData={(val, champ, value) => updateData(val, champ, value)}
                      />
                      <Champ
                        articleId = {article.id}
                        label="Prénom"
                        id = "prenom"
                        value={article.prenom}
                        updateData={(val, champ, value) => updateData(val, champ, value)}
                      />
                      <Champ
                        articleId = {article.id}
                        label="Téléphone"
                        id="telephone"
                        value={article.telephone}
                        updateData={(val, champ, value) => updateData(val, champ, value)}
                      />
                      <Champ
                        articleId = {article.id}
                        label="Email"
                        id="email"
                        value={article.email}
                        updateData={(val, champ, value) => updateData(val, champ, value)}
                      />
                      <Champ
                        articleId = {article.id}
                        label="Message du client"
                        id="message"
                        value={article.message}
                        updateData={(val, champ, value) => updateData(val, champ, value)}
                      />
                      <strong> Date de retrait : </strong>{" "}
                      {new Date(article.date_message).toLocaleDateString()}
                    </div>
                    {article.image_ordonnance && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <a
                          href={article.image_ordonnance}
                          target="_blank"
                          rel="noreferrer"
                          style={{ marginTop: "1rem" }}
                        >
                          <i className="fas fa-file-pdf fa-3x"></i>
                        </a>
                        <span>télécharger le pdf</span>
                      </div>
                    )}

                    <span style={{ marginTop: "1rem" }}>
                      {new Date(article.date_message).toLocaleTimeString()}
                    </span>

                    <div className="article__button">
                      {/** ANSWER BUTTON */}
                      <button className="answer__button"
                      >
                        Répondre
                        </button>

                      {/** MODIFY BUTTON */}
                      <button
                      >
                        Modifier
                      </button>

                      {/** VALIDATION BUTTON */}

                      <button className="validation__button"
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





function Champ({ label, value, updateData,articleId, id }) {
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(value)
  const handleEdit = (e) => {
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    updateData(articleId, e.target.id, e.target[0].value)
    setEdit(false)
    setVal( e.target[0].value)

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
