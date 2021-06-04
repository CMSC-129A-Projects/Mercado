import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { logout } from '../actions/auth';
import pgc from '../data/pgc';

const Profile = ({ logout, user, isAuthenticated }) => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [addressData, setAddressData] = useState({
        region: '',
        province: '',
        city: '',
        barangay: ''
    });
    const { region, province, city, barangay } = addressData;

    if (isAuthenticated !== null && !isAuthenticated)
        return <Redirect to="/login" />;

    const logout_user = (e) => {
        logout();
        setLogoutSuccess(true);
    };

    if (logoutSuccess)
        return <Redirect to="/login" />;

    const onChange = e => {
        switch (e.target.name) {
            case 'region':
                setAddressData({
                    region: e.target.value,
                    province: '',
                    city: '',
                    barangay: ''
                });
                break;
            case 'province':
                setAddressData({
                    ...addressData,
                    province: e.target.value,
                    city: '',
                    barangay: ''
                });
                break;
            case 'city':
                setAddressData({
                    ...addressData,
                    city: e.target.value,
                    barangay: ''
                });
                break;
            case 'barangay':
                setAddressData({ ...addressData, barangay: e.target.value });
            default:
                break;
        }
    };

    const profileSetup = (
        <div className="container">
            <form className="needs-validation">
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
            </form>
        </div>
    );

    return (
        <Fragment>
            <NavigationBar />

            {profileSetup}

            <div className="container mt-5">
                <h1>{user && user.first_name} {user && user.last_name}</h1>
                <button type="button" className="btn btn-sm btn-outline-warning" onClick={e => logout_user(e)}>
                    Logout
                </button>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Profile);