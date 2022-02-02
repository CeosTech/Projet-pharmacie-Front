import React, { Component } from 'react';
import './Antigenique.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import {Grid } from '@material-ui/core';


const Antigenique = () => {


    return (
        <div id="header">
            <Grid container alignItems="center" justifyContent="center" className="Container">
                
                    <div className="Text">
                    <h5> Test antigenique</h5>
                        <br></br>
                        <span>Les tests antigéniques rapides constituent un outil supplémentaire <br></br> pour réduire les chaînes de transmission virale. 
                            Ils viennent en <br></br> complément des tests RT-PCR  qui restent la technique de référence <br></br> pour la détection de  l’infection à la Covid-19. <br></br>
                        </span>
                    
                    <Button id="Btn_Reserver_Test">
                        <Link to="/Test antigenique" className="prendreRDV">
                            <strong>RÉSERVER UN TEST ANTIGÉNIQUE</strong>
                        </Link>
                    </Button>
                    </div>
                    
                   
                    
            </Grid>           
        </div>
    );

}


export default Antigenique;