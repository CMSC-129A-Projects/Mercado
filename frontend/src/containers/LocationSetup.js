import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import pgc from '../data/pgc'
import { patchUserAddress } from '../actions/auth'
import Footer from '../components/Footer'

const LocationSetup = ({ isAuthenticated, user, patchUserAddress }) => {
    const [setupData, setSetupData] = useState({
        region: '',
        province: '',
        city: '',
        barangay: ''
    })

    const { region, province, city, barangay } = setupData

    const onChange = e => {
        switch (e.target.name) {
            case 'region':
                setSetupData({
                    region: e.target.value,
                    province: '',
                    city: '',
                    barangay: ''
                })
                break
            case 'province':
                setSetupData({
                    ...setupData,
                    province: e.target.value,
                    city: '',
                    barangay: ''
                })
                break
            case 'city':
                setSetupData({
                    ...setupData,
                    city: e.target.value,
                    barangay: ''
                })
                break
            case 'barangay':
                setSetupData({ ...setupData, barangay: e.target.value })
                break
            default:
                break
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        patchUserAddress({ slug: user.username, ...setupData })
        return <Redirect to={`/account${user.username}`} />
    }

    // * Unauthenticated user is redirected
    if (isAuthenticated === false) return <Redirect to="/login" />

    // * User with address is redirected to home
    if (user && user.is_set) return <Redirect to="/" />

    return (
        <>
            <main>
                <div className="container mt-5">
                    <div className="row mt-5 pt-5">
                        <div className="col"></div>
                        <div className="col-4 shadow p-3 mb-5 bg-white rounded">
                            <div className="row mt-3 text-center">
                                <div className="col">
                                    <h5>Address Setup</h5>
                                </div>
                            </div>
                            <hr />
                            <form className="mb-3 needs-validation" onSubmit={e => onSubmit(e)}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <h5 className="form-text">SELECT YOUR LOCATION</h5>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <select 
                                            className="form-select"
                                            id="region"
                                            aria-label="region"
                                            name="region"
                                            value={region}
                                            onChange={e => onChange(e)}
                                        >
                                            <option value="" defaultValue>Region</option>
                                            {
                                                Object.keys(pgc).map((value) => {
                                                    return (
                                                        <option 
                                                            value={value}
                                                            key={value}
                                                        >
                                                            {pgc[value].region_name}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                {
                                    region &&
                                    (
                                        <div className="row mb-3">
                                            <div className="col">
                                                <select
                                                    className="form-select"
                                                    id="province"
                                                    aria-label="province"
                                                    name="province"
                                                    value={province}
                                                    onChange={e => onChange(e)}
                                                >
                                                    <option value="" defaultValue>Province</option>
                                                    {
                                                        region &&
                                                        (
                                                            Object.keys(pgc[region].province_list).map((value) => {
                                                                return (
                                                                    <option 
                                                                        value={value}
                                                                        key={value}
                                                                    >
                                                                        {value}
                                                                    </option>
                                                                );
                                                            })
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    province && 
                                    (
                                        <div className="row mb-3">
                                            <div className="col">
                                                <select
                                                    className="form-select"
                                                    id="city"
                                                    aria-label="city"
                                                    name="city"
                                                    value={city}
                                                    onChange={e => onChange(e)}
                                                >
                                                    <option value="" defaultValue>City</option>
                                                    {
                                                        province &&
                                                        (
                                                            Object.keys(pgc[region].province_list[province].municipality_list).map((value) => {
                                                                return (
                                                                    <option 
                                                                        value={value}
                                                                        key={value}
                                                                    >
                                                                        {value}
                                                                    </option>
                                                                );
                                                            })
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    city && 
                                    (
                                        <div className="row mb-3">
                                            <div className="col">
                                                <select
                                                    className="form-select"
                                                    id="barangay"
                                                    aria-label="barangay"
                                                    name="barangay"
                                                    value={barangay}
                                                    onChange={e => onChange(e)}
                                                >
                                                    <option value="" defaultValue>Barangay</option>
                                                    {
                                                        city &&
                                                        (
                                                            Object.keys(pgc[region].province_list[province].municipality_list[city].barangay_list).map((value) => {
                                                                return (
                                                                    <option 
                                                                        value={pgc[region].province_list[province].municipality_list[city].barangay_list[value]}
                                                                        key={value}
                                                                    >
                                                                        {pgc[region].province_list[province].municipality_list[city].barangay_list[value]}
                                                                    </option>
                                                                );
                                                            })
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100" 
                                    disabled={barangay===''}
                                >DONE</button>
                            </form>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { patchUserAddress })(LocationSetup)