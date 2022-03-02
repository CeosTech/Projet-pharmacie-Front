import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";

import Alert from "../../alert_message/Alert";
import ExpandedIcon from "./ExpandedIcon";
import { URL } from "../../../middlewares/request";
import "./Offre.css";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightMedium,
    color: "#04295D",
    width: "20%",
  },
  table: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  accordion: {
    marginTop: "30px",
    position: "relative",
  },
  p: {
    fontWeight: "bold",
    margin: 0,
    width: "20%",
  },
}));

const Offre = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(props.id);
  const [expanded, setExpanded] = useState(false);
  const [newImage, setNewImage] = useState(null); // File
  const [imgName, setImgName] = useState("Aucun image choisi"); // File name

  /* ERRORS */
  const [error, setError] = useState({ check: false, msg: "" });
  const [trash, setTrash] = useState({ bool: false, index: null });
  const [modify, setModify] = useState(false);

  // Close or open the accordeon
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Handle image selection
  const handleImage = (event) => {
    console.log(id);
    const fileUploaded = event.target.files[0];
    if (fileUploaded !== undefined) {
      setNewImage(fileUploaded);
      setImgName(event.target.files[0].name);
    }
  };

  // Send all changes
  async function sendChanges() {
    let form_data = new FormData();
    form_data.append("id", props.id);
    form_data.append("titre", props.titre);
    form_data.append("image", newImage, imgName);
    if (newImage !== null) {
      await axios
        .put(URL + "restaurant/offres/" + props.id, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          window.location.reload(false);
        })
        .catch((error) => {
          console.log("======================================");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
    } else {
      console.log("NOPE")
      setError({check: true, msg: "Veuillez choisir une image"})
    }
  }

  // Delete a category
  async function deleteValue(index) {
    await axios.delete(URL + "restaurant/offres/" + props.id).then(() => {
      window.location.reload(false);
    });
  }

  // Check if the user confirms his modifications
  function callBackModify(bool) {
    if (bool) {
      sendChanges();
    }
    setModify(false);
  }

  // Check if user confirms the deletion
  function callBackTrash(bool) {
    if (bool) {
      deleteValue(trash.index);
    }
    setTrash(false);
  }

  useEffect(() => {
    console.log("L'identifiant " + id);
  }, []);

  return (
    <Accordion
      className={classes.accordion}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{
          borderBottom: "2px solid #EBEDF7",
        }}
      >
        <h4>{props.titre}</h4>

        <ExpandedIcon expanded={expanded} setExpanded={setExpanded} />
      </AccordionSummary>

      <AccordionDetails>
        <div className="offre__container" id={props.id}>
          <h1>{props.titre}</h1>
          <img src={props.image} alt={props.titre} />

          <div>
            <input
              id={"file-upload" + id}
              type="file"
              onChange={handleImage}
              hidden
            />
            <label for={"file-upload" + id} className="offre__upload_image">
              <i class="fas fa-cloud-upload-alt"></i> Télécharger votre image
            </label>
            <span id="file-chosen">{imgName}</span>
          </div>

          {error.check ? <p style={{ color: "red" }}>{error.msg}</p> : null}
          <button
            className="button_inside"
            type="submit"
            disabled={newImage !== null ? false : true}
            onClick={() => {
              setModify(true);
            }}
          >
            Modifier
          </button>
          {modify ? (
            <Alert parentCallback={callBackModify} nom="modifier" />
          ) : null}
          {trash.bool ? (
            <Alert parentCallback={callBackTrash} nom="supprimer" />
          ) : null}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Offre;
