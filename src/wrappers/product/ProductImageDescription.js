import PropTypes from "prop-types";
import React, {useState} from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductDescriptionInfo from "../../components/product/ProductDescriptionInfo";
import ProductImageGallerySideThumb from "../../components/product/ProductImageGallerySideThumb";
import ProductImageFixed from "../../components/product/ProductImageFixed";
import './css/single-image.css';

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  cartItems,
  wishlistItems,
  compareItems,
                                   descriptionSelect,
                                   setDescriptionSelect,
}) => {
  const wishlistItem = wishlistItems.filter(
    wishlistItem => wishlistItem.id === product.id
  )[0];
  const compareItem = compareItems.filter(
    compareItem => compareItem.id === product.id
  )[0];
  const [realPrice,setRealPrice]=useState(product.price);
  const { addToast } = useToasts();
  const [colorSelect, setColorSelect] = useState('');
	// const [descriptionSelect,setDescriptionSelect] = useState('');
    const [imageSelected,setImageSelected] = useState(''); 
  const discountedPrice = getDiscountPrice(realPrice, product.discount);
  const finalProductPrice = +(realPrice * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  product.price = realPrice
  const [productColor, setProductColor] = useState(product.variation ? product.variation[0].color : "");
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb imageSelected={imageSelected}
                product={product}
                thumbPosition="left"
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb imageSelected={imageSelected} product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed imageSelected={imageSelected} product={product} />
            ) : (
              <ProductImageGallery imageSelected={imageSelected} product={product} setProductColor={setProductColor} />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo
              setRealPrice={setRealPrice}
			  setImageSelected={setImageSelected}
			  setDescriptionSelect={setDescriptionSelect}
			  description={descriptionSelect}
              product={product}
              discountedPrice={discountedPrice}
              currency={currency}
              finalDiscountedPrice={finalDiscountedPrice}
              finalProductPrice={finalProductPrice}
              cartItems={cartItems}
              wishlistItem={wishlistItem}
              compareItem={compareItem}
              addToast={addToast}
              colorSelect={colorSelect}
              setColorSelect={setColorSelect}
              productColor={productColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  cartItems: PropTypes.array,
  compareItems: PropTypes.array,
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  wishlistItems: PropTypes.array
};

const mapStateToProps = state => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
