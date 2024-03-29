import React from 'react';
import DatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import './FormulaireVaccin.css';


import 'bootstrap/dist/css/bootstrap.min.css'


import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import 'bootstrap/dist/css/bootstrap.min.css'
import toISOString from '../../../utils/toISOString'

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';


/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const FormulaireVaccin = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [isSubmited, setssubmited] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [checked, setChecked] = React.useState(false);
    const { control} = useForm();
     const [value, setValue] = useState("");

     const envoi =  (data) => {
        console.log(data)
        const formData = new FormData()
        formData.append("objet", data.objet)
        formData.append("nom", data.nom)
        formData.append("prenom", data.prenom)
        formData.append("telephone", data.telephone)
        formData.append("email", data.email)
        formData.append("age", data.age)
        formData.append("adresse", data.adresse)
        formData.append("code_postal", data.code_postal)
        formData.append("ville", data.ville)
        formData.append("num_secu", data.num_secu)
        formData.append("choix_vaccin", data.choix_vaccin)
        formData.append("date_retrait", toISOString(startDate))
        formData.append("message", data.message)
    

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }  //  const envoi = async (data) => {

       // next 3 lines are for devs just to see in the console if everything is ok, cand be deleted at the end of the project
       // console.log("==============ENVOIE=======")
       // console.log(data)
       // console.log("==============FIN=======")

         axios.post(
              'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/',
           //'http://localhost:8000/pharmacie/formulaire-vaccin/',
           // {...data, objet:"Première Injection", date_reservation:startDate}
           // {...data, date_reservation: {date}} // {...data, message: "...."}
           formData,
           {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }
        }
        ).then(response => {
            console.log(response.data);
            setssubmited(true)

        }).catch((e) => {
            console.log(e.response)
        })

    }
    

    return (

        <div className="Page_Formulaire_Vaccin">
        
        {/*Presentation text of the vaccin*/}
        <div className="Text_Form_Vaccin">
            <h5> Première injection</h5> 
        </div>

        {/* vaccin form */}


        {isSubmited ? 
            <div className="Formulaire_Vaccin" > <ThumbUpIcon style={{ color: "#49a010", fontSize: "80px", marginBottom: "40px" }} /> <h2>Votre demande a été envoyée avec succès </h2></div> 
            :

        <form className="Formulaire_Vaccin" onSubmit={handleSubmit((data) => { envoi(data) }) }>
            <h5> Lieu de Consultation </h5>
            <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
            <div className="Categorie_Formulaire_Vaccin">

                {/** FIRST NAME INPUT */}
               
                <div style={{margin:"20px 0"}}>  Nom  <span style={{color:"red"}}>*</span></div>
                <input {/* register must be use to apply validation rules on the input. Find more : https://react-hook-form.com/api/useform/register/ */
                    
                        ...register("nom",
                        {
                            required: '* Ce champs est requis'
                        })
                } placeholder="Saisir..." />

                {/** Show an error message under the input if the field does not respect validation rules */}
                <ErrorMessage   errors={errors}   name="nom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- LAST NAME INPUT --- */}
                
                <div style={{margin:"20px 0"}}>  Prénom  <span style={{color:"red"}}>*</span></div>
                <input {...register("prenom",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />

                <ErrorMessage   errors={errors}   name="prenom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- PHONE NUMBER INPUT --- */}
                
                <div style={{margin:"20px 0"}}>  Téléphone  <span style={{color:"red"}}>*</span></div>
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
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}   name="telephone"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- EMAIL INPUT --- */}
                
                <div style={{margin:"20px 0"}}>  Email  <span style={{color:"red"}}>*</span></div>
                <input {...register("email",
                            {
                                required: "* Ce champs est requis",
                                
                            }) 
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}   name="email"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- AGE INPUT --- */}
                
                <div style={{margin:"20px 0"}}>  Age  <span style={{color:"red"}}>*</span></div>
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
                } placeholder="Saisir..." />

                <ErrorMessage  errors={errors}   name="age"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- ADRESS INPUT --- */}
                <div style={{margin:"20px 0"}}>  Adresse  <span style={{color:"red"}}>*</span></div>
                <input {...register("adresse",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}    name="adresse"   render={({ message }) => <p id='Message_erreur'>{message}</p>}   />


                {/* --- POSTCODE INPUT --- */}

                <div style={{margin:"20px 0"}}>  Code Postal  <span style={{color:"red"}}>*</span></div>
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
                } placeholder="Saisir..." />

                <ErrorMessage  errors={errors}   name="code_postal"  render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- CITY INPUT --- */}
                <div style={{margin:"20px 0"}}>  Ville <span style={{color:"red"}}>*</span></div>
                <input {...register("ville",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}   name="ville"  render={({ message }) => <p id='Message_erreur'>{message}</p>}    />


                {/* --- SOCIAL SECURITY SYSTEM NUMBER INPUT --- */}
                <div style={{margin:"20px 0"}}>  Numéro de sécurité sociale  <span style={{color:"red"}}>*</span></div>
              
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
               
                <div style={{margin:"20px 0"}}> Choissisez un vaccin <span style={{color:"red"}}>*</span></div>
                <label className="type_vaccin">
                    <input {...register("choix_vaccin") } type="radio"   value="Sans préférence"/>
                    <p className="vaccinTitle"> Vaccin ARNm, sans préférence </p>
                    <p className="vaccinDescription"> Pfizer-BioNTech, Moderna</p>
                </label>
                     
     
                <label className="type_vaccin">
                    <input {...register("choix_vaccin") } type="radio"  value="Moderna"/>
                    <p className="vaccinTitle"> Moderna </p> 
                    <p className="vaccinDescription">Personnes de plus de 30 ans</p>
                </label>
     
     
                <label className="type_vaccin">
                    <input {...register("choix_vaccin") } type="radio"  value="Pfizer/BioNTech +12 ans"/>
                    <p className="vaccinTitle"> Pfizer/BioNTech </p>
                    <p className="vaccinDescription"> Personnes de plus de 12 ans</p>
     
                </label>
     
     
                <label className="type_vaccin">
                    <input {...register("choix_vaccin") } type="radio"  value="Pfizer/BioNTech 5/11 ans" />
                    <p className="vaccinTitle"> Pfizer/BioNTech Enfants </p>
                    <p className="vaccinDescription"> Personnes de plus de 5 à 11 ans inclus</p>
                </label>
                



               {/* --- DATE AND TIME FIELD --- */}
               
               <div style={{margin:"20px 0"}}> Choisissez une date <span style={{color:"red"}}>*</span></div>
                <DatePicker


                 {...register("date_retrait") }

                    placeholderText="Choisissez votre rendez-vous *"
                    showTimeSelect
                    isClearable
                    dateFormat="dd/MM/yyyy H:mm"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}

                    onChange={date => setStartDate(date)}

                    
                />

                {/* ---  MESSAGE FIELD --- */}
                <div style={{margin:"20px 0"}}> Message <span style={{color:"red"}}>*</span></div>
                <input {...register("message") } placeholder="Un message à nous transmettre ?" />
                    
                <button type="submit">
                <span> ENVOYER </span>
                </button>

                
               {/* <p>{result}</p>  */}
            </div>
            

            <h5> Motif de Consultation </h5>
            <p>Première Injection de vaccin contre la COVID-19</p>

           
        </form>}

        {/* end of antigenic test form */}
      
        </div>
        
    );
    
}

export default FormulaireVaccin;