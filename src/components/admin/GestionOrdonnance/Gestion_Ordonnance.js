import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Gestion_Ordonnance.css';
import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import ExpandedIcon from '../product/ExpandedIcon';
import axios from 'axios';
import { URL } from '../../../middlewares/request';
import { useHistory } from 'react-router';
import feuille from '../../../images/feuille.png';
const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
		color: 'black',
		width: '20%'
	},
	table: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},

	accordion: {
		marginTop: '30px',
		position: 'relative',
		border: '1px solid gray'
	},
	p: {
		fontWeight: 'bold',
		margin: 0,
		width: '20%',
		color: 'green'
	}
}));

export default function Ordonnance({ article }) {
	const classes = useStyles();
	const [ expanded, setExpanded ] = useState(false);

	const handleEdit = () => {
		history.push({
			pathname: '/admin/editer-article',
			state: { articleToUpdate: article }
		});
	};

	const history = useHistory();

	const val = article.id;

	const deleteData = async () => {
		axios.delete('https://pharmacie-site.herokuapp.com/pharmacie/formulaire-ordonnance/' + val);
		let currentPath = window.location.pathname;
		history.replace(`${currentPath}/replace`);
		setTimeout(() => {
			history.replace(currentPath);
		}, 1000);
	};
  const commande_est_vue = async (id) => {
    await axios.put("http://127.0.0.1:8000/pharmacie/formulaire-ordonnance/" + id + "/", {
      id,
      est_vu: true,
      nom:article.nom,
      prenom: article.prenom,
      telephone: article.telephone,
      email: article.email,
      
    });
  };

	const date_retrait = new Date(article.date_message).toLocaleDateString();

	return (
		<Accordion className={classes.accordion} key={article.id} onChange={(e, expand) => setExpanded(expand), commande_est_vue(article.id)}>
			<AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
				{!expanded ? (
					<div className={classes.table}>
						<p className={classes.p}>{article.nom}</p>
						<p className={classes.p}>{article.prenom}</p>
						<div className={classes.p}>
              <div className='date'>

							<p className={classes.p}>{date_retrait}</p>
							{!article.est_vu && <img className="feuille" src={feuille} alt="" />}
              </div>
						</div>
					</div>
				) : (
					<div />
				)}

				<ExpandedIcon expanded={expanded} setExpanded={setExpanded}  />
			</AccordionSummary>
			<AccordionDetails>
				<div className="article__container">
					<div className="article__photo">
						<img className="photo_fact" src={article.image_ordonnance} alt="" />
					</div>
					<div className="container darker">
						<strong> Nom : </strong> {ReactHtmlParser(article.nom)}
						<strong> Prénom : </strong> {ReactHtmlParser(article.prenom)}
						<strong> Téléphone : </strong> {ReactHtmlParser(article.telephone)}
						<strong> email : </strong> {ReactHtmlParser(article.email)}
						<strong> Date de retrait : </strong> {date_retrait}
						<strong> Message du client : </strong> {ReactHtmlParser(article.message)}
					</div>
					{article.image_ordonnance && (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center'
							}}
						>
							<a
								href={article.image_ordonnance}
								target="_blank"
								rel="noreferrer"
								style={{ marginTop: '1rem' }}
							>
								<i className="fas fa-file-pdf fa-3x" />
							</a>
							<span>télécharger le pdf</span>
						</div>
					)}

					<span style={{ marginTop: '1rem' }}>{new Date(article.date_message).toLocaleTimeString()}</span>

					<div className="article__button">
						{/** ANSWER BUTTON */}
						<button
							className="answer__button"
							onClick={() => {
								handleEdit();
							}}
						>
							Répondre
						</button>

						{/** MODIFY BUTTON */}
						<button
							className="registre__button"
							onClick={() => {
								handleEdit();
							}}
						>
							Modifier
						</button>

						{/** VALIDATION BUTTON */}

						<button
							className="validation__button"
							onClick={() => {
								handleEdit();
							}}
						>
							Confirmer
						</button>

						{/** DELETED BUTTON */}
						<button
							className="supp_button"
							onClick={() => {
								deleteData(article.id);
							}}
						>
							Supprimer
						</button>
					</div>
				</div>
			</AccordionDetails>
		</Accordion>
	);
}
