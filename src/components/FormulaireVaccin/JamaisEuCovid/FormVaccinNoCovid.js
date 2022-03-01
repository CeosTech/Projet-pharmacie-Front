import React from 'react';
import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import ReactSelect from "react-select";
import '../PremiereInjection/FormulaireVaccin.css';
import {
    TextField,
    Checkbox,
    Select,
    MenuItem,
    Switch,
    RadioGroup,
    FormControlLabel,
    ThemeProvider,
    Radio,
    createMuiTheme,
    Slider
  } from "@material-ui/core";
import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';


/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const FormVaccinNoCovid = () => {

    const [startDate, setStartDate] = useState(new Date());
    
    const { register, formState: { errors }, handleSubmit } = useForm();


    const [checked, setChecked] = React.useState(false);

    const { control} = useForm();
    const [submittedDate, setSubmittedDate] = useState();
    
    const envoi = async (data) => {

        //next 3 lines are for devs just to see in the console if everything is ok, cand be deleted at the end of the project
        console.log("==============ENVOIE=======")
        console.log(data)
        console.log("==============FIN=======")

        await axios.post(
            //'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/',
            'http://localhost:8000/pharmacie/formulaire-vaccin/',
            {...data, objet: "Jamais contracté Covid-19", choix_vaccin:"null"}
           // {...data, date_reservation: {date}} // {...data, message: "...."}
        ).then(response => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response)
        })

    }
    

    return (

        <div className="Page_Formulaire_Vaccin">
        
        {/*Presentation text of the vaccin*/}
        <div className="Text_Form_Vaccin">
            <h5> Première et deuxième injections <br></br> (personne n'ayant jamais eu la COVID-19)</h5>
        </div>

        {/* vaccin form */}
        <form className="Formulaire_Vaccin" onSubmit={handleSubmit((data) => { envoi(data) }) }>
            <h5> Lieu de Consultation </h5>
            <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
            <div className="Categorie_Formulaire_Vaccin">


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
                                },
                                maxLength : {
                                    value: 10,
                                    message: "Veuillez entrer votre numéro de téléphone à 10 chiffres"
                                },
                                minLength : {
                                    value: 10,
                                    message: "Veuillez entrer votre numéro de téléphone à 10 chiffres"
                                },
                            }) 
                } placeholder="Telephone *" />
                <ErrorMessage   errors={errors}   name="telephone"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- EMAIL INPUT --- */}
                <input {...register("email",
                            {
                                required: "* Ce champs est requis",
                                
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
                <ErrorMessage   errors={errors}    name="adresse"   render={({ message }) => <p id='Message_erreur'>{message}</p>}   />


                {/* --- POSTCODE INPUT --- */}
                <input {...register("code_postal",
                            {
                                required: '* Ce champs est requis',
                                maxLength : {
                                    value: 5,
                                    message: "Veuillez entrer votre code postal à 5 chiffres"
                                },
                                minLength : {
                                    value: 5,
                                    message: "Veuillez entrer votre code postal à 5 chiffres"
                                },
                            })
                } placeholder="Code Postal *" />

                <ErrorMessage  errors={errors}   name="code_postal"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- CITY INPUT --- */}
                Ville*
                <input {...register("ville",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}   name="ville"  render={({ message }) => <p id='Message_erreur'>{message}</p>}    />


                {/* --- SOCIAL SECURITY SYSTEM NUMBER INPUT --- */}
                Numéro de sécurité sociale *
                <input {...register("num_secu",
                            {
                                required: "* Ce champs est requis",
                                pattern: { 
                                    value: /\d+/,
                                    message: "Ce champs ne comprend que des chiffres."
                                },
                                /*maxLength : {
                                    value: 15,
                                    message: "Veuillez entrer votre numéro de sécurité sociale à 15 chiffres"
                                },
                                minLength : {
                                    value: 15,
                                    message: "Veuillez entrer votre numéro de sécurité sociale à 15 chiffres"
                                },*/
                                
                            }) 
            
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}     name="num_secu"     render={({ message }) => <p id='Message_erreur'>{message}</p>}   />

                
                


                {/* --- VACCIN CHOICE --- */}
                Choissisez un vaccin*


                <section>
  
                    <Controller
                        name="choix_vaccin"
                        
                        control={control}
                        render={({ field }) => (
                        <ReactSelect
                            isClearable
                            {...field}
                            options={[
                            { value: "pfizer", label: "Pfizer",},
                            { value: "moderna", label: "Moderna" },
                            { value: "Astrazeneca", label: "Astrzeneca" }
                            ]}
                        />
                        )}
                    />
                </section>
                     
                

                
      


                {/* --- DATE AND TIME FIELD --- */}
                Choisir une date *
                
                <Controller
                
                    control={control}
                    name="ReactDatepicker"
                    render={({ field }) => (
                    <ReactDatePicker
                        className="input"
                        placeholderText="Select date"
                        dateFormat="dd/MM/yyyy"
                        onChange={(e) => field.onChange(e)}
                        onChange={(a) => console.log(a)}
                        
                        selected={field.value}
                        date_reservation={field}
                    />
                    )}
                />

                <ErrorMessage   errors={errors}     name="date_reservation"     render={({ message }) => <p id='Message_erreur'>{message}</p>}   />

                {/* ---  MESSAGE FIELD --- */}
                <input {...register("message") } placeholder="Un message à nous transmettre ?" />
               
                    
                
        
                 
                   
                
                <button type="submit">
                    ENVOYER
                </button>

                
               {/* <p>{result}</p>  */}
            </div>
            

            <h5> Motif de Consultation </h5>
            <p>Première Injection de vaccin contre la COVID-19</p>


           

        </form>
        {/* end of antigenic test form */}
      
        </div>
        
    );
    
}

export default FormVaccinNoCovid;