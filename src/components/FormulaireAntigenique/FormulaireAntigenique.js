import React from 'react';
import DatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import './FormulaireAntigenique.css';


import 'bootstrap/dist/css/bootstrap.min.css'


import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import 'bootstrap/dist/css/bootstrap.min.css'
import toISOString from '../../utils/toISOString'
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';




/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const FormulaireAntigenique = () => {

    const [startDate, setStartDate] = useState(new Date());
    const { register, formState: { errors }, handleSubmit, control } = useForm();
    const [isSubmited, setssubmited] = useState(false);

    const envoi =  (data) => {
       console.log(data)
       const formData = new FormData()
       formData.append("nom", data.nom)
       formData.append("prenom", data.prenom)
       formData.append("telephone", data.telephone)
       formData.append("email", data.email)
       formData.append("age", data.age)
       formData.append("adresse", data.adresse)
       formData.append("code_postal", data.code_postal)
       formData.append("ville", data.ville)
       formData.append("num_secu", data.num_secu)
       formData.append("message", data.message)
       formData.append("date_retrait", toISOString(startDate))
   //  formData.append("image_ordonnance", image)

        console.log(formData.getAll('date_retrait'))
    
   // const envoi = async (data) => {

     //   next 3 lines are for devs just to see in the console if everything is ok, cand be deleted at the end of the project
     //   console.log("==============ENVOIE=======")
     //   console.log(data)
     //   console.log("==============FIN=======")

        axios.post(
           // 'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-test-covid/',
            'http://localhost:8000/pharmacie/formulaire-test-covid/',
           // {...data, date_reservation:startDate} // {...data, message: "...."}
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

        <div className="Page_Formulaire">
        
        {/*Presentation text of the antigenic test*/}
        <div className="Text_Form_antigenique">
            <h5> Test antigenique</h5> <br></br>
            <span>Les tests antigéniques rapides constituent un outil supplémentaire pour réduire les chaînes de transmission virale. 
                  Ils viennent en complément des tests RT-PCR  qui restent la technique de référence pour la détection de  l’infection à la Covid-19. 
            </span>
        </div>

        {/* antigenic test form */}
        {isSubmited ? 
            <div className="Formulaire" > <ThumbUpIcon style={{ color: "#49a010", fontSize: "80px", marginBottom: "40px" }} /> <h2>Votre demande a été envoyée avec succès </h2></div> 
            : 
        <form className="Formulaire" onSubmit={handleSubmit((data) => { envoi(data) }) }>
            <h5> Lieu de Consultation </h5>
            <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
            <div className="Categorie_Formulaire">


                {/** FIRST NAME INPUT */}
                <div style={{margin:"20px 0"}}>Nom <span style={{color:"red"}}>*</span></div>
                <input {/* register must be use to apply validation rules on the input. Find more : https://react-hook-form.com/api/useform/register/ */
                    
                        ...register("nom",
                        {
                            required: '* Ce champs est requis'
                        })
                } placeholder="Nom *" />

                {/** Show an error message under the input if the field does not respect validation rules */}
                <ErrorMessage   errors={errors}   name="nom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- LAST NAME INPUT --- */}
                <div style={{margin:"20px 0"}}>Prénom <span style={{color:"red"}}>*</span></div>
                <input {...register("prenom",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Prénom *" />

                <ErrorMessage   errors={errors}   name="prenom"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- PHONE NUMBER INPUT --- */}
                <div style={{margin:"20px 0"}}>Email <span style={{color:"red"}}>*</span></div>
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
                <div style={{margin:"20px 0"}}>Email <span style={{color:"red"}}>*</span></div>
                <input {...register("email",
                            {
                                required: "* Ce champs est requis",
                                
                            }) 
                } placeholder="Email *" />
                <ErrorMessage   errors={errors}   name="email"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                {/* --- AGE INPUT --- */}
                <div style={{margin:"20px 0"}}>Age <span style={{color:"red"}}>*</span></div>
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
                <div style={{margin:"20px 0"}}>Adresse <span style={{color:"red"}}>*</span></div>
                <input {...register("adresse",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Adresse *" />
                <ErrorMessage   errors={errors}    name="adresse"   render={({ message }) => <p id='Message_erreur'>{message}</p>}   />


                {/* --- POSTCODE INPUT --- */}
                <div style={{margin:"20px 0"}}>Code Postale <span style={{color:"red"}}>*</span></div>
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
                <div style={{margin:"20px 0"}}>Ville <span style={{color:"red"}}>*</span></div>
                <input {...register("ville",
                            {
                                required: '* Ce champs est requis'
                            })
                } placeholder="Ville *" />
                <ErrorMessage   errors={errors}   name="ville"  render={({ message }) => <p id='Message_erreur'>{message}</p>}    />


                {/* --- SOCIAL SECURITY SYSTEM NUMBER INPUT --- */}
                <div style={{margin:"20px 0"}}>Numéro de Sécurité sociale <span style={{color:"red"}}>*</span></div>
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
            
                } placeholder="Numéro de sécurité sociale *" />
                <ErrorMessage   errors={errors}     name="num_secu"     render={({ message }) => <p id='Message_erreur'>{message}</p>}   />

                
                {/* ---  MESSAGE FIELD --- */}
                <div style={{margin:"20px 0"}}>Message </div>
                <input {...register("message") } placeholder="Un message à nous transmettre ?" />

      
                {/* --- DATE AND TIME FIELD --- */}
                <div style={{margin:"20px 0"}}>Choisir une date <span style={{color:"red"}}>*</span></div>
                <DatePicker
                    {...register("date_reservation") }
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
                <span> ENVOYER </span>
                </button>

                
               {/* <p>{result}</p>  */}
            </div>
            

            <h5> Motif de Consultation </h5>
            <p>Dépistage Covid-19 Test-Antigénique (Prélèvement Naso-Pharyngé)</p>


        </form>}
      
        </div>
        
    );

    
}

export default FormulaireAntigenique;