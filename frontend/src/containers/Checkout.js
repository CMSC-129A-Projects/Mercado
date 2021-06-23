import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { checkout } from '../actions/products'

const Checkout = ({ isAuthenticated, user, checkout, ...props }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user) setIsLoading(false)
    }, [user])

    if (user !== null && !isAuthenticated) return <Redirect to="/login" />

    const checkoutOrders = e => { 
        let items = []
        user.user_cart.cart_items.map((value, key) => {
            items.push({
                'productName': value.product.name,
                'quantity': value.quantity,
                'subTotal': value.total
            })
        })

        checkout(user, user.user_cart.cart_items)

        props.history.push({
            pathname: '/checkout_success',
            state: {
                items: items,
                total: user.user_cart.total
            }
        })
    }

    return isLoading
    ? (<>Loading...</>)
    : (
        <>
            <NavigationBar pageType="authenticated" />
            <main>
                <div className="container p-5">
                    <div className="row">
                        <div className="col">
                            <div className="container">
                                <div className="row mb-5">
                                    <div className="col text-center">
                                        <h3><b>CHECKOUT</b></h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table className="table table-bordered align-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    user && user.user_cart.cart_items
                                                    ? (
                                                        user.user_cart.cart_items.map((item, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <th scope="row">
                                                                        <img 
                                                                            src={item.product.image} 
                                                                            alt={item.product.name} 
                                                                            className="m-1 me-3"
                                                                            height="50" 
                                                                            width="50"
                                                                        />
                                                                        {item.product.name}
                                                                    </th>
                                                                    {
                                                                        item.product.disc_price > 0
                                                                        ? <td>₱ {item.product.disc_price}</td>
                                                                        : <td>₱ {item.product.price}</td>
                                                                    }
                                                                    <td>
                                                                        {item.quantity}
                                                                    </td>
                                                                    <td>₱ {item.total}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                    : (
                                                        <tr className="text-center">
                                                            <td colSpan="4">You have no orders.</td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    user 
                                                    && (
                                                        <tr>
                                                            <th scope="row" colSpan="3">Total</th>
                                                            <th><b>₱ {user.user_cart.total}</b></th>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col text-end">
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={e => checkoutOrders(e)}
                                        >Confirm Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 text-white">
                            <div className="row mt-5 p-5" style={{ backgroundColor: "#beb7a3", height: "300px" }}>
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <h6>Mode of Payment</h6>
                                        </div>
                                    </div>
                                    <div className="row pb-3">
                                        <div className="col">
                                            <div className="form-check">
                                                <input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    name="mop" 
                                                    id="mop" 
                                                    checked 
                                                    disabled 
                                                    style={{ backgroundColor: "#52734D" }}
                                                />
                                                <label 
                                                    className="form-check-label" 
                                                    htmlFor="mop"
                                                >Cash on Delivery</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Deliver to</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            {
                                                user && user.user_address
                                                && (
                                                    <p>
                                                        <span>{user.user_address.address_line1}{
                                                            user.user_address.address_line1
                                                            && ', '
                                                        }</span>
                                                        <span>{user.user_address.brgy}{
                                                            user.user_address.brgy
                                                            && ', '
                                                        }</span>
                                                        <span>{user.user_address.city}, </span>
                                                        <span>{user.user_address.province}</span>
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { checkout })(Checkout)