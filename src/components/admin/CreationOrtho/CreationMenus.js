import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './creationMenus.css';

import Category from './creationCategorie';

import Supplement from './creationSupplement';

const CreationMenus = () => {
	const history = useHistory();

	const [ category, setCategory ] = useState(false);
	const [ ingredients, setIngredients ] = useState(false);
	const [ produit, setProduit ] = useState(false);
	const [ supplements, setSupplements ] = useState(false);

	return (
		<div className='creation_menus'>
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

