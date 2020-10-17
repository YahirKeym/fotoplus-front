import PropTypes from "prop-types";
import React from "react";
import {Link} from "react-router-dom";

const BannerOneSingle = ({data, spaceBottomClass}) => {
    return (
        <div className="col-lg-4 col-md-4">
            <Link to={process.env.PUBLIC_URL + data.link}>

                <div
                    className={`single-banner ${spaceBottomClass ? spaceBottomClass : ""}`}
                >
                    <img src={process.env.PUBLIC_URL + data.image} alt=""/>
                    <div className="banner-content">
                        <h3>{data.title}</h3>
                        <h4>
                            {data.subtitle} <span>{data.price}</span>
                        </h4>
                        <Link to={process.env.PUBLIC_URL + data.link}>
                            <i className="fa fa-long-arrow-right"/>
                        </Link>
                    </div>
                </div>
            </Link>

        </div>
    );
};

BannerOneSingle.propTypes = {
    data: PropTypes.object,
    spaceBottomClass: PropTypes.string
};

export default BannerOneSingle;
