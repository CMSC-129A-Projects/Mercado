import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { loadProducts } from '../actions/products';
import goods1 from '../images/goods1.jpg';

const Home = ({ isAuthenticated, loadProducts, products }) => {

    useEffect(() => {
        loadProducts();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <NavigationBar />

            <div className="container mt-2">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        products
                        ? (products.map((value, index) => {
                            return (
                                <div className="col mb-2" key={index}>
                                    <div className="card h-100">
                                        <img src={goods1} className="card-img-top" alt="Market goods" />
                                        <div className="card-body">
                                            <h5 className="card-title">{value.name}</h5>
                                            {
                                                value.disc_price === 0
                                                ? <h6 className="card-subtitle mb-2 text-muted">Php {value.price}</h6>
                                                : <h6 className="card-subtitle mb-2 text-muted">Php <strike>{value.price}</strike> {value.disc_price}</h6>
                                            }
                                            <p className="card-text">{value.desc}</p>
                                            <a href={'/product/' + value.id} className="card-link">View</a>
                                            <a href="#" className="card-link">Add to Cart</a>
                                        </div>
                                        <div className="card-footer text-muted">
                                            <small>
                                                Tags: { value.categories && Object.values(value.categories).join(", ") }
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                );
                            })
                        )
                        : (
                            <div className="container">
                                <p>No products for sale.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    products: state.products.products
});

export default connect(mapStateToProps, { loadProducts })(Home);