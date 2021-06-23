import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import { loadProducts } from '../actions/products'

const Shop = ({ user, isLoading, products, loadProducts, ...props }) => {
    const [filter, setFilter] = useState('Latest')
    const [page, setPage] = useState(1)
    const [category, setCategory] = useState(null)
    useEffect(() => {
        const url = new URL(window.location.href)

        // Add ``page`` parameter to url if it does not have it 
        if (!url.searchParams.has('page') || url.searchParams.get('page') === null)
            return props.history.push('/products?page=1')

        if (url.searchParams.has('min_sold')) 
            setFilter('Popular')

        setPage(parseInt(url.searchParams.get('page')))

        if (url.searchParams.has('category__name')) 
            setCategory(url.searchParams.get('category__name'))

        loadProducts(url.search)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const previous = e => {
        let url = new URL(window.location.href)
        let params = new URLSearchParams(url.search)
        params.set('page', page-1)
        window.location.href = `/products?${params.toString()}`
    }

    const next = e => {
        let url = new URL(window.location.href)
        let params = new URLSearchParams(url.search)
        params.set('page', page+1)
        setPage(page+1)
        window.location.href = `/products?${params.toString()}`
    }

    return user === null
    ? (<>Loading...</>)
    : (
        <>
            <NavigationBar pageType="shop" />
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 p-0 border-end">
                        <ul className="nav nav-pills text-center flex-column px-1 min-vh-100 text-white" id="menu" style={{ backgroundColor: "#beb7a3"}}>
                            <h4 className="mt-3 mb-5 text-muted">PRODUCTS</h4>
                            <li className="nav-item">
                                <a className={!category ? 'nav-link active' : 'nav-link'} href="/products">All</a>
                            </li>
                            <li>
                                <a href="#categories" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-bootstrap"></i> <span className="ms-1 d-none d-sm-inline">Category</span></a>
                                <ul 
                                    className={category ? 'collapse nav flex-column ms-1 show' : 'collapse nav flex-column ms-1'}
                                    id="categories" 
                                    data-bs-parent="#menu"
                                    style={{ backgroundColor: "#beb7a3" }}
                                >
                                    <li className="w-100">
                                        <a 
                                            href="/products?category__name=veggies&page=1" 
                                            className={category === 'veggies' ? 'nav-link px-0 active' : 'nav-link px-0'}
                                        > 
                                            <span className="d-none d-sm-inline">Veggies</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="/products?category__name=fruits&page=1" 
                                            className={category === 'fruits' ? 'nav-link px-0 active' : 'nav-link px-0'}
                                        > 
                                            <span className="d-none d-sm-inline">Fruits</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="/products?category__name=meat,+fish,+and+poultry&page=1" 
                                            className={category === 'meat, fish, and poultry' ? 'nav-link px-0 active' : 'nav-link px-0'}
                                        > 
                                            <span className="d-none d-sm-inline">Meat, Fish, and Poultry</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="/products?category__name=homemade+goods&page=1" 
                                            className={category === 'homemade goods' ? 'nav-link px-0 active' : 'nav-link px-0'}
                                        > 
                                            <span className="d-none d-sm-inline">Homemade Goods</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a 
                                            href="/products?category__name=plants+and+flowers&page=1" 
                                            className={category === 'plants and flowers' ? 'nav-link px-0 active' : 'nav-link px-0'}
                                        > 
                                            <span className="d-none d-sm-inline">Plants and Flowers</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col mx-5 mt-3">
                        {
                            products
                            && (
                                <div className="row justify-content-end">
                                    <div className="col-2 m-0 p-0">
                                        <div className="btn-group w-100">
                                            <button 
                                                className="btn btn-primary btn-sm dropdown-toggle" 
                                                type="button" 
                                                id="filterDropdown" 
                                                data-bs-toggle="dropdown" 
                                                data-bs-auto-close="true" aria-expanded="false">
                                                {filter}
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                                                {
                                                    filter === 'Latest'
                                                    ? (
                                                        <li>
                                                            <a 
                                                                className="dropdown-item" 
                                                                href={`${window.location.href}&min_sold=50`}
                                                            >Popular</a>
                                                        </li>
                                                    ) : (
                                                        <li>
                                                            <a className="dropdown-item" href="/products?page=1">Latest</a>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="row mt-3">
                            {
                                products
                                && (
                                    products.count > 0
                                    ? (
                                        products.results.map((product) => {
                                            return (
                                                <div className="col-2 py-3 px-1 text-center" key={product.id}>
                                                    <div className="card border-0">
                                                        <img src={`${product.image}`} className="card-img-top" alt={product.name}  style={{maxHeight: "160px"}} />
                                                        <div className="card-body py-1">
                                                            <a href={`/product/${product.slug}`} className="stretched-link">
                                                                <h6 className="card-title text-truncate">{product.name}</h6>
                                                                <h6 className="card-title">
                                                                    {
                                                                        product.disc_price > 0
                                                                        ? (
                                                                            <>
                                                                                <span className="text-decoration-line-through">₱ {product.price}</span>
                                                                                <span>₱ {product.disc_price}</span>
                                                                            </>
                                                                        ) : '₱ '+product.price
                                                                    }
                                                                </h6>
                                                            </a>
                                                        </div>
                                                        <div className="card-footer my-0 py-0">
                                                            <small className="card-text my-0 py-0">
                                                                {
                                                                    product.review_count + ' review' +
                                                                    (
                                                                        product.review_count
                                                                        ? 's'
                                                                        : ''
                                                                    )
                                                                }
                                                                {
                                                                    (product.review_count > 0)
                                                                    && (<span> ({product.average_rating}/5)</span>)
                                                                }
                                                            </small>
                                                            {/* <span className="card-text"> {product.sold_count} sold</span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="col text-center">
                                            <p>No products available</p>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        {
                            products
                            && (
                                <div className="row mt-5">
                                    <div className="col">
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination justify-content-end">
                                                <li
                                                    className={
                                                        (products && products.previous)
                                                        ? 'page-item'
                                                        : 'page-item disabled'
                                                    }
                                                >
                                                    <button
                                                        className="page-link" 
                                                        onClick={e => previous(e)}
                                                        style={{ color: "#beb7a3" }}
                                                    >Previous</button>
                                                </li>
                                                <li className="page-item disabled">
                                                    <a className="page-link" href={window.location.href}>{page}</a>
                                                </li>
                                                <li
                                                    className={
                                                        (products && products.next)
                                                        ? 'page-item'
                                                        : 'page-item disabled'
                                                    }
                                                >
                                                    <button 
                                                        className="page-link" 
                                                        onClick={e => next(e)}
                                                        style={{ color: "#beb7a3" }}
                                                    >Next</button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    isLoading: state.products.isLoading,
    products: state.products.products
})

export default connect(mapStateToProps, { loadProducts })(Shop)