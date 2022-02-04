import React from 'react';
import DatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import './FormulaireAntigenique.css';

import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const FormulaireAntigenique = () => {

    const [startDate, setStartDate] = useState(new Date());
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    const envoi = async (data) => {
        console.log("==============ENVOIE=======")
        console.log(data)
        console.log("==============FIN=======")

        await axios.post(
            'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-test-covid/',
            {...data, message: "Rendez-vous antigénique"} // {...data, message: "...."}
           // {...data, date_reservation: {date}} // {...data, message: "...."}
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
            <h5> Test antigenique</h5> <br></br>
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


                {/* --- AGE INPUT --- */}
                <input {...register("age",
                            {
                                required: '* Ce champs est requis',
                                pattern: { 
                                    value: /\d+/,
                                    message: "Ce champs ne comprend que des chiffres."
                                },
                                maxLength : {
                                    value: 3,
                                    message: "L'age n'est pas valide"
                                }
                            })
                } placeholder="Age *" />

                <ErrorMessage  errors={errors}   name="age"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- ADRESS INPUT --- */}
                <input {...register("adresse",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Adresse *" />
                <ErrorMessage 
                    errors={errors}
                    name="adresse"
                    render={({ message }) => <p id='Message_erreur'>{message}</p>}
                />


                {/* --- POSTCODE INPUT --- */}
                <input {...register("code_postal",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Code Postal *" />

                <ErrorMessage 
                    errors={errors}
                    name="code_postal"
                    render={({ message }) => <p id='Message_erreur'>{message}</p>}
                />


                {/* --- CITY INPUT --- */}
                <input {...register("ville",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Ville *" />
                <ErrorMessage 
                    errors={errors}
                    name="ville"
                    render={({ message }) => <p id='Message_erreur'>{message}</p>}
                />


                {/* --- SOCIAL SECURITY SYSTEM NUMBER INPUT --- */}
                <input {...register("num_secu",
                                {
                                    required: "* Ce champs est requis",
                                    pattern: { 
                                    value: /\d+/,
                                    message: "Ce champs ne comprend que des chiffres."
                                    }
                                }) 
            
                } placeholder="Numéro de sécurité sociale *" />
                <ErrorMessage 
                    errors={errors}
                    name="NumeroSecuriteSociale"
                    render={({ message }) => <p id='Message_erreur'>{message}</p>}
                />
      
                
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

export default FormulaireAntigenique;