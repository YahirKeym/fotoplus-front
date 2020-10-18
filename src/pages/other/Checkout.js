import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {deleteAllFromCart} from '../../redux/actions/cartActions.js';
import { useToasts } from "react-toast-notifications";

/**
 * 
 */
let initialData = {
	name:'',
	lastname:'',
	enterprise:'',
	country:'Peru',
	addressExt:'',
	addressInt:'',
	city:'',
	apartament:'',
	postalCode:'',
	phone:'',
	email:'',
	informationPlus:'',
	items:[],
	typeDatos:'Boleta',
	DNI:'',
	Nombre:'',
	RUC:'',
	RazonSocial:''
}
/**
 * 
 * @param {*} param0 
 * @param {*} setDataUser 
 * @param {*} dataUser 
 */
function changeInformation({target:{value,name}},setDataUser =()=>{},dataUser = initialData){
	setDataUser({...dataUser,[name]:value});
}
/**
 * 
 * @param {*} param0 
 */
function sendData(dataUser = initialData,items=[],deleteAllFromCart= ()=>{},addToast=()=>{},setLoading=()=>{} ){
	dataUser.items = items;
	setLoading(true);
	if(dataUser.email.length !== 0){
		let options ={
			method:'POST',
			headers:{
				Accept:'application/json',
				'Content-Type':'application/json'
			},
			body: JSON.stringify(dataUser)
		}
		fetch('https://acquired-device-286721.uc.r.appspot.com/api/shop/checkout',options).then(result=>result.json())
		.then(response=>{
			if(response.status){
				alert("Productos enviados correctamente. Nos pondremos en contacto.");
				addToast("Correo enviado correctamente", { appearance: "success", autoDismiss: true });
				deleteAllFromCart(addToast);
			}else{
				alert("Hubo un error al enviar el correo, intentarlo más tarde.");
				addToast("El correo no se pudo enviar, por favor intentalo más tarde", { appearance: "warning", autoDismiss: true });
			}
			setLoading(false);
		}).catch(err=>{
			addToast("Hubo un error al enviar el correo", { appearance: "warning", autoDismiss: true });
			alert("Hubo un error al enviar los productos")
			setLoading(false);
			console.log(err);
		})
	}else{
		alert("Necesitas ingresar rellenar todos los campos")
		setLoading(false);
	}
}
/**
 * 
 * @param {*} param0 
 */
