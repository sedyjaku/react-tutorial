import React, {Fragment, useEffect, useState} from "react";
import styles from "./layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import PropTypes from 'prop-types';

const Layout = (props) => {

        const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };
    const sideDrawerOpenedHandler = () => {
        setShowSideDrawer(true);
    };

        return <Fragment>
            <Toolbar showMenu={sideDrawerOpenedHandler}></Toolbar>
            <SideDrawer
                closed={sideDrawerClosedHandler}
                show={showSideDrawer}
            />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={styles.Content}>{props.children}
            </main>
        </Fragment>
    };

Layout.propertyTypes = {
    children: PropTypes.element
};

export default Layout;