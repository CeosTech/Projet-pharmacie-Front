import React, { useEffect, useState  } from 'react';
import "./Service.css";

import image1 from "../../../images/Plats/Rectangle1.jpg";
import image2 from "../../../images/Plats/Rectangle2.jpg";
import image3 from "../../../images/Plats/Rectangle3.jpg";
import star from "../../../images/star.svg";

import Carousel from "react-bootstrap/Carousel";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


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
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
}));

const data1 = [
      {
          id: 1,
          titre: "Orthopédie",
          photo: image1
      },
      {
        id: 2,
        titre: "Parapharmacie",
        photo: image2
    },{
        id: 3,
        titre: "Rappel Vaccin",
        photo: image3
    },
]


const data2 = [
    {
        id: 1,
        titre: "Test antigénique",
        photo: image1
    },
    {
      id: 2,
      titre: "Envoyer une ordonnance",
      photo: image2
  },{
      id: 3,
      titre: "Location de Materiel",
      photo: image3
  },
]

const Service = () => {
    const classes = useStyles();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = (e) => {
      setWindowWidth(window.innerWidth);
     };

     useEffect(() => {
         window.addEventListener("resize", handleResize);
      }, []);


    return (
            <div className="plats" id="plats">
                
                <div className="platsTitleContainer">
                    <Typography gutterBottom variant="h5" component="h1" className="platsTitle">
                        Nos services 
                    </Typography>
                </div>



                {/*first row */
                  windowWidth >= 960 ? (
                             
                    <div className="plats-card">
                        {data1.map((content) => (
                            <Card className="cardItem">
                                <img src={content.photo} alt="Contemplative Reptile"></img>
                                
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                        {content.titre}
                                    </Typography>
                                
                                </CardContent>
                            </Card>

                        ))}


                    </div>

         
                        ) : (
                            /*mobile version */ 

                            <Carousel pause={false} className="slider-card">
                                {data1.map((content) => (
                                  <Carousel.Item interval={5000} className="px-3" key={content.titre}>
                                <Card className="cardItem">
                                    <img src={content.photo} alt="Contemplative Reptile"></img>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                        {content.titre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className="cardText">
                                        {content.text}
                                    </Typography>
                                    <Typography variant="body2" color="textDanger" component="p" className="cardPrice">
                                        {content.prix}
                                    </Typography>
                                </CardContent>
                            </Card>
                                  </Carousel.Item>
                                ))}
                              </Carousel>

                        )}

                            
                            
                            {/* second row */ 
                            windowWidth >= 900 ? (
                             
                             <div className="plats-card">
                                 {data2.map((content) => (
                                     <Card className="cardItem">
                                         <img src={content.photo} alt="Contemplative Reptile"></img>
                                         
                                         <CardContent>
                                             <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                                 {content.titre}
                                             </Typography>
                                
                                         </CardContent>
                                     </Card>         
         
                                 ))}
                             
                                 
         
                             </div>
         
         
                 
         
                                           
                                 ) : (

                                    /*mobile version */


                                     <Carousel pause={false} className="slider-card">
                                         {data1.map((content) => (
                                           <Carousel.Item interval={5000} className="px-3" key={content.titre}>
                                         <Card className="cardItem">
                                             <img src={content.photo} alt="Contemplative Reptile"></img>
                                         <CardContent>
                                             <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                                 {content.titre}
                                             </Typography>
                                             <Typography variant="body2" color="textSecondary" component="p" className="cardText">
                                                 {content.text}
                                             </Typography>
                                             <Typography variant="body2" color="textDanger" component="p" className="cardPrice">
                                                 {content.prix}
                                             </Typography>
                                         </CardContent>
                                     </Card>
                                           </Carousel.Item>
                                         ))}
                                       </Carousel>
         
                                 )}
         

              
               

            </div>
        );
    }

export default Service;