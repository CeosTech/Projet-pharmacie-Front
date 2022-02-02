import React from 'react';
import './FormulaireAntigenique.css';

import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from "react";
import { useForm } from "react-hook-form";

const FormulaireAntigenique = () => {
    
    const { register, handleSubmit } = useForm();
    const [result, setResult] = useState("");

    return (

        <div className="Page_Formulaire">
        <form className="Formulaire" onSubmit={handleSubmit((data) => setResult(JSON.stringify(data))) }>
        <h5> Lieu de Consultation </h5><br></br>
        <input {...register("Nom")} placeholder="Nom *" />
        <input {...register("Prenom")} placeholder="Prénom *" />
        <input {...register("Adresse")} placeholder="Adresse *" />
        <input {...register("CodePostale")} placeholder="Code Postal *" />
        <input {...register("Ville")} placeholder="Ville *" />
        <input {...register("Telephone")} placeholder="Telephone *" />
        <input {...register("NumeroSecuriteSociale")} placeholder="Numéro de sécurité sociale" />
        <select {...register("category")}>
            <option value="">Select...</option>
            <option value="A">Category A</option>
            <option value="B">Category B</option>
        </select>
        
        <input type="submit" />
        </form>


        </div>

        
    );
    
}

export default FormulaireAntigenique;