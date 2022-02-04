import React from 'react';
import './Localisation.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import image1 from "../../../images/Plats/Rectangle1.jpg";


import {Grid } from '@material-ui/core';


const Localisation = () => {


    return (
        <div id="header">
            <Grid container alignItems="center" justifyContent="center" className="Container_Loc">
                
            <img
                    className="localisation_img"
                    alt="Map"
                    src={image1}
                  />
                
                <div className="Text_Loc">
                    
                 <h5> Horaire</h5>
                    <br></br>
                    <span>Lundi : 10h - 20h <br></br>Mardi - Vendredi : 08h30 - 20h <br></br> Samedi : 09h - 19h30
                    </span>
                    
            
                </div>
                    
                   
                    
            </Grid>           
        </div>
    );

}


export default Localisation;