import React from 'react';
import { Redirect } from 'react-router-dom';

const SignupPhoneVerify = (props) => {
    return (
        <Redirect 
            to={{
                pathname: "/signup/finishing-up",
                state: { phoneNumber: props.location.state.phoneNumber }
            }}
        />
    );
};

export default SignupPhoneVerify;