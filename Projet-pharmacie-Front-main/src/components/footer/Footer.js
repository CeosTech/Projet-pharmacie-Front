import React from 'react'
import { Grid } from '@material-ui/core';
import Logo_Fb from '../../images/Logo_Fb.png';
import Logo_Insta from '../../images/Logo_Insta.png';
import Logo_Mustang from '../../images/Logo_pharmacie.png';
import './Footer.css';
import { useLocation } from "react-router-dom";

import CGV from "../../Documents/CGV_MUSTANG_TROYES.pdf";
import ML from "../../Documents/ML_MUSTANG_TROYES.pdf";


const Footer = () => {
  const location = useLocation();

  const regex = /^\/admin/g;
  //   ne pas afficher dans la page admin
  if (!location.pathname.match(regex)) {
    return (
      <div >
            <Grid container id="footer">
              <Grid container className="footer-logo-border" justifyContent="center" xs={12} md={2}>
                <a href="/#header">
                  <img src={Logo_Mustang} alt="logo Mustang Footer"></img>
                </a>
              </Grid>
              <Grid container className="footer-text" direction="row" xs={12} md={10}>
                  <Grid xs={12} sm={6} md={3}>
                    <h5>ADRESSE</h5>
                    <p>
                      <a 
                        className="footer-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/maps/place/Le+Mustang/@48.2724593,4.0757994,17z/data=!3m1!4b1!4m5!3m4!1s0x47ee99df182aa17d:0xee0c0de0f02fc3ad!8m2!3d48.2724524!4d4.0779787"                    
                      >
                        41 Avenue des Lombards <br></br> 10000 Troyes
                      </a>
                    </p>
                  </Grid>
                  

                  <Grid xs={12} sm={6} md={3}>
                    <h5>CONTACT</h5>
                    <p>
                    <a class="footer-link" href="tel:09-36-25-34-94"> 09 36 25 34 94 </a>
                       <br></br> 
                    <a 
                      className="footer-link" 
                      href="mailto:lemustangtroyes.site@gmail.com"
                      rel="noreferrer"
                    > parmacie.siteweb@gmail.com</a>
                    </p>
                  </Grid>
                 

                  <Grid xs={12} sm={6} md={3} className="openhours">
                    <h5>HORAIRES</h5>
                    <span>Lundi 10h - 20h</span><br/><span> Mardi - Vendredi 8h30 - 20h </span>
                    <br/> <span> Samedi 09h - 19h30</span>
                  </Grid>
                  

              </Grid>
            </Grid>
            <Grid container justifyContent="center" style={{backgroundColor:'#5c9b3f'}}>
                
                    <span className="footer-copyright">Copyright 2021 ©  |  Made by <a 
                      className="footer-link" 
                      target="_blank" 
                      rel="noreferrer" 
                      href="http://www.ceostech.fr/"
                    > Ceos Tech </a>  | 
                    <a 
                      className="footer-link" 
                      target="_blank" 
                      rel="noreferrer" 
                      href={CGV}
                    > CGV  </a>| 
                    <a 
                      className="footer-link" 
                      target="_blank" 
                      rel="noreferrer" 
                      href={ML}
                    > Mentions Légales </a></span>
                
            </Grid>
        </div>
  
    ) }

    return null;
  };
  export default Footer;