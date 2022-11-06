import React from 'react';
import DatePicker from "react-datepicker";
import { ErrorMessage } from '@hookform/error-message';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import './Ordonnance.css';
import img from "../../images/feuille.png"
import 'bootstrap/dist/css/bootstrap.min.css'
<<<<<<< HEAD

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


=======
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import toISOString from '../../utils/toISOString'



  

>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)
/** Using React Hook form library. Find more : https://react-hook-form.com/ */

const Ordonnance = () => {

    const [startDate, setStartDate] = useState(new Date());
<<<<<<< HEAD
    const [image, setImage] = useState(img);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const envoi = async (data) => {
        console.log("==============ENVOIE=======")
        console.log(data)
        console.log("==============FIN=======")

        await axios.post(
            //'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/',
            'http://localhost:8000/pharmacie/formulaire-ordonnance/', 
            {...data, date_retrait:startDate, image_ordonnance:img } // {...data, message: "...."}
        ).then(response => {
            console.log(response.data);
        }).catch((e) => {
            console.log(e.response)
        })

    }

    return (

=======
    const [isSubmited, setssubmited] = useState(false);
    const [image, setImage] = useState();
    const { register, formState: { errors }, handleSubmit } = useForm();


    const handleCloudinaryUpload = (e) =>{

        setImage(e.target.files[0])

        // const formData = new FormData()
        // formData.append("file", e.target.files[0])
        // formData.append("upload_preset", "qewnhky7")
        // axios.post("https://api.cloudinary.com/v1_1/dce8mcmao/image/upload",
        // formData).then(res=>{
        //     setImage(res.data.secure_url)
        // })
    }

    const envoi =  (data) => {
        console.log(data)
        const formData = new FormData()
        formData.append("nom", data.nom)
        formData.append("prenom", data.prenom)
        formData.append("email", data.email)
        formData.append("telephone", data.telephone)
        formData.append("date_retrait", toISOString(startDate))
        formData.append("message", data.message)
        formData.append("image_ordonnance", image)

        console.log(formData.getAll('date_retrait'))
        
        axios.post(
             'https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/',
            //'http://localhost:8000/pharmacie/formulaire-ordonnance/', 
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

       
>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)
        <div className="Page_Formulaire_Ordonnance">
        
            {/*Presentation text of the prescription send*/}
            <div className="Text_Form_Ordonnance">
                <h5> Click and collect : envoyez votre ordonnace</h5> <br></br>
                <span>Avec le Click and Collect plus besoin de patienter. Envoyez votre ordonnance et nous nous chargerons de préparer vos médicaments.
                    Venez les récuperer une fois votre commande finaliser.
                </span>
            </div>

            {/* prescription send form */}
<<<<<<< HEAD
=======
            {isSubmited ? 
            <div className="Formulaire_Ordonnance" > <ThumbUpIcon style={{ color: "#49a010", fontSize: "80px", marginBottom: "40px" }} /> <h2>Votre demande a été envoyée avec succès </h2></div> 
            : 
>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)
            <form className="Formulaire_Ordonnance" onSubmit={handleSubmit((data) => { envoi(data) }) }>
                <h5> Lieu de Consultation </h5>
                <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
                <div className="Categorie_Formulaire_Ordonnance">

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
                                    
                                }) 
                    } placeholder="Email *" />
                    <ErrorMessage   errors={errors}   name="email"   render={({ message }) => <p id='Message_erreur'>{message}</p>}  />


                    {/* --- DATE AND TIME FIELD --- */}
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
                    <input {...register("message") } placeholder="Un message à nous transmettre ?" />


                    {/* --- UPLOAD FILE FIELD --- */}
                    <TextField
<<<<<<< HEAD
=======
                    required
>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)
                    id="image_ordonnance"
                    type="file"
                    variant="outlined"
                    size="small"
                    name="image_ordonnance"
<<<<<<< HEAD
                    
                />
=======
                    onChange={handleCloudinaryUpload} />
>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)



                    <button type="submit">
                        ENVOYER
                    </button>


                {/* <p>{result}</p>  */}
                </div>


                <h5> Motif de Consultation </h5>
                <p>Réception d'articles après l'envoi d'une ordonnance</p>

<<<<<<< HEAD
            </form>
            {/* end of antigenic test form */}


        </div>

        
=======
            </form>}
        </div> 
>>>>>>> c39b148 (improve forms ux by adding thank you component on form submmition)
        
    );
    
}



export default Ordonnance;