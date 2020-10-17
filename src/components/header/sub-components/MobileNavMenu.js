import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
let provisionalStrings = {
  home: 'Inicio',
  shop: 'Productos',
  about_us: 'Nosotros',
  contact_us: 'Contactanos'
}

const MobileNavMenu = ({ strings }) => {
  if(strings === undefined){
    strings = provisionalStrings;
  }
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/home"}>
            {strings["home"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            {strings["shop"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
            {strings["about_us"]}
          </Link>
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["contact_us"]}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
