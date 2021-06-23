import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";
import { connect } from 'react-redux';

import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verifyAccount = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to="/" />
    }

    return (
        <Container className="mt-6">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h1>Verify Your Account</h1>
                <Button variant="primary" onClick={verifyAccount}>Verify</Button>
            </div>
        </Container>
    );
};

export default connect(null, { verify })(Activate);