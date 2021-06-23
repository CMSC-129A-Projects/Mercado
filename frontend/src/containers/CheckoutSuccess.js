import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

const CheckoutSuccess = ({ isAuthenticated, user, ...props }) => {
    useEffect(() => {
        console.log(props.location.state)
    }, [user])

    if (user !== null && !isAuthenticated) return <Redirect to="/login" />

    const renderDateTime = () => {
        const today = new Date();
        return `${today.getMonth()+1}/${today.getDate()}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`
    }

    return (
        <>
            <div className="container p-5 mt-5 h-100 justify-content-center">
                <div className="row align-middle justify-content-center">
                    <div className="col h-100">
                        <div className="container align-middle p-5 text-center" style={{ backgroundColor: "#e4dede", width: "80%" }}>
                            <div className="row">
                                <div className="col text-center">
                                    <i className="material-icons" style={{ fontSize: "3rem", color: "#52734D" }}>check_circle_outline</i>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-center">
                                    <h3 style={{ fontWeight: "lighter" }}>Order Successfully Placed</h3>
                                    <p>Order # 762346</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <hr />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <b>Confirmation will be sent to</b>
                                </div>
                                <div className="col">
                                    {
                                        user
                                        && user.email
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <b>Order Date</b>
                                </div>
                                <div className="col">
                                    <p>{renderDateTime()}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <b>Delivery Details</b>
                                </div>
                                <div className="col">
                                    {
                                        user
                                        && (
                                            <>
                                                <p>{user.first_name} {user.last_name}</p>
                                                <p>{user.phone_number}</p>
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
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <b>Order Summary</b>
                                </div>
                                <div className="col">
                                    {                                           
                                        props.location.state.items
                                        && props.location.state.items.map((value, key) => {
                                            return (
                                                <div className="row text-start" key={key}>
                                                    <div className="col">
                                                        <b>{value.productName}</b>
                                                        <span> x {value.quantity}</span>
                                                    </div>
                                                    <div className="col-4">
                                                        <p>₱ {value.subTotal}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="row">
                                        <div className="col">
                                            <p>Total</p>
                                        </div>
                                        <div className="col">
                                            {
                                                props.location.state.total
                                                && (<b>₱ {props.location.state.total}</b>)
                                            }
                                        </div>
                                    </div>
                                    <div className="row text-start">
                                        <div className="col">
                                            <p>Paid with <b>Cash on delivery</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-primary" onClick={e => {window.location.href = '/'}}>CONTINUE SHOPPING</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {})(CheckoutSuccess)