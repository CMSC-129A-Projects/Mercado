import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/home.css'

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { loadProducts } from '../actions/products';

const Home = ({ loadProducts, isAuthenticated, isLoading, user, products }) => {
    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Check if user is authenticated.
    if (isAuthenticated !== null && !isAuthenticated)
        return <Redirect to="/login" />;

    // Check if user is done with profile Setup. 
    // Address should have locality if setup is done. 
    if (user !== null && user.user_address.locality === '')
        return <Redirect to="/profile/setuplocation" />;

    return isLoading
    ? (<Fragment>Loading...</Fragment>)
    : (
        <Fragment>
            <NavigationBar />

            <div className="container">
                <section className="showcase">
                    <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-lg-7 pt-5 text-center">
                            <h1>THE</h1>
                            <h1> FRESHEST</h1>
                            <h5>and the best deals in your locality!</h5>
                            <Link to='/'><button type="button" className="showcase-btn-1 mt-3">LEARN MORE</button></Link>
                            <Link to='/browse/all'><button type="button" className="showcase-btn-2 mt-3">SHOP NOW</button></Link>
                        </div>
                    </div>
                    </div>
                </section>

                <section className="categories">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                        <div className="col-lg-2 text-center">
                            <Link to="/browse/veggies">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                        <img src="/images/veg.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Veggies</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/browse/fruits">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/fruit.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Fruits</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/browse/meat,+fish+,+and+poultry">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/meat.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Meat, Fish, and Poultry</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/browse/homemade+goods">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/goods.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Homemade Goods</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/browse/plants+and+flowers">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/plant.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
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
                                ? (products.map((product) => {
                                    return (
                                        <div className="col-md-3" key={product.id}>
                                            <div className="card" style={{ backgroundColor: "#beb7a3" }}>
                                                <img src={product.image} className="card-img-top" alt={product.name} height="30" />
                                                <div className="card-body">
                                                    <a 
                                                        className="stretched-link" 
                                                        href={'/product/'+product.slug}
                                                    >
                                                        <p className="card-title">{product.name}</p>
                                                    </a>
                                                    <h5 className="card-text"> PHP {product.price} </h5>
                                                    <span>
                                                        <small className="card-text">
                                                            {
                                                                product.review_count + ' review' +
                                                                (
                                                                    product.review_count
                                                                    ? 's'
                                                                    : ''
                                                                )
                                                            }
                                                            <span> ({product.average_rating}/5)</span>
                                                        </small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }))
                                : (
                                    <div className="col">
                                        <p>No featured products.</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className="row text-center mt-5">
                            <div className="col">
                                <Link to="/browse/all">
                                    <button type="button" className="btn btn-primary">
                                        Browse Store
                                    </button>
                                </Link>
                            </div>
                        </div>                            
                    </div>
                </section>
            </div>

            <Footer />
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    products: state.products.products
});

export default connect(mapStateToProps, { loadProducts })(Home);