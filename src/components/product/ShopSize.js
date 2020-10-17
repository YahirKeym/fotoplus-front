import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopSize = ({ sizes, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">Tamaño </h4>
      <div className="sidebar-widget-list mt-20">
        {sizes ? (
          	<select defaultValue="" onChange={({target})=>{getSortParams("size", target.value);}}>
				<option value=''>Todos los Tamaños{" "}</option>
				{sizes.map((size,key)=>{
          if(size === '10x15' || size === '11.5x15' || size === '13x18' || size ==='7x10' 
          || size === '9X13' || size === '15X15' ||size === '20x25' || size === '15x20' || size === '20x20' || size === '20X30'
          || size === '21X29' || size === '30x30' || size === '30X40' || size === '30x45' || size === '40x50' || size === '50x60' || size === '50x70'){
            return <option key={key} value={size}>{size}</option>
          }
          })}
			</select>
        //   <ul>
        //     <li>
        //       <div className="sidebar-widget-list-left">
        //         <button
        //           onClick={e => {
        //             getSortParams("size", "");
        //             setActiveSort(e);
        //           }}
        //         >
        //           <span className="checkmark" /> Todos los Tamaños{" "}
        //         </button>
        //       </div>
        //     </li>
        //     {sizes.map((size, key) => {
        //       return (
        //         <li key={key}>
        //           <div className="sidebar-widget-list-left">
        //             <button
        //               className="text-uppercase"
        //               onClick={e => {
        //                 getSortParams("size", size);
        //                 setActiveSort(e);
        //               }}
        //             >
        //               {" "}
        //               <span className="checkmark" />
        //               {size}{" "}
        //             </button>
        //           </div>
        //         </li>
        //       );
        //     })}
        //   </ul>
        ) : (
          "No se encontraron tamaños"
        )}
      </div>
    </div>
  );
};

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array
};

export default ShopSize;
