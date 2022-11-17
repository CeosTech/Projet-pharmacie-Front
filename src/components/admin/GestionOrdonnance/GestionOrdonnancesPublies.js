import React, { useEffect, useState, useRef } from "react";
import Pagination from "react-js-pagination";
import ReactHtmlParser from "react-html-parser";
import "./Gestion_Ordonnance.css";
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
        "https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/" +
          // 'http://localhost:8000/pharmacie/formulaire-ordonnance/'
          val
      )
      .then((response) => {
        if (response.status === 204) {
          const newArticles = articles.filter((a) => a.id !== Number(val));
          setArticles(newArticles);
          setLoadingDelete(false);
        }
      });

    // console.log(val)
    // let currentPath = window.location.pathname;
    // history.replace(`${currentPath}/replace`);
    // setTimeout(() => {
    //   history.replace(currentPath);
    // }, 1000);
  };

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
                key={article.id}
                id={article.id}
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
                    <div className="container darker">
                      <strong> Nom : </strong> {ReactHtmlParser(article.nom)}
                      <strong> Prénom : </strong>{" "}
                      {ReactHtmlParser(article.prenom)}
                      <strong> Téléphone : </strong>{" "}
                      {ReactHtmlParser(article.telephone)}
                      <strong> email : </strong>{" "}
                      {ReactHtmlParser(article.email)}
                      <strong> Date de retrait : </strong>{" "}
                      {new Date(article.date_message).toLocaleDateString()}
                      <strong> Message du client : </strong>{" "}
                      {ReactHtmlParser(article.message)}
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
