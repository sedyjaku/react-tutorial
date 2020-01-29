import React from "react";
import styles from "./drawerToggle.module.css"
import PropTypes from 'prop-types';

const DrawerToggle = (props) => {
    return <div className={styles.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
};

DrawerToggle.propTypes = {
    clicked: PropTypes.func
}

export default DrawerToggle;