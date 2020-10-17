import PropTypes from "prop-types";
import React from "react";
import bannerData from "../../data/banner/banner-one.json";
import BannerOneSingle from "../../components/banner/BannerOneSingle.js";

const BannerOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`banner-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          {bannerData &&
            bannerData.map((single, key) => {
              return (
                <BannerOneSingle
                  data={single}
                  key={key}
                  spaceBottomClass="mb-30"
                />
              );
            })}
            <div className="col-12 row d-flex justify-content-center align-items-center">
              <div className="col-6 d-flex justify-content-center align-items-center">
                <img style={{width:`70%`}} src={`${process.env.PUBLIC_URL}/assets/img/banner/marcos.gif`}/> 
              </div>              
            </div>
        </div>
      </div>
    </div>
  );
};

BannerOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerOne;
