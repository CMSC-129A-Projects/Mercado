import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { loadProducts } from '../actions/products';

const Home = ({ loadProducts, products }) => {
    useEffect(() => {
        loadProducts();
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <NavigationBar />

            <section className="showcase">
                <div className="container py-5">
                <div className="row py-5">
                    <div className="col-lg-7 pt-5 text-center">
                        <h1>THE</h1>
                        <h1> FRESHEST</h1>
                        <h5>and the best deals in your locality!</h5>
                        <button className="showcase-btn-1 mt-3">LEARN MORE</button>
                        <button className="showcase-btn-2 mt-3">SHOP NOW</button>
                    </div>
                </div>
                </div>
            </section>

            <section className="categories">
                <div className="container py-5">
                    <div className="row justify-content-center">
                    <div className="col-lg-2 text-center">
                        <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                            <div className="card-body">
                            <img src="/images/veg.png" className="img fluid" alt="" />
                            </div>
                        </div>
                        <h6>Veggies</h6>
                    </div>
                    <div className="col-lg-2 text-center">
                        <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                            <div className="card-body">
                            <img src="/images/fruit.png" className="img fluid" alt="" />
                            </div>
                        </div>
                        <h6>Fruits</h6>
                    </div>
                    <div className="col-lg-2 text-center">
                        <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                            <div className="card-body">
                            <img src="/images/meat.png" className="img fluid" alt="" />
                            </div>
                        </div>
                        <h6>Meat, Fish, and Poultry</h6>
                    </div>
                    <div className="col-lg-2 text-center">
                        <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                            <div className="card-body">
                            <img src="/images/goods.png" className="img fluid" alt="" />
                            </div>
                        </div>
                        <h6>Homemade Goods</h6>
                    </div>
                    <div className="col-lg-2 text-center">
                        <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                            <div className="card-body">
                            <img src="/images/plant.png" className="img fluid" alt="" />
                            </div>
                        </div>
                        <h6>Plants and Flowers</h6>
                    </div>
                    </div>
                </div>
            </section>

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
                                                <img src="/images/plant.png" className="img fluid" alt="" />
                                            </div>
                                        </div>
                                        <h6>{product.name}</h6>
                                        <p>Php {product.price} / kilo</p>
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
        </Fragment>
    );
};

const mapStateToProps = state => ({
    products: state.products.products
});

export default connect(mapStateToProps, { loadProducts })(Home);