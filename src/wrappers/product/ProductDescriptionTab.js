import PropTypes from "prop-types";
import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({ spaceBottomClass, product, descriptionSelect }) => {
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
					Información adicional
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Descripción</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Variaciones:</span>
					  {product.variation.map((variacion,key)=>{
						  return(<div key={key}>
							  	<span>Color</span>: {variacion.color}
							  	{/*{variacion.size.map((size,key)=>{*/}
								{/*	  return(*/}
								{/*		  	<div>*/}
								{/*				  <span>Tamaño:</span> {size.name}*/}
								{/*			</div>*/}
								{/*	  )*/}
								{/*  })}*/}
						  </div>)
					  })}
                    </li>
                    <li>
                      <span>Material</span> {product.Tipo}
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              	<Tab.Pane eventKey="productDescription">
               		<h5><b>Nombre del producto: </b></h5> {Number(descriptionSelect) ? product.fullDescription : descriptionSelect}
					<h5><b>Capacidad:</b></h5>
					{product.Capacidad}
					<h5><b>Código de producto:</b></h5>
					{product.Codigo}
              	</Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default ProductDescriptionTab;
