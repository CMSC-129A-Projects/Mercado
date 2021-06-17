import React from 'react';
import { Redirect } from 'react-router-dom';

const SignupPhoneVerify = (props) => {
    return (
        <Redirect 
            to={{
                pathname: "/buyer/createaccount",
                state: { phoneNumber: props.location.state.phoneNumber }
            }}
        />
    );
};

export default SignupPhoneVerify;