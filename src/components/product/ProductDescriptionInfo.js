import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";

const ProductDescriptionInfo = ({
  setRealPrice,
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
  setImageSelected,
  setDescriptionSelect,
  description,
  setColorSelect,
  colorSelect,
  productColor,
  selectedProductSize,
  setSelectedProductSize
}) => {

  const [selectedProductColor, setSelectedProductColor] = useState(productColor ||
    product.variation ? product.variation[0].color : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);

  React.useEffect(() => {
    setSelectedProductColor(productColor);
  }, [productColor]);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );
    if(description.length === 0){
      setDescriptionSelect(product.shortDescription);
    }
    if(colorSelect.length === 0){
      setColorSelect(product.variation[0].color);
    }

    let counter = 0;
  return (
    <div className="product-details-content ml-70 mt-5">
      <h2>{product.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span>
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>

      <div className="pro-details-list">
        <p>{Number(description) ? product.fullDescription || '' : description || ''} </p>
                  {/*<span>{colorSelect}</span>*/}
      </div>

      {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
					{product.variation.map((single, key) => {
						return (
							// <option value={single.color} sizeName={single.size[0].name} stockProduct={single.size[0].stock}>{single.color}</option>
							<label
              style={{ border: "1px solid #0e0e0e" }}
							className={`pro-details-color-content--single ${single.color}`}
							key={key}
							>
							<input
							type="radio"
							value={single.color}
							name="product-color"
							checked={
								single.color === selectedProductColor ? "checked" : ""
							}
							onChange={() => {
									setImageSelected(single.image)
									setSelectedProductColor(single.color);
                  setColorSelect(single.color)
									setSelectedProductSize(single.size[0].name);
									setProductStock(single.size[0].stock);
                  setQuantityCount(1);
                  setDescriptionSelect(single.size[0].description)
                  setRealPrice(single.size[0].price);
                  setSelectedProductSize(single.size[0].name);

								}}
								/>
							<span className="checkmark"></span>
						</label>
						);
					})}
			{/* </select> */}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Tamaño</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single,key) => {
                  counter = single.color === selectedProductColor ? counter + 1 : counter;
                  return single.color === selectedProductColor && counter < 2
                    ? (<select key={key} onChange={({target})=>{
							setSelectedProductSize(target.value);
							let Stock = document.querySelector(`option[value='${target.value}']`).getAttribute('stock');
              let Price = document.querySelector(`option[value='${target.value}']`).getAttribute('price');
							let description = document.querySelector(`option[value='${target.value}']`).getAttribute('description');
              setDescriptionSelect(description)
							setRealPrice(Price)
							setProductStock(Stock);
							setQuantityCount(1);
						}}>
						{single.size.map((singleSize, key) => {
                        return (
                          <React.Fragment key={key}>
															
							<option value={singleSize.name} price={singleSize.price} description={singleSize.description} stock={singleSize.stock}>{singleSize.name}</option>
                            {/* <label
                              className={`pro-details-size-content--single`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={singleSize.name}
                                checked={
                                  singleSize.name === selectedProductSize
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductSize(singleSize.name);
                                  setProductStock(singleSize.stock);
                                  setQuantityCount(1);
                                }}
                              />
                              <span className="size-name">{singleSize.name}</span>
                            </label> */}
                          </React.Fragment>
                        );
					  })}
					</select>
					  )
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                  )
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Añadir al carro{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => addToCompare(product, addToast)}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}

      	{/* <div className="pro-details-social">
        	<ul>
          		<li>
					<a href="//facebook.com">
						<i className="fa fa-facebook" />
					</a>
          		</li>
				<li>
					<a href="//dribbble.com">
						<i className="fa fa-dribbble" />
					</a>
				</li>
				<li>
					<a href="//pinterest.com">
						<i className="fa fa-pinterest-p" />
					</a>
				</li>
				<li>
					<a href="//twitter.com">
						<i className="fa fa-twitter" />
					</a>
				</li>
				<li>
					<a href="//linkedin.com">
						<i className="fa fa-linkedin" />
					</a>
				</li>
        	</ul>
      	</div> */}
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.object,
  wishlistItem: PropTypes.object,
  productColor: PropTypes.string,
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    }
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);
