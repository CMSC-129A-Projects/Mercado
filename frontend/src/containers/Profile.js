import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { logout } from '../actions/auth';
import { createProduct } from '../actions/products';

const Profile = ({ logout, createProduct, curr_user, isAuthenticated }) => {
    const [productForm, setProductForm] = useState({
        'productName': '',
        'desc': '',
        'price': 0,
        'discPrice': 0,
        'inStock': false
    });
    const [created, setCreated] = useState(false);

    const { productName, desc, price, discPrice, inStock } = productForm;

    const onChange = e => setProductForm({ ...productForm, [e.target.name]: e.target.value });

    const onCheck = e => setProductForm({ ...productForm, [e.target.name]: e.target.checked });

    const onSubmit = e => {
        let in_stock = inStock ? 1 : 0;
        createProduct(curr_user.id, productName, desc, price, discPrice, in_stock);
        setCreated(true);
    };

    const logout_user = () => {
        logout();
        window.location.href = '/login';
    };

    if (created)
        return <Redirect to="/profile" />;

    return (
        <Fragment>
            <NavigationBar />

            <div className="container mt-5">
                <h1>{curr_user && curr_user.first_name} {curr_user && curr_user.last_name}</h1>
                <button type="button" className="btn btn-sm btn-outline-warning" onClick={logout_user}>
                    Logout
                </button>
            </div>

            <div className="container mt-5">
                <form onSubmit={e => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Name your product</label>
                        <input type="text" className="form-control" id="productName" name="productName" required value={productName} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Describe your product</label>
                        <textarea type="password" className="form-control" id="desc" name="desc" rows="3" value={desc} onChange={e => onChange(e)}></textarea>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" name="price" required value={price} onChange={e => onChange(e)} />
                        </div>
                        <div className="col">
                            <label htmlFor="discPrice" className="form-label">Discounted Price</label>
                            <input type="number" className="form-control" id="discPrice" name="discPrice" value={discPrice} onChange={e => onChange(e)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Show your product</label>
                        <input className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="inStock" name="inStock" value={inStock} onChange={e => onCheck(e)} />
                        <label className="form-check-label" htmlFor="inStock">This product is in stock</label>
                    </div>
                    <button type="submit" className="btn btn-outline-success">Sell your product</button>
                </form>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    curr_user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout, createProduct })(Profile);