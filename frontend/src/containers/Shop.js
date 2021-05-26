import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { loadProducts } from '../actions/products';

const Shop = ({ loadProducts, products }) => {
    useEffect(() => {
        loadProducts();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <NavigationBar />

            <section className="product">
                <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-lg-5 m-auto text-center">
                            <h1>Featured Products</h1>
                            <h6 style={{color: "rgb(71, 81, 44)"}}>What's hot and new right now!</h6>
                        </div>
                    </div>
                    <div className="row">
                        {
                            products 
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
                                        <a href={'/products/'+product.slug} className="card-link">View</a>
                                        <a href={'/products/'+product.slug} className="card-link">Add to Cart</a>
                                    </div>
                                );
                            }))
                            : (
                                <div className="col-lg-3 text-center">
                                    <p>Loading products...</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = state => ({
    products: state.products.products
});

export default connect(mapStateToProps, { loadProducts })(Shop);