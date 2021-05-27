import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { create_user } from '../actions/auth';

const Signup = ({ create_user, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        rePassword: ''
    });
    const { phoneNumber, firstName, lastName, username, password, rePassword } = formData;

    const onChange = e => {
        if (e.target.name === 'phone')
    };
};