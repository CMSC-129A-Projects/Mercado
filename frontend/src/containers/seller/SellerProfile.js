import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import NavigationBar from '../../components/NavigationBar'
import Footer from '../../components/Footer'
import { createProduct } from '../../actions/products'

const SellerProfile = ({ isAuthenticated, user, createProduct }) => {
    const [content, setContent] = useState(1)
    const [form, setForm] = useState({
        productName: '',
        category: '1',
        price: '',
        disc_price: '0',
        description: '',
        image: '',
        available_count: '1'
    })
    const { productName, category, price, disc_price, description, image, available_count } = form

    useEffect(() => {
        setContent(1)
    }, [user])

    const onChange = e => { setForm({ ...form, [e.target.name]: e.target.value })}

    const onSubmit = e => {
        e.preventDefault()
        createProduct(user, form)
        return <Redirect to={`/seller/${user.username}`} />
    }

    const renderContent = () => {
        switch (content) {
            case 1:
                return (
                    <div className="row mt-5">
                        <div className="col">
                            <form action="">
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="productName" className="form-label">Name of your Product</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="productName"
                                            id="productName"
                                            placeholder="Name of your Product"
                                            required
                                            value={productName}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select 
                                            name="category" 
                                            id="category"
                                            className="form-select"
                                            value={category}
                                            onChange={e => onChange(e)}
                                        >
                                            <option value="1" defaultValue>Veggies</option>
                                            <option value="2">Fruits</option>
                                            <option value="3">Meat, Fish, and Poultry</option>
                                            <option value="4">Homemade Goods</option>
                                            <option value="5">Plants and Flowers</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            name="price"
                                            id="price"
                                            placeholder="Price"
                                            required
                                            value={price}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="disc_price" className="form-label">Discounted Price</label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            name="disc_price"
                                            id="disc_price"
                                            placeholder="Discounted Price"
                                            value={disc_price}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <textarea 
                                            className="form-control"
                                            name="description" 
                                            id="description" 
                                            placeholder="Description of your product"
                                            value={description}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="image" className="form-label">Upload image of your product</label>
                                        <input 
                                            type="file" 
                                            className="form-control"
                                            name="image"
                                            id="image"
                                            value={image}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="available_count" className="form-label">In Stock</label>
                                        <input 
                                            type="number" 
                                            className="form-control"
                                            name="available_count"
                                            id="available_count"
                                            value={available_count}
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                </div>
                                <div className="row text-end mt-3">
                                    <div className="col">
                                        <button className="btn btn-primary" onClick={e => onSubmit(e)}>SELL PRODUCT</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="row mt-3">
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Discounted Price</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="row mt-3">
                        <div className="col">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                )
        }
    }
    return (
        <>
            <NavigationBar pageType="authenticated" />
            <main>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button className={content === 1 ? 'nav-link active': 'nav-link'} onClick={e => { setContent(1) }}>Sell</button>
                                </li>
                                <li className="nav-item">
                                    <button className={content === 2 ? 'nav-link active' : 'nav-link'} onClick={e => { setContent(2) }}>Products</button>
                                </li>
                                <li className="nav-item">
                                    <button className={content === 3 ? 'nav-link active' : 'nav-link'} onClick={e => { setContent(3) }}>Orders</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            {renderContent()}
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
    user: state.auth.user
})

export default connect(mapStateToProps, { createProduct })(SellerProfile)