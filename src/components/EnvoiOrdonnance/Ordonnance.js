import React from 'react';
import DatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import './Ordonnance.css';
import img from "../../images/feuille.png"
import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const Ordonnance = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [image, setImage] = useState(img);
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    const envoi = async (data) => {
        console.log("==============ENVOIE=======")
        console.log(data)
        console.log("==============FIN=======")

        await axios.post(
            'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/',
            {...data, image_ordonnance: {img}} // {...data, message: "...."}
        ).then(response => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response)
        })

    }
    

    return (

        <div className="Page_Formulaire">
        
        {/*Presentation text of the antigenic test*/}
        <div className="Text_Form_antigenique">
            <h5> Deposez Vos Ordonnances</h5> <br></br>
            <span>Les tests antigéniques rapides constituent un outil supplémentaire pour réduire les chaînes de transmission virale. 
                  Ils viennent en complément des tests RT-PCR  qui restent la technique de référence pour la détection de  l’infection à la Covid-19. 
            </span>
        </div>

        {/* antigenic test form */}
        <form className="Formulaire" onSubmit={handleSubmit((data) => { envoi(data) }) }>
            <h5> Lieu de Consultation </h5>
            <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
            <div className="Categorie_Formulaire">

                {/** FIRST NAME INPUT */}
                <input {/* register must be use to apply validation rules on the input. Find more : https://react-hook-form.com/api/useform/register/ */
                    
                        ...register("nom",
                        {
                            required: '* Ce champs est requis'
                        })
                } placeholder="Nom *" />

                {/** Show an error message under the input if the field does not respect validation rules */}
                <ErrorMessage   errors={errors}   name="nom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />

                {/* --- LAST NAME INPUT --- */}
                <input {...register("prenom",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Prénom *" />

                <ErrorMessage   errors={errors}   name="prenom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />

                {/* --- PHONE NUMBER INPUT --- */}
                <input {...register("telephone",
                            {
                                required: "* Ce champs est requis",
                                pattern: { 
                                value: /\d+/,
                                message: "Ce champs ne comprend que des chiffres."
                                }
                            }) 
                } placeholder="Telephone *" />
                <ErrorMessage   errors={errors}   name="telephone"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />

                {/* --- EMAIL INPUT --- */}
                <input {...register("email",
                            {
                                required: "* Ce champs est requis",
                                pattern: { 
                                value: /\d+/,
                                message: "Ce champs ne comprend que des chiffres."
                                }
                            }) 
                } placeholder="Email *" />
                <ErrorMessage   errors={errors}   name="email"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />

                
                <DatePicker
                    placeholderText="Choisissez votre rendez-vous *"
                    showTimeSelect
                    isClearable
                    dateFormat="dd/MM/yyyy H:mm"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    onChange={date => setStartDate(date)}


                    
                />
                <TextField
                    id="image"
                    type="file"
                    variant="outlined"
                    size="small"
                    name="image"
                    onChange={(event) => {
                        const fileUploaded = event.target.files[0]
                        setImage(event);

                    }
                    }
                />

                
                
                <button type="submit">
                    ENVOYER
                </button>

                
               {/* <p>{result}</p>  */}
            </div>
            

            <h5> Motif de Consultation </h5>
            <p>Dépistage Covid-19 Test-Antigénique (Prélèvement Naso-Pharyngé)</p>

        </form>
        {/* end of antigenic test form */}
      
        </div>
        
    );
    
}

export default Ordonnance;