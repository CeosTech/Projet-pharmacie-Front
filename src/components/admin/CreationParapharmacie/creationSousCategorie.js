
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
                <h2>Création d'un menu</h2>
                <br />
                <h4>Sous-Catégorie :</h4>
                <div className="creation_Title">
                    <TextField
                        label="Saisiez la catégorie"
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
                    <button className="button_inside" onClick={addSubCategory}>Ajouter</button>
                </div>

                <ul>
                    {
                        load ?
                            list.map((i) => {
                                return (
                                    <li id={i.id}>
                                        <input type="text" id={i.id} name="subcategory" value={i.nom} className="creation_menus_popup_input" required minlength="4" maxlength="8" size="10" onChange={(e) => { changeValue(e.target.id, e.target.value) }} />
                                        <i class="fa fa-trash" aria-hidden="true" style={{ color: "red", }} onClick={() => { setTrash({ bool: true, index: i.id }) }}></i>
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