import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './FormulaireAntigenique.css';

import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react";
import { useForm } from "react-hook-form";

const FormulaireAntigenique = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");
    const [date, setDate] = useState(new Date());

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
        <form className="Formulaire" onSubmit={handleSubmit((data) => setResult(JSON.stringify(data))) }>
            <h5> Lieu de Consultation </h5>
            <p>Supeco - Dépistage Antigénique <br></br> 2 Avenue De La Garonne, 78200 Buchelay</p> <br></br>
            <div className="Categorie_Formulaire">

                <input {...register("Nom")} placeholder="Nom *" />
                <input {...register("Prenom")} placeholder="Prénom *" />
                <input {...register("Adresse")} placeholder="Adresse *" />
                <input {...register("CodePostale")} placeholder="Code Postal *" />
                <input {...register("Ville")} placeholder="Ville *" />
                <input {...register("Telephone")} placeholder="Telephone *" />
                <input {...register("NumeroSecuriteSociale")} placeholder="Numéro de sécurité sociale *" />
            
                <DatePicker
                    placeholderText="Choisissez votre rendez-vous *"
                    showTimeSelect
                    isClearable
                    dateFormat="dd/mm/yyyy H:mm"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    
                    onChange={date => setStartDate(date)}


                    invalid={[
                        {
                            start: '2022-02-28T09:00',
                            end: '2022-02-28T09:00'
                        },
                        {
                            start: '2022-02-31T11:30',
                            end: '2022-02-31T11:30'
                        },
                        {
                            start: '2022-02-01T09:00',
                            end: '2022-02-01T18:30'
                        },
                    ]}
                />

                <input type="submit" />

            </div>
            

            <h5> Motif de Consultation </h5>
            <p>Dépistage Covid-19 Test-Antigénique (Prélèvement Naso-Pharyngé)</p>

        </form>
        {/* end of antigenic test form */}
      
        </div>
        
    );
    
}


export default FormulaireAntigenique;



