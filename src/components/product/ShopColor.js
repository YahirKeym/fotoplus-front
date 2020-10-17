import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopColor = ({ colors, getSortParams }) => {
  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          // <div className="shop-select">
          //   <select defaultValue="" onChange={({target})=>{getSortParams("color", target.value);}}>
          //     	<option value=''>Todos los colores{" "}</option>
          //     	{colors.map((color,key)=> {
          //         if(color === 'Rojo' || color ==="Azul" || color === "Negro" || color === "Blanco" || color === "Amarillo" || color === "Verde" || color==="Marron"){   
          //           return <option key={key} value={color}>{color}</option>
          //         }
          //         return;
          //       }
          //         )}
          //   </select>
				  // </div>
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("color", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> Todos los colores{" "}
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
                  if(color === 'Rojo' || color === 'Turquesa' || color === 'Beige' || color === 'Caoba' || color === 'Crema' || color === 'MarronClaro' || color === 'Madera' || color ==="Azul" || color === "Negro" || color === "Blanco" || color === "Amarillo" || color === "Verde" || color==="Marron"){   
                      return (
                        <li key={key}>
                          <div className="sidebar-widget-list-left">
                            <button
                              onClick={e => {
                                getSortParams("color", color);
                                setActiveSort(e);
                              }}
                            >
                              <span className="checkmark" /> {color}{" "}
                            </button>
                          </div>
                        </li>
                      );
                    }
                    return;
            })}
          </ul>
        ) : (
          "No se encontraron colores"
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopColor;
