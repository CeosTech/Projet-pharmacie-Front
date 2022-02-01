import React, { Component } from 'react';
import "./Offre.css";

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import star from "../../../images/star.svg";

import image1 from "../../../images/Galerie/galerie1.jpg";
import image2 from "../../../images/Galerie/galerie2.jpg";
import image3 from "../../../images/Galerie/galerie3.png";
import image4 from "../../../images/Galerie/galerie4.jpg";
import image5 from "../../../images/Galerie/galerie5.jpg";
import image6 from "../../../images/Galerie/galerie6.png";
import image7 from "../../../images/Galerie/galerie7.jpg";
import image8 from "../../../images/Galerie/galerie8.jpg";
import image9 from "../../../images/Galerie/galerie9.jpg";


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

const Offre = () => {
    const classes = useStyles();

    return (
        
        <div className="offrePage" id="offre">
            <div className="offreTitleContainer">
                <Typography gutterBottom variant="h5" component="h1" className="offreTitle">
                PROFITEZ DÈS MAINTENANT <br></br>de nos prix promotionnels et commandez.
                </Typography>
            </div>
            <div className="plats-card">
                        {data.map((content) => (
                            <Card className="cardOffre">
                                <img src={content.photo} alt="Contemplative Reptile"></img>
                                
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

            <div className={classes.sectionMobile}>
                <div className="gallerie-mobile-version">
                    <Grid container >
                        <Grid container direction="column" alignItems="center" xs={6}>
                            <img src={image1} className="galerieImgMobile" />
                            <img src={image2} className="galerieImgMobile" />
                            <img src={image3} className="galerieImgMobile" />
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
        
    );
}


export default Offre;