import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './creationMenus.css';

import Category from './creationCategorieParapharma';
import Subcategory from './creationSousCategorie';

const CreationMenus = () => {
	const history = useHistory();

	const [ category, setCategory ] = useState(false);
	const [ subcategory, setSubcategory ] = useState(false);
	const [ produit, setProduit ] = useState(false);
	const [ supplements, setSupplements ] = useState(false);

	return (
		<div className='creation_menus'>

			<div className="Menu-parapharma-header">
            	<h1>Création de la parapharmacie</h1>
        	</div>

			<div id="creation_menus_container">
				<button
					className="button Button_creation"
					onClick={() => {
						setCategory(true);
					}}
				>
					Créer une catégorie
				</button>
				{category ? (
					<Category
						close={(bool) => {
							setCategory(bool);
						}}
					/>
				) : null}


				<button
					className="button Button_creation"
					onClick={() => {
						setSubcategory(true);
					}}
				>
					Créer une sous-catégorie
				</button>
				{subcategory ? (
					<Subcategory
						close={(bool) => {
							setSubcategory(bool);
						}}
					/>
				) : null}
				
			</div>

			<div id="creation_menus_container">

				<button
					className="button Button_creation"
					onClick={() => {
						let url = '/admin/produits/parapharmacie';
						history.push(url);
					}}
				>
					Créer un produit
				</button>
				
			</div>

		
		</div>
	);
};

export default CreationMenus;

