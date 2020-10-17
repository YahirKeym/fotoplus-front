import PropTypes from "prop-types";
import React from "react";
import SubscribeEmail from "./sub-components/SubscribeEmail";

const FooterNewsletter = ({ spaceBottomClass, spaceLeftClass, sideMenu }) => {
  return (
    <div
      className={`footer-widget ${spaceBottomClass ? spaceBottomClass : ""} ${
        sideMenu ? "ml-ntv5" : spaceLeftClass ? spaceLeftClass : ""
      }`}
    >
      <div className="footer-title">
        <h3>SUBSCRIBETE</h3>
      </div>
      <div className="subscribe-style">
        <p>Reciba actualizaciones por correo electrónico sobre nuestra última tienda y ofertas especiales.</p>
        {/* subscribe email */}
        <SubscribeEmail mailchimpUrl="//site.us4.list-manage.com/subscribe/post?u=e1de9c7e9e560db2817b755d1&amp;id=c330c475b1" />
      </div>
    </div>
  );
};

FooterNewsletter.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string
};

export default FooterNewsletter;
