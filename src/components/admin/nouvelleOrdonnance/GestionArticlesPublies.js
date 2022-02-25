import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../middlewares/request";
import ArticlesList from "./ArticlesList";
// import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";

export default function GestionArticlesPublies() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    await axios
      .get(`https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/`)
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(`error`, error);
      });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Réception des ordonnances
      </h2>
      <ArticlesList articles={articles} />
    </>
  );
}
