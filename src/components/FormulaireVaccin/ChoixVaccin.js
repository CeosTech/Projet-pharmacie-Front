import React, { Component } from 'react';
import './ChoixVaccin.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";


import {Grid } from '@material-ui/core';


const ChoixVaccin = () => {


    return (
        <div id="header">
            <Grid container alignItems="center" justifyContent="center" className="Container_choix_rappel">
                
                    <div className="Choix_Rappel">
                    <h5> Rappel vaccin</h5>
                        
                    
                    <Button id="Btn_Reserver_Vaccin">
                        <Link to="/Injection sans covid" className="Title">
                            <strong>Première et deuxième injections (personne n'ayant jamais eu la COVID-19)</strong>
                        </Link>
                    </Button>

                    <Button id="Btn_Reserver_Vaccin">
                        <Link to="/Premiere Injection" className="Title">
                            <strong>Première injection</strong>
                        </Link>
                    </Button>

                    <Button id="Btn_Reserver_Vaccin">
                        <Link to="/Deuxieme Injection" className="Title">
                            <strong>Deuxième injection</strong>
                        </Link>
                    </Button>


                    <Button id="Btn_Reserver_Vaccin">
                        <Link to="/Rappel Vaccin" className="Title">
                            <strong>Une dose de rappel</strong>
                        </Link>
                    </Button>
                    </div>
                    
                   
                    
            </Grid>           
        </div>
    );

}


export default ChoixVaccin;