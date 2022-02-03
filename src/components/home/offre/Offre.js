import React, { useEffect, useState  } from 'react';
import "./Offre.css";
import Carousel from "react-bootstrap/Carousel";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import image1 from "../../../images/Galerie/galerie1.jpg";
import image2 from "../../../images/Galerie/galerie2.jpg";
import image3 from "../../../images/Galerie/galerie3.png";


const data = [
    {
        id: 1,
        titre: "Prix 1",
        photo: image1
    },
    {
      id: 2,
      titre: "Prix 2",
      photo: image2
    },
    {
      id: 3,
      titre: "Prix 3",
      
      photo: image3
    },
]

const Offre = () => {
    
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = (e) => {
        setWindowWidth(window.innerWidth);
    };
  
    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);
  

    return (
        
        <div className="offrePage" id="offre">
            <div className="offreTitleContainer">
                <Typography gutterBottom variant="h5" component="h1" className="offreTitle">
                PROFITEZ <br></br>de nos prix promotionnels et commandez.
                </Typography>
            </div>

            <div className="offreContainer">
                {/*first row */
                  windowWidth >= 960 ? (
                    <div className="plats-card-offre">
                        {data.map((content) => (
                            <Card className="cardOffre">
                                <img src={content.photo} alt="Contemplative Reptile"></img>
                                
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                        {content.titre}
                                    </Typography>
                                
                                </CardContent>
                            </Card>
                        ))}

                    </div>

                    ) : ( /*mobile version */ 

                    <Carousel pause={false} className="slider-card-offre">
                        {data.map((content) => (
                            <Carousel.Item interval={5000} className="px-3" key={content.titre}>
                                <Card className="cardItem">
                                    <img src={content.photo} alt="Contemplative Reptile"></img>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" className="cardTitle">
                                            {content.titre}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                )}   

            </div>

        </div>
        
    );
}


export default Offre;