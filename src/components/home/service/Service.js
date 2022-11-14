import React from "react";
import Slider from "react-slick";
import Carte from './Carte.js'
import Typography from '@material-ui/core/Typography';

import image1 from "../../../images/service/box1.png";
import image2 from "../../../images/service/box2.png";
import image3 from "../../../images/service/box3.png";
import image4 from "../../../images/service/box4.png";
import image5 from "../../../images/service/box5.png";
import image6 from "../../../images/service/box6.png";
import "./Service.css";

const data= [
    {
        id: 1,
        titre: "Orthopédie",
        photo: image1,
        ref: "/shop-orthopedie"
    },
    {
      id: 2,
      titre: "Parapharmacie",
      photo: image2,
      ref: "/shop-parapharmacie"
  },{
      id: 3,
      titre: "Rappel Vaccin",
      photo: image3,
      ref:"/Choix du vaccin"
  },

  {
    id: 4,
    titre: "Test antigénique",
    photo: image4,
    ref: "/Test antigenique formulaire"
},
{
  id: 5,
  titre: "Envoyer une ordonnance",
  photo: image5,
  ref:"/ordonnance"
},
{
  id: 6,
  titre: "Location de Materiel",
  photo: image6,
  ref:"/Location De Materiel"
},
]





function Service() {
    var settings = {
        dots: true,
        infinite: true,
        // autoplay:true,
        arrows:true,
        draggable:true,
        speed: 500,
        autoplaySpeed:2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                // rows: 2,

            }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
        ]

      };
      return (

        <>
        <div className="platsTitleContainer">
                    <Typography gutterBottom variant="h5" component="h1" className="platsTitle">
                        Nos services 
                    </Typography>
                </div>

        <div style= {{padding:"50px"}}>
        <Slider {...settings}>
          
          
          {data.map((item, index)=><Carte omar='this is my name' index={index} item={item}/>)}
        </Slider>
        </div>
        </>
      
      );
    }
export default Service;