import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import BannerOne from "../../wrappers/banner/BannerOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import TabProductFive from "../../wrappers/product/TabProductFive";
import CustomImage from "../../assets/image.png";

const HomeFashionTwo = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Fotoplus</title>
        <meta
          name="description"
          content="Fotoplus - La vida es para imprimirla"
        />
      </MetaTags>
      <LayoutOne
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderNine />
        {/* banner */}
        <BannerOne spaceTopClass="pt-60" spaceBottomClass="pb-65" />
        {/* tab product */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
