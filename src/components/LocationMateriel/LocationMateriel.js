import React, { Component } from 'react';
import './LocationMateriel.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import image1 from "../../images/Location/LitMedical.png";
import image2 from "../../images/Location/FauteuilConfort.png";
import image3 from "../../images/Location/FauteuilRoulant.png";
import image4 from "../../images/Location/Hygiene.png";
import image5 from "../../images/Location/AideVieCourante.png";
import image6 from "../../images/Location/puériculture.png";


import {Grid } from '@material-ui/core';


const LocationMateriel = () => {


    return (
        <div id="header_Location">
            <Grid container alignItems="center" justifyContent="center" className="Container_Location">
                
                <div className="Text_Location">
                    <h5> Location de matériel médical</h5>
                    <p> Sortie d’hôpital, sortie de maternité, maintien de votre autonomie à domicile, 
                        vous pouvez compter sur votre pharmacien Giropharm pour vous aider à identifier et trouver les solutions adaptées 
                        pour organiser vos soins et votre confort, chez vous, en toute sécurité.
                    </p>



                    {/** FIRST ROW (2 ITEMS/ROW) */}
                    <div className="Row">

                        <div className="Box">
                            Lits médicalisés<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image1} width="300" height="300" />
                    
                        </div>

                        <div className="Box">
                            Fauteuils confort<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image2} width="300" height="300" />
                        </div>

                        

                    </div>


                    {/** SECOND ROW */}
                    <div className="Row">

                        <div className="Box">
                            Aide à la marche et <br></br>Fauteuils roulants<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image3} width="300" height="300" />
                    
                        </div>

                        <div className="Box">
                           <br></br> Hygiène et Salle de bain<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image4} width="300" height="300" />
                        </div>

                        

                    </div>


                    {/** THIRD ROW */}
                    <div className="Row">

                        <div className="Box">
                            Aide à la vie courante <br></br>Et confort<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image5} width="300" height="300" />
                    
                        </div>

                        <div className="Box">
                            <br></br>Puériculture<br></br>
                            <img className="reseau_img" alt="Facebook deux freres" src={image6} width="300" height="300" />
                        </div>

                        

                    </div>



                    


                </div>

              
        

                    


                    

        
                   
                    
            </Grid>        


            
               
        </div>
    );

}

export default LocationMateriel;