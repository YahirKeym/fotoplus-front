import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState, useRef } from "react";
// import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
// import SwiperComponent from "react-id-swiper";
import { Swiper, Controller } from 'swiper/js/swiper.esm';
import ImageGallery from 'react-image-gallery';

const ProductImageGallery = ({ product, imageSelected, setProductColor }) => {
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

  // swiper slider settings
  const gallerySwiperParams = {
    Swiper,
    modules: [Controller],
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    Swiper,
    modules: [Controller],
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

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
      setProductColor(color);
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

        {/*  <LightgalleryProvider>*/}
      {/*    <SwiperComponent {...gallerySwiperParams} ref={gallerySwiperRef}>*/}
      {/*      {product.image &&*/}
      {/*        product.image.map((single, key) => {*/}
      {/*          return (*/}
      {/*            <div key={key}>*/}
		{/*			  {imageSelected.length > 0 && (*/}
		{/*				<>*/}
		{/*					<LightgalleryItem*/}
		{/*					group="any"*/}
		{/*					src={process.env.PUBLIC_URL + imageSelected}*/}
		{/*					>*/}
		{/*						<button>*/}
		{/*							<i className="pe-7s-expand1"></i>*/}
		{/*						</button>*/}
		{/*					</LightgalleryItem>*/}
		{/*					<div className="single-image">*/}
		{/*						<img*/}
		{/*							src={process.env.PUBLIC_URL + imageSelected}*/}
		{/*							className="img-fluid"*/}
		{/*							alt=""*/}
		{/*						/>*/}
		{/*					</div>*/}
		{/*				</>  */}
		{/*			  )}*/}
		{/*			  {imageSelected.length === 0 && (*/}
		{/*				<>*/}
		{/*					<LightgalleryItem*/}
		{/*						group="any"*/}
		{/*						src={process.env.PUBLIC_URL + single}*/}
		{/*					>*/}
		{/*						<button>*/}
		{/*							<i className="pe-7s-expand1"></i>*/}
		{/*						</button>*/}
		{/*					</LightgalleryItem>*/}
		{/*					<div className="single-image">*/}
		{/*						<img*/}
		{/*							src={process.env.PUBLIC_URL + single}*/}
		{/*							className="img-fluid"*/}
		{/*							alt=""*/}
		{/*						/>*/}
		{/*					</div>*/}
		{/*				</>*/}
		{/*			  )}*/}
      {/*            </div>*/}
      {/*          );*/}
      {/*        })}*/}
      {/*    </SwiperComponent>*/}
      {/*  </LightgalleryProvider>*/}
      {/*</div>*/}
      {/*<div className="product-small-image-wrapper mt-15">*/}
      {/*  <SwiperComponent {...thumbnailSwiperParams} ref={thumbnailSwiperRef} >*/}
      {/*    {product.image &&*/}
      {/*      product.image.map((single, key) => {*/}
      {/*        return (*/}
      {/*              <img*/}
      {/*                  key={key}*/}
      {/*                src={process.env.PUBLIC_URL + single}*/}
      {/*                className="img-fluid single-image"*/}
      {/*                alt=""*/}
      {/*              />*/}
      {/*        );*/}
      {/*      })}*/}
      {/*  </SwiperComponent>*/}
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object,
    setProductColor: PropTypes.func,
};

export default ProductImageGallery;
