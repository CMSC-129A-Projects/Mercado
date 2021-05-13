import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { getProduct } from '../actions/products';

const Product = ({ match, getProduct, product }) => {
    useEffect(() => {
        const id = match.params.id;

        getProduct(id);
    }, []);

    return (
        <>
            <NavigationBar />

            <div className="card mb-3">
                <img src="images/goods1.jpg" className="card-img-top" alt="Market goods" />
                <div className="card-body">
                    <h5 className="card-title">{product && product.name}</h5>
                    <p className="card-text">{product && product.desc}</p>
                    <p className="card-text"><small className="text-muted">{product && product.created_at}</small></p>
                    <a href="#" className="card-link">Add to Cart</a>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    product: state.products.product
});

export default connect(mapStateToProps, { getProduct })(Product);