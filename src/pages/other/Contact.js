import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import LocationMap from "../../components/contact/LocationMap";

const Contact = ({ location }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Fotoplus| Contacto</title>
        <meta
          name="description"
          content="Fotoplus - La vida es para imprimirla.."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Inicio</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Contacto
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <LocationMap latitude="-12.106423" longitude="-77.040448" />
            </div>
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                    <p>Celular Dasso: (51) 981-325325</p>
                      <p>Celular C.C El Polo: (51) 981-325204</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                      <a href="mailto:dasso@fotoplus.pe">dasso@fotoplus.pe</a>
                      </p>
                      <p>
                        <a href="//fotoplus.pe">www.fotoplus.pe</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                    <p>Miguel Dasso 138, San Isidro, Lima – PERU </p>
                      <p>Av el Polo cdra.6 - C.C. El Polo - B-121, Lima – PERU</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Siguenos</h3>
                    <ul>
                      <li>
                        <a href="//www.facebook.com/fotoplusperu" target="_blank">
                          <i className="fa fa-facebook" />
                          
                        </a>
                      </li>
                      <li>
                        <a href="//www.instagram.com/fotoplus.peru" target="_blank">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                  <h2>Pongamonos en contacto</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                      <input name="name" placeholder="Nombre*" type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Asunto*"
                          type="text"
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Mensaje*"
                          defaultValue={""}
                        />
                        <button className="submit" type="submit">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
