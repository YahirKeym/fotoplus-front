import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categorias</h4>
      <div className="sidebar-widget-tag mt-30">
        {categories ? (
			<React.Fragment>
          		<ul>
				  {categories.map((category,key)=> {
					  return (  
					  	<li key={key}>
							<button 
							  onClick={async e => {
							      const element = {...e};
								await getSortParams("category", category);
								setTimeout( () => setActiveSort(element), 100);
							}}
							>
								{category}
							</button>
						</li>  
						)})}
					</ul>
				{/* <div className="shop-select">
					<select defaultValue="" onChange={({target})=>{getSortParams("category", target.value);}}>
						<option value=''>Todas las categorias</option>
						{categories.map((category,key)=> <option key={key} value={category}>{category}</option>)}
					</select>
				</div> */}
				{/* <ul>
					<li>
					<div className="sidebar-widget-list-left">
						<button
						onClick={e => {
							history.push('/shop')
							getSortParams("category", "");
							setActiveSort(e);
						}}
						>
						<span className="checkmark" /> Todas las Categorias
						</button>
					</div>
					</li>
					{categories.map((category, key) => {
					return (
						<li key={key}>
						<div className="sidebar-widget-list-left">
							<button
							id={category}
							onClick={e => {
								getSortParams("category", category);
								setActiveSort(e);
							}}
							>
							{" "}
							<span className="checkmark" /> {category}{" "}
							</button>
						</div>
						</li>
					);
					})}
				</ul> */}
			</React.Fragment>
        ) : (
          "No se encontraron categorias"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
