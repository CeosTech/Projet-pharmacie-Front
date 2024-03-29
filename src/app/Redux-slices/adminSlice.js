import React, { useEffect, useState } from "react";
import { createSlice } from "@reduxjs/toolkit";


export const Global_admin = () => {
    const [global_admin, setGlobal_admin] = useState(false);
}
// *  Writing the Slices
//+ createSlice returns a "slice" object that contains the generated reducer function as a field named reducer,
//+ and the generated action creators inside an object called actions.
export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    pages: [
      {
        name: "nouvelles_commandes",
        path: "/nouvelles-commandes",
        libelle: "Nouvelles commandes",
        active: false,
        icone: "fa-bullhorn",
      },
      {
        name: "commandes_encours",
        path: "/commande-en-cours",
        libelle: "Commandes en cours",
        icone: "fa-hourglass-start",
        active: false,
      },
      {
        name: "historique_commandes",
        path: "/historiques",
        libelle: "Historique des commandes",
        icone: "fa-clipboard-list",
        active: true,
      },
      {
        name: "creation_magasin_ortho",
        path: "/creation-magasin-ortho",
        libelle: "Création Orthopédie",
        icone: "fa-stethoscope",
        active: true,
      },

      {
        name: "creation_magasin_parapharmacie",
        path: "/creation-magasin-parapharmacie",
        libelle: "Création Parapharmacie",
        icone:"fa-medkit",
        active: true,
      },

      {
        name: "gestion-produits",
        path: "/produits",
        libelle: "Gestion des produits",
        icone: "fa-plus",
        active: false,
      },
      {
        name: "nouvelles_ordonnances",
        path: "/nouvelles-ordonnances",
        libelle: "Ordonnances",
        icone: "fa-bullhorn",
        active: true,
      },
      {
        name: "historique_ordonnance",
        path: "/historiques-orodnnaces",
        libelle: "Historique Ordonnances",
        icone: "fa-clipboard-list",
        active: true,
      },
      {
        name: "nouveaux_rdv_test_covid",
        path: "/nouveaux-formulaires-test-covid",
        libelle: "Formulaires Test Covid-19",
        icone: "fa-bullhorn",
        active: true,
      },
      {
        name: "historique_test_covid",
        path: "/historiques-test-covid",
        libelle: "Historique Test Covid-19",
        icone: "fa-clipboard-list",
        active: true,
      },

      {
        name: "gestion_rdv_vaccin",
        path: "/gestion-rdv-vaccin",
        libelle: "Formulaires Vaccin Covid-19",
        icone: "fa-bullhorn",
        active: true,
      },
      {
        name: "historique_vaccin",
        path: "/historiques-vaccin",
        libelle: "Historique Vaccin Covid-19",
        icone: "fa-clipboard-list",
        active: true,
      },
      {
        name: "suivi_activite",
        path: "/suivi-activites",
        libelle: "Suivi de l’activité",
        active: false,
        icone: "fa-chart-line",

      },
      {
        name: "disponibilite_livraison",
        path: "/disponibles-livraison",
        libelle: "Disponibilité livraison",
        icone: "fa-truck",
        active: false,
      },
      {
        name: "zones_livraison",
        path: "/zones-livraison",
        libelle: "Zones de livraison",
        icone: "fa-truck",
        active: false,
      },
     /*
      {
        name: "disponibilite_plats",
        path: "/disponibles-plats",
        libelle: "Disponibilité des plats",
        icone: "fa-utensils",
        active: false,
      },*/
      /* {
        name: "fichiers_contacts",
        path: "/fichiers-contacts",
        libelle: "Fichiers contacts",
        icone: "fa-address-book",
        active: false,
      }, */
      /*{
        name: "Gestion_commerciale",
        path: "/Gestion_commerciale",
        libelle: "Gestion commerciale",
        active: false,
        icone: "fa-chalkboard-teacher",
      },*/
      {
        name: "offres-du-moment",
        path: "/offres-du-moment",
        libelle: "Les offres du moment",
        icone: "fa-gift",
        active: false,
      },
      {
        name: "Comptabilite",
        path: "/Comptabilite",
        libelle: "Comptabilité",
        active: false,
        icone: "fa-comments-dollar",
      },

      {
        name: "menu_code",
        path: "/Qrcode",
        libelle: "Menu QR Code ",
        icone: " fa-qrcode",
        active: false,
      },
      /*{
        name: "Gestion_des_ressources_humaines",
        path: "/Gestion_des_ressources_humaines",
        libelle: "Gestion du personnel",
        active: false,
        icone: "fa-id-card",
      },
      {
        name: "Gestion_des_stocks",
        path: "/Gestion_des_stocks",
        libelle: "Gestion des stocks",
        active: false,
        icone: "fas fa-chart-pie",
      },*/

      // {
      //   name: "clients",
      //   path: "/clients",
      //   libelle: "Base de données clients",
      //   icone: "fa-address-book",
      //   active: false,
      // },

      {
        name: "mon-compte",
        path: "/mon-compte",
        libelle: "Mon compte",
        icone: "fa-user-alt",
        active: false,
      },
      // {
      //   name: "infos-personnelles",
      //   path: "/mon-compte/infos-personnelles",
      //   active: false,
      // },
    ],
    currentPage: "nouvelles_commandes",
    nouvelleCommandeLength: 0,
    commandeCoursLength: 0,
    refresh: false,
  },
  reducers: {
    changePage: (state, action) => {
      state.pages.forEach((page) => {
        if (page.name === action.payload) {
          page.active = true;
          state.currentPage = page.name;
        } else {
          page.active = false;
        }
      });
    },

    changenouvelleCommandeLength: (state, action) => {
      state.nouvelleCommandeLength = action.payload;
    },

    changeCommandeCoursLength: (state, action) => {
      state.commandeCoursLength = action.payload;
    },

    refreshContent: (state, action) => {
      state.refresh = !state.refresh;
    },
  },
});

//+ generated action creator functions :return an object with payload and type
export const {
  changePage,
  refreshContent,
  changenouvelleCommandeLength,
  changeCommandeCoursLength,
} = adminSlice.actions;

// pareil
// const { changePage } = adminSlice.actions;
// export { changePage };

// useSelector(state => state.admin) :returns the state for admin paegs
export const selectAdmin = (state) => state.admin;

// + the generated reducer function
export default adminSlice.reducer;
