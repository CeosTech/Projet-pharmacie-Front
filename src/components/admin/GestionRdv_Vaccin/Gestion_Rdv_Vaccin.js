import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../middlewares/request";
import ArticlesList from "./List_Rdv_Vaccin";
// import { selectAdmin, changePage } from "../../../app/Redux-slices/adminSlice";

export default function GestionRdvVaccin() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    await axios
      .get(
        `https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/`
      // 'http://localhost:8000/pharmacie/formulaire-vaccin/'
      )
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
        Réception des formulaires vaccin covid
      </h2>
      <ArticlesList articles={articles} />
    </>
  );
}
