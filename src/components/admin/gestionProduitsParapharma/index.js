import { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Carte from "./Carte";
import CartePage from './CartePageParapharma';
//import MenuType from "../../Menu/MenuType";
//import Card from "./Carte/card";
import AddProductModal from "./MyModalParapharma/AddProductModal";
import "./index.css";
import axios from "axios";
import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { URL, sendrequest } from "../../../middlewares/request";
import SwitchBtn from "../switch/SwitchBtn";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { ContactsOutlined } from "@material-ui/icons";



const proprietes = ["Vos produits", "Disponibilité"];

const useStyles = makeStyles({
  heading: {
    width: "100%",
    fontWeight: "bold",
    textAlign: "left",
    
  },

  content: {
    fontWeight: "bold",
    fontSize: 30,
  },

  rowConfig: {
    borderWidth: 3,
  },
});

export default function GestionProduitsParapharma ({
    categorieId,
    sous_categorieId
}) {


    const initialProduct = () => {
        
        return({
            categorie: categorieId,
            sous_categorie: sous_categorieId,
        });
    }
    const [product, setProduct] = useState(initialProduct());
   
    const inputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }


    const classes = useStyles();
    const [active, setActive] = useState(1);
    const [active_ss_cat, setActiveSousCat] = useState(1);
    const [activeCarte, setActiveCarte] = useState(true);
    const [datas, setDatas] = useState([]);
    // const [sideDishes, setSideDishes] = useState([]);
    const [menuCategories, setMenuCategories] = useState([]);
    const [menuSubCategories, setMenuSubCategories] = useState([]);
    const [dishesDisplayed, setDishesDisplay] = useState(false);
    // Booleans that will only allow the component to render when the requests have returned the datas
    //const [isDataLoading, setDataLoading] = useState(false);
    //const [isCategoryLoading, setCategoryLoading] = useState(false);
    //const [sideDishesLoading, setSideDishesLoading] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [show, setShow] = useState(false);
    const [produit, setProduit] = useState([]);
    // activeCarte && (window.document.body.style.overflow = "hidden")
    activeCarte
        ? (window.document.body.style.overflow = "hidden")
        : (window.document.body.style.overflow = "auto");


        const fetchData = async () => {
        
        //sendrequest("get", "letexan/produit/?accompagnement=true", setSideDishes, setSideDishesLoading);
    
        await axios.get(URL + "parapharmacie/categorie/").then((res) => {
          setMenuCategories(res.data);
          console.log(res.data);
        });

        await axios.get(URL + "parapharmacie/sous_categorie/?categorie=" + active).then((res) => {
            setMenuSubCategories(res.data);
            console.log(res.data);
        });
        
        console.log(" ACTIVE "+ active);
        console.log("ACTIVE SOUS CAT" + active_ss_cat);

        await axios.get(URL + "parapharmacie/produit/?categorie=" + active + "&sous_categorie=" + active_ss_cat).then((res) => {
            setDatas(res.data);
            console.log(res.data);
        })
        .catch( (error) => {
            console.log(error.response);
        });

    };


    useEffect(() => {
        fetchData();
    }, [active, active_ss_cat]);

    const openModal = (data) =>{
       
        setProduit(data);
        while(produit === []){
            //console.log(test);
        }
        
        setShow(true);

    }


    const updateDisponibilite = async (id, disponibilite) => {
        await axios.put(URL + "parapharmacie/produit/" + id +"/", {
            disponibilite: disponibilite,
        });
    };

    /*//Function that will check through if id of the selected menu item matches the one of 'Menu'. If so then we will want to display all of the datas, not just a selection.
    const isMenu = () => {
        for (var i = 0; i < menuCategories.length; i++) {
            if (menuCategories[i].id === active && menuCategories[i].nom === "Menus du Midi") {
                return datas;
            }
        }
    };*/

    const selectDishesPerCategory = () => {
        //var menuDishes = isMenu();
        
            const selectedDishes = datas
                // We filter the data :
                
                //Once filtered, we can go through the selection to display them
                .map((data) => {
                    console.log("DATA MAP", data)
                    return (
                        <>
                            <div 
                                style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid rgba(224, 224, 224, 1)"}} 
                            >
                                <div 
                                    style={{width: "100%", margin: 0}} 
                                    onClick={() => openModal(data)}>
                                    <CartePage 
                                        key={data.categorie} 
                                        idMenuPage={data.categorie}
                                        produit={data}
                                        show={show} 
                                        setShow={setShow} 
                                    />
                                    </div>
                                    <div style={{paddingTop: "60px", marginRight: "5%"}}>
                                        <SwitchBtn
                                        val={data.disponibilite}
                                        action={updateDisponibilite}
                                        item={data}
                                        />
                                    </div>
                            </div>

                            <AddProductModal 
                                {...produit} 
                                productToUpdate={produit} 
                                categorieId={active}
                                sous_categorieId={active_ss_cat}
                                show={show} 
                                setShow={setShow} ></AddProductModal>

                            
                        </>
                    );
                });
            return selectedDishes;
        
    };

   

    
    return (
        <div className='commander__'>
            <div style={{ textAlign: 'center', width: "100%" }}>

            
                <FormControl >
                    <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    size="small"
                    value={active}
                    onChange={(e)=>{
                        setActive(e.target.value);
                        setActiveCarte(false);
                        setDishesDisplay(false);
                    }}
                    
                    >
                        
                        {menuCategories.map(categorie=>{
                                                      
                            return <MenuItem value={categorie.id}>{categorie.nom} </MenuItem>

                        })}

                    </Select>


                </FormControl>
                
                

                <FormControl >
                    <InputLabel id="demo-simple-select-label">Sous-Categorie</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    size="small"
                    value={sous_categorieId}
                    onChange={(e)=>{
                        setActiveSousCat(e.target.value);
                        setActiveCarte(false);
                        setDishesDisplay(false);                        
                    }}
                    >

                        {menuSubCategories.map( (sous_categorie) => {

                            
                                    return <MenuItem value={sous_categorie.id}> {sous_categorie.nom} </MenuItem>
                                

                            
                            
                        })}
                    </Select>

                </FormControl>

            
                <Button id="ajouter_produit" onClick={() => setShowProductModal(true)} > Ajouter Produit</Button>
                <AddProductModal categorieId={active} sous_categorieId={active} show={showProductModal} setShow={setShowProductModal} ></AddProductModal>
            </div>

            {proprietes.map((prop) => (
                  <TableCell key={prop} className={classes.heading} align='center'>
                    {prop}
                  </TableCell>
            ))}

            <div className='commander__container'>
            
                <>
                        

                    <div className='commander__container__cards'>
                        {datas.length > 0 ? 
                // We filter the data :
                
                //Once filtered, we can go through the selection to display them
                datas.map((data) => {
                    console.log("DATA MAP", data);
                    if(data.categorie === active && data.sous_categorie === active_ss_cat) {

                    
                    
                    return (
                        <>
                            <div 
                                style={{width: "100%", display: "flex", flexDirection: "row", borderBottom: "1px solid rgba(224, 224, 224, 1)"}} 
                            >
                                <div 
                                    style={{width: "100%", margin: 0}} 
                                    onClick={() => openModal(data)}>
                                    <CartePage 
                                        key={data.categorie} 
                                        idMenuPage={data.categorie}
                                        produit={data}
                                        show={show} 
                                        setShow={setShow} 
                                    />
                                    </div>
                                    <div style={{paddingTop: "60px", marginRight: "5%"}}>
                                        <SwitchBtn
                                        val={data.disponibilite}
                                        action={updateDisponibilite}
                                        item={data}
                                        />
                                    </div>
                            </div>

                            <AddProductModal 
                                {...produit} 
                                productToUpdate={produit} 
                                categorieId={active}
                                sous_categorieId={active_ss_cat}
                                show={show} 
                                setShow={setShow} ></AddProductModal>

                            
                        </>
                    );
                } } 
                ) 
                : null}
                    </div>

 
                       
                </>
      
            </div>
        </div>
    );
};

