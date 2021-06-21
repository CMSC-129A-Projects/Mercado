import React from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'

const Bag = () => {
    return (
        <>
            <NavigationBar pageType="authenticated" />
            <main></main>
            <Footer />
        </>
    )
}

export default connect(null, {})(Bag);