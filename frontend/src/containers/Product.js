import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { addToBag, getProduct } from '../actions/products'

const Product = ({ match, isAuthenticated, user, isLoading, product, getProduct, addToBag }) => {
    const [quantity, setQty] = useState(1)

    useEffect(() => {
        if (isAuthenticated === false) return <Redirect to="/login" />

        const slug = match.params.slug
        if (user) getProduct(slug)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const onChange = e => { 
        if (e.target.value <= product.available_count && e.target.value > 0)
            setQty(e.target.value) 
    }

    const onSubmit = e => {
        e.preventDefault()
        addToBag(user.user_cart, product, quantity)
        window.location.reload()
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (isLoading || !product) 
    ? (<>Loading...</>)
    : (
        <>
            <NavigationBar pageType="authenticated" />
            <main>
                <div className="container mt-3 p-5" style={{ backgroundColor: "#beb7a3"}}>
                    <div className="row">
                        <div className="col">
                            <a href="/">Home</a>
                            <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;{product.category.name}</span>
                        </div>
                    </div>
                    {
                        product
                        && (

                            <div className="row align-items-center">
                                <div className="col-4 p-3 text-center">
                                        <img 
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded" 
                                            height="300"
                                            width="100%"
                                        />
                                </div>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <h1 className="m-0">{product.name}</h1>
                                            <p className="m-0">
                                                <a href={`/account/seller/${product.user.username}`} className="text-uppercase">
                                                    {product.user.first_name} {product.user.last_name}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <span className="display-6 me-3">
                                                {
                                                    product.disc_price > 0
                                                    ? (
                                                        <>
                                                            ₱ <span className="text-decoration-line-through">{product.price}</span>
                                                            <span> {product.disc_price}</span>
                                                        </>
                                                    ) : '₱ '+product.price
                                                }    
                                            </span>
                                            <span>
                                                {
                                                    product.review_count + ' review'
                                                    + (product.review_count > 1 ? 's' : '')
                                                }
                                                {
                                                    (product.review_count > 0)
                                                    && (<span> ({product.average_rating}/5)</span>)
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row my-5">
                                        <div className="col">
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                    <form action="" onSubmit={e => onSubmit(e)} className="row justify-content-start ps-3">
                                        <div className="col-2">
                                            <input 
                                                type="number" 
                                                className="form-control form-control-sm" 
                                                id="qty"
                                                name="qty"
                                                max={product.available_count}
                                                value={quantity}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div className="col-3 ps-1 pe-0">
                                            <button type="submit" className="btn btn-primary btn-sm">ADD TO BAG</button>
                                        </div>
                                        <div className="col ps-0 ms-0"><p className="form-text">{product.available_count} available</p></div>
                                    </form>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* TODO: Add spacing  */}
                <div className="container pt-3 px-5 mt-5">
                    <div className="row py-3">
                        <div className="col">
                            <h4>Product Reviews</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {
                                product
                                && (
                                    product.product_review_product
                                    && product.product_review_product.map((review) => {
                                        return (
                                            <div className="row my-3 border-bottom p-3" key={review.id}>
                                                <div className="col-1 text-center pe-0">
                                                    <img 
                                                        src={
                                                            review.profile.image
                                                            ? review.profile.image
                                                            : '/images/default-avatar.png'
                                                        } 
                                                        alt="Reviewer avatar" 
                                                        width="50"
                                                        height="auto"
                                                    />
                                                </div>
                                                <div className="col ps-1">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6>
                                                                {review.user.first_name} {review.user.last_name}
                                                                <span className="text-muted fs-6 font-monospace"> {formatDate(review.created_at)}</span>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <h6>{review.rating}/5</h6>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <p>{review.body}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    isLoading: state.products.isLoading,
    product: state.products.product
});

export default connect(mapStateToProps, { getProduct, addToBag })(Product);