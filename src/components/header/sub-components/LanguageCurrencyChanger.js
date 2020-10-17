import PropTypes from "prop-types";
import React from "react";

const LanguageCurrencyChanger = ({ setCurrency, dispatch }) => {
  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency">
        <p style={{ padding: "15px" }}>Llámanos +51 981-325325</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default LanguageCurrencyChanger;
