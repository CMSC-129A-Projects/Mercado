import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import pgc from '../data/pgc';

const Setup = ({ isAuthenticated, user }) => {
    const [setupData, setSetupData] = useState({
        userType: 'buyer',
        region: '',
        province: '',
        locality: '',
        barangay: ''
    });
    const { userType, region, province, locality, barangay } = setupData;

    const onChange = e => {
        if (e.target.type === 'radio') {
            setSetupData({ ...setupData, userType: e.target.value });
        } else {
            switch (e.target.name) {
                case 'region':
                    setSetupData({
                        ...setupData,
                        region: e.target.value,
                        province: '',
                        locality: '',
                        barangay: ''
                    });
                    break;
                case 'province':
                    setSetupData({
                        ...setupData,
                        province: e.target.value,
                        locality: '',
                        barangay: ''
                    });
                    break;
                case 'locality':
                    setSetupData({
                        ...setupData,
                        locality: e.target.value,
                        barangay: ''
                    });
                    break;
                case 'barangay':
                    setSetupData({ ...setupData, barangay: e.target.value });
                    break;
                default:
                    break;
            }
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        console.log({...setupData});
    };

    // Check if user is authenticated.
    if (isAuthenticated === null)
        return (<>Loading...</>);
    else if (!isAuthenticated)
        return <Redirect to="/login" />;

    // Check if user is done with profile Setup. 
    // Address should have locality if setup is done. 
    if (user === null)
        return (<>Loading...</>);
    else if (user.user_address.locality !== '')
        return <Redirect to="/" />;

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row mt-3">
                    <div className="col"></div>
                    <div className="col-6 shadow p-3 mb-5 bg-white rounded">
                        <div className="row mt-3">
                            <div className="col">
                                <h4>Thank you for being part of</h4>
                                <h1>MERCADO</h1>
                            </div>
                        </div>
                        <hr />
                        <form className="mb-3 needs-validation">
                            <div className="row mb-3">
                                <div className="col">
                                    <div>
                                        <h5 className="mb-5">ONE MORE THING</h5>
                                        <h5>Are you a buyer or a seller?</h5>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="buyer"
                                            value="buyer"
                                            checked={userType === 'buyer'}
                                            onChange={e => onChange(e)}
                                        />
                                        <label className="form-check-label" htmlFor="buyer">Buyer</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="userType"
                                            id="seller"
                                            value="seller"
                                            checked={userType === 'seller'}
                                            onChange={e => onChange(e)}
                                        />
                                        <label className="form-check-label" htmlFor="seller">Seller</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <h5>Select your location</h5>
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
                                                <option value="" defaultValue><p className="text-muted">Province</p></option>
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
                                                id="locality"
                                                aria-label="locality"
                                                name="locality"
                                                value={locality}
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
                                locality && 
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
                                                    locality &&
                                                    (
                                                        Object.keys(pgc[region].province_list[province].municipality_list[locality].barangay_list).map((value) => {
                                                            return (
                                                                <option 
                                                                    value={pgc[region].province_list[province].municipality_list[locality].barangay_list[value]}
                                                                    key={value}
                                                                >
                                                                    {pgc[region].province_list[province].municipality_list[locality].barangay_list[value]}
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
                                type="button" 
                                className="btn btn-primary" 
                                style={{width: "100%"}}
                                disabled={barangay===''}
                                onClick={e => onSubmit(e)}
                            >
                                Done
                            </button>
                        </form>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {})(Setup);