import React from 'react';
import DatePicker from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import ReactSelect from "react-select";
import '../PremiereInjection/FormulaireVaccin.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { useForm} from "react-hook-form";
import axios from 'axios';
import toISOString from '../../../utils/toISOString';

/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const FormVaccinNoCovid = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [isSubmited, setssubmited] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();


    //const envoi = async (data) => {

        //next 3 lines are for devs just to see in the console if everything is ok, cand be deleted at the end of the project
       // console.log("==============ENVOIE=======")
       // console.log(data)
       // console.log("==============FIN=======")

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
            formData.append("date_retrait", toISOString(startDate))
            formData.append("choix_vaccin", data.choix_vaccin)
            formData.append("message", data.message)

        axios.post(
              'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-vaccin/',
           // 'http://localhost:8000/pharmacie/formulaire-vaccin/',
           // {...data, objet: "Jamais contracté Covid-19", date_reservation:startDate }
           // {...data, date_reservation: {date}} // {...data, message: "...."}
           formData,
           // {...data, message: "...."}
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
            <h5> Première et deuxième injections <br></br> (personne n'ayant jamais eu la COVID-19)</h5>
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
              objet *
                <input {/* register must be use to apply validation rules on the input. Find more : https://react-hook-form.com/api/useform/register/ */
                    
                        ...register("objet",
                        {
                            required: '* Ce champs est requis'
                        })
                } placeholder="Saisir..." />

                {/** Show an error message under the input if the field does not respect validation rules */}
                <ErrorMessage   errors={errors}   name="objet"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/** FIRST NAME INPUT */}
                Nom *
                <input {/* register must be use to apply validation rules on the input. Find more : https://react-hook-form.com/api/useform/register/ */
                    
                        ...register("nom",
                        {
                            required: '* Ce champs est requis'
                        })
                } placeholder="Saisir..." />

                {/** Show an error message under the input if the field does not respect validation rules */}
                <ErrorMessage   errors={errors}   name="nom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- LAST NAME INPUT --- */}
                Prénom *
                <input {...register("prenom",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />

                <ErrorMessage   errors={errors}   name="prenom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- PHONE NUMBER INPUT --- */}
                Telephone *
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
                Email *
                <input {...register("email",
                            {
                                required: "* Ce champs est requis",
                                
                            }) 
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}   name="email"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- AGE INPUT --- */}
                Age *
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
                Adresse *
                <input {...register("adresse",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Saisir..." />
                <ErrorMessage   errors={errors}    name="adresse"   render={({ message }) => <p id='Message_erreur'>{message}</p>}   />


                {/* --- POSTCODE INPUT --- */}
                Code Postal *
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
               Choisir une date *
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


           

        </form>}
        {/* end of antigenic test form */}
      
        </div>
        
    );
    
}

export default FormVaccinNoCovid;