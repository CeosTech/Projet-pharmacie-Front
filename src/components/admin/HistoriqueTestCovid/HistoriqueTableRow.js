import { IconButton, TableCell, TableRow, TableBody } from "@material-ui/core";
import { useState } from "react";
import Modal from "../../MyModal/Modal";

const HistoriqueTableRow = ({ commande }) => {
  const [show, setShow] = useState(false);

  const handleClose = (e) => {
    // console.log(e.target.classList);

    if (
      e.target.classList.contains("myModal__backdrop") ||
      e.target.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.classList.contains("myModal__modal__close-btn") ||
      e.target.parentNode.parentNode.classList.contains(
        "myModal__modal__close-btn"
      )
    ) {
      setShow(false);
    }
  };
  //{/*commande.reference*/}
  console.log(commande);
  return (
    <TableRow>
      {/* {new Date(commande.date_commande).toLocaleString()} */}
      <TableCell>
        {new Date(commande.date_reservation).toLocaleDateString()}
      </TableCell>
      <TableCell align='center'>
        {new Date(commande.date_reservation)
          .toLocaleTimeString()
          .split(":")
          .slice(0, 2)
          .join("h")}
      </TableCell>
      <TableCell align='center'>
        {commande.nom + "." + commande.prenom}
      </TableCell>
      

      
    </TableRow>
  );
};

export default HistoriqueTableRow;
