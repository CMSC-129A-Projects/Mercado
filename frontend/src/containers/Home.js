import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../css/home.css'
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { loadProducts } from '../actions/products';

const Home = ({ isLoading, isAuthenticated, user, products, loadProducts  }) => {
    useEffect(() => {
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // * Check if user is authenticated
    if (isAuthenticated === false) return <Redirect to="/login" />;

    // Redirects user if user address was not set 
    if (user && !user.is_set) return <Redirect to="/account/location-setup" />;

    return (
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
                            <Link to='/products/all'><button type="button" className="showcase-btn-2 mt-3">SHOP NOW</button></Link>
                        </div>
                    </div>
                    </div>
                </section>
                <section className="categories">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                        <div className="col-lg-2 text-center">
                            <Link to="/products/veggies">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                        <img src="/images/veg.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Veggies</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products/fruits">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/fruit.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Fruits</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products/meat,+fish+,+and+poultry">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/meat.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Meat, Fish, and Poultry</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products/homemade+goods">
                                <div className="card border-secondary border-2 mb-3 bg-transparent" style={{maxWidth: "18rem"}}>
                                    <div className="card-body">
                                    <img src="/images/goods.png" className="img fluid" alt="" />
                                    </div>
                                </div>
                            </Link>
                            <h6>Homemade Goods</h6>
                        </div>
                        <div className="col-lg-2 text-center">
                            <Link to="/products/plants+and+flowers">
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
                        {/* <div className="row">
                            {
                                products 
                                ? (products.map((product) => {
                                    return (
                                        <div className="col-4 mt-3" key={product.id}>
                                            <div className="card" style={{ backgroundColor: "#beb7a3" }}>
                                                <img src={product.image} className="card-img-top" alt={product.name} height="10" />
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
                        </div> */}
                        <div className="row">
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mt-3">
                                <div className="card">
                                    <img src="/images/goods1.jpg" className="card-img-top" alt="A product" height="10" />
                                    <div className="card-body">
                                        <a className="stretched-link" href="/product/a-product">
                                            <p className="card-title">A Product</p>
                                        </a>
                                        <h5 className="card-text">PHP 99.99</h5>
                                        <span>
                                            <small className="card-text">100 reviews
                                                <span> 4.5/5</span>
                                            </small>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center mt-5">
                            <div className="col">
                                <Link to="/products/all">
                                    <button type="button" className="btn btn-primary">Browse Products</button>
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