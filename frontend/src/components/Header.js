import React from 'react';

import HeaderNav from './HeaderNav';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <HeaderNav />
            </React.Fragment>
        );
    }
}

export default Header;