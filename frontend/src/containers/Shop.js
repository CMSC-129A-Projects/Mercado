import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { loadProducts } from '../actions/products'

const Shop = ({ match, loadProducts, products }) => {
    useEffect(() => {
        loadProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [category, setCategory] = useState(match.params.category)

    return (
        <>
            <NavigationBar pageType="authenticated" />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 p-0 border-end" style={{ backgroundColor: "#eceee6"}}>
                        <ul className="nav nav-pills text-center flex-column px-1 min-vh-100 text-white" style={{ backgroundColor: "#eceee6"}}>
                            <h4 className="mt-3 mb-5" style={{ color: "#beb7a3" }}>CATEGORY</h4>
                                <a className="nav-link active" href="/products/veggies">Veggies</a>
                            <li className="nav-item">
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products/fruits">Fruits</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products/meat,+fish,+and+poultry">Meat, Fish, and Poultry</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products/homemade+goods">Homemade Goods</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products/plants+and+flowers">Plants and Flowers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col py-3">
                        {
                            products && products.products
                            ? (products.map((product, key) => {
                                return (
                                    <div className="col-lg-3 text-center" key={product.id}>
                                        <div className="card border-0 mb-3 bg-light">
                                            <div className="card-body">
                                                <img src={product.image} className="img fluid" alt="" style={{ maxHeight: "200px", width: "auto" }} />
                                            </div>
                                        </div>
                                        <h5>{product.name}</h5>
                                        <p>Php {product.price}</p>
                                        <a href={`/products/product/${product.slug}`} className="card-link">View</a>
                                        <a href={`/products/product/${product.slug}`} className="card-link">Add to Cart</a>
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
                    <div className="col">
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li className="page-item disabled">
                                <span className="page-link">Previous</span>
                                </li>
                                <li className="page-item"><a className="page-link" href={`/products/${category}?page=1`}>1</a></li>
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
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    products: state.products.products
})

export default connect(mapStateToProps, { loadProducts })(Shop)