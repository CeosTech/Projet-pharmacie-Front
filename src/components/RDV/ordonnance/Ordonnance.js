import React, { Component } from 'react';
import './Ordonnance.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import {Grid } from '@material-ui/core';


const Ordonnance = () => {


    return (
        <div id="header">
            <Grid container alignItems="center" justifyContent="center" className="Container">
                
                    <div className="Text">
                    <h5> Click and collect : envoyez votre ordonnace</h5>
                        <br></br>
                        <span>Avec le Click and Collect plus besoin de patienter. <br></br>Envoyez votre ordonnance et nous nous chargerons de préparer vos médicaments.
                            <br></br>Venez les récuperer une fois votre commande finaliser.<br></br>
                        </span>
                    
                    <Button id="Btn_Reserver_Test">
                        <Link to="/ordonnance" className="prendreRDV">
                            <strong>ENVOYEZ VOTRE ORDONNANCE</strong>
                        </Link>
                    </Button>
                    </div>
                    
                   
                    
            </Grid>           
        </div>
    );

}


export default Ordonnance;