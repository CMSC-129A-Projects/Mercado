import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
import { logout } from '../actions/auth';

const Profile = ({ logout, user, isAuthenticated }) => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [addressData, setAddressData] = useState({
        region: '',
        province: '',
        city: '',
        barangay: ''
    });
    const { region, province, city, barangay } = addressData;
    const [addressOptions, setAddressOptions] = useState({
        regionOptions: null,
        provinceOptions: null,
        cityOptions: null,
        barangayOptions: null
    });
    const { regionOptions, provinceOptions, cityOptions, barangayOptions } = addressOptions;

    useEffect(() => {
        let isMounted = true;
        fetch('https://psgc.gitlab.io/api/regions.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                if (isMounted)
                    setAddressOptions({ ...addressOptions, regionOptions: data });
            })
            .catch(error => {
                console.log("Error fetching regions: ", error);
            });
        return () => { isMounted = false; };
    }, []);

    if (isAuthenticated !== null && !isAuthenticated)
        return <Redirect to="/login" />;

    const logout_user = (e) => {
        logout();
        setLogoutSuccess(true);
    };

    if (logoutSuccess)
        return <Redirect to="/login" />;

    const profileSetup = (
        <div className="container">
            <div className="d-flex justify-content-center flex-row">
                <div className="row">
                    <div className="col">
                        <form className="form-floating needs-validation">
                            <div className="row mb-3">
                                <div className="col">
                                    {
                                        regionOptions === null
                                        ? (
                                            <p>Loading...</p>
                                        )
                                        : (
                                            <select 
                                                className="form-select"
                                                id="region"
                                                aria-label="Region"
                                            >
                                                <option defaultValue>Region</option>
                                                {
                                                    regionOptions.map((value, key) => {
                                                        return (
                                                            <option value={value.name} key={key}>{value.name}</option>
                                                        );
                                                    })
                                                }
                                            </select>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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