const Checkout = ({ location, cartItems, currency,deleteAllFromCart }) => {
  	const { pathname } = location;
  	let cartTotalPrice = 0;
	  const [dataUser,setDataUser] = useState(initialData);
	  const [loading,setLoading] = useState(false);
	  const {addToast} = useToasts();
  return (
    <Fragment>
      	<MetaTags>
        	<title>Fotoplus | Comprar</title>
        	<meta
          		name="description"
          		content="Fotoplus - La vida es para imprimirla."
        	/>
      	</MetaTags>
      	<BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Inicio</BreadcrumbsItem>
      	<BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        	Realizar Compra
      	</BreadcrumbsItem>
      	<LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          	<div className="container">
            	{cartItems && cartItems.length >= 1 ? (
              		<div className="row">
                		<div className="col-lg-7">
                  			<div className="billing-info-wrap">
                    			<div className="row">
									<div className="col-12">
                    					<h3>Detalles de Facturación</h3>
									</div>
                      				<div className="col-lg-6 col-md-6">
                        				<div className="billing-info mb-20">
                         					<label>Nombre</label>
                          					<input type="text" name='name' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        				</div>
                      				</div>
                      				<div className="col-lg-6 col-md-6">
                        				<div className="billing-info mb-20">
                          					<label>Apellido</label>
                          					<input type="text" name='lastname' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}} />
                        				</div>
                      				</div>
                      				<div className="col-lg-12">
                        				<div className="billing-select mb-20">
                          					<label>Pais</label>
                          					<p>Perú</p>
                        				</div>
                      				</div>
                      				<div className="col-lg-12">
                        				<div className="billing-info mb-20">
										<label>Dirección</label>
										<input
											className="billing-address"
											name='addressExt'
											onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}
											placeholder="Número de casa y nombre de la calle"
											type="text"
										/>
										<input
											name='addressInt'
											onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}
											placeholder="Apartamento, suite, unidad, etcétera."
											type="text"
										/>
									</div>
                      			</div>
                      			<div className="col-lg-12">
                        			<div className="billing-info mb-20">
										<label>Distrito</label>
										<input type="text" name='city' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        			</div>
                      			</div>
                      			<div className="col-lg-6 col-md-6">
                        			<div className="billing-info mb-20">
										<label>Departamento</label>
										<input type="text" name='apartament' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        			</div>
                      			</div>
                      			<div className="col-lg-6 col-md-6">
                        			<div className="billing-info mb-20">
										<label>Codigo postal</label>
										<input type="text" name='postalCode' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        			</div>
                      			</div>
                      			<div className="col-lg-6 col-md-6">
                        			<div className="billing-info mb-20">
										<label>Teléfono</label>
										<input type="text" name='phone' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        			</div>
                      			</div>
                      			<div className="col-lg-6 col-md-6">
                        			<div className="billing-info mb-20">
										<label>Email</label>
										<input type="text" name='email' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
                        			</div>
                      			</div>
								<div className="col-lg-12 col-md-12">
                        			<div className="billing-select mb-20">
										<select className="billing-info" onChange={({target})=>{changeInformation({target:{name:'typeDatos',value:target.value}},setDataUser,dataUser)}}>
											<option value='Boleta'>Boleta</option>
											<option value='Factura'>Factura</option>
										</select>
                        			</div>
                      			</div>
								{dataUser.typeDatos === 'Boleta' && (
									<React.Fragment>
										<div className="col-lg-6 col-md-6">
											<div className="billing-info mb-20">
												<label>DNI</label>
												<input type="text" name='DNI' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
											</div>
										</div>
										<div className="col-lg-6 col-md-6">
											<div className="billing-info mb-20">
												<label>Nombre</label>
												<input type="text" name='Nombre' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
											</div>
										</div>
									</React.Fragment>
								)}
								{dataUser.typeDatos === 'Factura' && (
									<React.Fragment>
										<div className="col-lg-6 col-md-6">
											<div className="billing-info mb-20">
												<label>RUC</label>
												<input type="text" name='RUC' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
											</div>
										</div>
										<div className="col-lg-6 col-md-6">
											<div className="billing-info mb-20">
												<label>Razón Social</label>
												<input type="text" name='RazonSocial' onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}/>
											</div>
										</div>
									</React.Fragment>
								)}
		                    </div>
                    		<div className="additional-info-wrap">
                      			<h4>Información Adicional</h4>
                      			<div className="additional-info">
                        			<label>Notas adicionales</label>
									<textarea
									onChange={(e)=>{changeInformation(e,setDataUser,dataUser)}}
									placeholder="Notas sobre su pedido, ej. notas especiales para la entrega, cuando se le puede llamar? etc.. "
									name="informationPlus"
									defaultValue={""}
									/>
                      			</div>
                    		</div>
                  		</div>
                	</div>
                	<div className="col-lg-5">
                  		<div className="your-order-area">
                    		<h3>Pedido</h3>
                    		<div className="your-order-wrap gray-bg-4">
                      			<div className="your-order-product-info">
                        			<div className="your-order-top">
										<ul>
											<li>Productos</li>
											<li>Total</li>
										</ul>
                        			</div>
									<div className="your-order-middle">
										<ul>
											{cartItems.map((cartItem, key) => {
												console.log(cartItems)
											const discountedPrice = getDiscountPrice(
												cartItem.price,
												cartItem.discount
											);
											const finalProductPrice = (
												cartItem.price * currency.currencyRate
											).toFixed(2);
											const finalDiscountedPrice = (
												discountedPrice * currency.currencyRate
											).toFixed(2);

											discountedPrice != null
												? (cartTotalPrice +=
													finalDiscountedPrice * cartItem.quantity)
												: (cartTotalPrice +=
													finalProductPrice * cartItem.quantity);
											return (
												<li key={key}>
													<span className="order-middle-left">
														{cartItem.fullDescription} X {cartItem.quantity}
													</span>{" "}
													<span className="order-price">
														{discountedPrice !== null
														? currency.currencySymbol +
															(
															finalDiscountedPrice *
															cartItem.quantity
															).toFixed(2)
														: currency.currencySymbol +
															(
															finalProductPrice * cartItem.quantity
															).toFixed(2)}
													</span>
												</li>
											);
											})}
										</ul>
									</div>
									<div className="your-order-total">
										<ul>
											<li className="order-total">Total</li>
											<li>
											{currency.currencySymbol +
												cartTotalPrice.toFixed(2)}
											</li>
										</ul>
									</div>
                      			</div>
                      			<div className="payment-method"></div>
                    		</div>
                    		<div className="place-order mt-25">
                      			<button className="btn-hover" onClick={()=>{
									  if(!loading){
										  sendData(dataUser,cartItems,deleteAllFromCart,addToast,setLoading)
									  }
								  }}>{!loading && ('Hacer Pedido')}{loading && ('...Enviando')}</button>
                    		</div>
                  		</div>
                	</div>
              	</div>
            	) : (
             	<div className="row">
                	<div className="col-lg-12">
                  		<div className="item-empty-area text-center">
                    		<div className="item-empty-area__icon mb-30">
                      			<i className="pe-7s-cash"></i>
                    		</div>
                    		<div className="item-empty-area__text">
                    			No se encontraron artículos en el carrito para pagar<br />{" "}
                      			<Link to={process.env.PUBLIC_URL + "/shop"}>
                        			Compra Ahora
                      			</Link>
                    		</div>
                  		</div>
                	</div>
              	</div>
            )}
        	</div>
    	</div>
    </LayoutOne>
</Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps,{deleteAllFromCart})(Checkout);
