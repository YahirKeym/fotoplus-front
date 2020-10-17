import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h5>¿ Quienes somos?</h5>
          <h1>Fotoplus</h1>
          <p>
          Toda una vida dedicada a la industria de la fotografía, donde, mas que vender productos o dar servicios, les brindamos a los clientes una forma tangible de recordar, recordar aquel momento especial, el cual no volverá a suceder nunca más: el 1er año de un hijo, el orgullo de un padre, las lagrimas de la madre de la novia, y muchas otras experiencias inolvidables. 
El gran talento humano que trabaja en Fotoplus sabe de lo especial que será, no ahora, si no en muchos años. Vive, imprime y recuerda.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
