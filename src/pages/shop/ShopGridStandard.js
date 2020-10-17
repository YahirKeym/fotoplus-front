import PropTypes from "prop-types";
import React, {Fragment, useState, useEffect} from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import {connect} from "react-redux";
import {getSortedProducts, setActiveSort} from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

function SeleccionDeParametroDeOrden({params: {IdModify}, sortValue}) {
    if (sortValue === IdModify) {
        setActiveSort(IdModify);
    }
    return (<span/>)
}

let paginationExecuted = undefined;

/**
 * Pagína que muestra los productos ya dependiendo de su categoria, su forma, color, tamaño, etc.
 * @param {*} param0
 */
const ShopGridStandard = ({location, products, match: {params}, history}) => {
    const [layout, setLayout] = useState("grid three-column");
    const [sortType, setSortType] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [filterSortType, setFilterSortType] = useState("");
    const [filterSortValue, setFilterSortValue] = useState("");
    const [offset, setOffset] = useState(0);

    let pageId = 1;
    if (params.pageId !== undefined) {
        pageId = params.pageId
    }
    const [currentPage, setCurrentPage] = useState(pageId);

    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const pageLimit = 15;
    const {pathname} = location;

    const getLayout = (layout) => {
        setLayout(layout);
    };

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    };
    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    };
    if (Object.keys(params).length !== 0 && sortValue.length === 0) {
        let {modify, IdModify} = params;
        getSortParams(modify, IdModify)
    }
    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue, params.category);
        const filterSortedProducts = getSortedProducts(
            sortedProducts,
            filterSortType,
            filterSortValue
        );
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, params.category]);
    return (
        <Fragment>
            <MetaTags>
                <title>Fotoplus | Tienda</title>
                <meta
                    name="description"
                    content="Fotoplus - La vida es para imprimirla."
                />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
                Inicio
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Tienda
            </BreadcrumbsItem>

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb/>

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar
                                    products={products}
                                    getSortParams={ async (a, b) => {
                                        if(Number(b.replace('x', ''))) {
                                            if(params.modify === 'category' && !Number(params.IdModify.replace('x', ''))) {
                                                const category = params.IdModify;
                                                await history.push(`/shop/${a}/${b}/${pageId}/${category}`);
                                            } else {
                                                await history.push(`/shop/${a}/${b}/${pageId}/${params.category}`);
                                            }
                                        } else {
                                            await history.push(`/shop/${a}/${b}/`);
                                        }
                                        getSortParams(a, b)
                                    }}
                                    sideSpaceClass="mr-30"
                                    history={history}
                                    params={params}
                                    sortValue={sortValue}
                                />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar
                                    getLayout={getLayout}
                                    getFilterSortParams={getFilterSortParams}
                                    productCount={products.length}
                                    sortedProductCount={currentData.length}
                                />

                                {/* shop page content default */}
                                <ShopProducts callBackProducClicked={ () => paginationExecuted = undefined } layout={layout} products={currentData} currentPage={currentPage}/>

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={Number(currentPage)}
                                        setCurrentPage={(page) => {
                                            window.scrollTo(0, 0);
                                            if (paginationExecuted) {
                                                setCurrentPage(page);
                                                if (params.IdModify) {
                                                    history.push(`/shop/category/${params.IdModify}/${page}/${params.category || ''}`)
                                                } else {
                                                    history.push(`/shop/${page}`);
                                                }
                                            } else if (paginationExecuted === undefined) {
                                                paginationExecuted = false;
                                            } else if (paginationExecuted === false) {
                                                paginationExecuted = true;
                                            }
                                        }}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                    <SeleccionDeParametroDeOrden params={params} sortValue={sortValue}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
    };
};

export default connect(mapStateToProps)(ShopGridStandard);
