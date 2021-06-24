import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { logout } from '../actions/auth'

const Profile = ({ match, isAuthenticated, isLoading, user, logout }) => {
    
    if (user !== null && !isAuthenticated) return <Redirect to="/login" />

    if (user !== null && user.user_address.city === '') return <Redirect to="/account/location-setup" />

    // if (user !== null && match.params.username !== user.username) return <Redirect to="/" />

    const logout_user = e => {
        logout()
        return <Redirect to="/login" />
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return isLoading || user === null
    ? (<>Loading...</>)
    : (
        <>
            <NavigationBar pageType="authenticated" />
            <main>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <div className="container p-5" style={{ backgroundColor: "#e4dede" }}>
                                <div className="row">
                                    <div className="col-2">
                                        <button 
                                            className="btn"
                                            data-bs-toggle="tooltip" 
                                            data-bs-placement="top" 
                                            title="Update Profile Image"
                                        >
                                            {
                                                user && user.profile.image
                                                ? <img src={user.profile.image} alt={`${user.first_name} avatar`} height="100" />
                                                : <img src="/images/default-avatar.png" alt="User avatar" height="100" />
                                            }
                                        </button>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <h4><b>{user.first_name} {user.last_name}</b></h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <small>0 / 5</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-1">
                                                <i className="material-icons">location_on</i>
                                            </div>
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
                                            {
                                                user && match.params.username === user.username
                                                && (
                                                    <div className="col">
                                                        <button className="btn"><i className="material-icons">edit</i></button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {
                                            user && match.params.username === user.username
                                            && (
                                                <div className="row">
                                                    <div className="col-1">
                                                        <i className="material-icons">mail</i>
                                                    </div>
                                                    <div className="col">
                                                        <p>{user.email}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className="row">
                                            <div className="col-1">
                                                <i className="material-icons">phone_android</i>
                                            </div>
                                            <div className="col">
                                                <p>{user.phone_number}</p>
                                            </div>
                                            {
                                                user && match.params.username === user.username
                                                && (
                                                    <div className="col">
                                                        <button className="btn"><i className="material-icons">edit</i></button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            user && match.params.username === user.username
                            && (

                                <div className="col-3 p-0" style={{ backgroundColor: "#beb7a3", height: "195px" }}>
                                    <div className="container p-3">
                                        <div className="row">
                                            <div className="col">
                                                <b>Pending purchases</b>
                                            </div>
                                            <div className="col-2">
                                                <p>{Object.keys(user.orders).length}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <b>On cart</b>
                                            </div>
                                            <div className="col-2">
                                                <p>{Object.keys(user.user_cart.cart_items).length}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            <div className="col text-start">
                                                <a href={`/seller/${user.username}`}>Seller Center</a>
                                            </div>
                                            <div className="col text-end">
                                                <button 
                                                    className="btn btn-primary btn-sm" 
                                                    style={{ border: "none" }}
                                                    onClick={e => logout_user(e)}
                                                >Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="row mt-5 mx-3">
                        <div className="col">
                            <div className="container">
                                {
                                    user && match.params.username === user.username
                                    && (
                                        <>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <h4><b>PENDING PURCHASES</b></h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <table className="table table-bordered align-middle">
                                                        <tbody>
                                                            {
                                                                user && user.orders
                                                                && (
                                                                    user.orders.map((value, key) => {
                                                                        return (
                                                                            <tr key={key}>
                                                                                <th scope="row">
                                                                                    <img 
                                                                                        src={value.product.image}
                                                                                        alt={value.product.name} 
                                                                                        className="m-1 me-3"
                                                                                        height="50"
                                                                                        width="50"
                                                                                    />
                                                                                    {value.product.name}
                                                                                </th>
                                                                                <td>
                                                                                    {
                                                                                        value.product.disc_price > 0
                                                                                        ? <td>₱ {value.product.disc_price}</td>
                                                                                        : <td>₱ {value.product.price}</td>
                                                                                    }
                                                                                </td>
                                                                                <td>{value.quantity}</td>
                                                                                <td><b>₱ {value.total}</b></td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="container p-5 pt-0">
                                <div className="row my-5">
                                    <div className="col">
                                        <h4><b>USER REVIEWS</b></h4>
                                    </div>
                                </div>
                                {
                                    user && user.user_review_recipient.length > 0
                                    ? (
                                        user.user_review_recipient.map((value, key) => {
                                            return (
                                                <div className="row mb-3 pb-3 border-bottom" key={key}>
                                                    <div className="col-1 text-center pe-0">
                                                        <img 
                                                            src={
                                                                value.profile.image
                                                                ? value.profile.image
                                                                : '/images/default-avatar.png'
                                                            } 
                                                            alt="Reviewer image" 
                                                            width="50"
                                                            height="auto"
                                                        />
                                                    </div>
                                                    <div className="col ps-1">
                                                        <div className="row">
                                                            <div className="col">
                                                                <h6>
                                                                    {value.author.first_name} {value.author.last_name}
                                                                    <span className="text-muted fs-6 font-monospace"> {formatDate(value.created_at)}</span>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <h6>{value.rating}/5</h6>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <p>{value.body}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <div className="row text-center mb-3">
                                            <div className="col">
                                                <p>No reviews.</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
})

export default connect(mapStateToProps, { logout })(Profile)