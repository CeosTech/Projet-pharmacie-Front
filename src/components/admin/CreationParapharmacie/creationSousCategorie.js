
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";

import "./creationMenus.css";
import Alert from "../alert_message/Alert"
import { URL } from "../../middlewares/request";
import { sendrequest } from "../../middlewares/request";

const CreationSousCategorie = (props) => {
    /* categorie */
    const [list, setList] = useState([])
    const [listCategorie, setListCategorie] = useState([])

    const [category, setCategory] = useState("")
    const [subcategory, setSubCategory] = useState("")
    const [load, setLoad] = useState(false)

    /* ERRORS */
    const [error, setError] = useState({ check: false, msg: "" })
    const [trash, setTrash] = useState({ bool: false, index: null })
    const [modify, setModify] = useState(false)

    // Retrieve data
    const fetchData = async () => {
        sendrequest(
            "get",
            "parapharmacie/sous_categorie/?ordering=id",
            setList,
            setLoad
        );
        sendrequest(
            "get",
            "parapharmacie/categorie/",
            setListCategorie,
            setLoad
        );
    }

    // Handle field changes 
    function changeValue(index, value) {
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        tmp[i].nom = value;
        setList(tmp);
    }

    // Send all changes 
    async function sendChanges() {
        for (let i = 0; i < list.length; i++) {
            await axios.put(URL + "parapharmacie/sous_categorie/" + list[i].id + '/',
                {
                    id: list[i].id,
                    nom: list[i].nom,
                }
            ).then((response) => {
                console.log(response)
            })
                .catch((error) => {
                    console.log("======================================")
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                })
        }
    }

    // Check if the value exist in tab
    function check(tab, value){
        let res = false
        tab.map((i) => {
            if(i.nom === value){
                res = true
            }
        })
        return res
    }


    /**
    // Add a new subcategory
    async function addSubCategory() {
        if (!check(list, subcategory)) { // Check if the new category doesn't already exist
            await axios.post(URL + "parapharmacie/sous_categorie/",
                {
                    nom: subcategory,
                }
            )
            setLoad(false)
            fetchData()
        } else {
            alert("La sous catégorie existe déjà !");
        }
    }
*/



    // Add a new subcategory : name, subcategory
    async function addSubCategory() {
        if (category !== null && category != "") {
            
            await axios.post(URL + "parapharmacie/sous_categorie/",
                {
                    nom: subcategory,
                 
                    categorie: category,
               
                }
            ).then()
                .catch((e) => {
                    console.log(e.response)
                })
            setError({ check: false, msg: "" })
            setLoad(false)
            fetchData()
            setSubCategory("")
        } else {
            setError({ check: true, msg: "Veuillez correctement saisir les informations" })
        }
    }



    // Delete a subcategory
    async function deleteValue(index) {
        await axios.delete(URL + "parapharmacie/sous_categorie/" + index + '/'
        )
        let tmp = [...list];
        let i = tmp.findIndex((element) => element.id == index);
        if (i > -1) {
            tmp.splice(i, 1);
            setList(tmp)
        }
    }

    // Check if the user confirms his modifications
    function callBackModify(bool) {
        if (bool) {
            sendChanges()
        }
        setModify(false)
    }

    // Check if user confirms the deletion
    function callBackTrash(bool) {
        if (bool) {
            deleteValue(trash.index)
        }
        setTrash(false)
    }

    // Check if the user's input is valid
    function verifyForm() {
        setModify(true)
    }

    useEffect(() => {
        fetchData();
        console.log(list)
    }, [load]);


    return (
        <div className="creation_menus_popup"> {/* onClick={ () => {props.close(false)}} */}
            <i class="fas fa-times close" onClick={() => { props.close(false) }}></i>
            <div className="contain">
                <h2>Création de la parapharmacie</h2>
                <br />
                <h4>Sous-Catégorie :</h4>
                <div className="creation_Title">
                    <TextField
                        label="Saisiez la sous-catégorie"
                        id="outlined-basic"
                        variant="outlined"
                        name="subcategory"
                        className="creation_menus_popup_button"
                        value={subcategory}
                        onChange={(e) => { setSubCategory(e.target.value) }}
                        required
                    />
                    <br />
                    <br />

                    <label className="category_choice_title">Catégorie :</label>
                    <br />
                    <select className="category_choice" name="type_supplement" id="type_supplement" onChange={(e) => { setCategory(e.target.value) }}>
                        <option value="" selected disabled>--Sélectionnez la catégorie--</option>
                        {
                            listCategorie.map((i) => {
                                return (
                                    <option value={i.id}>{i.nom}</option>
                                )
                            })
                        }
                    </select>
                    <br />
                    <br />

                    <button className="button_inside" onClick={addSubCategory}>Ajouter</button>
                    <div className="line"> </div>

                </div>

                <h4>Liste des sous-catégories créées :</h4>
                <br />
                <ul>
                    {
                        load ?
                            list.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <div className="align">
                                            <input type="text" id={i.id} name="sous_categorie" value={i.nom} className="creation_menus_popup_input" required minlength="4" size="10" onChange={(e) => { changeValue("nom", e.target.id, e.target.value) }} />
                                            

                                            <label className="lab_subcategory"> Catégorie: {listCategorie.map(o => {
                                                if (o.id === i.categorie) {
                                                    return o.nom
                                                }
                                            })}</label>
                                            
                                            <i class="fa fa-trash" style={{ color: "red", width: "0", }} aria-hidden="true" onClick={() => { setTrash({ bool: true, index: i.id, choice: "sous_categorie" }) }}></i>
                                        </div>
                                    </li>
                                )
                            })
                            :
                            null
                    }
                </ul>


                

                <br />

                {error.check ? <p style={{ color: "red" }}>{error.msg}</p> : null}
                <button className="button_inside" type="submit" onClick={verifyForm}>Valider</button>
                {modify ? <Alert parentCallback={callBackModify} nom="modifier" /> : null}
                {trash.bool ? <Alert parentCallback={callBackTrash} nom="supprimer" /> : null}
            </div>
        </div>
    );
};


export default CreationSousCategorie;