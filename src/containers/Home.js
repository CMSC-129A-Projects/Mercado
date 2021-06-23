import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/home.css'
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { loadProducts } from '../actions/products';

const Home = ({ isAuthenticated, user, products, loadProducts  }) => {
    useEffect(() => {
        loadProducts('?page=1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // * Check if user is authenticated
    if (user!== null && !isAuthenticated) return <Redirect to="/login" />;

    // Redirects user if user address was not set 
    if (user && !user.is_set) return <Redirect to="/account/location-setup" />;

    return user === null
    ? <>Loading...</>
    : (
        <>
            <NavigationBar pageType="authenticated" />
            <div className="container">
                <section className="showcase">
                    <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-lg-7 pt-5 text-center">
                            <h1>THE</h1>
                            <h1> FRESHEST</h1>
                            <h5>and the best deals in your locality!</h5>
                            <Link to='/'><button type="button" className="showcase-btn-1 mt-3">LEARN MORE</button></Link>
                            <Link to='/products'><button type="button" className="showcase-btn-2 mt-3">SHOP NOW</button></Link>
                        </div>
                    </div>
                    </div>
                </section>
                <section className="categories">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                        <div className="col-lg-2 text-center">
                            <Link to="/products?category__name=veggies&page=1">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                        <img src="/images/veg.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Veggies</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products?category__name=fruits&page=1">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/fruit.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Fruits</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products?category__name=meat,+fish+,+and+poultry&page=1">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/meat.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Meat, Fish, and Poultry</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products?category__name=homemade+goods&page=1">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/goods.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Homemade Goods</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products?category__name=plants+and+flowers&page=1">
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
                                products === null
                                ? <p>Loading...</p>
                                : (products.results.map((product) => {
                                    return (
                                        <div className="col-2 mt-3 p-1" key={product.id}>
                                            <div className="card border-0">
                                                <img src={product.image} className="card-img-top" alt={product.name}  style={{maxHeight: "160px"}} />
                                                <div className="card-body">
                                                    <a 
                                                        className="stretched-link" 
                                                        href={`/product/${product.slug}`}
                                                    >
                                                        <p className="card-title text-truncate">{product.name}</p>
                                                    </a>
                                                    <h6 className="card-text">
                                                        <div className="row">
                                                            <div className="col">
                                                                {
                                                                    product.disc_price > 0
                                                                    ? (
                                                                        <>
                                                                            <span className="text-decoration-line-through">₱ {product.price}</span>
                                                                            <span> {product.disc_price}</span>
                                                                        </>
                                                                    ) : '₱'+product.price
                                                                }
                                                            </div>
                                                            <div className="col text-end">
                                                                <small className="text-muted">{product.sold_count} sold</small>
                                                            </div>
                                                        </div>
                                                    </h6>
                                                </div>
                                                <div className="card-footer my-0 py-0 text-center">
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
                                                            {
                                                                product.review_count > 0
                                                                && (
                                                                    <span> ({product.average_rating}/5)</span>
                                                                )
                                                            }
                                                        </small>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }))
                            }
                        </div>
                        <div className="row text-center mt-5">
                            <div className="col">
                                <Link to="/products/all">
                                    <button 
                                        type="button" 
                                        className="shadow btn btn-primary px-5 align-items-center"
                                    >
                                        <h6 className="py-1 m-0">See All</h6>
                                    </button>
                                </Link>
                            </div>
                        </div>                            
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    products: state.products.products
});

export default connect(mapStateToProps, { loadProducts })(Home);