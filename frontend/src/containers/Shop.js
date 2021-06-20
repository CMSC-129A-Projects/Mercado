import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { loadProducts } from '../actions/products'

const Shop = ({ match, loadProducts, user, products }) => {
    useEffect(() => {
        let queryDict = {}
        window.location.search.substr(1)
            .split("&")
            .forEach(function(item) {
                queryDict[item.split("=")[0]] = item.split("=")[1]
            })
        
        let url = Object.entries(queryDict).map(([key, val]) => `${key}=${val}`).join('&')

        loadProducts(queryDict)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    return (
        <>
            <NavigationBar pageType="authenticated" />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 p-0 border-end" style={{ backgroundColor: "#eceee6"}}>
                        <ul className="nav nav-pills text-center flex-column px-1 min-vh-100 text-white" id="menu" style={{ backgroundColor: "#eceee6"}}>
                            <h4 className="mt-3 mb-5" style={{ color: "#beb7a3" }}>CATEGORY</h4>
                            <li className="nav-item">
                                <a className="nav-link" href="/products/all">All</a>
                            </li>
                            <li>
                                <a href="#categories" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                    <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Category</span></a>
                                <ul className="collapse nav flex-column ms-1" id="categories" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Veggies</span></a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Fruits</span></a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Meat, Fish, and Poultry</span></a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Homemade Goods</span></a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Plants and Flowers</span></a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col py-3 mx-5">
                        <div className="row">
                            {
                                products
                                ? (products.results.map((product) => {
                                    return (
                                        <div className="col-3 py-3 px-1 text-center" key={product.id}>
                                            <div className="card border-0">
                                                <img src={`${product.image}`} className="card-img-top" alt={product.name} />
                                                <div className="card-body py-1">
                                                    <a href={`/products/product/${product.slug}`} className="stretched-link">
                                                        <h6 className="card-title text-truncate">{product.name}</h6>
                                                        <h6 className="card-title text-truncate">
                                                            {
                                                                product.disc_price > 0
                                                                ? (
                                                                    <>
                                                                        <span className="text-decoration-line-through">₱{product.price}</span>
                                                                        <span> {product.disc_price}</span>
                                                                    </>
                                                                ) : '₱'+product.price
                                                            }
                                                        </h6>
                                                    </a>
                                                </div>
                                                <div className="card-footer my-0 py-0">
                                                    <small className="card-text my-0 py-0">{product.review_count} reviews
                                                        {
                                                            (product.review_count > 0)
                                                            && (<span> ({product.average_rating}/5)</span>)
                                                        }
                                                    </small>
                                                    {/* <span className="card-text"> {product.sold_count} sold</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }))
                                : (
                                    <div className="col text-center">
                                        <p>No products available</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row">
                            <div className="col">
                                <nav aria-label="Pagination">
                                    <ul className="pagination pagination-sm justify-content-center">
                                        <li className="page-item disabled">
                                        <span className="page-link">Previous</span>
                                        </li>
                                        <li className="page-item"><a className="page-link" href={`/products/category?page=1`}>1</a></li>
                                        <li className="page-item active" aria-current="page">
                                        <span className="page-link">2</span>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    products: state.products.products
})

export default connect(mapStateToProps, { loadProducts })(Shop)