import PropTypes from "prop-types";
import React from "react";
import SubscribeEmail from "../../components/newsletter/SubscribeEmail";

const Newsletter = ({
  bgColorClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass
}) => {
  return (
    <div
      className={`subscribe-area ${bgColorClass ? bgColorClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      } ${spaceLeftClass ? spaceLeftClass : ""}  ${
        spaceRightClass ? spaceRightClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 ml-auto mr-auto">
            <div className="subscribe-style-2 text-center">
              <h2>Subscribete </h2>
              <p>Subscribe to our newsletter to receive news on update</p>
              {/* subscription form */}
              <SubscribeEmail mailchimpUrl="//site.us4.list-manage.com/subscribe/post?u=e1de9c7e9e560db2817b755d1&amp;id=c330c475b1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  bgColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default Newsletter;
