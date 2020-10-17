import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef } from "react";
import ImageGallery from 'react-image-gallery';

const ProductImageGallery = ({ product,setSelectedProductSize, imageSelected, setProductColor,setDescriptionSelect,setRealPrice }) => {
  const gallerySwiperRef = useRef({});
  const thumbnailSwiperRef = useRef({});
  const imageGalleryRef = useRef(null);
  // effect for swiper slider synchronize
  useEffect(() => {
    const thumbnailSwiper = thumbnailSwiperRef.current.swiper || {};
    const gallerySwiper = gallerySwiperRef.current.swiper || {};
    if (
      gallerySwiper.controller &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }

    if ( imageGalleryRef.current) {
      const index = product.image.indexOf(imageSelected);
      index !== -1 && imageGalleryRef.current.slideToIndex(index);
    }
  }, [thumbnailSwiperRef, gallerySwiperRef, imageSelected]);

  const images = product.image.map( img =>
      ({
        original: `${process.env.PUBLIC_URL}${img}`,
        thumbnail: `${process.env.PUBLIC_URL}${img}`,
            thumbnailClass: 'not-border',
      })
  );
  const renderLeftNav = (onClick, disabled) => <i
      style={{
        fontSize: '70px',
        position: 'absolute',
        top: '50%',
        marginTop: '-35px',
        zIndex: 99,
      }}
      className="pe-7s-angle-left"
      onClick={onClick}
  />;

  const renderRightNav = (onClick, disabled) => <i
      style={{
        fontSize: '70px',
        position: 'absolute',
        top: '50%',
        right: 0,
        marginTop: '-35px',
        zIndex: 99,
      }}
      className="pe-7s-angle-right"
      onClick={onClick}
  />;
  const fullScreenStyles = { padding: '15px', color: '#fff', fontSize: '50px' };
  const renderFullscreenButton = (onClick, isFullscreen) => <i
      style={Object.assign({
        right: 10,
        position: 'absolute',
        fontSize: '30px',
        top: 10,
      }, isFullscreen ? fullScreenStyles : {})}
      className={`pe-7s-expand1 ${isFullscreen ? 'active' : ''}`} onClick={onClick} />;
  const onSlide = (index) => {
      const variation = product.variation[index];
      const color = variation ? variation.color : '';
      const description = variation.size[0].description;
      const price = variation.size[0].price;
      const size = variation.size[0].name;
      console.log(variation)
      setRealPrice(price);
      setProductColor(color);
      setDescriptionSelect(description);
      setSelectedProductSize(size)
  }
  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.discount || product.new ? (
          <div className="product-img-badges">
            {product.discount ? (
              <span className="pink">-{product.discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <div>
          <ImageGallery
              items={images}
              ref={imageGalleryRef}
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              renderFullscreenButton={renderFullscreenButton}
              renderPlayPauseButton={() => null}
              onSlide={ onSlide }
          />
        </div>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object,
    setProductColor: PropTypes.func,
};

export default ProductImageGallery;
