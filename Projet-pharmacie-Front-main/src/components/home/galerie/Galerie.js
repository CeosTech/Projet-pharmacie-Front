import React, { Component } from 'react';
import "./Galerie.css";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import star from "../../../images/star.svg";

import image1 from "../../../images/Galerie/galerie1.png";
import image2 from "../../../images/Galerie/galerie2.png";
import image3 from "../../../images/Galerie/galerie3.png";


const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
}));



const data = [
    {
        id: 1,
        titre: "Expertise",
        text: "Nous travaillons dans le domaine de l’Orthopédie et du Matériel Médical depuis 2008",
        photo: image1
    },
    {
      id: 2,
      titre: "Prix compétitifs",
      text: "Notre équipe vous écoute et prodigue des conseils personnalisés.",
      photo: image2
  },{
      id: 3,
      titre: "Conseils",
      text: "Nous proposons des offres promotionnelles toute l’année.",
      photo: image3
  },
]

const Galerie = () => {
    const classes = useStyles();

    return (
        
        <div className="galeriePage" id="galerie">
            <div className="galerieTitleContainer">
                <Typography gutterBottom variant="h5" component="h1" className="galerieTitle">
                    Pourquoi Nous Choisir ?
                </Typography>
            </div>
            <div className="plats-card-galerie">
                {data.map((content) => (
                    <Card className="cardGalerie">
                        <img src={content.photo} alt="illustration"></img>
                                
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                {content.titre}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" className="cardText">
                                {content.text}
                            </Typography>
                                    
                        </CardContent>
                    </Card>
                ))}          

            </div>

        </div>
        
    );
}


export default Galerie;