import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { createProduct } from '../actions/products';
import product from '../reducers/products';

const Profile = ({ isAuthenticated, user, createProduct }) => {
    const [productForm, setProductForm] = useState({
        'productName': '',
        'desc': '',
        'price': 0,
        'discPrice': 0,
        'inStock': false
    });
    const { productName, desc, price, discPrice, inStock } = productForm;

    const [created, setCreated] = useState(false);

    const onChange = e => setProductForm({ ...productForm, [e.target.name]: e.target.value });

    const onCheck = e => setProductForm({ ...productForm, [e.target.name]: e.target.checked });

    const onSubmit = e => {
        let in_stock = inStock ? 1 : 0;
        createProduct(user.id, productName, desc, price, discPrice, in_stock);
        setCreated(true);
    };

    if (created)
        return <Redirect to="/profile" />;

    return (
        <>
            <NavigationBar />

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
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { createProduct })(Profile);