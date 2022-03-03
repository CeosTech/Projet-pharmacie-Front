import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './creationMenus.css';

import Category from './creationCategorie';


const CreationMenus = () => {
	const history = useHistory();

	const [ category, setCategory ] = useState(false);
	
	const [ produit, setProduit ] = useState(false);


	return (
		<div className='creation_menus'>

			<div className="Menu-ortho-header">
            	<h1>Création du magasin Orthopédie</h1>
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
						let url = '/admin/produits/orthopedie';
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

